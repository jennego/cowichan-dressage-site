import React from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { FormHelperText, Button } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"

const HumanSubmit = props => {
  return (
    <Grid container className="human-check-submit">
      {/* <Button color="secondary" variant="contained">
              Clear
            </Button> */}
      <Grid xs={12} md="auto">
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
      </Grid>
      <Grid xs={12} md="auto" style={{ justifySelf: "start" }}>
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}

export default HumanSubmit
