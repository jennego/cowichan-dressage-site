// const SegfaultHandler = require('segfault-handler');
// SegfaultHandler.registerHandler('crash.log');

const adapter = require("gatsby-adapter-netlify").default

module.exports = {
  adapter: adapter({
    excludeDatastoreFromEngineFunction: false,
    imageCDN: false,
  }),
}

require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Cowichan Dressage Club`,
    description: `The Cowichan Dressage Club is a nonprofit society dedicated to facilitating dressage-specific educational and developmental opportunities in the Cowichan Valley, BC, Canada. Our offerings include informational sessions, clinics, test days, & schooling competitions.`,
    siteUrl: "http://www.cowichandressage.ca",
    author: "Cowichan Dressage Club",
  },
  plugins: [
    "gatsby-plugin-robots-txt",
    `gatsby-plugin-react-helmet-canonical-urls`,
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        output: "/sitemap",
        excludes: ["/form-success"],
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage(
            filter: {
              path: { regex: "/^(?!/404/|/404.html|/dev-404-page/)/" }
            }
          ) {
            nodes {
              path
            }
          }
        }
        `,
        resolvePages: ({ allSitePage: { nodes: allPages } }) => {
          return allPages.map(page => {
            return { ...page }
          })
        },
        serialize: ({ path }) => {
          return {
            url: path,
            changefreq: "weekly",
            priority: 0.7,
          }
        },
      },
    },
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
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
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,

    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GATSBY_CONTENTFUL_DELIVERY,
      },
    },
  ],
}
