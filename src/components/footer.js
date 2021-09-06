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
        © {new Date().getFullYear()} Cowichan Dressage Club, Built with{" "}
        <a href="https://www.gatsbyjs.com" style={{ color: "lightblue" }}>
          Gatsby
        </a>
      </div>
    </footer>
  )
}

export default Footer
