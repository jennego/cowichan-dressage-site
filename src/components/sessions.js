import React, { useState } from "react"
import Checkbox from "@material-ui/core/Checkbox"
import FormLabel from "@material-ui/core/FormLabel"
import Grid from "@material-ui/core/Grid"
import TestInfo from "../components/selectWithOther"
import { Card, CardContent, Typography } from "@material-ui/core"

const Sessions = ({ sessionArr, props }) => {
  const [selectedSessions, setSelectedSessions] = useState([])
  console.log(selectedSessions)

  const sessions = sessionArr.map((session, index) => ({
    id: index,
    // checked: false,
    ...session,
  }))

  console.log(sessions)

  const handleSelections = (e, session, index) => {
    console.log(e.target.checked, session, index)
    if (e.target.checked === true) {
      setSelectedSessions(selectedSessions => [...selectedSessions, session])
    } else {
      setSelectedSessions(selectedSessions.filter(item => index !== item.id))
    }
  }

  return (
    <div>
      {sessions.map((session, index) => (
        <Grid container>
          <Grid item style={{ marginTop: "10px" }}>
            <Checkbox
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
              variant="outlined"
              style={{
                borderWidth: "2px",
                marginBottom: "1rem",
              }}
            >
              <CardContent>
                <Typography variant="body1" style={{ padding: "0.5rem" }}>
                  Description if required
                </Typography>
                <div style={{ marginTop: "0.5rem" }}>
                  <FormLabel component="legend">Test Info </FormLabel>
                  {session.testFields}
                  {session.testFields ? <TestInfo props={props} /> : ""}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ))}
    </div>
  )
}

export default Sessions
