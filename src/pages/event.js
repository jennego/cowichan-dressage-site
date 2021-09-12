import React from "react"
import Main from "../components/MainContent"
import Layout from "../components/layout"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import { ListItemIcon } from "@material-ui/core"
import Avatar from "@material-ui/core/Avatar"
import EventIcon from "@material-ui/icons/Event"
import Grid from "@material-ui/core/Grid"

import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { renderRichText } from "gatsby-source-contentful/rich-text"

import { graphql } from "gatsby"
import { StaticImage, GatsbyImage } from "gatsby-plugin-image"

import { format } from "date-fns"

export const query = graphql`
  {
    contentfulEvent {
      eventName
      eventDates {
        date
        subtitle
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

const Event = ({ data }) => {
  const event = data.contentfulEvent
  return (
    <Layout>
      <Main>
        <Typography variant="h3" style={{ paddingTop: "1rem" }}>
          {event.eventName}
        </Typography>
        <Grid container>
          <Grid item md={8}>
            <List>
              <Grid container>
                {event.eventDates.map(date => (
                  <Grid item>
                    <ListItem button>
                      <ListItemIcon>
                        <EventIcon fontSize="large" />
                      </ListItemIcon>
                      <ListItemText
                        primary={format(
                          new Date(date.date),
                          "EEEE, LLLL d, yyyy"
                        )}
                        secondary={date.subtitle}
                      />
                    </ListItem>
                  </Grid>
                ))}
              </Grid>
            </List>
          </Grid>
          <Grid item md={4}>
            <StaticImage src="https://images.unsplash.com/flagged/photo-1568382007362-5d0d0a26b422?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80" />
          </Grid>
        </Grid>
        <Accordion expanded>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h4" component="h2">
              Event Info
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{renderRichText(event.eventInformation)}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h4" component="h2">
              Rules
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{renderRichText(event.rules)}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography variant="h4" component="h2">
              Registration
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{renderRichText(event.registrationInfo)}</Typography>
            <Button variant="contained">Entry Form</Button>
          </AccordionDetails>
        </Accordion>
      </Main>
    </Layout>
  )
}

export default Event
