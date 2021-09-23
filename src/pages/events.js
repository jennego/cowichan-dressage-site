import React from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"
import { useStaticQuery, graphql, Link } from "gatsby"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { GatsbyImage } from "gatsby-plugin-image"
import Grid from "@material-ui/core/Grid"
import { DateList } from "../components/dateButtonList"

const Events = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulEvent {
        edges {
          node {
            eventName
            slug
            summary {
              summary
            }
            image {
              gatsbyImageData
            }
            eventDates {
              date
            }
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <Main>
        <Typography gutterBottom variant="h2">
          Events
        </Typography>
        {data.allContentfulEvent.edges.map(({ node }) => (
          <Card elevation="3" style={{ marginBottom: "2rem" }}>
            <Grid container>
              <Grid item md={8}>
                <CardContent>
                  <Typography gutterBottom variant="h4">
                    {node.eventName}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    {node.summary ? node.summary.summary : ""}
                  </Typography>
                  <hr />
                  <Link to={`${node.slug}`} style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ margin: "0.5rem 0" }}
                    >
                      More Info
                    </Button>
                  </Link>
                  <Link
                    to={`${node.slug}/entry`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ margin: "0.5rem 0.2rem" }}
                    >
                      Entry Form
                    </Button>
                  </Link>
                  <DateList
                    eventDates={node.eventDates}
                    entryURL={`${node.slug}/entry`}
                  />
                </CardContent>
              </Grid>
              {node.image ? (
                <Grid item md={4}>
                  <GatsbyImage image={node.image.gatsbyImageData} />
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </Card>
        ))}
      </Main>
    </Layout>
  )
}

export default Events
