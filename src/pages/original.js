import React from "react"
import { Link, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

import "./../styles/original.scss"

export default class OriginalPage extends React.Component {
    render() {
        return (
            <StaticQuery
                query={graphql`
                query {
                    allGoogleSheetOriginalRow {
                        nodes {
				title
				link
				image
                        }
                    }
                    allFile(filter: {relativeDirectory: {eq: "original"}}) {
                        edges {
                            node {
				relativePath
                                childImageSharp {
                                    fluid(maxWidth: 800) {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                        }
                    }
                }
                `}
                render={data=>{
                    return (
                        <Layout>
                            <SEO title="Original Articles | Chris D Clemens" />

    <div className="original-list">
    {
        data.allGoogleSheetOriginalRow.nodes.map((node) => 
            <a href={node.link} target="_blank">
                <Img
                    fluid={data.allFile.edges.find((fileNode) =>
                        fileNode.node.relativePath === "original/" + node.image
                        ).node.childImageSharp.fluid
                    }
                />
                <span>
                    {node.title}
                </span>
            </a>
        )
    }
    </div>
                        </Layout>
                    )
                }}
            />
        )
    }
}
