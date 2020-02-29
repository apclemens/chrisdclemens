import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

import FrontLink from "../components/front-link"
import SEO from "../components/seo"
import Img from "gatsby-image"
import BodyClassName from "react-body-classname"

import "./../styles/global.scss"
import "./../styles/front.scss"

export default class IndexPage extends React.Component {
    render() {
        return (
                <StaticQuery
                query={graphql`
                    query {
                        allFile(filter: {relativeDirectory: {eq: "front"}}) {
                            edges {
                                node {
                                    relativePath
                                    childImageSharp {
                                        fluid(maxHeight: 300, maxWidth: 300) {
                                            ...GatsbyImageSharpFluid
                                        }
                                    }
                                }
                            }
                        }
                    }
                `}
                render={data => {

                    return (

        <BodyClassName className="front">
        <>
    <SEO title="Chris D Clemens" />
        <header>
        <Link id="front-title" to="/">
        Chris Clemens
        </Link>
        </header>

        <div id="front-links">
		<FrontLink
		    link="/commissioned"
		    text="Commissioned Work"
		    image={data.allFile.edges.find(({node}) => node.relativePath === "front/other.png").node.childImageSharp.fluid}
		/>

		<FrontLink
		    link="/original"
		    text="Original Articles"
		    image={data.allFile.edges.find(({node}) => node.relativePath === "front/original.png").node.childImageSharp.fluid}
		/>

		<FrontLink
		    link="/comics"
		    text="Comics"
		    image={data.allFile.edges.find(({node}) => node.relativePath === "front/comics.png").node.childImageSharp.fluid}
		/>

		<FrontLink
		    link="/drawings"
		    text="Drawings"
		    image={data.allFile.edges.find(({node}) => node.relativePath === "front/drawings.jpg").node.childImageSharp.fluid}
		/>

		<FrontLink
		    className="about"
		    link="/about"
		    text="About"
		/>
        </div>

        </>
        </BodyClassName>

                           )
                }}
                />
               )
    }
}
