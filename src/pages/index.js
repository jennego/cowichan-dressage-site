import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { Typography, Button, Grid, Container, Paper } from "@material-ui/core"
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
      allContentfulSiteInfo {
        edges {
          node {
            siteName
            homePageMainPhoto {
              gatsbyImageData(placeholder: BLURRED)
              title
            }
            homeOpeningStatement {
              homeOpeningStatement
            }
            homePageBottomPhotos {
              gatsbyImageData(placeholder: BLURRED)
              title
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
    console.log(index)
    if (selectedIndex === index) {
      setSelectedIndex("")
    } else {
      setSelectedIndex(index)
    }
  }

  console.log(data)

  const siteInfo = data.allContentfulSiteInfo.edges[0].node

  return (
    <Layout>
      <div className="hero" style={{ height: "80vh" }}>
        <GatsbyImage
          image={siteInfo.homePageMainPhoto.gatsbyImageData}
          alt={siteInfo.homePageMainPhoto.title}
          objectPosition="top"
          style={{
            height: "80vh",
            width: "100%",
          }}
        />

        <div className="overlay">
          <div className="hero-text">
            <div className="logo-container">
              <div style={{ width: "50%" }}>
                <img src={logo} alt="Cowichan Dressage Club" />
              </div>
            </div>

            <Typography
              variant="h2"
              style={{ color: "#fff" }}
              className="hero-title"
            >
              {siteInfo.siteName}
            </Typography>
            <br></br>
            <Button variant="contained" color="primary">
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
                <Typography variant="body1">
                  {siteInfo.homeOpeningStatement.homeOpeningStatement}
                </Typography>
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

              <Button
                variant="contained"
                color="primary"
                style={{ margin: "1rem 2rem" }}
                onClick={() => {
                  navigate("/calendar")
                }}
              >
                See All Events and Dates
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FCowichanDressageClub&tabs=timeline&width=450&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=936287190463514"
              title="facebook"
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

      <div style={{ display: "flex", marginTop: "2rem", maxHeight: "300px" }}>
        {siteInfo.homePageBottomPhotos.map(photo => (
          <GatsbyImage
            image={photo.gatsbyImageData}
            alt={photo.title}
            style={{ maxWidth: "40%" }}
          />
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage
