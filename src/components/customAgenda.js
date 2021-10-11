import React from "react"
import * as dates from "date-arithmetic"
import PropTypes from "prop-types"
import cn from "classnames"
import dayjs from "dayjs"
import styles from "../components/layout.css"
import Grid from "@material-ui/core/Grid"
import { Link } from "gatsby"
import { DateList } from "./dateButtonList"
import { format, parseISO } from "date-fns"
import { navigate } from "gatsby"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { ListItemIcon } from "@material-ui/core"
import EventIcon from "@material-ui/icons/Event"
import { parse, isBefore, isAfter } from "date-fns"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"

import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import Collapse from "@material-ui/core/Collapse"
import AddToCalendarHOC from "react-add-to-calendar-hoc"
import AddToCalendar from "./addToCalendar"

function rangeFunc(start, end, unit = "day") {
  let current = start
  const days = []
  while (dates.lte(current, end, unit)) {
    days.push(current)
    current = dates.add(current, 1, unit)
  }
  return days
}

function inRange(e, start, end, accessors) {
  const eStart = dates.startOf(accessors.start(e), "day")
  const eEnd = accessors.end(e)
  const startsBeforeEnd = dates.lte(eStart, end, "day")
  const endsAfterStart = !dates.eq(eStart, eEnd, "minutes")
    ? dates.gt(eEnd, start, "minutes")
    : dates.gte(eEnd, start, "minutes")
  return startsBeforeEnd && endsAfterStart
}

export const AgendaView = ({ accessors, localizer, length, date, events }) => {
  const [selectedIndex, setSelectedIndex] = React.useState("")

  const handleClick = index => {
    if (selectedIndex === index) {
      setSelectedIndex("")
    } else {
      setSelectedIndex(index)
    }
  }

  console.log(selectedIndex)

  const renderDay = (day, events) => {
    events = events.filter(e =>
      inRange(e, dates.startOf(day, "day"), dates.endOf(day, "day"), accessors)
    )

    return events.map((event, idx) => {
      return (
        <Grid container>
          {console.log(event)}
          <div
            key={idx}
            style={{
              display: "flex",
              width: "100%",
              margin: 0,
              padding: 0,
            }}
          >
            {idx === 0 && (
              <div
                style={{
                  borderBottom: "1px solid #000",
                  width: "100%",
                  display: "flex",
                  padding: "1rem",
                  alignItems: "center",
                }}
                className="agendaDateRow"
              >
                <Grid item xs={12}>
                  <Grid>
                    <ListItem
                      button
                      onClick={() => {
                        handleClick(event.id)
                      }}
                    >
                      <ListItemIcon>
                        <EventIcon fontSize="large" />
                      </ListItemIcon>
                      <ListItemText
                        secondary={date.subtitle}
                        style={{
                          // paddingRight: "0.5rem",
                          justifyContent: "center",
                        }}
                      />
                      <Grid container>
                        <Grid item xs={12} sm={6}>
                          <div>
                            {format(new Date(event.start), "EEE, LLLL d, yyyy")}
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <div>{event.title}</div>
                        </Grid>
                      </Grid>
                      {event.id === selectedIndex ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItem>
                    <Collapse
                      in={event.id === selectedIndex}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List
                        component="div"
                        disablePadding
                        style={{ background: "#e3e3e3" }}
                      >
                        <ListItem
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          More Info
                        </ListItem>
                        <ListItem
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          {/* <AddToCalendar date={date.date} event={event} /> */}
                        </ListItem>
                        {isAfter(event.start, new Date()) ? (
                          <ListItem
                            button
                            onClick={() =>
                              navigate(`${event.slug}`, {
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
                          <ListItem
                            button
                            onClick={() => navigate(`/${date.date}/results`)}
                          >
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
                </Grid>
                {/* <Grid item xs={4}>
                  <div
                    className="agendaDate"
                    style={{
                      textAlign: "right",
                      paddingRight: "1rem",
                      fontWeight: "500",
                    }}
                  >
                    {localizer.format(day, "EEE, MMMM d, yyyy")}
                  </div>
                </Grid>
                <Grid item xs={8}>
                  <div className="eventTitle">
                    <Link to={`/events/${event.slug}`}>
                      {accessors.title(event)}
                    </Link>
                    {console.log("custom agenda", event)}
                    {event.locationName ? (
                      <span style={{ fontStyle: "italic" }}>
                        &nbsp; at {event.locationName}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </Grid> */}
              </div>
            )}
          </div>
        </Grid>
      )
    }, [])
  }

  const timeRangeLabel = (day, event) => {
    const end = accessors.end(event)
    const start = accessors.start(event)

    if (!accessors.allDay(event)) {
      if (dayjs(start).day() === dayjs(end).day()) {
        const timePeriod = `${dayjs(start).format("h:mma")} – ${dayjs(
          end
        ).format("h:mma")}`
        return timePeriod
      } else {
        const startDate = dayjs(start).format("DD-MM YYYY, h:mma")
        const endDate = dayjs(end).format("DD-MM YYYY, h:mma")
        return `${startDate} – ${endDate}`
      }
    }
  }

  const end = dates.add(date, length, "day")
  const range = rangeFunc(date, end, "day")
  events = events.filter(event => inRange(event, date, end, accessors))
  events.sort((a, b) => +accessors.start(a) - +accessors.start(b))

  return (
    <div>
      {events.length !== 0
        ? range.map((day, idx) => renderDay(day, events, idx))
        : "No event dates in range"}
    </div>
  )
}

AgendaView.title = (start, { localizer }) => {
  const end = dates.add(start, 1, "month")
  return localizer.format({ start, end }, "agendaHeaderFormat")
}

AgendaView.navigate = (date, action) => {
  const sDate = dayjs(date).startOf("month").toDate()
  switch (action) {
    case "PREV":
      return dates.add(sDate, -1, "month")
    case "NEXT":
      return dates.add(sDate, 1, "month")
    default:
      return date
  }
}
