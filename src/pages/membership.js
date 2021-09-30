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

import { useDropzone } from "react-dropzone"

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

import { processForm } from "../components/formProcessing"
import AlertDialog from "../alertDialog"
import Paper from "@material-ui/core/Paper"

import ReCAPTCHA from "react-google-recaptcha"

const BirthDatePickerField = ({ field, form, props, ...other }) => {
  const currentError = form.errors[field.name]
  console.log("current error", Boolean(currentError))
  console.log("props from datepicker", props)

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

const UploadComponent = props => {
  const { setFieldValue } = props
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".pdf",
    multiple: false,
    onDrop: acceptedFiles => {
      setFieldValue("file", acceptedFiles)
    },
  })
  return (
    <div>
      {}
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps({ name: "file" })} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  )
}

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  name: yup.string("Enter your name").required("Name is required"),
  address: yup.string("Enter your address").required("Address is required"),
  birthDate: yup.date().typeError("Enter a date").required("Enter a date"),
  hcbc: yup.number().typeError("Needs to be a number"),
  phonenumber: yup.string().typeError("Needs to be a number"),
  emergContactName: yup
    .string("Enter name of emergency contact")
    .required("Emergency contact name is required"),
  emergContactPh: yup.string().typeError("Needs to be a number"),
  paymentMethod: yup.string().required("You must choose a payment method"),
  "g-recaptcha-response": yup
    .string()
    .required("Make sure to confirm that you are not a robot!"),
})

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const MemberForm = () => {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

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

  return (
    <Formik
      onSubmit={(values, actions) => {
        fetch("/", {
          method: "POST",
          // headers: { "Content-Type": "multipart/form-data" },
          body: encode({ "form-name": "Membership", ...values }),
        })
          .then(() => {
            alert(JSON.stringify(values, null, 2))
            handleOpen("Success!", "Form has been successfully submitted!")
            actions.resetForm()
          })
          .catch(() => {
            alert(JSON.stringify(values, null, 2))

            alert("Error")
          })
          .finally(() => actions.setSubmitting(false))
      }}
      // validationSchema={validationSchema}
      initialValues={{
        email: "",
        name: "",
        address: "",
        birthDate: null,
        paymentMethod: "",
        emergContactName: "",
        emergContactPh: "",
        phonenumber: "",
        hcbc: "",
        paymentMethod: "",
        "g-recaptcha-response": "",
        file: null,
      }}
    >
      {props => (
        <Form
          data-netlify="true"
          name="Membership"
          data-netlify-recaptcha="true"
          netlify-honeypot="bot-field"
          className="form-style"
        >
          <Field type="hidden" name="bot-field" />

          <AlertDialog
            title={title}
            content={content}
            open={open}
            handleClose={handleClose}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <Grid container spacing={0} alignItems="center">
                <Grid item xs={1}>
                  <div className="icon-background">
                    <PhoneIcon />
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    variant="filled"
                    id="phonenumber"
                    name="phonenumber"
                    label="Phone Number"
                    value={props.values.phonenumber}
                    onChange={props.handleChange}
                    error={
                      props.touched.phonenumber &&
                      Boolean(props.errors.phonenumber)
                    }
                    helperText={
                      props.touched.phonenumber && props.errors.phonenumber
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
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

            <Grid item xs={12} sm={6}>
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

            <Grid item xs={12} sm={6}>
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

            <Grid item xs={12} sm={6}>
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
                    error={Boolean(props.errors.emergContactPh)}
                    helperText={props.errors.emergContactPh}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                error={
                  props.touched.paymentMethod &&
                  Boolean(props.errors.paymentMethod)
                }
              >
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

            <Grid item xs={12}>
              <UploadComponent setFieldValue={props.setFieldValue} />
              {/* {props.values.file !== null ? props.values.file[0].name : ""} */}
              {console.log(props.values.file)}

              <label>
                Waiver:{" "}
                <input
                  type="file"
                  name="pdf"
                  onChange={props.handleChange}
                  value={props.values.pdf}
                />
                {console.log(props.values.pdf)}
              </label>
            </Grid>
          </Grid>
          <div style={{ marginTop: "2rem" }}>
            {/* <Button color="secondary" variant="contained">
              Clear
            </Button> */}
            <ReCAPTCHA
              sitekey="6LcpmH8cAAAAAAxPsO8hrUvpeg81VRHdeE5ekNJH"
              onChange={value =>
                props.setFieldValue("g-recaptcha-response", value, true)
              }
            />
            <FormHelperText style={{ color: "red" }}>
              {props.errors["g-recaptcha-response"] &&
                props.touched["g-recaptcha-response"] && (
                  <p>{props.errors["g-recaptcha-response"]}</p>
                )}
            </FormHelperText>
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

const Membership = () => {
  return (
    <Layout>
      <Main>
        <Paper>
          <h2>Membership Info</h2>
          <p>Blah blah</p>
        </Paper>
        <Paper>
          <h2>Membership Form</h2>

          <MemberForm />
        </Paper>
      </Main>
    </Layout>
  )
}

export default Membership
