import React from "react"
import { Link } from "gatsby"
import Layout from "./../components/layout"
import Img from "gatsby-image"

import "./../styles/commissioned.scss"

export default class Commissioned extends React.Component {
    constructor(props) {
        super(props)
        this.keyEvent = this.keyEvent.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)
        this.state = {
            page: 0
        }
    }
    prevPage() {
        if (this.state.page !== 0) {
            this.setState({page: this.state.page - 1})
        }
    }
    nextPage() {
        if (this.state.page !== this.props.pageContext.fluid.length-1) {
            this.setState({page: this.state.page + 1})
        }
    }
    keyEvent(event) {
        switch(event.keyCode) {
            case 39: // right arrow
                this.nextPage()
                break;
            case 37: // left arrow
                this.prevPage()
                break;
        }
    }
    componentDidMount() {
        document.addEventListener('keydown', this.keyEvent, false)
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyEvent, false)
    }
    render() {
        return (
                <Layout>
                    <div className="commissioned">
                        <h2>
                            {this.props.pageContext.title}
                        </h2>
                        <p>
                            {this.props.pageContext.text}
                        </p>
                        {
                            this.props.pageContext.fluid.map(
                                (f, index) =>
                                    <Img 
                                        className={index===this.state.page ? '' : 'hide'}
                                        fluid={f.node.childImageSharp.fluid}
                                    />
                            )
                        }

                        {this.props.pageContext.fluid.length > 1 &&
                            <>
                        <div className="center" align="center">
                            <button onClick={this.prevPage}>❮ Prev</button>
                            <button onClick={this.nextPage}>Next ❯</button>
                        </div>

                        <div className="center" align="center">
                        {
                            this.props.pageContext.fluid.map(
                                (f, index) =>
                                    <button
                                        className={index===this.state.page ? 'active' : ''}
                                        onClick={()=>this.setState({page: index})}
                                    >
                                        {index+1}
                                    </button>
                            )
                        }
                        </div>
                            </>
                        }
                    </div>
                </Layout>
               )
    }
}
