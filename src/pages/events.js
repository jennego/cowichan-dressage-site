import React from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"
import { useStaticQuery, graphql, Link } from "gatsby"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { Alert } from "@material-ui/lab"
import { GatsbyImage } from "gatsby-plugin-image"
import Grid from "@material-ui/core/Grid"
import { DateList } from "../components/dateButtonList"
import LocationInfo from "../components/event-location"

const Events = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulEvent(sort: { eventDates: { date: DESC } }) {
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
              results {
                file {
                  url
                }
              }
              rideTimes {
                file {
                  url
                }
              }
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
        <Alert
          severity="info"
          style={{ fontSize: "1em", marginBottom: "1rem" }}
        >
          Please note that the Cowichan Dressage Club disbanded on November 30,
          2023. This site is provided for portfolio purposes only.
        </Alert>
        {data.allContentfulEvent.edges.map(({ node }) => (
          <Card elevation={3} style={{ marginBottom: "2rem" }} key={node.id}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={node.image ? 8 : 12}>
                  <Link to={node.slug} className="event-link">
                    <Typography variant="h4">{node.eventName}</Typography>
                  </Link>
                  <LocationInfo
                    locationName={node.locationName}
                    lat={node.location.lat}
                    lon={node.location.lon}
                  />
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
                    to={`${node.slug}?id=reg`}
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
                <Grid container>
                  {node.eventDates.map((date, index) => (
                    <DateList
                      key={index}
                      date={date}
                      indexId={index}
                      eventPage={node.slug}
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
