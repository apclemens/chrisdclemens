import React from "react"
import { Link } from "gatsby"
import Layout from "./../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Gallery from "./../components/gallery"

import "./../styles/drawings.scss"

export default (props) => {
    return (
            <Layout>
    <SEO title="Drawings | Chris D Clemens" />
                <Gallery
                    className=""
                    images={props.pageContext.fluids}
                    maxHeight = {.5}
                    minHeight = {.3}
                />
            </Layout>
           )
}
