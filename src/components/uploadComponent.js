import React, { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import Tooltip from "@material-ui/core/Tooltip"
import FormLabel from "@material-ui/core/FormLabel"
import { PictureAsPdf, Delete } from "@material-ui/icons"
import Alert from "@material-ui/lab/Alert"
import Button from "@material-ui/core/Button"
import PDFListItem from "./pdfListItem"
import { Typography, Paper, Grid } from "@material-ui/core"

export const UploadComponent = (
  { formik, label, inputName, fileArray },
  props
) => {
  console.log("file", inputName)

  // useEffect(() => {
  //   if (formik.values[inputName] === undefined) {
  //     formik.setFieldValue(inputName, null)
  //   }
  // }, [])

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
      formik.setFieldValue(inputName, acceptedFiles[0])
    },
  })

  // console.log("reject", fileRejections.length, "accepted", acceptedFiles)
  // console.log(formik)

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
      </div>
      {fileArray.map((doc, index) => (
        <Paper elevation={5} className="pdf-item">
          <Grid container spacing={2}>
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
              <div className="dashed-border">
                {acceptedFiles.length === 0 ? (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps({ name: inputName })} />
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
                            formik.setFieldValue(inputName, null)
                          }}
                        />
                      </Tooltip>
                    }
                  >
                    {acceptedFiles[0].name}
                    {/* {formik.values[inputName].name} */}
                  </Alert>
                )}
              </div>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  )
}
