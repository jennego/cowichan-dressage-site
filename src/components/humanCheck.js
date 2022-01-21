import React from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { FormHelperText, Button } from "@material-ui/core"

const HumanSubmit = props => {
  return (
    <div className="human-check-submit">
      {/* <Button color="secondary" variant="contained">
              Clear
            </Button> */}
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
      <div style={{ marginLeft: "1rem" }}>
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </div>
    </div>
  )
}

export default HumanSubmit
