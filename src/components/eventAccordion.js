import React, { useState, useEffect, useLayoutEffect } from "react"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import ContactCard from "./contactCard"
import { set } from "date-fns"

const EventAccordion = ({ event }) => {
  const [expand, setExpand] = useState({ info: true })
  const [open, setOpen] = useState()

  console.log("expand", expand)

  useLayoutEffect(accordionId => {
    const anchor = window.location.hash.split("#")[1]
    if (anchor) {
      const anchorEl = document.getElementById(anchor)
      if (anchorEl) {
        let result = [...expand]
        result[anchor] = true
        setExpand(result)
        anchorEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        })
      }
    }
  }, [])

  const handleChange = idString => {
    if (expand[idString] === true) {
      let result = [...expand]
      result[idString] = false
      setExpand(result)
    } else {
      let result = [...expand]
      result[idString] = true
      setExpand(result)
    }

    // setExpand(expand => [...expand, { idString: true }])
    // setSelectedSessions(selectedSessions => [...selectedSessions, session])
    // if ((expand[id] = true)) {
    //   setExpand(...expand, { id: false })
    // } else {
    //   setExpand(...expand, { id: true })
    // }
  }

  return (
    <div>
      <Accordion
        onChange={() => handleChange("info")}
        className="event-border"
        expanded={expand["info"]}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="info-content"
          id="info"
        >
          <Typography variant="h4" component="h2">
            Event Info
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{renderRichText(event.eventInformation)}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        className="event-border"
        onChange={() => handleChange("rules")}
        expanded={expand["rules"]}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          expand={expand["rules"]}
          aria-controls="rules"
          id="rules"
        >
          <Typography variant="h4" component="h2">
            Rules
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{renderRichText(event.rules)}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="event-border">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="reg"
          id="reg"
        >
          <Typography variant="h4" component="h2">
            Registration
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ flexDirection: "column" }}>
          <Typography>{renderRichText(event.registrationInfo)}</Typography>
          <Button variant="contained" color="primary">
            Entry Form
          </Button>
        </AccordionDetails>
      </Accordion>
      {event.contacts ? (
        <Accordion className="event-border">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="contacts-info"
            id="contacts"
          >
            <Typography variant="h4" component="h2">
              Contacts
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              {event.contacts.map(contact => (
                <ContactCard contact={contact} />
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ) : (
        " "
      )}
    </div>
  )
}

export default EventAccordion
