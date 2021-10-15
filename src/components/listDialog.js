import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useTheme } from "@material-ui/core/styles"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { Close } from "@material-ui/icons"
import { IconButton, Typography, Grid } from "@material-ui/core"
import ContactCard from "./contactCard"

export default function ResponsiveDialogContacts({ content, label, title }) {
  const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {label}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="lg"
      >
        <DialogTitle
          id="responsive-dialog-title"
          disableTypography
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            style={{ marginTop: "0.5rem" }}
          >
            {title}
          </Typography>
          <IconButton onClick={handleClose}>
            <Close fontSize="large" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="dialog-content">
            <Grid container spacing={1}>
              {content.map((item, index) => (
                <ContactCard contact={item} />
              ))}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
