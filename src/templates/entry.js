// figure out what to do with number fields - initial values and parse

import { graphql } from "gatsby"
import React, { useState } from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"

import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import { Grid, FormGroup, TextField, CardContent } from "@material-ui/core"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import { DropzoneArea } from "material-ui-dropzone"
import Checkbox from "@material-ui/core/Checkbox"

import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf"
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail"
import PhoneIcon from "@material-ui/icons/Phone"
import ListAltIcon from "@material-ui/icons/ListAlt"
import PersonIcon from "@material-ui/icons/Person"
import ContactPhoneIcon from "@material-ui/icons/ContactPhone"
import ContactsIcon from "@material-ui/icons/Contacts"
import HorseHeadIcon from "../components/horseHeadIcon"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

import Card from "@material-ui/core/Card"

import { useFormik, Formik, Form, Field } from "formik"
import * as yup from "yup"
import TestInfo from "../components/selectWithOther"
import ResponsiveDialog from "../components/infoDialog"

import { format, isBefore, startOfToday } from "date-fns"
import { location } from "gatsby"

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
      }
      sessions {
        testFields
        cost
        description
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
        >
          {console.log(props.values.dateSelect)}
          {data.contentfulEvent.eventDates.map(date => (
            <FormControlLabel
              name="dateSelect"
              value={date.date}
              control={<Radio />}
              label={format(new Date(date.date), "EEEE, MMMM d, yyyy")}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
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
            // onChange={files => console.log("Files:", files)}
          />
        </Grid>
        <Grid item sm={6}>
          <DropzoneArea
            filesLimit={1}
            dropzoneText="Drop (or click to upload) Waiver Two"
            // onChange={files => console.log("Files:", files)}
          />
        </Grid>
      </Grid>
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
          >
            <FormControlLabel
              value="junior"
              control={<Radio />}
              label="Junior"
              name="age"
            />
            <FormControlLabel
              value="senior"
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
                error={Boolean(props.errors.emergContactPh)}
                helperText={props.errors.emergContactPh}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {data.contentfulEvent.sessions.map((session, index) => (
            <Grid container>
              <Grid item style={{ marginTop: "10px" }}>
                <Checkbox color="primary" />
              </Grid>
              <Grid item style={{ flexGrow: "1" }}>
                <FormLabel>
                  Session {index + 1} - Cost:{" "}
                  {session.cost >= 1 ? "$" + session.cost : "Free"}
                </FormLabel>
                <Card elevation="3" style={{ marginBottom: "1rem" }}>
                  <CardContent>
                    <Typography variant="body1" style={{ padding: "0.5rem" }}>
                      Description if required
                    </Typography>
                    {/* <FormLabel component="legend">Test Info </FormLabel> */}
                    {session.testFields}
                    {session.testFields ? <TestInfo props={props} /> : ""}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12} style={{ textAlign: "right" }}>
          Cost: add when selected
        </Grid>

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
            helperText=""
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
const validationSchema = yup.object({
  dateSelect: yup.date(),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  name: yup.string("Enter your name").required("Name is required"),
  address: yup.string("Enter your address"),
  hcbc: yup.number().typeError("Needs to be a number"),
})

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const Entry = ({ pageContext, data, location }) => {
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
    <Layout>
      <Main>
        <div>
          <Typography variant="h2">
            Entry form for {pageContext.eventName}{" "}
          </Typography>
          {data.contentfulEvent.rules ? (
            <ResponsiveDialog
              title="Rules and Important Info"
              label="Rules"
              content={data.contentfulEvent.rules}
            />
          ) : (
            ""
          )}
          <Checkbox color="primary" /> I have read the rules{" "}
        </div>
        <hr />
        <Formik
          onSubmit={(values, actions) => {
            fetch("/", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: encode({
                "form-name": `${pageContext.eventName} Entries`,
                ...values,
              }),
            })
              .then(() => {
                alert(JSON.stringify(values, null, 2))
                // handleOpen("Success!", "Form has been successfully submitted!")
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
            dateSelect: location.state ? location.state.date : "",
            name: "",
            horseName: "",
            phoneNumber: "",
            testSource: "",
          }}
        >
          {props => (
            <Form
              data-netlify="true"
              name={`${pageContext.eventName} Entries`}
              // data-netlify-recaptcha="true"
              netlify-honeypot="bot-field"
            >
              {console.log(props)}
              <DateForm props={props} data={data} location={location} />
              <EntryForm props={props} data={data} />
              {/* <WaiverForm /> */}
              <PaymentForm props={props} data={data} />
              <Button variant="contained" color="secondary">
                Clear
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Main>
    </Layout>
  )
}

export default Entry
