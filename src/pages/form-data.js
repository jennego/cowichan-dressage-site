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
      return location.state.data
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
              "form-name": `Form Upload`,
              ...values,
              // "g-recaptcha-response": values["g-recaptcha-response"],
            }),
          })
            .then(() => {
              alert(JSON.stringify(values))
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
        // validationSchema={dynamicSchema}
        validateOnMount
        enableReinitialize
      >
        {props => (
          <>
            <div>
              {console.log(props)}

              <Paper>
                <Form
                  name={`${data.contentfulEvent.adultWaivers} Entries`}
                  data-netlify-recaptcha="true"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  method="POST"
                  className="form-style"
                >
                  <UploadComponent
                    waiverType={props.values.age}
                    props={props}
                    fileArray={
                      props.values.age === "junior"
                        ? data.contentfulEvent.juniorWaivers
                        : data.contentfulEvent.adultWaivers
                    }
                  />
                </Form>
              </Paper>
            </div>
          </>
        )}
      </Formik>
    </div>
  )
}

export default Entry
