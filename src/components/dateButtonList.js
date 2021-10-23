import React from "react"
import { navigate } from "gatsby"
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
import { format, parse, parseISO, isBefore, isAfter } from "date-fns"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import Paper from "@material-ui/core/Paper"

import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import Collapse from "@material-ui/core/Collapse"
import AddToCalendar from "./addToCalendar"

export const DateList = ({ entryURL, event, date, indexId }) => {
  const [selectedIndex, setSelectedIndex] = React.useState("")

  const handleClick = indexId => {
    console.log(indexId)
    if (selectedIndex === indexId) {
      setSelectedIndex("")
    } else {
      setSelectedIndex(indexId)
    }
  }

  return (
    <Grid item xs={12} md={6} lg={6}>
      <Paper
        variant="outlined"
        style={
          selectedIndex !== indexId
            ? { height: "100%" }
            : { height: "fit-content" }
        }
      >
        <ListItem
          button
          key={indexId}
          onClick={() => {
            handleClick(indexId)
          }}
        >
          <ListItemIcon>
            <EventIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText
            primary={format(new Date(parseISO(date.date)), "EEE, LLLL d, yyyy")}
            // secondary={date.subtitle}
            style={{ paddingRight: "0.5rem" }}
          />
          {indexId === selectedIndex ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Paper>
      <Collapse in={indexId === selectedIndex} timeout="auto" unmountOnExit>
        <List component="div" disablePadding style={{ background: "#e3e3e3" }}>
          <ListItem style={{ display: "flex", justifyContent: "flex-end" }}>
            <AddToCalendar date={date.date} event={event} />
          </ListItem>
          {isAfter(parseISO(date.date), new Date()) ? (
            <ListItem
              button
              onClick={() =>
                navigate(entryURL, {
                  state: { date: date.date },
                })
              }
            >
              <ListItemText
                disableTypography
                primary="Entry Form"
                className="date-menu"
              />
            </ListItem>
          ) : (
            <ListItem button onClick={() => navigate(`/${date.date}/results`)}>
              <ListItemText
                disableTypography
                primary="Results"
                className="date-menu"
              />
            </ListItem>
          )}
        </List>
      </Collapse>
    </Grid>
  )
}
