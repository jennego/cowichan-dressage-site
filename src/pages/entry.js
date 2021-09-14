import React from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"

import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import { Grid, FormGroup, TextField } from "@material-ui/core"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import { DropzoneArea } from "material-ui-dropzone"

import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf"
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail"
import PhoneIcon from "@material-ui/icons/Phone"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

import { useFormik, Formik, Form, Field } from "formik"
import * as yup from "yup"

const PaymentForm = () => {
  return (
    <RadioGroup aria-label="payment" name="payment">
      <FormLabel component="legend">Payment</FormLabel>
      <p>
        Allow section of one only. Required field. See if square can input an
        isPaid: true to the form upon success. Maybe toogle button group?
      </p>

      <FormControlLabel
        value="square"
        control={<Radio />}
        label="Square Credit Card"
      />
      <FormControlLabel
        value="etransfer"
        control={<Radio />}
        label="E-Transfer"
      />
    </RadioGroup>
  )
}

const WaiverForm = () => {
  return (
    <div>
      <p>Waivers</p>
      <Grid container>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem button style={{ border: "1px solid" }}>
              <ListItemIcon>
                <PictureAsPdfIcon />
              </ListItemIcon>
              <ListItemText primary="Waiver one" secondary="additional note" />
              <Button variant="outlined">Download PDF</Button>
            </ListItem>
          </List>
        </Grid>
      </Grid>

      <p>Upload waivers</p>

      <Grid container>
        <Grid item sm={6}>
          <DropzoneArea
            filesLimit={1}
            dropzoneText="Drop (or click to upload) Waiver One"
            onChange={files => console.log("Files:", files)}
          />
        </Grid>
        <Grid item sm={6}>
          <DropzoneArea
            filesLimit={1}
            dropzoneText="Drop (or click to upload) Waiver Two"
            onChange={files => console.log("Files:", files)}
          />
        </Grid>
      </Grid>
    </div>
  )
}

const DateForm = () => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Date</FormLabel>
      <RadioGroup aria-label="gender" name="gender1">
        <FormControlLabel
          value="date"
          disabled
          control={<Radio />}
          label="August 22, 2021"
        />
        <FormControlLabel
          value="male"
          control={<Radio />}
          label="September 26, 2021"
        />
        <FormControlLabel
          value="other"
          control={<Radio />}
          label="November 7, 2021"
        />
      </RadioGroup>
    </FormControl>
  )
}

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  name: yup.string("Enter your name").required("Name is required"),
  address: yup.string("Enter your address"),
  birthDate: yup.date("Enter a date"),
  hcbc: yup.number().typeError("Needs to be a number"),
})

const EntryForm = props => {
  return (
    <FormGroup>
      <FormLabel component="legend">Rider Info </FormLabel>

      <Grid container spacing={3}>
        <Grid item sm={6}>
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
        <Grid item sm={6}>
          <TextField
            fullWidth
            variant="filled"
            id="horseName"
            name="horseName"
            label="horseName"
            value={props.values.horseName}
            onChange={props.handleChange}
            error={props.touched.horseName && Boolean(props.errors.horseName)}
            helperText={props.touched.horseName && props.errors.horseName}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField label="Rider Email" fullWidth></TextField>
        </Grid>
        <Grid item md={3} xs={12}>
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={1}>
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.10)",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "55px",
                }}
              >
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
                  props.touched.phonenumber && Boolean(props.errors.phonenumber)
                }
                helperText={
                  props.touched.phonenumber && props.errors.phonenumber
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3} xs={6}>
          <TextField label="HCBC Number" fullWidth></TextField>
        </Grid>
        <Grid item md={2} xs={6}>
          <RadioGroup aria-label="age" name="age">
            <FormLabel component="legend">Age</FormLabel>

            <FormControlLabel
              value="junior"
              control={<Radio />}
              label="Junior"
            />
            <FormControlLabel
              value="senior"
              control={<Radio />}
              label="Senior"
            />
          </RadioGroup>
        </Grid>
        <Grid item sm={6}>
          <TextField
            id="standard-basic"
            label="Emergency Contact Name"
            fullWidth
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            id="standard-basic"
            label="Emergency Contact Phone Number"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <FormLabel component="legend">Test Info </FormLabel>
        </Grid>
        <Grid item sm={12}>
          <TextField id="standard-basic" label="Test 1 Source" fullWidth />
        </Grid>
        <Grid item sm={12}>
          <TextField id="standard-basic" label="Test 2 Source" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Notes"
            placeholder="MultiLine with rows: 2 and rowsMax: 4"
            multiline
            rows={4}
            rowsMax={6}
            fullWidth
            variant="filled"
          />
        </Grid>
      </Grid>
    </FormGroup>
  )
}

const Entry = () => {
  return (
    <Layout>
      <Main>
        <Formik
          onSubmit={values => {
            alert(JSON.stringify(values, null, 2))
          }}
          validationSchema={validationSchema}
          initialValues={{
            name: "Winnie the Pooh",
            horseName: "Tigger Too",
            phonenumber: "123-123-1234",
          }}
        >
          {props => (
            <div>
              <DateForm />
              <EntryForm {...props} />
              <WaiverForm />
              <PaymentForm />
              <Button variant="contained" color="secondary">
                Clear
              </Button>
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </div>
          )}
        </Formik>
      </Main>
    </Layout>
  )
}

export default Entry
