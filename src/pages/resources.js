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
      allContentfulContact {
        edges {
          node {
            name
            title
            phoneNumber
            email
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
        <Typography variant="h4" style={{ marginTop: "2rem" }}>
          Cowichan Dressage Club Contacts
        </Typography>
        <Grid container spacing={2}>
          {data.allContentfulContact.edges.map(({ node }, index) => (
            <ContactCard contact={node} />
          ))}
        </Grid>
      </Main>
    </Layout>
  )
}

export default Resources
