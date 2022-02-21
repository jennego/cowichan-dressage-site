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

import { renderRichText } from "gatsby-source-contentful/rich-text"

import ResponsiveDialogContacts from "../components/listDialog"
import { UploadComponent } from "../components/uploadComponent"
import FocusError from "../components/focusError"

import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"

import { DateForm, Notes } from "../components/entryFormComponents"
import { EntryForm } from "../components/entryFormComponents"
import Sessions from "../components/sessions"
import HumanSubmit from "../components/humanCheck"
import { useQueryParam } from "gatsby-query-params"

const Entry = ({
  pageContext,
  data,
  location,
  date,
  square,
  scrollToRules,
}) => {
  const [selectedWaivers, setSelectedWaivers] = useState(
    data.contentfulEvent.adultWaivers
  )
  const [initialWaivers, setInitialWavers] = useState("")
  const [initialTests, setInitialTests] = useState("")
  const [selectedSessions, setSelectedSessions] = useState([])
  const dateQueryValue = useQueryParam("date")

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

  const UpdateDate = () => {
    const { setFieldValue } = useFormikContext()
    useEffect(() => {
      setFieldValue("date", dateQueryValue)
    }, [dateQueryValue])
    return null
  }

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
          return yup.string().required("Name is required")
        }
        if (key.includes("hcbc")) {
          return yup
            .number()
            .required("HCBC or EC number is required")
            .typeError("you must specify a number")
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
          return yup.string().email().required("Email is required")
        }

        if (key.includes("rules")) {
          return yup
            .bool()
            .oneOf([true])
            .typeError("Agreeing to the rules is required")
            .required("Agreeing to the rules is required")
        }

        if (key.includes("g-recaptcha-response")) {
          return yup
            .string()
            .required("Make sure to confirm that you are not a robot!")
        }

        if (
          key.includes("test") &&
          selectedIds.some(num => key.includes(num))
        ) {
          return yup.string().required()
        }
      })
    )
  )

  // const handleRulesClick = () => {
  //   navigate("?id=rules")
  //   const anchorEl = document.getElementById("rules")
  //   anchorEl.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //   })
  // }

  const encode = data => {
    const formData = new FormData()
    for (const key of Object.keys(data)) {
      formData.append(key, data[key])
    }
    return formData
  }

  const getDate = () => {
    if (location.state) {
      return location.state.datd
    }
  }

  return (
    <div>
      <Formik
        onSubmit={(values, actions) => {
          fetch("/", {
            method: "POST",
            // headers: { "Content-Type": "multipart/form-data" },
            body: encode({
              "form-name": `${data.contentfulEvent.eventName} Entries`,
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
              alert(
                "oops! There was an error. Try again. If it still doesn't work contact jen@jenniferchow.ca"
              )
            })
            .finally(() => actions.setSubmitting(false))
        }}
        validationSchema={dynamicSchema}
        initialValues={{
          rules: false,
          date: getDate(),
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
          "g-recaptcha-response": "",
          ...initialWaivers,
          ...initialTests,
        }}
        validateOnMount
        enableReinitialize
      >
        {props => (
          <>
            <div>
              {console.log(props)}
              <Typography variant="h4" component="h2">
                Entry form for {data.contentfulEvent.eventName}
              </Typography>
              <div
                className="entry-toolbar"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div
                  style={{
                    padding: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {data.contentfulEvent.membershipRequired || undefined ? (
                    <Typography>
                      Current membership is required for this event.{" "}
                      <a href="../membership">Go to Membership Form. </a>
                    </Typography>
                  ) : (
                    <Typography>
                      Membership is not required for this event.{" "}
                    </Typography>
                  )}
                </div>
                {data.contentfulEvent.contacts && (
                  <ResponsiveDialogContacts
                    title="Contacts"
                    label="Contacts"
                    content={data.contentfulEvent.contacts}
                  />
                )}

                <div style={{ display: "flex" }}>
                  {data.contentfulEvent.rules && (
                    <div style={{ display: "flex" }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={scrollToRules}
                      >
                        Read Rules
                      </Button>
                    </div>
                  )}
                  <FormControlLabel
                    id="rules"
                    style={{ marginLeft: "0.1rem" }}
                    onChange={props.handleChange}
                    control={<Checkbox name="rules" color="primary" />}
                    label={
                      <Typography variant="body2">
                        I have read and agree to the rules and other info as
                        well as the cancellation policy.
                      </Typography>
                    }
                  />
                </div>
                <div style={{ marginTop: "-10px" }}>
                  {props.touched.rules && Boolean(props.errors.rules) ? (
                    <FormHelperText error>
                      Agreeing to the rules is required
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {data.contentfulEvent.cancellationPolicy && (
                <div>
                  {/* <Typography
                      component="h4"
                      style={{
                        fontWeight: "bold",
                        lineHeight: "3px",
                        marginTop: "1rem",
                      }}
                    >
                      Cancellation Policy
                    </Typography>

                    <Typography variant="body2">
                      {renderRichText(data.contentfulEvent.cancellationPolicy)}
                    </Typography> */}
                </div>
              )}
            </div>
            <hr />
            <Paper>
              <Form
                name={`${data.contentfulEvent.eventName} Entries`}
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
                <UpdateDate />
                <EntryForm props={props} data={data} />

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
                      data={data}
                      square={square}
                    />
                  </Grid>
                )}
                <HumanSubmit {...props} />
              </Form>
            </Paper>
          </>
        )}
      </Formik>
    </div>
  )
}

export default Entry
