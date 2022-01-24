// figure out what to do with number fields - initial values and parse

import { graphql, Link, navigate } from "gatsby"
import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"

import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import { Paper, Grid, FormHelperText } from "@material-ui/core"
import FormControlLabel from "@material-ui/core/FormControlLabel"

import Checkbox from "@material-ui/core/Checkbox"

import { Formik, Form, Field, useFormikContext } from "formik"
import * as yup from "yup"
import mapValues from "lodash/mapValues"

import ResponsiveDialog from "../components/infoDialog"

import ResponsiveDialogContacts from "../components/listDialog"
import { UploadComponent } from "../components/uploadComponent"
import FocusError from "../components/focusError"

import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"

import { DateForm, Notes } from "../components/entryFormComponents"
import { EntryForm } from "../components/entryFormComponents"
import { PaymentForm } from "../components/entryFormComponents"
import Sessions from "../components/sessions"
import HumanSubmit from "../components/humanCheck"

export const query = graphql`
  query entryQuery($id: String!) {
    contentfulEvent(id: { eq: $id }) {
      eventName
      eventDates {
        date
        subtitle
        isFull
      }
      contacts {
        email
        name
        title
        phoneNumber
        details {
          details
        }
      }
      sessions {
        testFields
        cost
        description {
          description
        }
      }
      rules {
        raw
      }
      registrationInfo {
        raw
      }
      locationName
      location {
        lat
        lon
      }
      juniorWaivers {
        title
        file {
          url
          fileName
        }
      }
      adultWaivers {
        title
        file {
          url
          fileName
        }
      }
    }
  }
`

