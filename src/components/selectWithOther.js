import React, { useEffect } from "react"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"

const TestInfo = ({ form, props, testNumber, index }) => {
  const [otherValue, setOtherValue] = React.useState("")
  const [isOther, setIsOther] = React.useState(false)

  useEffect(() => {
    if (isOther === false) {
      props.setFieldValue("otherDetails", "", false)
    } else {
      return
    }
  }, [isOther])

  return (
    <Grid container>
      <Grid item xs={3}>
        <FormControl fullWidth>
          <InputLabel id="testSource">Test Source</InputLabel>
          <Select
            labelId={`sessions[${index}].testSource${testNumber}`}
            id={`sessions[${index}].testSource${testNumber}`}
            variant="filled"
            name={`sessions[${index}].testSource`}
            displayEmpty
            fullWidth
            value={props.values.sessions[index]["testSource" + testNumber]}
            onChange={e =>
              props.setFieldValue(
                `sessions[${index}][testSource${testNumber}]`,
                e.target.value
              )
            }
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
            name={`sessions${index}.otherDetails${testNumber}`}
            id={`otherDetails${testNumber}`}
            variant="filled"
            label="Specify Other"
            helperText="details for other test source"
            fullWidth
            value={props.values[`sessions${index}.otherDetails${testNumber}`]}
            onChange={e =>
              props.setFieldValue(
                `sessions[${index}][otherDetails${testNumber}]`,
                e.target.value
              )
            }
          />
        </Grid>
      ) : (
        ""
      )}

      <Grid item style={{ flexGrow: "1" }}>
        <TextField
          id={`sessions[${index}].testDetails${testNumber}`}
          variant="filled"
          id={`sessions[${index}].testDetails${testNumber}`}
          label="Test Details"
          placeholder="level and number/name etc"
          fullWidth
          value={props.values.sessions[index]["testDetails"]}
          onChange={e =>
            props.setFieldValue(
              `sessions[${index}][testDetails]`,
              e.target.value
            )
          }
          error={
            Boolean(props.errors.sessions) &&
            props.errors.sessions[index]["testDetails"]
          }
          helperText={
            Boolean(props.errors.sessions) &&
            props.errors.sessions[index]["testDetails"]
          }
        />
      </Grid>

      <Grid item xs={12}></Grid>
    </Grid>
  )
}

export default TestInfo
