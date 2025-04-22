# Next.js + DecapCMS Template

I set out to build this template with the goal of being able to quickly spin up static landing pages for small businesses, leaving them in charge of content management, while avoiding any recurring monthly costs for the client. Since DecapCMS uses .md files in the project repo itself to store all CMS data there is no requirement for a separately hosted backend, so the only recurring cost will be a custom domain.

## Technologies Used

- Bootstrapped with [Next.js using the pages router](https://nextjs.org/learn-pages-router).
- Content management with [DecapCMS](https://decapcms.org/docs).
- Deployed on [Netlify](https://www.netlify.com/).
- Contact form to email service API [Web3Forms](https://web3forms.com/).
- Analytics tracked with [Google Analytics](https://developers.google.com/analytics/learn/beginners#step-1:-set-up-google-analytics), specifically [Google Tag Manager](https://tagmanager.google.com/).
- Markdown formatting with [ReactMarkdown](https://www.npmjs.com/package/react-markdown/v/8.0.6).
- Styled with [tailwindcss](https://tailwindcss.com/).
- Icons from [React Icons](https://www.npmjs.com/package/react-icons).
- TypeScript

## Repo Layout

_**Note**_ - I kept all of the landing page `jsx` confined to `index.tsx` so that you can use whatever componentization/file structure pattern you prefer.

- `public/admin` - DecapCMS config and html files
- `src/content` - directories containing MarkDown files with published CMS data
- `src/types/cms` - Type files for CMS data
- `src/pages/index.tsx` - root page where all data is fetched

## Getting Started

All of the building blocks are already in place, but there's a few steps necessary to get everything wired up and running properly.

### Deployment/Config Steps

_**Note**_ - Since this project utilizes DecapCMS (formerly Netlify CMS) it **must** be deployed on Netlify

- After cloning the repo and installing dependencies, go ahead and deploy it on Netlify. During deploy ensure that the publish directory is set to 'out'.
- Navigate to `Site configuration/Identity/Registration` - choose between 'open' or 'invite only', you'll probably want to choose the latter.
- Navigate to `Site configuration/Identity/Users` - invite yourself/client. Be sure to open the invite email and create a password for your profile.
- Navigate to `Site configuration/Identity/Services` - enable Git Gateway.
- Follow this [guide](https://support.google.com/analytics/answer/9304153?sjid=8472082799570998813-NC#add-tag&zippy=%2Cadd-the-google-tag-directly-to-your-web-pages) to get your Google Analytics account set up.

### Repo Steps

- In `public/admin/config.yml` look for the TODOs and edit the `repo` and `identity_url` to your values.
- Replace instances of `NEXT_PUBLIC_WEB3FORMS_API_KEY` and `NEXT_PUBLIC_GTM_ID` with your actual values as they do not need to be secrets.

And now you should be all set! Run `npm run dev` in the console and navigate to [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To reach the CMS, navigate to [http://localhost:3000/admin/index.html#/](http://localhost:3000/admin/index.html#/) and log in with your credentials. When you first attempt to login you should see a modal titled 'Development Settings' which will ask you provide the deployed Netlify URL for your project. **Note** - in production the url is just your-website.com/admin.

_**IMPORTANT**_ - If you have multiple DecapCMS projects, be sure to swap to the appropriate deployed URL before logging in.

### Adding/Editing CMS Fields

The structure of all CMS fields is defined in `public/admin/config.yml` (_**Note**_ - changing the name of the `admin` directory will also change the route to the CMS dashboard, just be sure to update any references to the path). I've tried to provide some good examples of various structures and have mainly stuck with [file collections](https://decapcms.org/docs/collection-file/), but there's plenty of other examples in the DecapCMS [docs](https://decapcms.org/docs).

_**Tip**_ - To quickly verify your `.yml` syntax and collection structure keep the CMS open locally.

### Generating Types

I've included a script that automatically generates types for all of your CMS data based on the contents of your `config.yml`. As soon as you're done setting it up or make any edits, just run `npm run generate:types` and it'll take care of it for you.

## Contributions

I designed this to be pretty accessible/beginner friendly and I really hope I accomplished that. I'm very open to the idea of contributions but am not quite sure how I want to approach it, so if you've got any feedback please don't hesitate to send me an email at <geo.sauer89@gmail.com> or connect on [LinkedIn](https://www.linkedin.com/in/geosauer/)
