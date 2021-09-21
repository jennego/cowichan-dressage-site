import React from "react"
import { navigate } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import MenuIcon from "@material-ui/icons/Menu"
import MenuList from "@material-ui/core/MenuList"
import MenuItem from "@material-ui/core/MenuItem"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import useBreakpoint from "use-breakpoint"
import useMediaQuery from "@material-ui/core/useMediaQuery"

import logo from "../images/cdclogo.png"

const BREAKPOINTS = { md: 768, lg: 980 }

const DesktopMenu = ({ children }) => (
  <MenuList style={{ display: "flex", flexDirection: "row" }}>
    {children}
  </MenuList>
)

const HamburgerMenu = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  /// fix this so menu is viewable, maybe use pull out instead

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={e => setAnchorEl(e.currentTarget)}
        edge="end"
        color="inherit"
        style={{ alignSelf: "flex-end" }}
        endIcon={<MenuIcon style={{ fontSize: 40 }} />}
      >
        Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {children}
      </Menu>
    </div>
  )
}

const MenuItems = () => (
  <>
    <MenuItem onClick={() => navigate("/event")} className="menu-item">
      Events and Entries{" "}
    </MenuItem>
    <MenuItem className="menu-item" onClick={() => navigate("/calendar")}>
      Calendar{" "}
    </MenuItem>

    <MenuItem className="menu-item" onClick={() => navigate("/membership")}>
      Membership{" "}
    </MenuItem>
    <MenuItem className="menu-item" onClick={() => navigate("/downloads")}>
      Downloads{" "}
    </MenuItem>
    <MenuItem className="menu-item" onClick={() => navigate("/about")}>
      About
    </MenuItem>
  </>
)

function Nav() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS)
  const matches = useMediaQuery("(max-width:1080px)")

  const logo = useStaticQuery(graphql`
    {
      file(name: { eq: "cdclogo" }) {
        id
        childrenImageSharp {
          gatsbyImageData(height: 69, width: 170, placeholder: BLURRED)
        }
      }
    }
  `)

  return (
    <AppBar>
      <Toolbar>
        <Grid container>
          <Grid
            item
            xs={7}
            lg={3}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="logo-header" onClick={() => navigate("/")}>
              <GatsbyImage
                image={logo.file.childrenImageSharp[0].gatsbyImageData}
                objectFit="contain"
                style={{ width: "120px" }}
              />
              <div className="logo-text-container">
                <h1 className="logo-text">Cowichan Dressage Club</h1>
              </div>
              {/* <Typography variant="h6">Cowichan Dressage Club</Typography> */}
            </div>
          </Grid>

          <Grid
            xs={5}
            lg={9}
            item
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {matches ? (
              <HamburgerMenu>
                <MenuItems />
              </HamburgerMenu>
            ) : (
              <DesktopMenu>
                <MenuItems />
              </DesktopMenu>
            )}

            {/* <IconButton edge="end" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>  */}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Nav
