import React from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"
import { Typography } from "@material-ui/core"
import Obfuscate from "react-obfuscate"
import AddToCalendar from "../components/addToCalendar"
import format from "date-fns/format"
import parseISO from "date-fns/parseISO"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { Link } from "gatsby"
import { Button } from "@material-ui/core"

const Email = () => <Obfuscate email="cowichandressageclub@gmail.com" />

const WhatForm = ({ location }) => {
  return (
    <Layout>
      <Main>
        <Typography variant="h3">
          Uh oh! It looks like you haven't actually submitted a form.
        </Typography>
        <Typography>
          If you got here via link or something, you may be looking for event
          information, please see <Link to="/events">events page.</Link>
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <Link to="/">
            <Button color="primary" variant="contained">
              Go Home
            </Button>
          </Link>
        </div>
      </Main>
    </Layout>
  )
}

const Membership = ({ location }) => (
  <Layout>
    <Main>
      <Typography variant="h3" gutterBottom>
        Thank you for joining Cowichan Dressage Club!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your form has been successfully submitted.
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Link to="/">
          <Button color="primary" variant="contained">
            Go Home
          </Button>
        </Link>
      </div>
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
            <Typography variant="h3" gutterBottom>
              Registration Complete.
            </Typography>

            {location.state.event.confirmationMessage && (
              <Typography>
                {renderRichText(location.state.event.confirmationMessage)}
              </Typography>
            )}

            {/* <Typography variant="body1" gutterBottom>
              Your estimated cost will be ${location.state.cost}.
            </Typography> */}

            <Typography variant="body1" gutterBottom>
              You have registered for {location.state.event.eventName} on{" "}
              {format(
                new Date(parseISO(location.state.values.date)),
                "EEE, LLLL d, yyyy"
              )}
            </Typography>

            <AddToCalendar
              event={location.state.event}
              date={location.state.values.date}
              isCalAr={false}
              isButton={true}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <Link to="/">
                <Button color="primary" variant="contained">
                  Go Home
                </Button>
              </Link>
            </div>
          </Main>
        </Layout>
      )
    }
  }
}

export default FormSuccess
