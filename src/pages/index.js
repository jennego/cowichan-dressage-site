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
        <Grid item xs={12} md={6}>
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

        <Grid item xs={12} md={6}>
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FCowichanDressageClub&tabs=timeline&width=450&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=936287190463514"
            width="450"
            height="500"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameborder="0"
            allowfullscreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </Grid>
      </Grid>
    </Container>

    <div style={{ display: "flex", marginTop: "2rem", maxHeigh: "500px" }}>
      <StaticImage src="https://images.unsplash.com/flagged/photo-1568382007362-5d0d0a26b422?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80" />
      <StaticImage src="https://images.unsplash.com/photo-1610766920689-5d4c57e1dfba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=972&q=80" />
      <StaticImage src="https://images.unsplash.com/photo-1595675759778-dcfbbc6629bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80" />
    </div>
  </Layout>
)

export default IndexPage
