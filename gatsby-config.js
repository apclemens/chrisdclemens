module.exports = {
  siteMetadata: {
    title: `Chris D Clemens`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`, `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
          name: `content`,
          path: `${__dirname}/content`,
      },
    },
    `gatsby-plugin-sass`,
    {
        resolve: `gatsby-source-google-sheets`,
        options: {
            spreadsheetId: '1qoOFNmf7h_KrsEQ0NGJPufDstvLx8pFjFp_ifcqmocY',
            worksheetTitle: 'about',
            credentials: require('./google-credentials.json'),
        },
    },
    {
        resolve: `gatsby-source-google-sheets`,
        options: {
            spreadsheetId: '1qoOFNmf7h_KrsEQ0NGJPufDstvLx8pFjFp_ifcqmocY',
            worksheetTitle: 'original',
            credentials: require('./google-credentials.json'),
        },
    },
    {
        resolve: `gatsby-source-google-sheets`,
        options: {
            spreadsheetId: '1qoOFNmf7h_KrsEQ0NGJPufDstvLx8pFjFp_ifcqmocY',
            worksheetTitle: 'comics',
            credentials: require('./google-credentials.json'),
        },
    },
    {
        resolve: `gatsby-source-google-sheets`,
        options: {
            spreadsheetId: '1qoOFNmf7h_KrsEQ0NGJPufDstvLx8pFjFp_ifcqmocY',
            worksheetTitle: 'drawings',
            credentials: require('./google-credentials.json'),
        },
    },
    {
        resolve: `gatsby-source-google-sheets`,
        options: {
            spreadsheetId: '1qoOFNmf7h_KrsEQ0NGJPufDstvLx8pFjFp_ifcqmocY',
            worksheetTitle: 'commissioned',
            credentials: require('./google-credentials.json'),
        },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
//        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
