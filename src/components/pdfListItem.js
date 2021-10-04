import React from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import { PictureAsPdf, DownloadForOffline } from "@material-ui/icons"

const PDFListItem = ({ pdf }) => {
  return (
    <Grid item xs={12}>
      <List>
        <ListItem button component="a" href={pdf.file} target="_blank">
          <ListItemIcon>
            <PictureAsPdf />
          </ListItemIcon>
          <ListItemText primary={pdf.title} />
          <ListItemSecondaryAction>
            <a href="#">
              <DownloadForOffline />
            </a>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Grid>
  )
}

export default PDFListItem
