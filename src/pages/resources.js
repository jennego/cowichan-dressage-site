import React from "react"
import Layout from "../components/layout"
import Main from "../components/MainContent"
import { Typography, Card, CardContent, Grid } from "@material-ui/core"
import ContactCard from "../components/contactCard"

const Downloads = () => {
  return (
    <Layout>
      <Main>
        List of all forms and downloads here
        <Typography variant="h4"> Contacts </Typography>
        <Typography variant="h4"> Technical Contact </Typography>
        <Grid container>
          <Typography variant="body1">
            For issues with web forms or website
          </Typography>
          <ContactCard />
        </Grid>
      </Main>
    </Layout>
  )
}

export default Downloads
