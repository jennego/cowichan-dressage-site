import React from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"
import { Typography } from "@material-ui/core"
import { ContactsOutlined, NightsStay } from "@material-ui/icons"
import Obfuscate from "react-obfuscate"
import AddToCalendar from "../components/addToCalendar"
import format from "date-fns/format"
import parseISO from "date-fns/parseISO"

const Email = () => <Obfuscate email="cowichandressageclub@gmail.com" />

const WhatForm = ({ location }) => {
  return (
    <Layout>
      <Main>
        <Typography variant="h2">
          Uh oh! It looks like you haven't actually submitted a form.
        </Typography>
        <Typography>
          If you got here via link or something, you may be looking for contact
          or event information, please see events page.
        </Typography>
      </Main>
    </Layout>
  )
}

const Membership = ({ location }) => (
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
            <Email /> for square invoice.
          </span>
        ) : (
          <span>
            You have chosen to pay with e-transfer. Please e-transfer to{" "}
            <Obfuscate Email />. Auto-deposit is enabled so security question
            does not matter.
          </span>
        )}
      </Typography>
    </Main>
  </Layout>
)

const FormSuccess = ({ location }) => {
  if (location.state === null || location.state === undefined) {
    return <WhatForm />
  }

  if (location.state.formName !== null) {
    if (location.state.formName === "membership") {
      return <Membership location={location} />
    } else {
      return (
        <Layout>
          <Main>
            {console.log(location)}

            <Typography variant="body1" gutterBottom>
              Your form has been successfully submitted.
            </Typography>
            <Typography variant="h3" gutterBottom>
              You have entered in {location.state.event.eventName} for{" "}
              {format(
                new Date(parseISO(location.state.values.date)),
                "EEE, LLLL d, yyyy"
              )}
            </Typography>

            <Typography variant="body1" gutterBottom>
              Your cost is ${location.state.cost}.
              {location.state.paymentMethod === "square" ? (
                <span>
                  You have chosen to pay with square credit card. Please email{" "}
                  <Email /> for square invoice.
                </span>
              ) : (
                <span>
                  You have chosen to pay with e-transfer. Please e-transfer to{" "}
                  <Email />. Auto-deposit is enabled so security question does
                  not matter.
                </span>
              )}
            </Typography>
            <AddToCalendar
              event={location.state.event}
              date={location.state.values.date}
              isCalAr={false}
              isButton={true}
            />
          </Main>
        </Layout>
      )
    }
  }
}

export default FormSuccess
