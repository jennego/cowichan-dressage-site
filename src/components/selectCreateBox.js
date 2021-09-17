/* eslint-disable no-use-before-define */
import React from "react"
import TextField from "@material-ui/core/TextField"
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete"
import InputAdornment from "@material-ui/core/InputAdornment"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"

const filter = createFilterOptions()

export default function SelectCreateBox({ field, form, list, ...other }) {
  const [value, setValue] = React.useState(null)

  return (
    <div>
      <Autocomplete
        value={field.value}
        name={field.name}
        id={field.id}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            form.setFieldValue(field.name, newValue.label, true)
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            form.setFieldValue(field.name, newValue.inputValue, true)
          } else if (newValue) {
            form.setFieldValue(field.name, newValue.label, true)
          } else {
            form.setFieldValue(field.name, newValue, true)
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)

          // Suggest the creation of a new value
          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              label: `Click to Use "${params.inputValue}"`,
            })
          }

          return filtered
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={list}
        getOptionLabel={option => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue
          }
          // Regular option
          return option.label
        }}
        renderOption={option => option.label}
        freeSolo
        fullWidth
        onKeyPress={e => {
          e.key === "Enter" && e.preventDefault()
        }}
        renderInput={params => (
          <TextField
            {...params}
            fullWidth
            label="Test Source (e.g. EC ) "
            helperText="click to choose option or type then click to add a different option"
            variant="filled"
          />
        )}
      />
    </div>
  )
}
