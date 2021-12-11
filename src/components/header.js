import React from "react"
import { navigate, Link as GatsbyLink } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuIcon from "@material-ui/icons/Menu"
import MenuList from "@material-ui/core/MenuList"
import MenuItem from "@material-ui/core/MenuItem"
import Grid from "@material-ui/core/Grid"
import useMediaQuery from "@material-ui/core/useMediaQuery"

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
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            marginTop: "30px",
            background: "slategray",
          },
        }}
      >
        <MenuItem
          style={{
            flexDirection: "column",
          }}
        >
          {children}
        </MenuItem>
      </Menu>
    </div>
  )
}

const isPartiallyActive = ({ isPartiallyCurrent }) => {
  return isPartiallyCurrent
    ? { className: "active-nav menu-item" }
    : { className: "menu-item hvr-outline-in" }
}

const PartialNavLink = props => (
  <GatsbyLink getProps={isPartiallyActive} {...props}>
    {props.children}
  </GatsbyLink>
)

const MenuItems = () => (
  <>
    <PartialNavLink to="/events" style={{ alignSelf: "center" }}>
      Events
    </PartialNavLink>

    <PartialNavLink to="/calendar" style={{ alignSelf: "center" }}>
      Calendar
    </PartialNavLink>

    <PartialNavLink to="/membership" style={{ alignSelf: "center" }}>
      Membership
    </PartialNavLink>
    <PartialNavLink to="/resources" style={{ alignSelf: "center" }}>
      Resources
    </PartialNavLink>
  </>
)

function Nav() {
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
                style={{ maxWidth: "120px" }}
                alt="Cowichan Dresage Club logo"
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
