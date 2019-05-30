const pkgJson = require('../packages/extension/package.json')

module.exports = {
  siteMetadata: {
    title: `SQLTools`,
    description: pkgJson.description,
    author: pkgJson.author,
    keywords: pkgJson.keywords,
    logo: 'https://raw.githubusercontent.com/mtxr/vscode-sqltools/master/static/icon.png'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `../static/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content/`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `sidebar`,
        path: `${__dirname}/src/content/sidebar.json`,
      },
    },
    'gatsby-plugin-catch-links',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: "GTM-WRGZZ65",
        includeInDevelopment: false,
      },
    },
  ],
}
