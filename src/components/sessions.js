import React from "react"
import Checkbox from "@material-ui/core/Checkbox"
import FormLabel from "@material-ui/core/FormLabel"
import Grid from "@material-ui/core/Grid"
import TestInfo from "../components/selectWithOther"
import { Card, CardContent, Typography } from "@material-ui/core"

import { Field } from "formik"

const Sessions = ({
  sessionArr,
  props,
  isChecked,
  selectedSessions,
  handleSelections,
}) => {
  const newSessionArr = sessionArr.map((session, index) => ({
    id: index,
    title: `Session ${index + 1}`,
    ...session,
  }))

  const totalCost = selectedSessions.reduce(function (prev, cur) {
    return prev + cur.cost
  }, 0)

  const renderCost = totalCost > 1 ? "$" + totalCost : "Free"

  /// figure out another way that doesn't rely on check box - probably index?

  // try for each instead of map? Use formik array methods?

  return (
    <div>
      {newSessionArr.map((session, index) => (
        <Grid container style={{ margin: "1.5rem 0" }} key={index}>
          <Grid>
            <Checkbox
              name="selectedSessions"
              style={{
                transform: "scale(1.2)",
              }}
              color="primary"
              checked={isChecked(selectedSessions, session)}
              onChange={e => handleSelections(e, session, index)}
            />
          </Grid>
          <Grid item style={{ flexGrow: "1" }}>
            <FormLabel>
              <span
                style={{
                  fontWeight: "bold",
                  color: isChecked(selectedSessions, session)
                    ? "#3f50b5"
                    : "grey",
                }}
              >
                Session {index + 1} - Cost:{" "}
                {session.cost >= 1 ? "$" + session.cost : "Free"}
              </span>
            </FormLabel>
            <Card
              onClick={e => handleSelections(e, session, index)}
              className={
                isChecked(selectedSessions, session) === true
                  ? "session-selected"
                  : "session"
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
                        onClick={e => e.stopPropagation()}
                        name="Test"
                        component={TestInfo}
                        props={props}
                        testNumber={index + 1}
                        index={index}
                        disabled={
                          isChecked(selectedSessions, session) === true
                            ? false
                            : true
                        }
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
        <div>{renderCost}</div>
        <Field
          type="hidden"
          name="selectedSessions"
          label="Selected Sessions"
          value={props.values.selectedSessions}
        />

        {/* <div style={{ textAlign: "right" }}>
          {selectedSessions.length < 1
            ? "Select sessions to see cost"
            : `Cost: ${renderCost}`}
        </div> */}
      </div>
    </div>
  )
}

export default Sessions
