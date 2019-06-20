import React from "react"
import { Link, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

import "./../styles/commissioned-list.scss"

export default class AboutPage extends React.Component {
    render() {
        return (
                <StaticQuery
                query={graphql`
                    query {
                          allGoogleSheetCommissionedRow {
                                  nodes {
                                      title
                                      thumbnail
                                      url
                                        }
                                    }
  allFile(filter: {relativeDirectory: {eq: "commissioned"}}) {
          edges {
                    node {
                        relativePath
                                childImageSharp {
                                        fluid(maxWidth: 400) {
                                            ...GatsbyImageSharpFluid
                                        }
                                                          }
                                      }
                        }
            }
                    }
                    `}
                    render={data=>{
                        console.log(data)
                        return (
  <Layout>
    <SEO title="Commissioned Work | Chris D Clemens" />
    
    <div className="commissioned-list">
    {
        data.allGoogleSheetCommissionedRow.nodes.map((node) => 
            <Link to={"/commissioned/"+node.url} className="commissioned-link">
                <span>
                    {node.title}
                </span>
                <Img
                    fluid={data.allFile.edges.find((fileNode) =>
                        fileNode.node.relativePath === "commissioned/" + node.thumbnail
                        ).node.childImageSharp.fluid
                    }
                />
            </Link>
        )
    }
    </div>

  </Layout>

                   )}}
                />
               )
    }
}
