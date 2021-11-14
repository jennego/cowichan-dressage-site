import React, { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import Tooltip from "@material-ui/core/Tooltip"
import FormLabel from "@material-ui/core/FormLabel"
import { PictureAsPdf, Delete } from "@material-ui/icons"
import Alert from "@material-ui/lab/Alert"
import Button from "@material-ui/core/Button"
import PDFListItem from "./pdfListItem"
import { Typography, Paper, Grid, FormHelperText } from "@material-ui/core"

const UploadField = ({ index, doc, props, waiverType }) => {
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
    <div>
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
              Upload Completed
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
                      id: "`waiver${index + 1}`",
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

export const UploadComponent = ({ props, fileArray, waiverType }) => {
  // useEffect(() => {
  //   if (formik.values[waiver] === undefined) {
  //     formik.setFieldValue(waiver, null)
  //   }
  // }, [])

  // console.log("reject", fileRejections.length, "accepted", acceptedFiles)
  console.log(props)

  return (
    <div style={{ marginTop: "1rem" }}>
      <Typography variant="h5">Waivers</Typography>
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
        <Typography gutterBottom variant="body2">
          Showing {waiverType ? "junior" : "adult"} waivers. Select&nbsp;
          {waiverType ? "adult" : "junior"} age group to see&nbsp;
          {waiverType ? "adult" : "junior"} waivers.
        </Typography>
      </div>
      {fileArray.map((doc, index) => (
        <UploadField props={props} doc={doc} index={index} />
      ))}
    </div>
  )
}
