import React, { useState, useEffect } from "react"
import Checkbox from "@material-ui/core/Checkbox"
import FormLabel from "@material-ui/core/FormLabel"
import Grid from "@material-ui/core/Grid"
import TestInfo from "../components/selectWithOther"
import { Card, CardContent, Typography } from "@material-ui/core"

import { Formik, Form, Field, FieldArray } from "formik"

const Sessions = ({ sessionArr, props }) => {
  const [selectedSessions, setSelectedSessions] = useState([])
  const [sessions, setAllSessions] = useState([])

  console.log("selected", selectedSessions)

  const newSessionArr = sessionArr.map((session, index) => ({
    id: index,
    title: `Session ${index + 1}`,
    checked: false,
    ...session,
  }))

  useEffect(() => {
    setAllSessions(newSessionArr)
  }, [])

  console.log("sessions", sessions)

  const totalCost = selectedSessions.reduce(function (prev, cur) {
    return prev + cur.cost
  }, 0)

  const renderCost = totalCost > 1 ? "$" + totalCost : "Free"

  const handleSelections = (e, session, index) => {
    console.log(e.target.checked, session, index)
    if (e.target.checked === true) {
      sessions.map(item =>
        session.id === item.id ? (item.checked = true) : item
      )

      setSelectedSessions(selectedSessions => [...selectedSessions, session])
      props.setFieldValue(
        "sessionsSelected",
        selectedSessions.map(item => item.title).join(", ")
      )
    } else {
      session.checked = false
      setSelectedSessions(selectedSessions.filter(item => index !== item.id))
    }
  }

  return (
    <div name="sessionsSelected">
      {sessions.map((session, index) => (
        <Grid container style={{ margin: "1.5rem 0" }}>
          <TextField name="session test input field" />
          <Grid item>
            <Checkbox
              name="sessionsSelected"
              style={{
                transform: "scale(1.2)",
              }}
              color="primary"
              onChange={e => handleSelections(e, session, index)}
            />
          </Grid>
          <Grid item style={{ flexGrow: "1" }}>
            <FormLabel>
              Session {index + 1} - Cost:{" "}
              {session.cost >= 1 ? "$" + session.cost : "Free"}
            </FormLabel>
            <Card
              className={
                session.checked === true ? "session-selected" : "session"
              }
              variant="outlined"
            >
              <CardContent>
                {session.description && (
                  <Typography variant="body1" style={{ padding: "0.5rem" }}>
                    {session.description.description}
                  </Typography>
                )}
                <div style={{ marginTop: "0.5rem" }}>
                  {session.testFields ? (
                    <div>
                      <Field
                        name="Test"
                        component={TestInfo}
                        props={props}
                        testNumber={index + 1}
                        index={index}
                      />
                      {/* <TestInfo
                        props={props}
                        testNumber={index + 1}
                        index={index}
                      /> */}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          {selectedSessions.length > 0
            ? `You have selected
          ${selectedSessions.length}
          session(s): ${selectedSessions.map(item => item.title).join(", ")}`
            : "No sessions currently selected"}
        </div>

        <div style={{ textAlign: "right" }}>
          {selectedSessions.length < 1
            ? "Select sessions to see cost"
            : `Cost: ${renderCost}`}
        </div>
      </div>
    </div>
  )
}

export default Sessions
