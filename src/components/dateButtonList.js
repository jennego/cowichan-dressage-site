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

export const DateList = ({
  eventPage,
  event,
  date,
  indexId,
  isFull,
  withImage,
}) => {
  const [selectedIndex, setSelectedIndex] = useState("")
  const [counter, setCounter] = useState(0)

  const handleClick = indexId => {
    if (selectedIndex === indexId) {
      setSelectedIndex("")
    } else {
      setSelectedIndex(indexId)
    }
  }

  const handleDateEntry = eventPage => {
    setCounter(counter + 1)
    navigate(
      `${eventPage}?date=${encodeURIComponent(
        date.date
      )}&id=reg&refresh=${counter}`,
      {
        state: { date: date.date },
      }
    )
  }

  return (
    <Grid item xs={12} md={6} lg={withImage ? 6 : 4}>
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

          {date.rideTimes && (
            <ListItem
              button
              onClick={() => navigate(`/${date.date}/ride-times`)}
            >
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
            <ListItem button onClick={() => handleDateEntry(eventPage)}>
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

// DateList.defaultProps = {
//   withImg: false,
// }
