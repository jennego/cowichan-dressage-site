import React from "react"
import { Typography, Card, CardContent, Grid } from "@material-ui/core"
import { Phone, AlternateEmail } from "@material-ui/icons"

const ContactCard = () => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Typography variant="body1"> Jennifer Chow </Typography>
          <Typography variant="body2" style={{ fontStyle: "italic" }}>
            {" "}
            Web Developer{" "}
          </Typography>
          <Typography variant="body2">
            For issues with web forms or website only.
          </Typography>

          <Typography variant="body2"> jen@jenniferchow.ca </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default ContactCard
