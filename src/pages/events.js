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
import List from "@material-ui/core/List"
import { DateList } from "../components/dateButtonList"

const Events = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulEvent {
        edges {
          node {
            eventName
            id
            slug
            locationName
            location {
              lat
              lon
            }
            summary {
              summary
            }
            image {
              gatsbyImageData
            }
            eventDates {
              id
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
              <Grid item md={node.image ? 8 : 12} sm={12} xs={12}>
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
                  <Grid item xs={12}>
                    <List>
                      <Grid container style={{ width: "100%" }}>
                        {node.eventDates.map((date, index) => (
                          <DateList
                            date={date}
                            indexId={index}
                            entryURL={`${node.slug}/entry`}
                            event={node}
                          />
                        ))}
                      </Grid>
                    </List>
                  </Grid>
                </CardContent>
              </Grid>
              {node.image ? (
                <Grid item md={4}>
                  <GatsbyImage
                    image={node.image.gatsbyImageData}
                    alt={node.image.description ? node.image.description : ""}
                  />
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
