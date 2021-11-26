import React from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"
import { Typography } from "@material-ui/core"
import { ContactsOutlined } from "@material-ui/icons"
import Obfuscate from "react-obfuscate"

const WhatForm = ({ location }) => {
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

const FormSuccess = ({ location }) => {
  if (location.state.formName === "membership") {
    return (
      <Layout>
        <Main>
          {JSON.stringify(location, null, 2)}
          <Typography variant="h3" gutterBottom>
            Thank you for joining Cowichan Dressage Club!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Your form has been successfully submitted.
          </Typography>

          <Typography variant="body1" gutterBottom>
            Your cost is ${}.
            {location.state.paymentMethod === "square" ? (
              <span>
                You have chosen to pay with square credit card. Please email{" "}
                <Obfuscate to="cowichandressageclub@gmail.com" />
                for square invoice.
              </span>
            ) : (
              <span>
                You have chosen to pay with e-transfer. Please e-transfer to{" "}
                <Obfuscate to="cowichandressageclub@gmail.com" />
                Auto-deposit is enabled so security question does not matter.
              </span>
            )}
          </Typography>
        </Main>
      </Layout>
    )
  }
  return (
    <Layout>
      <Main>
        {JSON.stringify(location, null, 2)}

        <Typography variant="h3" gutterBottom>
          Thank you for entering! {location.eventName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Your form has been successfully submitted.
        </Typography>
        <Typography variant="h4" gutterBottom>
          You have entered in {location.eventName}
        </Typography>
        <p> Add to calendar </p>

        <Typography variant="h4">Payment</Typography>
        <Typography variant="body1" gutterBottom>
          You have chosen to pay via payment method . Please pay payment cost
          via e-transfer to [email].
        </Typography>
      </Main>
    </Layout>
  )
}

export default FormSuccess
