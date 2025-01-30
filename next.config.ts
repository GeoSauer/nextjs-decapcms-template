/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // For static site generation with Next.js
  images: {
    unoptimized: true, // Disable image optimization since you're using `export`
  },
};

export default nextConfig;
