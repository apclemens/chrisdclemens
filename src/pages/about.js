import React from "react"
import { Link, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

import "./../styles/about.scss"

export default class AboutPage extends React.Component {
    render() {
        return (
                <StaticQuery
                query={graphql`
                    query {
                          allGoogleSheetAboutRow {
                                  nodes {
                                            text
                                        }
                                    }
  allFile(filter: {relativeDirectory: {eq: "about"}}) {
          edges {
                    node {
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
    <SEO title="About | Chris D Clemens" />
    
    <Img
        className="about-image"
        fluid={data.allFile.edges[1].node.childImageSharp.fluid}
    />
    {data.allGoogleSheetAboutRow.nodes[0].text}
    <Img
        className="about-image"
        fluid={data.allFile.edges[0].node.childImageSharp.fluid}
    />

  </Layout>

                   )}}
                />
               )
    }
}
