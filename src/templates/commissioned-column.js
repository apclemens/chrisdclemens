import React from "react"
import { Link } from "gatsby"
import Layout from "./../components/layout"
import Img from "gatsby-image"

import "./../styles/commissioned.scss"

export default class Commissioned extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
                <Layout>
                    <div className="commissioned">
                        <h2>
                            {this.props.pageContext.title}
                        </h2>
                        <p dangerouslySetInnerHTML={{__html: this.props.pageContext.text}} />
                        {
                            this.props.pageContext.fluid.map(
                                (f, index) =>
                                    <Img 
                                        fluid={f.node.childImageSharp.fluid}
                                    />
                            )
                        }
                    </div>
                </Layout>
               )
    }
}
