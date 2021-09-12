import React from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"
import { useStaticQuery, graphql } from "gatsby"

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
          <ul>
            <li>{node.eventName}</li>

            <ul>
              {node.eventDates.map(date => (
                <li> {date.date.toString()} </li>
              ))}
            </ul>
          </ul>
        ))}
      </Main>
    </Layout>
  )
}

export default Events
