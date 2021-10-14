import React from "react"
import { Typography, Card, CardContent, Grid } from "@material-ui/core"
import { Phone, AlternateEmail } from "@material-ui/icons"
import Obfuscate from "react-obfuscate"

const ContactCard = ({ contact }) => {
  const PhoneInfo = () => (
    <Grid container>
      <Grid item xs={1} style={{ marginTop: "5px" }}>
        <Phone />
      </Grid>
      <Grid item>
        <Obfuscate tel={contact.phoneNumber} />
      </Grid>
    </Grid>
  )

  const EmailInfo = () => (
    <Grid container>
      <Grid item xs={1} style={{ marginTop: "5px" }}>
        <AlternateEmail />
      </Grid>
      <Grid item>
        <Obfuscate email={contact.email} />
      </Grid>
    </Grid>
  )

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card elevation={7}>
        <CardContent>
          <Typography
            variant="body1"
            component="h3"
            style={{ fontSize: "24px", fontWeight: "500" }}
          >
            {contact.name}
          </Typography>
          <Typography variant="body1" style={{ fontStyle: "italic" }}>
            {contact.title ? contact.title : ""}
          </Typography>
          <Typography variant="body1">
            {contact.phoneNumber ? <PhoneInfo /> : ""}
          </Typography>
          <Typography variant="body1">
            {contact.email ? <EmailInfo /> : ""}
          </Typography>
          <Typography variant="body2">
            {contact.details ? contact.details.details : ""}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default ContactCard
