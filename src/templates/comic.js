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
    <div class="comic-nav-group">
      <Link id="first" class="comic-nav" rel="first" to={props.pageContext.first}>|&lt; First</Link>
      <Link id="prev" class="comic-nav" rel="prev" to={props.pageContext.prev}>&lt; Prev</Link>
      <Link id="rand" class="comic-nav" rel="rand" to="/comics/random">Random</Link>
      <Link id="arch" class="comic-nav" rel="arch" to="/comics/archive">Archive</Link>
      <Link id="next" class="comic-nav" rel="next" to={props.pageContext.next}>Next &gt;</Link>
      <Link id="last" class="comic-nav" rel="last" to="/comics/">Last &gt;|</Link>
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
