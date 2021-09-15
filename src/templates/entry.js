import React from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"

const Entry = ({ pageContext }) => {
  return (
    <Layout>
      <Main>{pageContext.eventName} Entry Form </Main>
    </Layout>
  )
}

export default Entry
