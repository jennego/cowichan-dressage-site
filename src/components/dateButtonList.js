import React, { useState } from "react"
import { navigate } from "gatsby"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { ListItemIcon } from "@material-ui/core"
import EventIcon from "@material-ui/icons/Event"
import Grid from "@material-ui/core/Grid"
import { format, parseISO, isAfter } from "date-fns"
import Paper from "@material-ui/core/Paper"

import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import Collapse from "@material-ui/core/Collapse"
import AddToCalendar from "./addToCalendar"
import IsFullBadge from "./isFullBadge"

export const DateList = ({ entryURL, event, date, indexId, isFull }) => {
  const [selectedIndex, setSelectedIndex] = useState("")
  const [isOpen, setOpen] = useState(false)

  const handleClick = indexId => {
    if (selectedIndex === indexId) {
      setSelectedIndex("")

      setOpen(false)
    } else {
      setSelectedIndex(indexId)

      setOpen(true)
    }
  }

  console.log(indexId)

  return (
    <Grid item xs={12} md={5} lg={4}>
      <Paper
        variant="outlined"
        // style={
        //   selectedIndex !== indexId
        //     ? { height: "100%" }
        //     : { height: "fit-content" }
        // }
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
          <IsFullBadge isFull={isFull}>
            <ListItemText
              primary={format(
                new Date(parseISO(date.date)),
                "EEE, LLLL d, yyyy"
              )}
              // secondary={date.subtitle}
              style={{ paddingRight: "0.5rem" }}
            />
          </IsFullBadge>
          {selectedIndex === indexId ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Paper>
      <Collapse in={indexId === selectedIndex} timeout="auto" unmountOnExit>
        <List component="div" disablePadding style={{ background: "#e3e3e3" }}>
          <ListItem style={{ display: "flex", justifyContent: "flex-end" }}>
            <AddToCalendar date={date.date} event={event} />
          </ListItem>

          {date.times && (
            <ListItem button onClick={() => navigate(`/${date.date}/results`)}>
              <ListItemText
                disableTypography
                primary="Ride Times"
                className="date-menu"
              />
            </ListItem>
          )}

          {date.results && (
            <ListItem button onClick={() => navigate(`/${date.date}/results`)}>
              <ListItemText
                disableTypography
                primary="Results"
                className="date-menu"
              />
            </ListItem>
          )}
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
            " "
          )}
        </List>
      </Collapse>
    </Grid>
  )
}
