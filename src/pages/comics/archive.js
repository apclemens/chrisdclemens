import React from "react"
import { Link, StaticQuery } from "gatsby"

import Layout from "./../../components/layout"
import SEO from "./../../components/seo"
import Img from "gatsby-image"

import "./../../styles/comic.scss"

export default class AboutPage extends React.Component {
    render() {
        return (
                <StaticQuery
                query={graphql`
                    query {
                          allGoogleSheetComicsRow {
                                  nodes {
				      index
                                      title
                                      url
                                        }
                                    }
                    }
                    `}
                    render={data=>{
                        return (
  <Layout>
    <SEO title="Comics Archive | Chris D Clemens" />
    
    <div className="comics-archive">
    {
        data.allGoogleSheetComicsRow.nodes.sort((a,b)=>{return (false ? (a.title < b.title) : (a.index < b.index))}).map((node) =>
                <>
            <Link to={'/comics/' + node.url}>{node.title}</Link><br />
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
