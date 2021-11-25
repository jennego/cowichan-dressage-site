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
              isFull
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
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={node.image ? 8 : 12}>
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
                </Grid>

                {node.image ? (
                  <Grid item xs={12} md={4} style={{ marginBottom: "1rem" }}>
                    <GatsbyImage
                      image={node.image.gatsbyImageData}
                      alt={node.image.description ? node.image.description : ""}
                    />
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>

              <Grid item xs={12}>
                <Grid container style={{ width: "100%" }}>
                  {node.eventDates.map((date, index) => (
                    <DateList
                      date={date}
                      indexId={index}
                      entryURL={`${node.slug}/entry`}
                      event={node}
                      isFull={date.isFull}
                    />
                  ))}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Main>
    </Layout>
  )
}

export default Events
