import React from "react"
import Main from "../components/MainContent"
import Layout from "../components/layout"
import Typography from "@material-ui/core/Typography"

import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"

import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import { DateList } from "../components/dateButtonList"
import EventAccordion from "../components/eventAccordion"

export const query = graphql`
  query eventQuery($id: String!) {
    contentfulEvent(id: { eq: $id }) {
      eventName
      eventDates {
        date
        subtitle
      }
      contacts {
        email
        name
        title
        phoneNumber
        details {
          details
        }
      }
      eventInformation {
        raw
      }
      rules {
        raw
      }
      registrationInfo {
        raw
      }
      locationName
      location {
        lat
        lon
      }
    }
  }
`

const Event = ({ data, pageContext }) => {
  const event = data.contentfulEvent
  return (
    <Layout>
      <Main>
        <Typography variant="h3" style={{ paddingTop: "1rem" }}>
          {pageContext.eventName}
        </Typography>
        <Grid container>
          <Grid item md={8}>
            <List>
              <Grid container>
                {event.eventDates.map((date, index) => (
                  <DateList
                    date={date}
                    index={index}
                    entryURL={`entry`}
                    event={event}
                  />
                ))}
              </Grid>
            </List>
          </Grid>
          <Grid item md={4}>
            {event.image ? (
              <GatsbyImage
                image={event.image.GatsbyImage}
                alt={event.image.GatsbyImage}
              />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <EventAccordion event={event} />
      </Main>
    </Layout>
  )
}

export default Event
