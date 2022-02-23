import React from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"
import { Typography, Card, CardContent, Grid } from "@material-ui/core"
import ContactCard from "../components/contactCard"
import { useStaticQuery, graphql } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import Obfuscate from "react-obfuscate"
import { PictureAsPdf } from "@material-ui/icons"

const Resources = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulSiteInfo {
        edges {
          node {
            resources {
              raw
            }
            allCurrentForms {
              title
              file {
                fileName
                url
              }
            }
          }
        }
      }
      # allContentfulContact {
      #   edges {
      #     node {
      #       name
      #       title
      #       phoneNumber
      #       email
      #       details {
      #         details
      #       }
      #     }
      #   }
      # }
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

        <Typography variant="h4"> All Current Forms </Typography>
        <ul>
          {data.allContentfulSiteInfo.edges[0].node.allCurrentForms.map(
            ({ file }) => (
              <li>
                <a href={file.url} target="_parent" rel="noreferrer">
                  <Typography>
                    <PictureAsPdf /> {file.fileName}
                  </Typography>
                </a>
              </li>
            )
          )}
        </ul>

        <Typography variant="h4"> Contact </Typography>

        <Typography>
          Cowichan Dressage Club - Email:
          <Obfuscate email="cowichacowichandressageclub@gmail.com" />
        </Typography>
        <p>
          For issues with this site, please contact{" "}
          <Obfuscate email="jen@jenniferchow.ca" />.
        </p>
        {/* <Typography variant="h4" style={{ marginTop: "2rem" }}>
          Cowichan Dressage Club Contacts
        </Typography>
        <Grid container spacing={2}>
          {data.allContentfulContact.edges.map(({ node }, index) => (
            <ContactCard contact={node} />
          ))}
        </Grid> */}
      </Main>
    </Layout>
  )
}

export default Resources
