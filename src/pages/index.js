import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { Typography, Button, Grid, Container, Paper } from "@material-ui/core"
import { Parallax, Background } from "react-parallax"
import logo from "../images/cdcpathwhitecrop.svg"

const IndexPage = () => (
  <Layout>
    <div className="hero">
      <StaticImage
        src="https://images.unsplash.com/photo-1523301758621-fe1569031789?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80"
        alt="fill murray"
        objectPosition="top"
        style={{
          height: "70vh",
          width: "100%",
        }}
      />

      <div className="overlay">
        <div className="hero-text">
          <div className="logo-container">
            <div style={{ width: "70%" }}>
              <img src={logo} />
            </div>
          </div>

          <Typography
            variant="h2"
            style={{ color: "#fff" }}
            className="hero-title"
          >
            Cowichan Dressage Club
          </Typography>
          <br></br>
          <Button variant="contained" color="primary">
            {" "}
            See Events{" "}
          </Button>
        </div>
      </div>
    </div>

    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "2rem",
        }}
      >
        <div className="short-about">
          We are a dressage club in the Cowichan Valley!
        </div>
        <Button variant="contained" color="primary">
          Join Us!
        </Button>
      </div>

      <Grid container spacing={3}>
        <Grid item md={6}>
          <Typography variant="h4">Upcoming Events</Typography>

          <List>
            <ListItem button>
              <ListItemText primary="Show and Tell" secondary="Jun 9, 2014" />
              <Button edge="end" aria-label="more-info" variant="outlined">
                More Info
              </Button>
            </ListItem>
            <ListItem button>
              <ListItemText primary="Schooling Show" secondary="July 7, 2014" />
              <Button edge="end" variant="outlined" aria-label="more-info">
                More Info
              </Button>
            </ListItem>
            <ListItem button>
              <ListItemText primary="Clinic" secondary="August 20, 2014" />
              <Button edge="end" variant="outlined" aria-label="more-info">
                More Info
              </Button>
            </ListItem>
          </List>

          <Button variant="contained">See All Events</Button>
        </Grid>

        <Grid item md={6}>
          <Typography variant="h4">News</Typography>
          Blog posts or social media feed
        </Grid>

        <Grid item md={6}>
          Image
        </Grid>
        <Grid item md={6}></Grid>
      </Grid>
    </Container>
  </Layout>
)

export default IndexPage
