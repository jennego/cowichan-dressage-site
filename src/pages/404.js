import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Main from "../components/MainContent"
import { Typography, Button } from "@material-ui/core"
import { Link } from "gatsby"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />'
    <Main>
      <Typography variant="h1">404: Not Found</Typography>
      <Typography gutterBottom>
        You are at a url that doesn&#39;t exist on this site... well, that
        wasn't supposed to happen 🙁.
      </Typography>
      <Link>
        <Button variant="contained" color="primary">
          Go to home page
        </Button>
      </Link>
    </Main>
  </Layout>
)

export default NotFoundPage
