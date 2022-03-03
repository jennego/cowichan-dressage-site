import React, { useState, useEffect, useLayoutEffect } from "react"

import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Entry from "../templates/entry"
import { useQueryParam } from "gatsby-query-params"
import { navigate } from "gatsby"
import { RichTextLinks } from "../components/linkNewWindow"

// use query string to open/close accordian

// push or remove ids to an array, determine true/false based on presence in array

const EventAccordion = ({ event, data, location, square }) => {
  const [expand, setExpand] = useState("info")
  const queryValue = useQueryParam("id", "info")
  const dateQueryValue = useQueryParam("date")
  const refreshQueryValue = useQueryParam("refresh")

  useLayoutEffect(() => {
    if (queryValue) {
      setExpand(queryValue)
      const anchorEl = document.getElementById(queryValue)

      if (queryValue !== "info") {
        anchorEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    } else {
      setExpand("info")
    }
  }, [queryValue])

  useEffect(() => {
    if (queryValue === "reg") {
      setExpand("reg")
      const anchorEl = document.getElementById("reg")

      if (queryValue !== "info") {
        anchorEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }
  }, [dateQueryValue, refreshQueryValue, queryValue])

  const handleChange = idString => {
    if (expand === idString) {
      setExpand(null)
    } else {
      setExpand(idString)
    }
  }

  const scrollToReg = () => {
    navigate("?id=reg")
    setExpand("reg")
  }

  const scrollToRules = () => {
    setExpand("rules")
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={scrollToReg}
        style={{ marginBottom: "1rem" }}
      >
        Go to Entry Form
      </Button>

      <div className="eventAccordion">
        {event.eventInformation && (
          <Accordion
            onChange={() => handleChange("info")}
            className={
              expand === "info"
                ? "event-border"
                : "event-border accordion-hover"
            }
            expanded={expand === "info" ? true : false}
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
              <Typography>
                {RichTextLinks(event.eventInformation)}

                {event.resources &&
                  event.resources.map(resource => (
                    <a
                      href={resource.file.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ margin: "5px" }}
                      >
                        {resource.file.fileName}
                      </Button>
                    </a>
                  ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
        )}
        {event.rules && (
          <Accordion
            onChange={() => handleChange("rules")}
            className={
              expand === "rules"
                ? "event-border"
                : "event-border accordion-hover"
            }
            expanded={expand === "rules" ? true : false}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="rules-content"
              id="rules"
            >
              <Typography variant="h4" component="h2">
                Rules &amp; Other Important Info
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{RichTextLinks(event.rules)}</Typography>
            </AccordionDetails>
          </Accordion>
        )}
        {event.testInfo && (
          <Accordion
            onChange={() => handleChange("testInfo")}
            expanded={expand === "testInfo" ? true : false}
            className={
              expand === "testInfo"
                ? "event-border"
                : "event-border accordion-hover"
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="testInfo"
              id="testInfo"
            >
              <Typography variant="h4" component="h2">
                Test Info
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{RichTextLinks(event.testInfo)}</Typography>
            </AccordionDetails>
          </Accordion>
        )}
        {event.cancellationPolicy && (
          <Accordion
            onChange={() => handleChange("cancellationPolicy")}
            className={
              expand === "cancellationPolicy"
                ? "event-border"
                : "event-border accordion-hover"
            }
            expanded={expand === "cancellationPolicy" ? true : false}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="cancellation policy"
              id="cancellationPolicy"
            >
              <Typography variant="h4" component="h2">
                Cancellation Policy
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{RichTextLinks(event.cancellationPolicy)}</Typography>
            </AccordionDetails>
          </Accordion>
        )}
        <Accordion
          onChange={() => handleChange("reg")}
          expanded={expand === "reg" ? true : false}
          className={
            expand === "reg" ? "event-border" : "event-border accordion-hover"
          }
        >
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
            {/* {event.confirmationMessage && (
            <Typography>{RichTextLinks(event.confirmationMessage)}</Typography>
          )} */}
            {event.registrationInfo && (
              <Typography>{RichTextLinks(event.registrationInfo)}</Typography>
            )}
            <Entry
              data={data}
              location={location}
              date={dateQueryValue}
              square={square}
              scrollToRules={scrollToRules}
            />

            {/* <Link to={"entry"} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "0.5rem 0.2rem" }}
            >
              Entry Form
            </Button> 
            </Link>
            */}
          </AccordionDetails>
        </Accordion>
        {/* 
      {event.contacts &&(
        <Accordion
          onChange={() => handleChange("contacts")}
          expanded={expand === "contacts" ? true : false}
          className={
            expand === "contacts"
            ? "event-border"
              : "event-border accordion-hover"
          }
        >
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
              {event.contacts.map((contact, index) => (
                <ContactCard contact={contact} key={index} />
                ))}
                </Grid>
                </AccordionDetails>
        </Accordion>)} */}
      </div>
    </>
  )
}

export default EventAccordion
