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
                        }
                    }
                    allFile(filter: {relativeDirectory: {eq: "original"}}) {
                        edges {
                            node {
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

    <div className="comics-archive">
    {
        data.allGoogleSheetOriginalRow.nodes.map((node) =>
                <>
            <a href={node.link} target="_blank">{node.title}</a><br />
            </>
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
