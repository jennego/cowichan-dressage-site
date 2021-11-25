import React from "react"
import Badge from "@material-ui/core/Badge"

const IsFullBadge = ({ isFull, children }) => {
  return (
    <div>
      {isFull && (
        <Badge
          badgeContent={"full"}
          color="secondary"
          // style={{ textTransform: "uppercase" }}
        >
          {children}
        </Badge>
      )}
    </div>
  )
}

export default IsFullBadge
