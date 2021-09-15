import React from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"
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

import { FormControlLabel } from "@material-ui/core"

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
      placeholder="MM/DD/YYYY"
      disableFuture
      name={field.name}
      value={props.values.birthDate}
      views={["year", "month", "date"]}
      openTo="year"
      format="MM/dd/yyyy"
      error={props.touched.birthDate && Boolean(props.errors.birthDate)}
      helperText={props.touched.birthDate && props.errors.birthDate}
      // helperText={currentError}
      // error={Boolean(currentError)}
      // onError={error => {
      //   // handle as a side effect
      //   if (error !== currentError) {
      //     form.setFieldError(field.name, error)
      //   }
      // }}
      // if you are using custom validation schema you probably want to pass `true` as third argument
      onChange={date => form.setFieldValue(field.name, date, false)}
      {...other}
    />
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
  phonenumber: yup.number().typeError("Needs to be a number"),
  emergContactName: yup
    .string("Enter name of emergency contact")
    .required("Emergency contact name is required"),
  emergContactPh: yup.number().typeError("Needs to be a number"),
})

const MemberForm = () => {
  // const formik = useFormik({
  //   initialValues: {
  //     email: "foobar@example.com",
  //     name: "Bob",
  //     birthDate: new Date(),
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: values => {
  //     alert(JSON.stringify(values, null, 2))
  //   },
  // })
  return (
    <Formik
      onSubmit={values => {
        alert(JSON.stringify(values, null, 2))
      }}
      validationSchema={validationSchema}
      initialValues={{
        email: "",
        name: "",
        address: "",
        birthDate: null,
      }}
    >
      {props => (
        <Form>
          {console.log("formik props", props)}
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
                    id="phone-number"
                    name="phone-number"
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
                    error={
                      props.touched.emergContactPh &&
                      Boolean(props.errors.emergContactPh)
                    }
                    helperText={
                      props.touched.emergContactPh &&
                      props.errors.emergContactPh
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              Payment
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Button variant="contained" color="primary">
                  Pay by Credit Card
                </Button>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.checked}
                      onChange={props.handleChange}
                      name="eTransfer"
                      color="primary"
                    />
                  }
                  label="Will pay by eTransfer"
                />
              </div>
            </Grid>
          </Grid>
          <div style={{ marginTop: "2rem" }}>
            <Button color="secondary" variant="contained" type="submit">
              Clear
            </Button>

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
        <h2>Membership Info</h2>
        <p>Blah blah</p>
        <h2>Membership Form</h2>

        <MemberForm />
      </Main>
    </Layout>
  )
}

export default Membership
