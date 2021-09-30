import React from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"
import { Typography } from "@material-ui/core"

const WhatForm = () => {
  return (
    <Layout>
      <Main>
        <Typography variant="h2">
          Uh oh! I looks like you haven't actually submitted a form.
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
        <Typography variant="h3" gutterBottom>
          Thank you for submitting!
        </Typography>
        <Typography variant="body1" gutterBottom>
          You should be contacted about your entry via email.
        </Typography>
        <Typography variant="h4" gutterBottom>
          You have entered in event Name
        </Typography>
        <p> Add to calendar </p>

        <Typography variant="h4">Payment</Typography>
        <Typography variant="body1" gutterBottom>
          You have chosen to pay via payment method . Please pay payment cost
          via e-transfer to [email].
        </Typography>

        <Typography variant="h4">Contacts</Typography>
      </Main>
    </Layout>
  )
}

export default FormSuccess
