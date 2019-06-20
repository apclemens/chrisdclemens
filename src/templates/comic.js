import React from "react"
import { Link } from "gatsby"
import Layout from "./../components/layout"
import Img from "gatsby-image"

import "./../styles/comic.scss"

export default (props) => {
    return (
            <Layout>
            <div className="comic-wrapper">
                <h2>{props.pageContext.title}</h2>
    <div className="comic-nav-group">
      <Link id="first" className="comic-nav" rel="first" to={props.pageContext.first}>|&lt; First</Link>
      <Link id="prev" className="comic-nav" rel="prev" to={props.pageContext.prev}>&lt; Prev</Link>
      <Link id="rand" className="comic-nav" rel="rand" to="/comics/random">Random</Link>
      <Link id="arch" className="comic-nav" rel="arch" to="/comics/archive">Archive</Link>
      <Link id="next" className="comic-nav" rel="next" to={props.pageContext.next}>Next &gt;</Link>
      <Link id="last" className="comic-nav" rel="last" to="/comics/">Last &gt;|</Link>
    </div>
            {
                props.pageContext.fluid.map(({node}) => 
                    <Img 
                        fluid={node.childImageSharp.fluid}
                        className={props.pageContext.singlepanel ? 'single' : ''}
                    />
                )
            }
            </div>
            </Layout>
           )
}
