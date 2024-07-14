# Docs CMS

Common CMS for documentation using [Lark Docs](https://www.larksuite.com/en_us/product/creation).

- [Docs CMS](#docs-cms)
  - [About The Project](#about-the-project)
  - [Getting Started](#getting-started)
    - [Set up](#set-up)
    - [Set environment variables](#set-environment-variables)
    - [Run the development server](#run-the-development-server)
    - [Search](#search)
      - [Updating the search index](#updating-the-search-index)
  - [Learn More](#learn-more)
  - [Deploy on Vercel](#deploy-on-vercel)
  - [Contributing](#contributing)
  - [License](#license)

## About The Project

This is a [Next.js](https://nextjs.org/) project used to fetch documents using the [Lark Server APIs](https://open.larksuite.com/document/server-docs/getting-started/server-api-list) and to display them online as documentation.

## Getting Started

### Set up

Before installing, you need to install [Node.js](https://nodejs.org/en). Run the following command to install it in the current project:

```sh
npm install
```

### Set environment variables

Run the following command to copy the default example and replace with your own variables:

```bash
cp .env.example .env
```

### Run the development server

```bash
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

### Search

Search is using Typesense.

#### Updating the search index

The scraper configuration is at [scraper/typesense.json](./scraper/typesense.json).

Minimum you need to edit the following:

```json
{
  "index_name": "docs-cms-three-vercel-app",
  "start_urls": [
    "https://docs-cms-three.vercel.app/wiki/quick-start"
  ],
  "sitemap_urls": [
    "https://docs-cms-three.vercel.app/sitemap.xml"
  ],
  // ...
}
```

To scrape the site and update the index:

First, copy the default example and edit it:

```bash
cd scraper
cp .env.typesense.example .env.typesense
```

Thereafter, run `docker compose up`.

This can be automated, or run on demand.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

If you encounter a bug or have a feature request, please use the [Issue Tracker](https://github.com/AElfProject/aelf-dapp-factory/issues/new). The project is also open to contributions, so feel free to fork the project and open pull requests.

## License

Distributed under the MIT License. See [License](LICENSE) for more information.
