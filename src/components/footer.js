import React from "react"

const Footer = () => {
  return (
    <footer
      style={{
        background: "#3f50b5",
        color: "white",
        height: "5rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ marginLeft: "2rem" }}>
        <div>
          <p>
            © {new Date().getFullYear()} Cowichan Dressage Club. Built with{" "}
            <a href="https://www.gatsbyjs.com" style={{ color: "lightblue" }}>
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
    </footer>
  )
}

export default Footer
