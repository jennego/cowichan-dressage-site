// figure out what to do with number fields - initial values and parse

import { graphql, Link } from "gatsby"
import React, { useState } from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"

import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import { Paper } from "@material-ui/core"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"

import Checkbox from "@material-ui/core/Checkbox"

import { Formik, Form, Field } from "formik"
import * as yup from "yup"
import mapValues from "lodash/mapValues"

import ResponsiveDialog from "../components/infoDialog"

import ResponsiveDialogContacts from "../components/listDialog"
import { UploadComponent } from "../components/uploadComponent"
import FocusError from "../components/focusError"

import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"

import { DateForm } from "../components/entryFormComponents"
import { EntryForm } from "../components/entryFormComponents"
import { PaymentForm } from "../components/entryFormComponents"

export const query = graphql`
  query entryQuery($id: String!) {
    contentfulEvent(id: { eq: $id }) {
      eventName
      eventDates {
        date
        subtitle
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
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedWaivers, setSelectedWaivers] = useState(
    data.contentfulEvent.adultWaivers
  )

  const handleOpen = (title, content) => {
    setOpen(true)
    setTitle(title)
    setContent(content)

    setTimeout(() => {
      setOpen(false)
    }, 2000)
  }

  const handleClose = () => {
    setOpen(false)
  }

  let testData = data.contentfulEvent.sessions.filter(
    test => test.testFields === true
  )

  let sessions = testData.map((test, index) => ({
    ["testSource"]: "",
    ["testOther"]: "",
    ["testDetails"]: "",
  }))

  const initialWaiversArr = () => {
    if (selectedWaivers.length > 0) {
      return selectedWaivers.map((test, index) => ({
        ["waiver" + (index + 1)]: null,
      }))
    } else {
      return
    }
  }

  // const initialTests = Object.assign({}, ...initialTestsArr)

  const initialWaivers = () => {
    if (initialWaiversArr !== null) {
      return Object.assign({}, ...initialWaiversArr)
    } else {
      return
    }
  }

  /// I think I'm gonna have to shove it all into one lazy schema

  let waiverSchema = yup.lazy(obj =>
    yup.object(
      mapValues(obj, (value, key) => {
        if (key.includes("waiver")) {
          return yup.mixed().required()
        }
      })
    )
  )

  const mainSchema = yup.object({
    dateSelect: yup.date().required(),
    name: yup.string("Enter your name").required("Name is required"),
    horseName: yup.string("Enter your name").required("Horse Name is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    phoneNumber: yup.string().required(),
    hcbc: yup.number().typeError("Needs to be a number").required(),
    emergContactName: yup.string().required(),
    emergContactPh: yup.string().required(),
  })

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
            <ResponsiveDialogContacts
              title="Contacts"
              label="Contacts"
              content={data.contentfulEvent.contacts}
            />
            {data.contentfulEvent.rules ? (
              <ResponsiveDialog
                title="Rules and Important Info"
                label="Rules"
                content={data.contentfulEvent.rules}
              />
            ) : (
              ""
            )}
            <FormControlLabel
              control={<Checkbox name="rules agreement" color="primary" />}
              label={
                <Typography variant="body2"> I have read the rules </Typography>
              }
            />
          </div>
        </div>
        <hr />
        <Formik
          onSubmit={(values, actions) => {
            fetch("/", {
              method: "POST",
              // headers: { "Content-Type": "multipart/form-data" },
              body: encode({
                "form-name": `${pageContext.eventName} Entries`,
                ...values,
              }),
            })
              .then(() => {
                alert(JSON.stringify(values, null, 2))
                console.log(values)
                actions.navigate("/form-success")
              })
              .catch(error => {
                alert(JSON.stringify(values, null, 2))
                console.log(error)
              })
              .finally(() => actions.setSubmitting(false))
          }}
          // validationSchema={mainSchema}
          initialValues={{
            dateSelect: location.state ? location.state.date : "",
            name: "",
            horseName: "",
            email: "",
            hcbc: "",
            phoneNumber: "",
            age: "adult",
            selectedSessions: "",
            emergContactName: "",
            emergContactPh: "",
            sessions,
            ...initialWaivers,
          }}
          validateOnMount
          enableReinitialize
        >
          {props => (
            <Paper>
              {console.log("touched", props.touched)}

              <Form
                data-netlify="true"
                name={`${pageContext.eventName} Entries`}
                // data-netlify-recaptcha="true"
                netlify-honeypot="bot-field"
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
                  " "
                )}

                <FocusError />
                <Field type="hidden" name="bot-field" />

                {console.log(props.values)}
                <DateForm props={props} data={data} location={location} />
                <EntryForm props={props} data={data} />

                {data.contentfulEvent.juniorWaivers &&
                data.contentfulEvent.adultWaivers ? (
                  <UploadComponent
                    waiverType={props.values.age}
                    props={props}
                    onChange={
                      props.values.age === "junior"
                        ? setSelectedWaivers(data.contentfulEvent.juniorWaivers)
                        : setSelectedWaivers(data.contentfulEvent.adultWaivers)
                    }
                    fileArray={selectedWaivers}
                  />
                ) : (
                  ""
                )}
                <PaymentForm props={props} data={data} />

                <Button variant="contained" color="secondary">
                  Clear
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Paper>
          )}
        </Formik>
      </Main>
    </Layout>
  )
}

export default Entry
