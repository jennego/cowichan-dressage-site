import React, { useEffect } from "react"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"

const TestInfo = ({ form, props, testNumber, disabled, index }) => {
  const [isOther, setIsOther] = React.useState(false)

  // useEffect(() => {
  //   if (isOther === false) {
  //     props.setFieldValue("otherDetails", "", false)
  //   } else {
  //     return
  //   }
  // }, [isOther])

  const handleClick = e => {
    if (disabled === false) {
      e.stopPropagation()
    } else {
      return
    }
  }

  return (
    <Grid container onClick={handleClick}>
      <Grid item xs={3}>
        <FormControl fullWidth variant="filled">
          <InputLabel id="testSource">
            <span style={{ color: disabled ? "grey" : "#171717" }}>
              Test Source
            </span>
          </InputLabel>
          <Select
            defaultValue=""
            labelId="testSource"
            id={`testSource${testNumber}`}
            variant="filled"
            name={`testSource${testNumber}`}
            fullWidth
            value={props.values[`testSource${testNumber}`]}
            onChange={e =>
              props.setFieldValue(`testSource${testNumber}`, e.target.value)
            }
            disabled={disabled}
          >
            <MenuItem value={"EC"} onClick={() => setIsOther(false)}>
              EC
            </MenuItem>
            <MenuItem value={"HCBC"} onClick={() => setIsOther(false)}>
              HCBC
            </MenuItem>
            <MenuItem value={"Other"} onClick={() => setIsOther(true)}>
              Other (specify)
            </MenuItem>
            {/* <MenuItem value={""}>Clear</MenuItem> */}
          </Select>
        </FormControl>
      </Grid>

      {isOther ? (
        <Grid item xs={4}>
          <TextField
            name={`otherDetails${testNumber}`}
            id={`otherDetails${testNumber}`}
            variant="filled"
            label="Specify Other"
            helperText="details for other test source"
            fullWidth
            value={props.values[`otherDetails${testNumber}`]}
            onChange={e =>
              props.setFieldValue(
                `otherDetails${testNumber}`,
                e.target.value,
                true
              )
            }
          />
        </Grid>
      ) : (
        ""
      )}

      <Grid item style={{ flexGrow: "1" }}>
        <TextField
          id={`testDetails${testNumber}`}
          variant="filled"
          name={`testDetails${testNumber}`}
          label="Test Details"
          placeholder="level and number/name etc"
          fullWidth
          value={props.values[`testDetails${testNumber}`]}
          disabled={disabled}
          onChange={e =>
            props.setFieldValue(`testDetails${testNumber}`, e.target.value)
          }
          error={
            props.touched[`testDetails${testNumber}`] &&
            Boolean(props.errors[`testDetails${testNumber}`])
          }
          helperText={
            props.touched[`testDetails${testNumber}`] &&
            props.errors[`testDetails${testNumber}`]
          }
        />
      </Grid>

      <Grid item xs={12}></Grid>
    </Grid>
  )
}

export default TestInfo
