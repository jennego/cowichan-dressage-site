import React from "react"
import MuiPhoneNumber from "mui-phone-input-ssr"

const PhoneInput = ({ props, labelName, idName, fieldName }) => {
  return (
    <MuiPhoneNumber
      fullWidth
      variant="filled"
      id={idName}
      name={idName}
      style={{ height: "60px" }}
      className="MuiFilledInput-root MuiFilledInput-input"
      label={<label style={{ fontSize: 20 }}> {labelName} </label>}
      value={props.values[{ fieldName }]}
      defaultCountry={"ca"}
      disableDropdown={true}
      onlyCountries={["ca"]}
      disableCountryCode={true}
      onChange={e => props.setFieldValue(fieldName, e, true)}
      error={props.touched[fieldName] && Boolean(props.errors[fieldName])}
      helperText={props.touched[fieldName] && props.errors[fieldName]}
    />
  )
}

export default PhoneInput
