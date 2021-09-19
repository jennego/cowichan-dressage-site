import React, { useEffect } from "react"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"

const TestInfo = ({ form, props }) => {
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
      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel id="testSource">Test Source</InputLabel>
          <Select
            labelId="testSource"
            id="testSource"
            variant="filled"
            name="testSource"
            displayEmpty
            fullWidth
            value={props.values.testSource}
            onChange={props.handleChange}
          >
            {/* <MenuItem value={``}>Test Source</MenuItem> */}

            <MenuItem value={"EC"} onClick={() => setIsOther(false)}>
              EC
            </MenuItem>
            <MenuItem value={"HCBC"} onClick={() => setIsOther(false)}>
              HCBC
            </MenuItem>
            <MenuItem value={"Other"} onClick={() => setIsOther(true)}>
              Other (specify)
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {isOther ? (
        <Grid item xs={3}>
          <TextField
            name="otherDetails"
            id="otherDetails"
            variant="filled"
            label="Specify Other"
            helperText="details for other test source"
            fullWidth
            value={props.values.otherDetails}
            onChange={e =>
              props.setFieldValue("otherDetails", e.target.value, true)
            }
          />
        </Grid>
      ) : (
        ""
      )}

      <Grid item style={{ flexGrow: "1" }}>
        <TextField
          id="testDetails"
          variant="filled"
          name="testDetails"
          label="Test Details"
          placeholder="level and number/name etc"
          fullWidth
          value={props.values.test1}
          onChange={props.handleChange}
          error={props.touched.test1 && Boolean(props.errors.test1)}
          helperText={props.touched.test1 && props.errors.test1}
        />
      </Grid>

      <Grid item xs={12}></Grid>
    </Grid>
  )
}

export default TestInfo
