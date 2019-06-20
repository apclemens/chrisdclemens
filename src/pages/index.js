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
        <header>
        <Link to="/">
        <h1 id="front-title">Chris Clemens</h1>
        </Link>
        </header>

        <div id="front-links">
        <FrontLink
            link="/about"
            text="About"
            image={data.allFile.edges.find(({node}) => node.relativePath === "front/about.jpeg")}
        />

        <FrontLink
            link="/commissioned"
            text="Commissioned Work"
            image={data.allFile.edges.find(({node}) => node.relativePath === "front/other.png")}
        />

        <FrontLink
            link="/comics"
            text="Comics"
            image={data.allFile.edges.find(({node}) => node.relativePath === "front/comics.png")}
        />

        <FrontLink
            link="/drawings"
            text="Drawings"
            image={data.allFile.edges.find(({node}) => node.relativePath === "front/drawings.jpg")}
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
