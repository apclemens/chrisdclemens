import React from "react"
import Img from "gatsby-image"

import "./../styles/gallery.scss"

export default class Gallery extends React.Component {
    constructor(props) {
        super(props)
        this.keyEvent = this.keyEvent.bind(this)
        let widths = []
        let row = []
        for (let i=0; i<props.images.length; i++) {
            let image = props.images[i]
            row.push(image.fluid.aspectRatio)
            let height = 1 / (row.reduce(function(a,b){return a+b}, 0))
            if (height > props.maxHeight) {
//            } else if (height < props.minHeight) {
            } else {
                row.forEach(aspect => {
                    widths.push(aspect * height)
                })
                row = []
            }
        }
        if (row) {
            row.forEach(aspect => {
                widths.push(aspect * props.maxHeight)
            })
        }
        this.state = {
            imageIndex: -1,
            widths: widths,
        }
    }
    keyEvent(event) {
        switch(event.keyCode) {
            case 27: // escape
                this.setState({imageIndex: -1})
                break;
            case 39: // right arrow
                if (this.state.imageIndex !== -1 && this.state.imageIndex !== this.props.images.length - 1) {
                    this.setState({imageIndex: this.state.imageIndex + 1})
                }
                break;
            case 37: // left arrow
                if (this.state.imageIndex !== -1 && this.state.imageIndex !== 0) {
                    this.setState({imageIndex: this.state.imageIndex - 1})
                }
                break;
            default:
                break;
        }
    }
    componentDidMount() {
        document.addEventListener('keydown', this.keyEvent, false)
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyEvent, false)
    }
    handleClick(event, index) {
        //const box = event.target.getBoundingClientRect()
        // give overlay dimensions of box
        // give overlay animated class
        // give overlay 0,0,0,0 dimensions
        this.setState({imageIndex: index})
    }
    render() {
            return (
<div className={this.props.className + " gallery " + (this.state.imageIndex === -1 ? "" : "overlaid")}>
    <div className={this.state.imageIndex === -1 ? "invisible" : ''} id="overlay">
        {this.state.imageIndex !== -1 &&
        <>
        <div id="image">
            {this.props.images.map((image, index) => 
                    <>
                {this.state.imageIndex === index &&
                    <Img fluid={image.fluid} />
                }
                </>
            )}
        </div>
        {this.state.imageIndex !== 0 &&
        <div id="prev"
            onClick={() => {this.setState({imageIndex: this.state.imageIndex - 1})}}
        >&lt;</div>
        }
        {this.state.imageIndex !== this.props.images.length - 1 &&
        <div id="next"
            onClick={() => {this.setState({imageIndex: this.state.imageIndex + 1})}}
        >&gt;</div>
        }
        <div
            className="close"
            onClick={() => {this.setState({imageIndex: -1})}}
        >
            &times;
        </div>
        </>
        }
    </div>
{
    this.props.images.map((image, index) =>
        <div
            className="gallery-image"
            key={index}
            style={{
                width: '' + this.state.widths[index]*100 + '%',
            }}
            onClick={(event) => {
                this.handleClick(event, index)
            }}
        >
            <Img
                fluid={image.fluid}
            />
        </div>
    )
}
</div>
       )
    }
}

