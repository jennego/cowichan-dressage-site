import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import { createTheme, ThemeProvider } from "@material-ui/core/styles"

import Nav from "./header"
import "./layout.css"
import Footer from "./footer"
import Seo from "./seo"

const theme = createTheme({
  typography: {
    body1: {
      fontSize: 20,
    },
    body2: {
      fontSize: 16,
    },
  },
  palette: {
    canvasColor: "#fff",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      <Seo title="Cowichan Dressage Club" />

      <Nav />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
