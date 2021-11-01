// figure out what to do with number fields - initial values and parse

import { graphql, Link } from "gatsby"
import React, { useState } from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"

import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import { Grid, FormGroup, TextField, Paper } from "@material-ui/core"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import Checkbox from "@material-ui/core/Checkbox"

import AlternateEmailIcon from "@material-ui/icons/AlternateEmail"
import PhoneIcon from "@material-ui/icons/Phone"
import PersonIcon from "@material-ui/icons/Person"
import ContactPhoneIcon from "@material-ui/icons/ContactPhone"
import ContactsIcon from "@material-ui/icons/Contacts"
import HorseHeadIcon from "../components/horseHeadIcon"

// import List from "@material-ui/core/List"
// import ListItem from "@material-ui/core/ListItem"
// import ListItemIcon from "@material-ui/core/ListItemIcon"
// import ListItemText from "@material-ui/core/ListItemText"
// import Card from "@material-ui/core/Card"

import { Formik, Form, Field } from "formik"
import * as yup from "yup"
import mapValues from "lodash/mapValues"

import ResponsiveDialog from "../components/infoDialog"

import { format, parseISO, isBefore } from "date-fns"
import Sessions from "../components/sessions"
import ResponsiveDialogContacts from "../components/listDialog"
import { UploadComponent } from "../components/uploadComponent"
import FocusError from "../components/focusError"

import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"

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

