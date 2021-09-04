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

const Event = () => {
  return (
    <Layout>
      <Main>
        <Typography variant="h2"> Show and Tell </Typography>

        <List>
          <Grid container>
            <Grid item>
              <ListItem button>
                <ListItemIcon>
                  <EventIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText
                  primary="September 26, 2021"
                  secondary="closing date or other important info about date"
                />
              </ListItem>
            </Grid>
            <Grid item>
              <ListItem button>
                <ListItemIcon>
                  <EventIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText
                  primary="October 26, 2021"
                  secondary="closing date or other important info about date"
                />
              </ListItem>
            </Grid>
            <Grid item>
              <ListItem button alignItems="flex-start">
                <ListItemIcon>
                  <EventIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText
                  primary="November 26, 2021"
                  secondary="closing date or other important info about date"
                />
              </ListItem>
            </Grid>
            <Grid item>
              <ListItem button>
                <ListItemIcon>
                  <EventIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText
                  primary="More dates!"
                  secondary="closing date or other important info about date"
                />
              </ListItem>
            </Grid>
          </Grid>
        </List>

        <div className="event-details-text">
          <Typography variant="body1">
            Event details <br />
            The CDC’s “show-and-tell” days are designed to help riders practice
            their tests in a simulated show environment with one-on-one feedback
            from the judge. Participants will ride their selected test which
            will be judged/scored as it would be in a competition. Then the
            judge will go through the test with the rider and suggest
            improvements can be made to improve their score. Participants will
            then ride their selected test again and try to improve their marks.
            Each of these sessions will run for a half hour. Participants can
            sign up for a maximum of 2 sessions (riding 2 different tests) but
            spaces will be prioritized for those riding their first session.
          </Typography>
        </div>

        <Button variant="contained" color="primary">
          {" "}
          Entry Form{" "}
        </Button>
      </Main>
    </Layout>
  )
}

export default Event
