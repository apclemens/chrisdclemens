import React from "react"
import { Link, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

import "./../styles/videos.scss"

export default class VideoPage extends React.Component {
    render() {
        return (
                <StaticQuery
                query={graphql`
                    query {
                          allGoogleSheetVideosRow {
                                  nodes {
                                      title
                                      link
                                        }
                                    }
                    }
                    `}
                    render={data=>{
                        return (
  <Layout>
    <SEO title="Videos | Chris D Clemens" />
    
    <div className="video-list">
    {
        data.allGoogleSheetVideosRow.nodes.map((node) => 
		<>
			<h3>{node.title}</h3>
			<div className="vid-container">
				<iframe src={"https://www.youtube.com/embed/" + node.link} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			</div>
		</>
        )
    }
    </div>

  </Layout>

                   )}}
                />
               )
    }
}
