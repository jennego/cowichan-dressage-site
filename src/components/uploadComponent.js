import React, { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import Tooltip from "@material-ui/core/Tooltip"
import FormLabel from "@material-ui/core/FormLabel"
import { PictureAsPdf, Delete } from "@material-ui/icons"
import Alert from "@material-ui/lab/Alert"
import Button from "@material-ui/core/Button"
import PDFListItem from "./pdfListItem"
import {
  Typography,
  Paper,
  Grid,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"

const UploadField = ({ index, doc, props, waiverType, hidden }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: ".pdf",
    multiple: false,
    onDrop: acceptedFiles => {
      props.setFieldValue(`waiver${index + 1}`, acceptedFiles[0])
    },
  })
  const isJunior = waiverType === "junior"

  return (
    <div style={{ visibility: hidden ? "hidden" : "block" }}>
      <Paper elevation={5} className="pdf-item">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormLabel>
              Download
              <span style={{ fontStyle: "italic" }}> {doc.title} </span>
            </FormLabel>
            <PDFListItem file={doc.file} />
          </Grid>
          <Grid item xs={12}>
            <FormLabel>
              Upload Completed Form
              <span style={{ fontStyle: "italic" }}> {doc.title} </span>
            </FormLabel>
            <div
              className={
                Boolean(props.errors[`waiver${index + 1}`]) &&
                props.touched[`waiver${index + 1}`]
                  ? "error-border"
                  : "dashed-border"
              }
            >
              {acceptedFiles.length === 0 ? (
                <div {...getRootProps({ className: "dropzone" })}>
                  <input
                    {...getInputProps({
                      name: `waiver${index + 1}`,
                      id: `waiver${index + 1}`,
                    })}
                  />
                  {isDragActive ? (
                    <div style={{ padding: "1rem" }}>
                      <Typography variant="body1">
                        Drop the file here ...
                      </Typography>
                    </div>
                  ) : (
                    <div style={{ padding: "1rem" }}>
                      {fileRejections.length > 0 ? (
                        <Alert
                          severity="error"
                          style={{ marginBottom: "1rem" }}
                        >
                          Please upload a PDF file.
                        </Alert>
                      ) : (
                        ""
                      )}
                      <Button variant="contained" color="primary">
                        Drag and Drop file here or click to upload
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <Alert
                  icon={<PictureAsPdf />}
                  action={
                    <Tooltip title="Remove this file">
                      <Delete
                        onClick={() => {
                          acceptedFiles.length = 0
                          props.setFieldValue(`waiver${index + 1}`, null)
                        }}
                      />
                    </Tooltip>
                  }
                >
                  {acceptedFiles[0].name}
                  {/* {formik.values[waiver].name} */}
                </Alert>
              )}
            </div>
            {Boolean(props.errors[`waiver${index + 1}`]) &&
            props.touched[`waiver${index + 1}`] ? (
              <FormHelperText error={true} filled={true}>
                The file {doc.file.fileName} is required.
              </FormHelperText>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

const WaiverPlaceholder = ({ fileArray, props }) => (
  <div>
    <div className="waiver-placeholder">
      <ArrowUpwardIcon fontSize="large" /> Select Participant Age (above) to
      View and Upload Required Waivers
    </div>
    {fileArray.map((doc, index) => (
      <UploadField props={props} doc={doc} index={index} hidden={true} />
    ))}
  </div>
)

export const UploadComponent = ({ props, fileArray, waiverType }) => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <Typography variant="h4">Waivers</Typography>
      <div style={{ margin: "0.5rem 0 1rem 0" }}>
        <Typography gutterBottom variant="body2">
          Please download listed PDFs, fill it out (if not a fillable PDF, you
          can use software such as&nbsp;
          <a
            href="https://get.adobe.com/reader/"
            target="_blank"
            rel="noreferrer"
          >
            Adobe Reader DC
          </a>
          ) and upload it in the appropriate upload section.
        </Typography>
      </div>
      <Grid item xs={12}>
        <FormLabel component="legend">Participant Age</FormLabel>
        <RadioGroup
          aria-label="age"
          name="age"
          id="age"
          style={{ display: "flex", flexDirection: "row", marginTop: "0" }}
          onBlur={props.handleBlur}
          value={props.values.age}
          onChange={e => props.setFieldValue("age", e.target.value)}
        >
          <FormControlLabel
            value="adult"
            control={<Radio />}
            label="Senior (Over Age of Majority"
            name="age"
          />
          <FormControlLabel
            value="junior"
            control={<Radio />}
            label="Junior (Under Age of Majority)"
            name="age"
          />
        </RadioGroup>
        <div>
          {props.touched.age && Boolean(props.errors.age) ? (
            <FormHelperText error>
              Age group is required and will reflect waivers.
            </FormHelperText>
          ) : (
            ""
          )}
        </div>
      </Grid>
      {props.values.age === "" ? (
        <WaiverPlaceholder fileArray={fileArray} props={props} />
      ) : (
        <div>
          <Typography gutterBottom variant="body1">
            Curently Showing{" "}
            <span style={{ fontWeight: "bold" }}>
              {props.values.age} waivers.
            </span>{" "}
            Select&nbsp;
            {props.values.age === "junior" ? "senior" : "junior"} age group to
            see&nbsp;
            {props.values.age === "junior" ? "adult" : "junior"} waivers.
          </Typography>
          {fileArray.map((doc, index) => (
            <UploadField props={props} doc={doc} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}
