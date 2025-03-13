# Next.js + DecapCMS Template

I set out to build this template with the goal of being able to quickly spin up static landing pages for small businesses, leaving them in charge of content management, while avoiding any recurring monthly costs for the client. Since DecapCMS uses .md files in the project repo itself to store all CMS data there is no requirement for a separately hosted backend, so the only recurring cost will be a custom domain.

## Technologies used

- Bootstrapped with [Next.js using the pages router](https://nextjs.org/learn-pages-router).
- Content management with [DecapCMS](https://decapcms.org/docs).
- Deployed on [Netlify](https://www.netlify.com/).
- Contact form to email service API [Web3Forms](https://web3forms.com/).

## Getting Started

All of the building blocks are already in place, but there's a few steps necessary to get everything wired up and running properly.

### Deployment/Config Steps

#### Since this project utilizes DecapCMS (formerly Netlify CMS) it **must** be deployed on Netlify

- After cloning the repo go ahead and deploy it on Netlify. During deploy make sure to set the publish directory to 'out'.
- Navigate to site Site configuration/Identity/Registration - choose between 'open' or 'invite only', you'll probably want to choose the latter.
- Navigate to site Site configuration/Identity/Users - invite yourself/client.
- Navigate to Site configuration/Identity/Services - enable Git Gateway.

### Repo steps

- In `public/admin/config.yml` look for the TODOs and edit the `repo` and `identity_url`
  First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
