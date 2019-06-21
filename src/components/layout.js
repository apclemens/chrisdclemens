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
                Chris Clemens
            </Link>
        </header>

        <div className="content">
            <div className="layout-links">
                <Link to="/about">
                    <div>About</div>
                </Link>
                <Link to="/commissioned">
                    <div>Commissioned Work</div>
                </Link>
                <Link to="/comics">
                    <div>Comics</div>
                </Link>
                <Link to="/drawings">
                    <div>Drawings</div>
                </Link>
            </div>

            {children}
        </div>
    </>

                           )
                }}
                />
               )
