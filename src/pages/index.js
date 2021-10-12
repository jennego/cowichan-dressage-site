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

import { format, parseISO, isAfter, toDate } from "date-fns"

import { ListItemIcon } from "@material-ui/core"
import EventIcon from "@material-ui/icons/Event"

import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import Collapse from "@material-ui/core/Collapse"
import AddToCalendar from "../components/addToCalendar"
import { useStaticQuery, graphql, navigate } from "gatsby"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulEvent {
        edges {
          node {
            id
            eventName
            summary {
              summary
            }
            slug
            locationName
            location {
              lat
              lon
            }
            eventDates {
              id
              date
              locationName
              location {
                lat
                lon
              }
            }
          }
        }
      }
    }
  `)

  const dateArrays = data.allContentfulEvent.edges.map(({ node }) =>
    node.eventDates.map((date, index) => ({
      id: node.id + date.id + index,
      date: date.date.toString(),
      start: toDate(new Date(parseISO(date.date))),
      end: date.endDate
        ? toDate(new Date(parseISO(date.endDate)))
        : toDate(new Date(parseISO(date.date))),
      title: node.eventName,
      slug: node.slug,
      locationName: date.locationName ? date.locationName : node.locationName,
      allDay: true,
      description: node.summary.summary,
    }))
  )

  const dateArr = [].concat.apply([], dateArrays)

  const upcoming = dateArr.filter(date =>
    isAfter(date.start, new Date()) ? date : ""
  )

  console.log(upcoming)

  const [selectedIndex, setSelectedIndex] = React.useState("")

  const handleClick = index => {
    if (selectedIndex === index) {
      setSelectedIndex("")
    } else {
      setSelectedIndex(index)
    }
  }

  console.log(selectedIndex)

  return (
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
                <img src={logo} alt="Cowichan Dressage Club" />
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
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
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper>
              <Typography variant="h4" style={{ padding: "5px" }}>
                Upcoming Events
              </Typography>
              <Grid container>
                {upcoming.map(event => (
                  <div
                    style={{
                      borderBottom: "1px solid #000",
                      width: "100%",
                      display: "flex",
                      padding: "1rem",
                      alignItems: "center",
                    }}
                    className="agendaDateRow"
                  >
                    <Grid item xs={12}>
                      <Grid>
                        <ListItem
                          button
                          onClick={() => {
                            handleClick(event.id)
                          }}
                        >
                          <ListItemIcon>
                            <EventIcon fontSize="large" />
                          </ListItemIcon>
                          <ListItemText
                            // secondary={date.subtitle}
                            style={{
                              // paddingRight: "0.5rem",
                              justifyContent: "center",
                            }}
                          />
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <div>
                                {format(new Date(event.start), "LLLL d, yyyy")}
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <div>{event.title}</div>
                            </Grid>
                          </Grid>
                          {event.id === selectedIndex ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </ListItem>
                        <Collapse
                          in={event.id === selectedIndex}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List
                            component="div"
                            disablePadding
                            style={{ background: "#e3e3e3" }}
                          >
                            <ListItem
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                              button
                              onClick={() => {
                                navigate(`/events/${event.slug}`)
                              }}
                            >
                              <ListItemText
                                disableTypography
                                primary="More Info"
                                className="date-menu"
                              />
                            </ListItem>
                            <ListItem
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <AddToCalendar event={event} isCalArr={true} />
                            </ListItem>
                            {isAfter(event.start, new Date()) ? (
                              <ListItem
                                button
                                onClick={() =>
                                  navigate(`${event.slug}`, {
                                    state: { date: event.date },
                                  })
                                }
                              >
                                <ListItemText
                                  disableTypography
                                  primary="Entry Form"
                                  className="date-menu"
                                />
                              </ListItem>
                            ) : (
                              <ListItem
                                button
                                onClick={() =>
                                  navigate(`/${event.date}/results`)
                                }
                              >
                                <ListItemText
                                  disableTypography
                                  primary="Results"
                                  className="date-menu"
                                />
                              </ListItem>
                            )}
                          </List>
                        </Collapse>
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </Grid>

              {/* <List>
                <ListItem button>
                  <ListItemText
                    primary="Show and Tell"
                    secondary="Jun 9, 2014"
                  />
                  <Button edge="end" aria-label="more-info" variant="outlined">
                    More Info
                  </Button>
                </ListItem>
                <ListItem button>
                  <ListItemText
                    primary="Schooling Show"
                    secondary="July 7, 2014"
                  />
                  <Button edge="end" variant="outlined" aria-label="more-info">
                    More Info
                  </Button>
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Clinic" secondary="August 20, 2014" />
                  <Button edge="end" variant="outlined" aria-label="more-info">
                    Add to Calendar
                  </Button>
                  <Button edge="end" variant="outlined" aria-label="more-info">
                    Entry
                  </Button>
                  <Button edge="end" variant="outlined" aria-label="more-info">
                    More Info
                  </Button>
                </ListItem>
              </List> */}

              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "0.8rem", marginBottom: "1rem" }}
              >
                See All Events
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FCowichanDressageClub&tabs=timeline&width=450&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=936287190463514"
              width="450"
              height="600"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </Grid>
        </Grid>
      </Container>

      <div style={{ display: "flex", marginTop: "2rem", maxHeigh: "500px" }}>
        <StaticImage
          src="https://images.unsplash.com/flagged/photo-1568382007362-5d0d0a26b422?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
          alt="filler"
        />
        <StaticImage
          src="https://images.unsplash.com/photo-1610766920689-5d4c57e1dfba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=972&q=80"
          alt="filler"
        />
        <StaticImage
          src="https://images.unsplash.com/photo-1595675759778-dcfbbc6629bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
          alt="filler"
        />
      </div>
    </Layout>
  )
}

export default IndexPage
