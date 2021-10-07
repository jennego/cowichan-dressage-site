import React from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import { PictureAsPdf } from "@material-ui/icons"
import GetAppIcon from "@material-ui/icons/GetApp"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import Tooltip from "@material-ui/core/Tooltip"

const PDFListItem = () => {
  return (
    <Grid item xs={12}>
      <List>
        <ListItem button component="a" style={{ border: "1px solid #000" }}>
          <ListItemIcon>
            <PictureAsPdf />
          </ListItemIcon>
          <ListItemText primary="PDF Name" />
          <ListItemSecondaryAction>
            <a href="#">
              <Tooltip title="Download File">
                <ListItemAvatar>
                  <Avatar style={{ background: "#3f50b5" }}>
                    <GetAppIcon />
                  </Avatar>
                </ListItemAvatar>
              </Tooltip>
            </a>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Grid>
  )
}

export default PDFListItem
