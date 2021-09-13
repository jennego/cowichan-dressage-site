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
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

import { useFormik, Formik, Form, Field } from "formik"

function getSteps() {
  return ["Select Date", "Entry Form", "Waivers", "Payment and Confirmation"]
}

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

      <DropzoneArea
        dropzoneText="Drop (or click to upload) completed waivers here"
        onChange={files => console.log("Files:", files)}
      />
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

const EntryForm = () => {
  return (
    <FormGroup>
      <FormLabel component="legend">Rider Info </FormLabel>

      <Grid container spacing={3}>
        <Grid item sm={6}>
          <TextField id="standard-basic" label="Rider Name" fullWidth />
        </Grid>
        <Grid item sm={6}>
          <TextField id="standard-basic" label="Horse Name" fullWidth />
        </Grid>
        <Grid item sm={3}>
          <TextField label="Rider Email" fullWidth></TextField>
        </Grid>
        <Grid item sm={3}>
          <TextField id="standard-basic" label="Rider Phone" fullWidth />
        </Grid>
        <Grid item sm={3}>
          <TextField label="HCBC Number" fullWidth></TextField>
        </Grid>
        <Grid item sm={2}>
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
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Layout>
      <Main>
        <Formik>
          <div>
            <DateForm />
            <EntryForm />
            <WaiverForm />
            <PaymentForm />
            <Button variant="contained" color="secondary">
              Clear
            </Button>
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </Formik>
      </Main>
    </Layout>
  )
}

export default Entry
