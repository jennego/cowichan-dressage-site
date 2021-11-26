import React from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"
import { Typography, Card, CardContent, Grid } from "@material-ui/core"
import ContactCard from "../components/contactCard"
import { useStaticQuery, graphql } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"

const Resources = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulSiteInfo {
        edges {
          node {
            resources {
              raw
            }
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <Main>
        <Typography variant="h2"> Links and Resources </Typography>
        {data.allContentfulSiteInfo.edges[0].node.resources && (
          <Typography>
            {renderRichText(data.allContentfulSiteInfo.edges[0].node.resources)}
          </Typography>
        )}
      </Main>
    </Layout>
  )
}

export default Resources
