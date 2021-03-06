import React from "react"
import { Typography, Card, CardContent, Grid } from "@material-ui/core"
import { Phone, AlternateEmail } from "@material-ui/icons"
import Obfuscate from "react-obfuscate"

const ContactCard = ({ contact }) => {
  const PhoneInfo = () => (
    <Grid container>
      <Grid item style={{ marginRight: "6px" }}>
        <Phone />
      </Grid>
      <Grid item>
        <Typography variant="body1">
          <Obfuscate sms={contact.phoneNumber} />
        </Typography>
      </Grid>
    </Grid>
  )

  const EmailInfo = () => (
    <Grid container style={{ marginTop: "-2px" }}>
      <Grid item style={{ marginRight: "6px" }}>
        <AlternateEmail />
      </Grid>
      <Grid item>
        <Typography variant="body1">
          <Obfuscate email={contact.email} />
        </Typography>
      </Grid>
    </Grid>
  )

  return (
    <Grid item xs={12} md={6}>
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
          {contact.phoneNumber ? <PhoneInfo /> : ""}

          {contact.email ? <EmailInfo /> : ""}
          <Typography variant="body2">
            {contact.details ? contact.details.details : ""}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default ContactCard
