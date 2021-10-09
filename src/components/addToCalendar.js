import React from "react"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { ICalendar, GoogleCalendar, OutlookCalendar } from "datebook"
import parseISO from "date-fns/parseISO"
import toDate from "date-fns/toDate"
import { createTheme, ThemeProvider } from "@material-ui/core/styles"

const AddToCalendar = ({ event, date }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const eventInfo = {
    title: event.eventName ? event.eventName : " ",
    location: event.locationName ? event.locationName : " ",
    description: event.summary ? event.summary.summary : " ",
    start: toDate(new Date(date)),
  }

  console.log(event)
  const googleCalendar = new GoogleCalendar(eventInfo)
  const icalendar = new ICalendar(eventInfo)
  const outlookCal = new OutlookCalendar(eventInfo)
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Add to Calendar
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => window.open(googleCalendar.render(), "_blank")}
          className="cal-options"
        >
          Google Calendar
        </MenuItem>
        <MenuItem
          onClick={() => window.open(outlookCal.render(), "_blank")}
          className="cal-options"
        >
          Outlook Calendar
        </MenuItem>
        <MenuItem onClick={() => icalendar.download()} className="cal-options">
          iCal
        </MenuItem>
      </Menu>
    </div>
  )
}

export default AddToCalendar
