import React, { useState } from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"
import { navigate } from "gatsby-link"
import { useFormik, Formik, Form, Field } from "formik"
import * as yup from "yup"
import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import DateFnsUtils from "@date-io/date-fns"
import MomentUtils from "@date-io/moment"
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"

import EventIcon from "@material-ui/icons/Event"
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail"
import PhoneIcon from "@material-ui/icons/Phone"
import PersonIcon from "@material-ui/icons/Person"
import HomeIcon from "@material-ui/icons/Home"
import ContactPhoneIcon from "@material-ui/icons/ContactPhone"
import ContactsIcon from "@material-ui/icons/Contacts"

import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormHelperText from "@material-ui/core/FormHelperText"

import AlertDialog from "../alertDialog"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

import PhoneInput from "../components/PhoneInput"
import { useStaticQuery, graphql } from "gatsby"
import HumanSubmit from "../components/humanCheck"
import { renderRichText } from "gatsby-source-contentful/rich-text"

const BirthDatePickerField = ({ field, form, props, ...other }) => {
  const currentError = form.errors[field.name]
  console.log("current error", Boolean(currentError))

  return (
    <KeyboardDatePicker
      keyboardIcon={
        <Button startIcon={<EventIcon />} color="primary" variant="outlined">
          Pick Date
        </Button>
      }
      inputVariant="filled"
      fullWidth
      clearable
      label="Birth Date"
      // placeholder="MM/DD/YYYY"
      disableFuture
      name={field.name}
      value={props.values.birthDate}
      views={["year", "month", "date"]}
      openTo="year"
      format="yyyy-MM-dd"
      error={props.touched.birthDate && Boolean(props.errors.birthDate)}
      helperText={props.touched.birthDate && props.errors.birthDate}
      onChange={date => form.setFieldValue(field.name, date, false)}
      {...other}
    />
  )
}

const membershipSchema = yup.object().shape({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  name: yup.string("Enter your name").required("Name is required"),
  address: yup.string("Enter your address").required("Address is required"),
  birthDate: yup.date().typeError("Enter a date").required("Enter a date"),
  hcbc: yup.number().typeError("Needs to be a number"),
  phonenumber: yup.string().required(),
  emergContactName: yup
    .string("Enter name of emergency contact")
    .required("Emergency contact name is required"),
  emergContactPhone: yup.string().required(),
  paymentMethod: yup.string().required("You must choose a payment method"),
  // "g-recaptcha-response": yup
  //   .string()
  //   .nullable()
  //   .required("Make sure to confirm that you are not a robot!")
})

