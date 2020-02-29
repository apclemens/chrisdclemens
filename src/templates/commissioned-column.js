import React from "react"
import { Link } from "gatsby"
import Layout from "./../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

import "./../styles/commissioned.scss"

export default class Commissioned extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
                <Layout>
    <SEO title={this.props.pageContext.title + " | Commissioned Work | Chris D Clemens"} />
                    <div className="commissioned">
                        <h2>
                            {this.props.pageContext.title}
                        </h2>
                        <p dangerouslySetInnerHTML={{__html: this.props.pageContext.text}} />
                        {
                            this.props.pageContext.fluid.map(
                                (f, index) =>
				    <>
				    {this.props.pageContext.captions && <h3 style={{textAlign: 'center', marginTop: 30}}>{this.props.pageContext.captions.split(';')[index]}</h3>}
                                    <Img 
                                        fluid={f.node.childImageSharp.fluid}
                                    />
				    </>
                            )
                        }
			
                    </div>
                </Layout>
               )
    }
}
