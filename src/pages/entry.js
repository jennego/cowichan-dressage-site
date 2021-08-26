import React from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"

import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
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

function getSteps() {
  return ["Select Date", "Entry Form", "Waivers", "Payment and Confirmation"]
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <DateForm />
    case 1:
      return <EntryForm />
    case 2:
      return <WaiverForm />
    case 3:
      return "payment info - pay up - buttons for stripe payment or checkbox for etransfer payment"
    default:
      return "Unknown stepIndex"
  }
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
        <Typography variant="h2"> Event Name </Typography>
        <div> Dates - needs to be styled </div>
        <div className="event-details-text">
          <Typography variant="body1">
            Event details <br />
            The CDC’s “show-and-tell” days are designed to help riders practice
            their tests in a simulated show environment with one-on-one feedback
            from the judge. Participants will ride their selected test which
            will be judged/scored as it would be in a competition. Then the
            judge will go through the test with the rider and suggest
            improvements can be made to improve their score. Participants will
            then ride their selected test again and try to improve their marks.
            Each of these sessions will run for a half hour. Participants can
            sign up for a maximum of 2 sessions (riding 2 different tests) but
            spaces will be prioritized for those riding their first session.
          </Typography>
        </div>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography>All steps completed</Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography>{getStepContent(activeStep)}</Typography>
              <div className="step-buttons">
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Main>
    </Layout>
  )
}

export default Entry
