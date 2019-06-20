/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import FrontLink from "./../components/front-link"

import "./../styles/layout.scss"

export default ({ children }) => (
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

    <>
        <header>
            <Link to="/">
                <h1>Chris Clemens</h1>
            </Link>
        </header>

        <div className="layout-links">
            <Link to="/about">About</Link>
            <Link to="/commissioned">Commissioned Work</Link>
            <Link to="/comics">Comics</Link>
            <Link to="/drawings">Drawings</Link>
        </div>

        <div className="content">
            {children}
        </div>
    </>

                           )
                }}
                />
               )
