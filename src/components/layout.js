import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import { createTheme, ThemeProvider } from "@material-ui/core/styles"

import Nav from "./header"
import "./layout.css"
import Footer from "./footer"

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
  overrides: {
    MuiFormLabel: {
      fontSize: 20,
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