// const encode = data => {
//   const formData = new FormData()
//   for (const key of Object.keys(data)) {
//     formData.append(key, data[key])
//   }
//   return formData
// }

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const MemberForm = props => {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const data = props.data

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

  let cost = data.allContentfulSiteInfo.edges[0].node.membershipCost

  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        address: "",
        birthDate: null,
        paymentMethod: "",
        emergContactName: "",
        emergContactPhone: "",
        phonenumber: "",
        hcbc: "",
        // "g-recaptcha-response": "",
      }}
      onSubmit={(values, actions) => {
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({
            "form-name": "Membership",
            ...values,
            "g-recaptcha-response": values["g-recaptcha-response"],
          }),
        })
          .then(() => {
            alert(JSON.stringify(values, null, 2))
            actions.resetForm()
          })
          .catch(() => {
            alert(JSON.stringify(values, null, 2))
          })
          .finally(() => actions.setSubmitting(false))
      }}
      // onSubmit={(values, actions) => {
      //   fetch("/", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
      //     body: encode({ "form-name": "membership", ...values }),
      //   })
      //     .then(() => {
      //       actions.resetForm()
      //       alert(JSON.stringify(values, null, 2))

      //       // navigate("/form-success", {
      //       //   state: { values, formName: "membership", cost: cost },
      //       // })
      //     })
      //     .catch(error => {
      //       alert(JSON.stringify(values, null, 2))
      //       alert("Error")
      //     })
      //     .finally(() => actions.setSubmitting(false))
      // }}
      validationSchema={membershipSchema}
    >
      {props => (
        <Form
          name="Membership"
          data-netlify="true"
          data-netlify-recaptcha="true"
          netlify-honeypot="bot-field"
          className="form-style"
          method="POST"
        >
          <Field type="hidden" name="bot-field" />

          <AlertDialog
            title={title}
            content={content}
            open={open}
            handleClose={handleClose}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
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
                    value={props.values.name}
                    onChange={props.handleChange}
                    error={props.touched.name && Boolean(props.errors.name)}
                    helperText={props.touched.name && props.errors.name}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <Grid container>
                <Grid item xs={1}>
                  <div className="icon-background">
                    <HomeIcon />
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    variant="filled"
                    id="address"
                    name="address"
                    label="Address"
                    value={props.values.address}
                    onChange={props.handleChange}
                    error={props.touched.email && Boolean(props.errors.address)}
                    helperText={props.touched.email && props.errors.address}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={0} alignItems="center">
                <Grid item xs={1}>
                  <div className="icon-background">
                    <PhoneIcon />
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <PhoneInput
                    props={props}
                    fieldName="phonenumber"
                    idName="phonenumber"
                    labelName="Phone Number"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container>
                <Grid item xs={1}>
                  <div className="icon-background">
                    <EventIcon />
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Field
                      name="birthDate"
                      component={BirthDatePickerField}
                      props={props}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
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
                    value={props.values.hcbc}
                    onChange={props.handleChange}
                    error={props.touched.hcbc && Boolean(props.errors.hcbc)}
                    helperText={props.touched.hcbc && props.errors.hcbc}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
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
                    label="Emergancy Contact Name"
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

            <Grid item xs={12} md={6}>
              <Grid container>
                <Grid item xs={1}>
                  <div className="icon-background">
                    <ContactPhoneIcon />
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <PhoneInput
                    props={props}
                    fieldName="emergContactPhone"
                    idName="emergContactPhone"
                    labelName="Emergency Contact Phone Number"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                error={
                  props.touched.paymentMethod &&
                  Boolean(props.errors.paymentMethod)
                }
              >
                <p> Membership cost is ${cost} </p>
                Payment
                <RadioGroup
                  aria-label="payment method"
                  name="paymentMethod"
                  onChange={props.handleChange}
                >
                  <FormControlLabel
                    value="square"
                    name="paymentMethod"
                    control={<Radio />}
                    label="Square Credit Card"
                  />
                  <FormControlLabel
                    name="paymentMethod"
                    value="etransfer"
                    control={<Radio />}
                    label="E-Transfer"
                  />
                </RadioGroup>
                <FormHelperText>
                  {props.touched.paymentMethod && props.errors.paymentMethod}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          {/* <Button color="primary" variant="contained" type="submit">
            Submit
          </Button> */}
          <HumanSubmit {...props} />
        </Form>
      )}
    </Formik>
  )
}

const Membership = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulSiteInfo {
        edges {
          node {
            membershipCost
            membershipInfo {
              raw
            }
          }
        }
      }
    }
  `)

  let membershipContent =
    data.allContentfulSiteInfo.edges[0].node.membershipInfo

  return (
    <Layout>
      <Main>
        <Paper style={{ padding: "0.5rem" }}>
          <Typography variant="h3" component="h1">
            Membership
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "5px" }}>
            {membershipContent && renderRichText(membershipContent)}
          </Typography>
        </Paper>
        <Paper>
          <Typography
            variant="h4"
            component="h2"
            style={{ paddingLeft: "0.5rem" }}
          >
            Membership Form
          </Typography>
          <MemberForm data={data} />
        </Paper>
      </Main>
    </Layout>
  )
}

export default Membership
