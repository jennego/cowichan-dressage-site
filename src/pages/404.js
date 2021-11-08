import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Main from "../components/MainContent"
import { Typography, Button } from "@material-ui/core"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />'
    <Main>
      <Typography variant="h1">404: Not Found</Typography>
      <Typography gutterBottom>
        You are at a url that doesn&#39;t exist on this site... well, that
        wasn't supposed to happen 🙁.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Go to home page
      </Button>
    </Main>
  </Layout>
)

export default NotFoundPage
