import React from "react"
import { Link } from "gatsby"
import Layout from "./../components/layout"
import Img from "gatsby-image"
import Gallery from "./../components/gallery"

import "./../styles/drawings.scss"

export default (props) => {
    return (
            <Layout>
                <Gallery
                    className=""
                    images={props.pageContext.fluids}
                    maxHeight = {.5}
                    minHeight = {.3}
                />
            </Layout>
           )
}
