import React, { useState } from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"
import { useStaticQuery, graphql, navigate, Link } from "gatsby"

import { Calendar, dateFnsLocalizer } from "react-big-calendar"

import format from "date-fns/format"
import parseISO from "date-fns/parseISO"
import parse from "date-fns/parse"

import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import enUS from "date-fns/locale/en-US"
import toDate from "date-fns/toDate"

import "react-big-calendar/lib/css/react-big-calendar.css"
import { Typography, Paper } from "@material-ui/core"
import { AgendaView } from "../components/customAgenda"

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
      allContentfulEvent {
        edges {
          node {
            id
            eventName
            summary {
              summary
            }
            slug
            locationName
            location {
              lat
              lon
            }
            eventDates {
              id
              date
              locationName
              location {
                lat
                lon
              }
            }
          }
        }
      }
    }
  `)

  const dateArrays = data.allContentfulEvent.edges.map(({ node }) =>
    node.eventDates.map((date, index) => ({
      id: node.id + date.id + index,
      start: toDate(new Date(parseISO(date.date))),
      end: date.endDate
        ? toDate(new Date(parseISO(date.endDate)))
        : toDate(new Date(parseISO(date.date))),
      title: node.eventName,
      slug: node.slug,
      locationName: date.locationName ? date.locationName : node.locationName,
      allDay: true,
      description: node.summary.summary,
    }))
  )

  const dateArr = [].concat.apply([], dateArrays)

  let formats = {
    dateFormat: "d",
    agendaHeaderFormat: ({ start, end }, culture, localizer) =>
      localizer.format(start, "MMM d, yyyy", culture) +
      " — " +
      localizer.format(end, "MMM d, yyyy", culture),
    agendaDateFormat: "EEE MMMM d, yyyy",
  }

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
              formats={formats}
              components={components}
              localizer={localizer}
              events={dateArr}
              defaultView="agenda"
              views={{ month: true, agenda: AgendaView }}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "90vh" }}
              onSelectEvent={e => navigate(`/events/${e.slug}`)}
              length={365}
            />
          </div>
          {console.log(dateArr)}
        </Paper>
      </Main>
    </Layout>
  )
}

export default Cal
