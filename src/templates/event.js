import React from "react"
import Main from "../components/MainContent"
import Layout from "../components/layout"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"

import { graphql, navigate } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import { DateList } from "../components/dateButtonList"
import EventAccordion from "../components/eventAccordion"
import LocationInfo from "../components/event-location"

// add eventdate results and ride times

export const query = graphql`
  query eventQuery($id: String!) {
    contentfulEvent(id: { eq: $id }) {
      eventName
      image {
        gatsbyImageData
        title
      }
      sessions {
        testFields
        cost
        description {
          description
        }
      }
      membershipRequired
      adultWaivers {
        title
        file {
          url
        }
      }
      juniorWaivers {
        title
        file {
          url
        }
      }
      # resources {
      #   file {
      #     url
      #     fileName
      #     contentType
      #   }
      # }
      eventDates {
        date
        subtitle
        isFull
        # rideTimes {
        #   file {
        #     url
        #   }
        # }
        # results {
        #   file {
        #     url
        #   }
        # }
      }
      # contacts {
      #   email
      #   name
      #   title
      #   phoneNumber
      #   details {
      #     details
      #   }
      # }
      eventInformation {
        raw
      }
      rules {
        raw
      }
      registrationInfo {
        raw
      }

      testInfo {
        raw
      }
      cancellationPolicy {
        raw
      }

      confirmationMessage {
        raw
      }

      locationName
      location {
        lat
        lon
      }
    }
    allContentfulSiteInfo {
      edges {
        node {
          squareSurcharge
        }
      }
    }
  }
`

const Event = ({ data, pageContext, location }) => {
  const event = data.contentfulEvent
  const squareSurcharge =
    data.allContentfulSiteInfo.edges[0].node.squareSurcharge
  return (
    <Layout>
      <Main>
        <Typography variant="h3" style={{ paddingTop: "1rem" }}>
          {pageContext.eventName}
        </Typography>
        <LocationInfo
          locationName={event.locationName}
          lat={event.location.lat}
          lon={event.location.lon}
        />
        <Grid container spacing={1} style={{ marginBottom: "1rem" }}>
          <Grid item lg={event.image ? 8 : 12}>
            <List>
              <Grid container>
                {event.eventDates.map((date, index) => (
                  <DateList
                    key={index}
                    date={date}
                    indexId={index}
                    entryURL={`?date=${encodeURIComponent(date.date)}&id=reg`}
                    event={event}
                    isFull={date.isFull}
                    withImage={Boolean(event.image)}
                  />
                ))}
              </Grid>
            </List>
          </Grid>
          {event.image ? (
            <Grid item lg={4}>
              <GatsbyImage
                image={event.image.gatsbyImageData}
                alt={event.image.title}
                objectFit="contain"
                style={{ maxHeight: "400px" }}
              />
            </Grid>
          ) : (
            ""
          )}
        </Grid>

        <EventAccordion
          event={event}
          data={data}
          location={location}
          square={squareSurcharge}
        />
      </Main>
    </Layout>
  )
}

export default Event
