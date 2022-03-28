import React, { useEffect } from "react"
import { Grid, FormGroup, TextField, FormHelperText } from "@material-ui/core"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import Typography from "@material-ui/core/Typography"
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail"
import PhoneIcon from "@material-ui/icons/Phone"
import PersonIcon from "@material-ui/icons/Person"
import ContactPhoneIcon from "@material-ui/icons/ContactPhone"
import ContactsIcon from "@material-ui/icons/Contacts"
import HorseHeadIcon from "../components/horseHeadIcon"

import { format, parseISO, isAfter } from "date-fns"
import PhoneInput from "../components/PhoneInput"
import IsFullBadge from "./isFullBadge"

export const DateForm = ({ data, props, location }) => {
  return (
    <div style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Event Date</FormLabel>
        <RadioGroup
          aria-label="event date"
          labelName="Event Date"
          name="date"
          onBlur={props.handleBlur}
          onChange={props.handleChange}
          value={props.values.date}
          id="date"
        >
          {data.contentfulEvent.eventDates.map((date, index) => (
            <IsFullBadge isFull={date.isFull} isDate={true} key={index}>
              <FormControlLabel
                key={index}
                name="date"
                disabled={
                  isAfter(parseISO(date.date), new Date()) ? false : true
                }
                value={date.date}
                control={<Radio color="primary" />}
                color="primary"
                label={format(
                  new Date(parseISO(date.date)),
                  "EEE, LLLL d, yyyy"
                )}
                checked={date.date === props.values.date ? true : false}
              />
            </IsFullBadge>
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

export const PaymentForm = ({ props, square, squareCost, cost }) => {
  return (
    <RadioGroup
      aria-label="payment method"
      name="paymentMethod"
      onChange={props.handleChange}
      style={{ marginTop: "2rem" }}
    >
      <FormLabel> Payment </FormLabel>
      <Typography gutterBottom variant="body2">
        Pay via E-Transfer or Square Credit Card. A {square}% surcharge will
        apply to square credit card payments.
      </Typography>

      <FormControlLabel
        value="square"
        name="paymentMethod"
        control={<Radio color="primary" />}
        label={
          <div>
            Square Credit Card{" "}
            <span className="payment-cost">
              {squareCost ? squareCost : ""}{" "}
            </span>
          </div>
        }
      />
      <FormControlLabel
        name="paymentMethod"
        value="etransfer"
        control={<Radio color="primary" />}
        label={
          <div>
            E-Transfer{" "}
            <span className="payment-cost"> {cost ? cost : ""} </span>
          </div>
        }
      />
      {props.touched.paymentMethod && Boolean(props.errors.paymentMethod) ? (
        <FormHelperText error>Payment Method is required.</FormHelperText>
      ) : (
        ""
      )}
    </RadioGroup>
  )
}

export const EntryForm = ({ props, data }) => {
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
        <Grid item></Grid>

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
      </Grid>
    </FormGroup>
  )
}

export const Notes = ({ props }) => (
  <>
    <Grid item xs={12} md={6}>
      <TextField
        style={{ marginTop: "2rem" }}
        fullWidth
        variant="filled"
        id="coach"
        name="coach"
        label="Coach/Trainer"
        placeholder="Specify for scheduling purposes"
        value={props.values.coach}
        onBlur={props.handleBlur}
        onChange={props.handleChange}
        error={props.touched.coach && Boolean(props.errors.coach)}
        helperText={props.touched.coach && props.errors.coach}
      />
    </Grid>
    <Grid item xs={12} style={{ marginTop: "2rem" }}>
      <p>
        Please identify any special needs or considerations you would like us to
        know. We will do our best to accommodate your requests, but may not be
        able to fulfill everything you ask for. PLEASE INDICATE IF YOU ARE
        TRAVELLING WITH ANOTHER ENTRY OR YOUR COACH.
      </p>
      <TextField
        id="notes"
        name="notes"
        label="Special Needs and Considerations"
        placeholder="Travelling plans, scheduling requests, special requests etc"
        multiline
        minRows={4}
        maxRows={6}
        onBlur={props.handleBlur}
        fullWidth
        variant="filled"
        value={props.values.notes}
        onChange={props.handleChange}
        error={props.touched.notes && Boolean(props.errors.notes)}
        helperText={props.touched.notes && props.errors.notes}
      />
    </Grid>
  </>
)
