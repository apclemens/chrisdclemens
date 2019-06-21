import React from "react"
import { Link, StaticQuery, navigate } from "gatsby"

import Layout from "./../../components/layout"
import Img from "gatsby-image"
import Helmet from 'react-helmet'

import "./../../styles/comic.scss"

export default class AboutPage extends React.Component {
    render() {
        return (
                <StaticQuery
                query={graphql`
                    query {
                          allGoogleSheetComicsRow {
                                  nodes {
                                      url
                                        }
                                    }
                    }
                    `}
                    render={data=>{
                        const numComics = data.allGoogleSheetComicsRow.nodes.length
                        const rand = data.allGoogleSheetComicsRow.nodes[Math.floor(Math.random()*numComics)]
                        navigate('/comics/'+rand.url)
                        return (
                                <Layout></Layout>

                   )}}
                />
               )
    }
}
