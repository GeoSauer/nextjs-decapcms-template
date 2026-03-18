import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const imageRoot = path.join(projectRoot, "public/images");

const maxWidth = Number(process.env.IMAGE_MAX_WIDTH ?? 2200);
const quality = Number(process.env.IMAGE_QUALITY ?? 78);
const webpQuality = Number(process.env.IMAGE_WEBP_QUALITY ?? 78);
const minSavingsRatio = Number(process.env.IMAGE_MIN_SAVINGS_RATIO ?? 0.03);
const minBytesForRecompress = Number(process.env.IMAGE_MIN_BYTES_FOR_RECOMPRESS ?? 180000);
const minWebpSavingsRatio = Number(process.env.IMAGE_MIN_WEBP_SAVINGS_RATIO ?? 0.005);
const maxWebpGrowthRatio = Number(process.env.IMAGE_MAX_WEBP_GROWTH_RATIO ?? 1.08);

const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const webpConvertibleExtensions = new Set([".jpg", ".jpeg", ".png"]);

const walkFiles = async (directoryPath) => {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) {
        return walkFiles(fullPath);
      }
      return [fullPath];
    }),
  );

  return nested.flat();
};

const optimizeFile = async (filePath) => {
  const extension = path.extname(filePath).toLowerCase();
  if (!supportedExtensions.has(extension)) {
    return { status: "skipped", reason: "unsupported" };
  }

  const originalBuffer = await fs.readFile(filePath);
  const originalSize = originalBuffer.length;

  const metadata = await sharp(originalBuffer, { failOn: "none" }).metadata();
  const originalWidth = metadata.width ?? 0;
  const shouldResize = originalWidth > maxWidth;
  const shouldRecompressOriginal = shouldResize || originalSize >= minBytesForRecompress;

  let pipeline = sharp(originalBuffer, { failOn: "none" }).rotate();

  if (shouldResize) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true, fit: "inside" });
  }

  const transformedBuffer = await pipeline.toBuffer();
  let optimizedBuffer = originalBuffer;
  let updatedOriginal = false;

  if (shouldRecompressOriginal) {
    let formatPipeline = sharp(transformedBuffer, { failOn: "none" });

    if (extension === ".jpg" || extension === ".jpeg") {
      formatPipeline = formatPipeline.jpeg({ quality, mozjpeg: true, progressive: true, force: true });
    } else if (extension === ".png") {
      formatPipeline = formatPipeline.png({
        quality: Math.min(quality, 90),
        compressionLevel: 9,
        palette: true,
        force: true,
      });
    } else if (extension === ".webp") {
      formatPipeline = formatPipeline.webp({ quality, effort: 4, force: true });
    } else if (extension === ".avif") {
      formatPipeline = formatPipeline.avif({ quality: Math.min(quality, 60), effort: 4, force: true });
    }

    const candidateBuffer = await formatPipeline.toBuffer();
    const savingsRatio = 1 - candidateBuffer.length / originalSize;

    if (shouldResize || savingsRatio >= minSavingsRatio) {
      await fs.writeFile(filePath, candidateBuffer);
      optimizedBuffer = candidateBuffer;
      updatedOriginal = true;
    }
  }

  let createdWebp = false;
  let webpSize = 0;
  if (webpConvertibleExtensions.has(extension)) {
    const webpPath = filePath.replace(/\.(jpe?g|png)$/i, ".webp");
    const webpBuffer = await sharp(transformedBuffer, { failOn: "none" })
      .webp({ quality: webpQuality, effort: 5 })
      .toBuffer();

    const sourceSizeForComparison = updatedOriginal ? optimizedBuffer.length : originalSize;
    const webpSavingsRatio = 1 - webpBuffer.length / sourceSizeForComparison;

    let existingWebpSize = Number.POSITIVE_INFINITY;
    try {
      const existingWebp = await fs.stat(webpPath);
      existingWebpSize = existingWebp.size;
    } catch {
      existingWebpSize = Number.POSITIVE_INFINITY;
    }

    const hasExistingWebp = Number.isFinite(existingWebpSize);
    const isReasonableGrowth = webpBuffer.length <= sourceSizeForComparison * maxWebpGrowthRatio;
    const isWorthWriting = webpSavingsRatio >= minWebpSavingsRatio || shouldResize || !hasExistingWebp;
    const shouldWriteWebp = webpBuffer.length < existingWebpSize && isReasonableGrowth && isWorthWriting;

    if (shouldWriteWebp) {
      await fs.writeFile(webpPath, webpBuffer);
      createdWebp = true;
      webpSize = webpBuffer.length;
    }
  }

  if (!updatedOriginal && !createdWebp) {
    return { status: "skipped", reason: "minimal-change" };
  }

  return {
    status: "optimized",
    originalSize,
    optimizedSize: updatedOriginal ? optimizedBuffer.length : originalSize,
    resized: shouldResize,
    updatedOriginal,
    createdWebp,
    webpSize,
  };
};

const run = async () => {
  try {
    await fs.access(imageRoot);
  } catch {
    console.log(`No directory found at ${imageRoot}; nothing to optimize.`);
    return;
  }

  const files = await walkFiles(imageRoot);

  let optimizedCount = 0;
  let skippedCount = 0;
  let bytesBefore = 0;
  let bytesAfter = 0;
  let webpCreatedCount = 0;
  let webpTotalBytes = 0;

  for (const filePath of files) {
    const result = await optimizeFile(filePath);

    if (result.status === "optimized") {
      optimizedCount += 1;
      bytesBefore += result.originalSize;
      bytesAfter += result.optimizedSize;
      if (result.createdWebp) {
        webpCreatedCount += 1;
        webpTotalBytes += result.webpSize;
      }
      continue;
    }

    skippedCount += 1;
  }

  const savedBytes = Math.max(0, bytesBefore - bytesAfter);
  const savedMb = (savedBytes / (1024 * 1024)).toFixed(2);

  console.log(`Optimized ${optimizedCount} file(s), skipped ${skippedCount} file(s).`);
  console.log(`Saved ${savedMb} MB across optimized files.`);
  if (webpCreatedCount > 0) {
    const webpMb = (webpTotalBytes / (1024 * 1024)).toFixed(2);
    console.log(`Created ${webpCreatedCount} WebP sidecar file(s) totaling ${webpMb} MB.`);
  }
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
