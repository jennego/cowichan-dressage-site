import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Container from "@material-ui/core/Container"

const Main = ({ children }) => {
  return (
    <Container
      style={{ marginTop: "75px", marginBottom: "2rem", minHeight: "76.5vh" }}
    >
      {children}
    </Container>
  )
}

export default Main
