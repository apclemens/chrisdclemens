import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Img from "gatsby-image"

import "./../styles/front-image.scss"

const FrontLink = props => {
    return (
        <Link to={props.link} className={"front-image "+(props.className?props.className:'')}>
            <Img fluid={props.image} />
            <span className="title">{props.text}</span>
        </Link>
    )
}

export default FrontLink
