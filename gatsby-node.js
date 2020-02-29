/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
}

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    return graphql(`
        {
  allGoogleSheetComicsRow {
    edges {
      node {
        title
        singlepanel
        filename
        url
      }
    }
  }
  allGoogleSheetCommissionedRow {
      edges {
          node {
              title
              url
              files
              text
              layout
	      captions
          }
      }
  }
  allGoogleSheetOriginalRow {
      edges {
          node {
              title
	      image
	      link
          }
      }
  }
  allGoogleSheetDrawingsRow {
      edges {
          node {
              title
              filename
          }
      }
  }
  allFile(filter: {relativeDirectory: {eq: "images"}}) {
      edges {
          node {
              relativePath
              childImageSharp {
                  fluid {
                      originalName
                      aspectRatio
                      base64
                      sizes
                      src
                      srcSet
                  }
              }
          }
      }
  }
        }
    `).then(result => {
        const numComics = result.data.allGoogleSheetComicsRow.edges.length
        const firstNode = result.data.allGoogleSheetComicsRow.edges[0].node
        const latestComic = result.data.allGoogleSheetComicsRow.edges[numComics-1].node
        let prevComic = ''
        let nextComic = ''
        // create drawings page
        createPage({
            path: '/drawings',
            component: path.resolve(`./src/templates/drawings.js`),
            context: {
                fluids: result.data.allGoogleSheetDrawingsRow.edges.map(
                    rowNode =>
                        result.data.allFile.edges.find((fileNode) =>
                            fileNode.node.relativePath === "images/" + rowNode.node.filename
                        ).node.childImageSharp
                )
            }
        })
        // create individual commissioned pages
        result.data.allGoogleSheetCommissionedRow.edges.forEach(({node}, index) => {
            createPage({
                path: '/commissioned/' + node.url,
                component: path.resolve(`./src/templates/commissioned-${node.layout}.js`),
                context: {
                    title: node.title,
                    files: node.files,
                    text: node.text,
                    captions: node.captions,
                    fluid:
                        node.files.split(',').map(
                            fileName => 
                                result.data.allFile.edges.find(
                                    fileNode => fileNode.node.relativePath === "images/" + fileName
                                )
                        )
                }
            })
        })
	// create individual original article pages
	result.data.allGoogleSheetOriginalRow.edges.forEach(({ node }, index) => {
	})
        // create invididual comics pages
        result.data.allGoogleSheetComicsRow.edges.forEach(({ node }, index) => {
            prevComic = 
                index === 0 ? node.url : 
                result.data.allGoogleSheetComicsRow.edges[index-1].node.url
            nextComic = 
                index === numComics-1 ? '' : 
                result.data.allGoogleSheetComicsRow.edges[index+1].node.url
            createPage({
                path: '/comics/' + node.url,
                component: path.resolve(`./src/templates/comic.js`),
                context: {
                    first: '/comics/' + firstNode.url,
                    prev: '/comics/' + prevComic,
                    next: '/comics/' + nextComic,
                    title: node.title,
                    singlepanel: node.singlepanel,
                    filename: node.filename,
                    url: node.url,
                    fluid:
                        node.filename.split(',').map(
                            fileName => 
                                result.data.allFile.edges.find(
                                    fileNode => fileNode.node.relativePath === "images/" + fileName
                                )
                        )
                }
            })
        })
        // create /comics page
        createPage({
            path: '/comics',
            component: path.resolve(`./src/templates/comic.js`),
            context: {
                first: '/comics/' + firstNode.url,
                prev: '/comics/' + prevComic,
                next: '/comics/',
                title: latestComic.title,
                singlepanel: latestComic.singlepanel,
                filename: latestComic.filename,
                url: latestComic.url,
                fluid:
                    latestComic.filename.split(',').map(
                        fileName => 
                            result.data.allFile.edges.find(
                                fileNode => fileNode.node.relativePath === "images/" + fileName
                            )
                    )
            }
        })
    })
}
