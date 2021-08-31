import React from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"
import { useFormik, Formik, Form, Field } from "formik"
import * as yup from "yup"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import DateFnsUtils from "@date-io/date-fns"
import MomentUtils from "@date-io/moment"
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"

const BirthDatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name]

  return (
    <KeyboardDatePicker
      clearable
      disablePast
      name={field.name}
      value={field.value}
      format="dd/MM/yyyy"
      helperText={currentError}
      error={Boolean(currentError)}
      onError={error => {
        // handle as a side effect
        if (error !== currentError) {
          form.setFieldError(field.name, error)
        }
      }}
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
})

const MemberForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      name: "Bob",
      birthdate: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              id="address"
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.address)}
              helperText={formik.touched.email && formik.errors.address}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              id="phone-number"
              name="phone-number"
              label="Phone Number"
              value={formik.values.phonenumber}
              onChange={formik.handleChange}
              error={
                formik.touched.phonenumber && Boolean(formik.errors.phonenumber)
              }
              helperText={
                formik.touched.phonenumber && formik.errors.phonenumber
              }
            />
          </Grid>
          <Grid item md={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              {/* <Field name="date" component={BirthDatePickerField} /> */}

              {/* <TextField
                fullWidth
                id="birthdate"
                name="birthdate"
                label="Birth Date"
                value={formik.values.phonenumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phonenumber &&
                  Boolean(formik.errors.phonenumber)
                }
                helperText={
                  formik.touched.phonenumber && formik.errors.phonenumber
                }
              /> */}
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
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
