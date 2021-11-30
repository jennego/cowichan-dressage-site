import React from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"
import { PDFObject } from "react-pdfobject"
import { Typography } from "@material-ui/core"
import { format, parseISO } from "date-fns"

const Results = ({ pageContext }) => {
  const results = pageContext.results

  return (
    <Layout>
      <Main>
        <Typography variant="h4" component="h1">
          Results for{" "}
          {pageContext.event ? pageContext.event[0].eventName : "an event"} on
          {format(new Date(parseISO(pageContext.date)), " LLL d, yyyy")}
        </Typography>
        {results === null ? (
          <Typography variant="body1">
            No results received yet or not applicable to this event.
          </Typography>
        ) : (
          <PDFObject
            url={results.file.url}
            height="100vh"
            pdfOpenParams={{ pagemode: "none", view: "fitH" }}
            fallbackLink={
              <p>
                Your browser doesn't support inline pdfs. Download PDF here{" "}
                <a href={results.file.url}> {results.title} </a>
              </p>
            }
          />
        )}
      </Main>
    </Layout>
  )
}

export default Results