const Entry = ({ pageContext, data, location }) => {
  const [selectedWaivers, setSelectedWaivers] = useState(
    data.contentfulEvent.adultWaivers
  )
  const [initialWaivers, setInitialWavers] = useState("")
  const [initialTests, setInitialTests] = useState("")
  const [selectedSessions, setSelectedSessions] = useState([])

  let totalCost = 0
  if (selectedSessions.length > 0) {
    totalCost = selectedSessions.reduce(function (prev, cur) {
      return prev + cur.cost
    }, 0)
  }

  const isChecked = (array, session) => {
    return array.some(item => item.id === session.id)
  }

  const handleSelections = (e, session, index) => {
    e.stopPropagation()
    if (!isChecked(selectedSessions, session)) {
      setSelectedSessions(selectedSessions => [...selectedSessions, session])
    } else if (isChecked(selectedSessions, session)) {
      const removeItemArr = selectedSessions.filter(item => index !== item.id)
      setSelectedSessions(removeItemArr)
    }
  }

  let testData = []

  if (data.contentfulEvent.sessions) {
    testData = data.contentfulEvent.sessions.filter(
      test => test.testFields === true
    )
  }

  useEffect(() => {
    let initialWaiversArr
    if (selectedWaivers !== null) {
      initialWaiversArr = selectedWaivers.map((test, index) => ({
        ["waiver" + (index + 1)]: null,
      }))
      setInitialWavers(Object.assign({}, ...initialWaiversArr))
    } else {
      return
    }
  }, [selectedWaivers])

  useEffect(() => {
    if (testData.length > 0) {
      let sessionsArr = testData.map((test, index) => ({
        ["testSource" + (index + 1)]: undefined,
        ["otherDetails" + (index + 1)]: "",
        ["testDetails" + (index + 1)]: "",
      }))

      setInitialTests(Object.assign({}, ...sessionsArr))
    } else {
      return
    }
  }, [])

  const UpdateSelectedSessions = () => {
    const { setFieldValue } = useFormikContext()
    useEffect(() => {
      setFieldValue(
        "selectedSessions",
        selectedSessions.map(item => item.title).join(", ")
      )
    }, [selectedSessions])
    return null
  }

  /// Do tests next
  // Only if session is selected (seledcted session value includes?)
  // Other field om

  const selectedIds = selectedSessions.map((item, index) => item.id + 1)

  let dynamicSchema = yup.lazy(obj =>
    yup.object(
      mapValues(obj, (value, key) => {
        if (key.includes("waiver")) {
          return yup.mixed().required()
        }
        if (key.includes("Name")) {
          return yup.string().required()
        }
        if (key.includes("hcbc")) {
          return yup.number().required().typeError("you must specify a number")
        }

        if (key.includes("Phone")) {
          return yup.string().required("Phone number is required.")
        }

        if (key.includes("age")) {
          return yup.string().required()
        }

        if (key.includes("payment")) {
          return yup.string().required("Payment type is required.")
        }

        if (key.includes("date")) {
          return yup.date().required()
        }

        if (key.includes("email")) {
          return yup.string().email().required()
        }

        if (key.includes("rules")) {
          return yup
            .bool()
            .oneOf([true])
            .required("Agreeing to the rules is required")
        }

        // if (key.includes("g-recaptcha-response")) {
        //   return yup
        //     .string()
        //     .required("Make sure to confirm that you are not a robot!")
        // }

        if (
          key.includes("test") &&
          selectedIds.some(num => key.includes(num))
        ) {
          return yup.string().required()
        }
      })
    )
  )

  // const validationSchema

  const encode = data => {
    const formData = new FormData()
    for (const key of Object.keys(data)) {
      formData.append(key, data[key])
    }
    return formData
  }

  const handleFormValidationError = (e, props) => {
    props.handleSubmit(e)
    alert("hello you filled out the form wrong")
  }

  return (
    <Layout>
      <Main>
        <Formik
          onSubmit={(values, actions) => {
            fetch("/", {
              method: "POST",
              // headers: { "Content-Type": "multipart/form-data" },
              body: encode({
                "form-name": `${pageContext.eventName} Entries`,
                ...values,
                "g-recaptcha-response": values["g-recaptcha-response"],
              }),
            })
              .then(() => {
                navigate("/form-success", {
                  state: {
                    values,
                    event: data.contentfulEvent,
                    cost: totalCost,
                  },
                })
              })
              .catch(error => {
                console.log(error)
              })
              .finally(() => actions.setSubmitting(false))
          }}
          validationSchema={dynamicSchema}
          initialValues={{
            rules: false,
            date: location.state ? location.state.date : "",
            Name: "",
            horseName: "",
            email: "",
            hcbc: "",
            PhoneNumber: "",
            age: "",
            emergContactName: "",
            emergContactPhone: "",
            selectedSessions: "",
            paymentMethod: "",
            // "g-recaptcha-response": "",
            ...initialWaivers,
            ...initialTests,
          }}
          validateOnMount
          enableReinitialize
        >
          {props => (
            <>
              {console.log(props)}
              <div>
                <Typography variant="h2">
                  Entry form for {pageContext.eventName}{" "}
                </Typography>
                <div className="entry-toolbar">
                  <div>
                    <Button
                      variant="outlined"
                      component={Link}
                      to="/membership"
                      color="primary"
                    >
                      Membership
                    </Button>
                  </div>
                  {data.contentfulEvent.contacts && (
                    <ResponsiveDialogContacts
                      title="Contacts"
                      label="Contacts"
                      content={data.contentfulEvent.contacts}
                    />
                  )}
                  {data.contentfulEvent.rules && (
                    <div style={{ display: "flex" }}>
                      <ResponsiveDialog
                        title="Rules and Important Info"
                        label="Rules"
                        content={data.contentfulEvent.rules}
                      />
                    </div>
                  )}

                  {props.values.rules}

                  <FormControlLabel
                    style={{ marginLeft: "0.1rem" }}
                    onChange={props.handleChange}
                    control={<Checkbox name="rules" color="primary" />}
                    label={
                      <Typography variant="body2">
                        I have read the rules{" "}
                      </Typography>
                    }
                  />
                  {props.touched.rules && Boolean(props.errors.rules) ? (
                    <FormHelperText error>{props.errors.rules}</FormHelperText>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <hr />
              <Paper>
                <Form
                  name={`${pageContext.eventName} Entries`}
                  data-netlify-recaptcha="true"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  method="POST"
                  className="form-style"
                >
                  {!props.isValid && props.submitCount > 0 ? (
                    <Snackbar
                      open={true}
                      anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                      <Alert severity="error">
                        Please ensure you have filled out these form fields.
                      </Alert>
                    </Snackbar>
                  ) : (
                    ""
                  )}

                  <FocusError />
                  <Field type="hidden" name="bot-field" />

                  <DateForm props={props} data={data} location={location} />
                  <EntryForm props={props} data={data} />

                  {data.contentfulEvent.sessions && (
                    <Grid item xs={12}>
                      <UpdateSelectedSessions />
                      <Field
                        component={Sessions}
                        name="sessions"
                        sessionArr={data.contentfulEvent.sessions}
                        props={props}
                        handleSelections={handleSelections}
                        setSelectedSessions={setSelectedSessions}
                        selectedSessions={selectedSessions}
                        isChecked={isChecked}
                      />
                    </Grid>
                  )}
                  <Notes props={props} data={data} />

                  {data.contentfulEvent.juniorWaivers &&
                  data.contentfulEvent.adultWaivers ? (
                    <UploadComponent
                      waiverType={props.values.age}
                      props={props}
                      fileArray={
                        props.values.age === "junior"
                          ? data.contentfulEvent.juniorWaivers
                          : data.contentfulEvent.adultWaivers
                      }
                    />
                  ) : (
                    ""
                  )}
                  <PaymentForm props={props} data={data} />

                  <HumanSubmit {...props} />
                </Form>
              </Paper>
            </>
          )}
        </Formik>
      </Main>
    </Layout>
  )
}

export default Entry
