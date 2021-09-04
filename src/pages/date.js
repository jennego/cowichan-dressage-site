import React from "react"
import { Grid } from "@material-ui/core"
import { Formik, Form, Field } from "formik"
import { KeyboardDatePicker, DatePicker } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import MomentUtils from "@date-io/moment"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import Button from "@material-ui/core/Button"
import { format, formatDistance, formatRelative, subDays } from "date-fns"

const DatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name]

  return (
    <KeyboardDatePicker
      clearable
      placeholder=""
      disableFuture
      name={field.name}
      value={field.value}
      views={["year", "month", "date"]}
      openTo="year"
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

// values and errors can be just props if you aren't using them in that component

const FormikExample = () => {
  return (
    <Formik
      onSubmit={values => {
        format(values.date, "EEEE, MMMM d, yyyy")

        alert(JSON.stringify(values, null, 2))
      }}
      initialValues={{ date: new Date() }}
    >
      {({ values, errors }) => (
        <Form data-netlify="true">
          <Grid container>
            <Grid item container justify="center" xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Field name="date" component={DatePickerField} />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} sm={12} style={{ margin: "24px" }}>
              {format(values.date, "EEEE, MMMM d, yyyy")}
              {JSON.stringify({ errors, values }, null, 2)}
            </Grid>
          </Grid>
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default FormikExample
