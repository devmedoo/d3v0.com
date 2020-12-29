require(`dotenv`).config({
  path: `.env`,
});

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

module.exports = {
  siteMetadata: {
    // Used for the title template on pages other than the index site
    siteTitle: `Yet Another Personal Blog`,
    // Default title of the page
    siteTitleAlt: `D3v0.com - Yet Another Personal Blog`,
    // Can be used for e.g. JSONLD
    siteHeadline: `D3v0.com - Yet Another Personal Blog`,
    // Will be used to generate absolute URLs for og:image etc.
    siteUrl: `https://d3v0.com`,
    // Used for SEO
    siteDescription: `A virtual man cave for yours truly.`,
    // Will be set on the <html /> tag
    siteLanguage: `en`,
    // Twitter Handle
    author: `@mrd3v0`,
    // Author Name
    siteAuthor: "Mohamed",
    // Used for og:image and must be placed inside the `static` folder
    siteImage: `/banner.jpg`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        feed: true,
        feedTitle: "A virtual man cave for yours truly.",
        blogPath: "/",
        navigation: [],
        externalLinks: [
          {
            name: `GitHub`,
            url: `https://github.com/devmedoo`,
          },
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `d3v0.com - yet another personal blog`,
        short_name: `d3v0`,
        description: `A virtual man cave for yours truly.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        plugins: [`gatsby-remark-images-anywhere`],
      },
    },
    {
      resolve: `gatsby-plugin-ebook`,
      options: {
        filename: "d3v0-ebook.epub",
        query: `
          {
            site {
              siteMetadata {
                title: siteTitle
                author: siteAuthor
              }
            }
            allMarkdownRemark: allMdx(sort: {order: ASC, fields: frontmatter___date}) {
              edges {
                node {
                  id
                  fileAbsolutePath
                  rawMarkdownBody: rawBody
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }
          }`,
      },
    },
  ].filter(Boolean),
};
