import Button from "@material-ui/core/Button"
import React from "react"
import Typography from "@material-ui/core/Typography"
import {
  Grid,
  FormGroup,
  TextField,
  Paper,
  FormHelperText,
} from "@material-ui/core"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"

import AlternateEmailIcon from "@material-ui/icons/AlternateEmail"
import PhoneIcon from "@material-ui/icons/Phone"
import PersonIcon from "@material-ui/icons/Person"
import ContactPhoneIcon from "@material-ui/icons/ContactPhone"
import ContactsIcon from "@material-ui/icons/Contacts"
import HorseHeadIcon from "../components/horseHeadIcon"

import { format, parseISO, isAfter } from "date-fns"
import Sessions from "../components/sessions"
import { Field } from "formik"
import PhoneInput from "../components/PhoneInput"

export const DateForm = ({ data, props, location }) => {
  console.log(location)
  return (
    <div style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Date</FormLabel>
        <RadioGroup
          aria-label="date"
          name="dateSelect"
          onBlur={props.handleBlur}
          onChange={props.handleChange}
          value={props.values.dateSelect}
          id="dateSelect"
        >
          {data.contentfulEvent.eventDates.map(date => (
            <FormControlLabel
              name="dateSelect"
              disabled={isAfter(parseISO(date.date), new Date()) ? false : true}
              value={date.date}
              control={<Radio color="primary" />}
              color="primary"
              label={format(new Date(parseISO(date.date)), "EEE, LLLL d, yyyy")}
            />
          ))}
          {props.touched.date && Boolean(props.errors.date) ? (
            <FormHelperText error>
              Date is required. You cannot also register for an event that has
              already happened.
            </FormHelperText>
          ) : (
            ""
          )}
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export const PaymentForm = ({ props }) => {
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

export const EntryForm = ({ props, data }) => {
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
                id="Name"
                name="Name"
                label="Name"
                onBlur={props.handleBlur}
                value={props.values.Name}
                onChange={props.handleChange}
                error={props.touched.Name && Boolean(props.errors.Name)}
                helperText={props.touched.Name && props.errors.Name}
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
                onBlur={props.handleBlur}
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
                onBlur={props.handleBlur}
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
              <PhoneInput
                props={props}
                fieldName="PhoneNumber"
                idName="PhoneNumber"
                labelName="Phone Number"
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
                onBlur={props.handleBlur}
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
            id="age"
            style={{ display: "flex", flexDirection: "row", marginTop: "0" }}
            onBlur={props.handleBlur}
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
            {props.values.age}
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
                onBlur={props.handleBlur}
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
              <PhoneInput
                props={props}
                fieldName="emergContactPhone"
                idName="emergContactPhone"
                labelName="Emergency Contact Phone Number"
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
            onBlur={props.handleBlur}
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