const DateForm = ({ data, props, location }) => {
  console.log(location)
  return (
    <div style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Date</FormLabel>
        <RadioGroup
          aria-label="date"
          name="dateSelect"
          onChange={props.handleChange}
          value={props.values.dateSelect}
        >
          {data.contentfulEvent.eventDates.map(date => (
            <FormControlLabel
              name="dateSelect"
              value={date.date}
              control={<Radio color="primary" />}
              color="primary"
              label={format(new Date(parseISO(date.date)), "EEE, LLLL d, yyyy")}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  )
}

const PaymentForm = ({ props }) => {
  return (
    <RadioGroup
      aria-label="payment method"
      name="paymentMethod"
      onChange={props.handleChange}
    >
      <FormControlLabel
        value="square"
        name="paymentMethod"
        control={<Radio color="primary" />}
        label="Square Credit Card"
      />
      <FormControlLabel
        name="paymentMethod"
        value="etransfer"
        control={<Radio color="primary" />}
        label="E-Transfer"
      />
    </RadioGroup>
  )
}

const EntryForm = ({ props, data }) => {
  const list = [{ label: "EC" }, { label: "HCBC" }, { label: "Western" }]

  return (
    <FormGroup>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormLabel component="legend">Rider Info </FormLabel>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container>
            <Grid item xs={1}>
              <div className="icon-background">
                <PersonIcon />
              </div>
            </Grid>
            <Grid item xs={11}>
              <TextField
                fullWidth
                variant="filled"
                id="name"
                name="name"
                label="Name"
                onBlur={props.handleBlur}
                value={props.values.name}
                onChange={props.handleChange}
                error={props.touched.name && Boolean(props.errors.name)}
                helperText={props.touched.name && props.errors.name}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container>
            <Grid item xs={1}>
              <div className="icon-background">
                <HorseHeadIcon />
              </div>
            </Grid>
            <Grid item xs={11}>
              <TextField
                fullWidth
                variant="filled"
                id="horseName"
                name="horseName"
                label="Horse Name"
                value={props.values.horseName}
                onChange={props.handleChange}
                error={
                  props.touched.horseName && Boolean(props.errors.horseName)
                }
                helperText={props.touched.horseName && props.errors.horseName}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container>
            <Grid item xs={1}>
              <div className="icon-background">
                <AlternateEmailIcon />
              </div>
            </Grid>
            <Grid item xs={11}>
              <TextField
                fullWidth
                variant="filled"
                id="email"
                name="email"
                label="Email"
                value={props.values.email}
                onChange={props.handleChange}
                error={props.touched.email && Boolean(props.errors.email)}
                helperText={props.touched.email && props.errors.email}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container>
            <Grid item xs={1}>
              <div className="icon-background">
                <PhoneIcon />
              </div>
            </Grid>
            <Grid item xs={11}>
              <TextField
                fullWidth
                variant="filled"
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                parse={parseInt(props.values.phoneNumber)}
                value={props.values.phoneNumber}
                onChange={props.handleChange}
                error={
                  props.touched.phoneNumber && Boolean(props.errors.phoneNumber)
                }
                helperText={
                  props.touched.phoneNumber && props.errors.phoneNumber
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container>
            <Grid item xs={1}>
              <div className="icon-background">
                <span style={{ fontSize: "30px" }}>#</span>
              </div>
            </Grid>
            <Grid item xs={11}>
              <TextField
                fullWidth
                variant="filled"
                id="hcbc"
                name="hcbc"
                label="Horse Council BC Member Number"
                parse={parseInt(props.values.hcbc)}
                value={props.values.hcbc}
                onChange={props.handleChange}
                error={props.touched.hcbc && Boolean(props.errors.hcbc)}
                helperText={props.touched.hcbc && props.errors.hcbc}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormLabel component="legend">Age</FormLabel>
          <RadioGroup
            aria-label="age"
            name="age"
            style={{ display: "flex", flexDirection: "row", marginTop: "0" }}
            value={props.values.age}
            onChange={props.handleChange}
          >
            <FormControlLabel
              value="junior"
              control={<Radio />}
              label="Junior"
              name="age"
            />
            <FormControlLabel
              value="adult"
              control={<Radio />}
              label="Senior"
              name="age"
            />
          </RadioGroup>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container>
            <Grid item xs={1}>
              <div className="icon-background">
                <ContactsIcon />
              </div>
            </Grid>
            <Grid item xs={11}>
              <TextField
                fullWidth
                variant="filled"
                id="emergContactName"
                name="emergContactName"
                label="Emergency Contact Name"
                value={props.values.emergContactName}
                onChange={props.handleChange}
                error={
                  props.touched.emergContactName &&
                  Boolean(props.errors.emergContactName)
                }
                helperText={
                  props.touched.emergContactName &&
                  props.errors.emergContactName
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container>
            <Grid item xs={1}>
              <div className="icon-background">
                <ContactPhoneIcon />
              </div>
            </Grid>
            <Grid item xs={11}>
              <TextField
                fullWidth
                variant="filled"
                id="emergContactPh"
                name="emergContactPh"
                label="Emergency Contact Phone Number"
                value={props.values.emergContactPh}
                onChange={props.handleChange}
                error={
                  props.touched.emergContactPh &&
                  Boolean(props.errors.emergContactPh)
                }
                helperText={
                  props.touched.emergContactPh && props.errors.emergContactPh
                }
              />
            </Grid>
          </Grid>
        </Grid>

        {data.contentfulEvent.sessions && (
          <Grid item xs={12}>
            <Field
              component={Sessions}
              name="sessions"
              sessionArr={data.contentfulEvent.sessions}
              props={props}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <TextField
            id="notes"
            name="notes"
            label="Notes (preferences etc) "
            placeholder="Note to organizers (preferred ride times, travel considerations, etc.)"
            multiline
            rows={4}
            rowsMax={6}
            fullWidth
            variant="filled"
            value={props.values.notes}
            onChange={props.handleChange}
            error={props.touched.notes && Boolean(props.errors.notes)}
            helperText={props.touched.notes && props.errors.notes}
          />
        </Grid>
      </Grid>
    </FormGroup>
  )
}

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
  const initialWaivers = Object.assign({}, ...initialWaiversArr)

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
    dateSelect: yup.date(),
    name: yup.string("Enter your name").required("Name is required"),
    horseName: yup.string("Enter your name").required("Horse Name is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    phoneNumber: yup.number().typeError("Needs to be a number").required(),
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
          validationSchema={mainSchema}
          initialValues={{
            dateSelect: location.state ? location.state.date : "",
            name: "",
            horseName: "",
            email: "",
            hcbc: "",
            phoneNumber: "",
            age: "adult",
            sessionsSelected: "",
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
