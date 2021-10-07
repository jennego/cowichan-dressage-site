import React, { useEffect } from "react"
import { useDropzone } from "react-dropzone"
import Tooltip from "@material-ui/core/Tooltip"
import FormLabel from "@material-ui/core/FormLabel"
import { PictureAsPdf, Delete } from "@material-ui/icons"
import Alert from "@material-ui/lab/Alert"
import Button from "@material-ui/core/Button"
import PDFListItem from "./pdfListItem"

export const UploadComponent = ({ formik, label, inputName }, props) => {
  console.log("file", inputName)

  // useEffect(() => {
  //   if (formik.values[inputName] === undefined) {
  //     formik.setFieldValue(inputName, null)
  //   }
  // }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".pdf",
    multiple: false,
    onDrop: acceptedFiles => {
      formik.setFieldValue(inputName, acceptedFiles[0])
    },
  })

  return (
    <div>
      <PDFListItem />
      <FormLabel>{label} </FormLabel>
      <div className="dashed-border">
        {formik.values[inputName] === null ? (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps({ name: inputName })} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div style={{ padding: "1rem" }}>
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
                    formik.setFieldValue(inputName, null)
                  }}
                />
              </Tooltip>
            }
          >
            {formik.values[inputName].name}
          </Alert>
        )}
      </div>
    </div>
  )
}
