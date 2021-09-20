import React from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"
import { useStaticQuery, graphql } from "gatsby"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const Events = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulEvent {
        edges {
          node {
            eventName
            eventDates {
              date
            }
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <Main>
        Events
        {data.allContentfulEvent.edges.map(({ node }) => (
          <Card>
            <CardContent>
              {node.eventName}

              {node.eventDates.map(date => (
                <li> {date.date.toString()} </li>
              ))}
            </CardContent>
          </Card>
        ))}
      </Main>
    </Layout>
  )
}

export default Events
