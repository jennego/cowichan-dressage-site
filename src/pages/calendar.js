import React, { useState } from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"
import { useStaticQuery, graphql, navigate, Link } from "gatsby"

import { Calendar, dateFnsLocalizer } from "react-big-calendar"

import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import enUS from "date-fns/locale/en-US"
import toDate from "date-fns/toDate"

import "react-big-calendar/lib/css/react-big-calendar.css"
import { Typography, Paper } from "@material-ui/core"

const MyAgendaEvent = e => (
  <>
    <Link to={`/events/${e.slug}`}>{e.title}</Link>
    <em> at {e.event.locationName} </em>
  </>
)

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const Cal = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulEventDate {
        edges {
          node {
            id
            date
            locationName
            location {
              lat
              lon
            }
            event {
              eventName
              slug
              locationName
            }
          }
        }
      }
    }
  `)

  const dateArr = data.allContentfulEventDate.edges.map(({ node }, index) => ({
    id: index,
    start: toDate(new Date(node.date)),
    end: node.endDate
      ? toDate(new Date(node.endDate))
      : toDate(new Date(node.date)),
    title: node.event ? node.event[0].eventName : "",
    allDay: true,
    slug: node.event ? node.event[0].slug : "",
    locationName: node.locationName
      ? node.locationName
      : node.event
      ? node.event[0].locationName
      : "",
  }))

  console.log(dateArr)

  let components = {
    agenda: {
      event: MyAgendaEvent, // with the agenda view use a different component to render events
    },
  }

  let event = {
    title: "Sample Event",
    description: "This is the sample event provided as an example only",
    location: "Portland, OR",
    startTime: "2016-09-16T20:15:00-04:00",
    endTime: "2016-09-16T21:45:00-04:00",
  }

  return (
    <Layout>
      <Main>
        <Paper>
          <div>
            {console.log("data", data)}
            <Calendar
              components={components}
              localizer={localizer}
              events={dateArr}
              views={["month", "agenda"]}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "90vh" }}
              onSelectEvent={e => navigate(`/events/${e.slug}`)}
              length={365}
            />
          </div>
        </Paper>
      </Main>
    </Layout>
  )
}

export default Cal
