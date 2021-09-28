import React from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"
import { Typography } from "@material-ui/core"

const WhatForm = () => {
  return (
    <Layout>
      <Main>
        <Typography variant="h2">
          Uh oh! I looks like you haven't actually submitted a form.{" "}
        </Typography>
        <Typography>
          If you got here via link or something, you may be looking for contact
          or event information, please see events page.
        </Typography>
      </Main>
    </Layout>
  )
}

const FormSuccess = () => {
  return (
    <Layout>
      <Main>
        <Typography variant="h2" style={{ textAlign: "center" }}>
          Yay! Form submitted successfully.
        </Typography>

        <Typography gutterBottom>
          You should be contacted about your entry via email.
        </Typography>

        <Typography>Contacts</Typography>
      </Main>
    </Layout>
  )
}

export default FormSuccess
