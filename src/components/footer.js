import React from "react"
import Grid from "@material-ui/core/Grid"
import FacebookIcon from "@material-ui/icons/Facebook"
import IconButton from "@material-ui/core/IconButton"

const Footer = () => {
  return (
    <footer
      style={{
        background: "#3f50b5",
        color: "white",
        minHeight: "5rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={6}>
          <div style={{ marginLeft: "2rem" }}>
            <div>
              <p>
                © {new Date().getFullYear()} Cowichan Dressage Club. Built with{" "}
                <a
                  href="https://www.gatsbyjs.com"
                  style={{ color: "lightblue" }}
                >
                  Gatsby
                </a>
              </p>
              <p>
                Site developed by{" "}
                <a
                  href="http://jenniferchow.ca"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "lightblue" }}
                >
                  Jennifer Chow
                </a>
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} style={{ textAlign: "right" }}>
          <a
            href="https://www.facebook.com/CowichanDressageClub"
            target="_blank"
            rel="noreferrer"
          >
            <IconButton>
              <FacebookIcon
                color="white"
                style={{ color: "white", fontSize: 35 }}
              />
            </IconButton>
          </a>
        </Grid>
      </Grid>
    </footer>
  )
}

export default Footer
