import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Badge from "@material-ui/core/Badge"

const ListBadge = withStyles(theme => ({
  badge: {
    right: -10,
    top: 3,
  },
}))(Badge)

const CalBadge = withStyles(theme => ({
  badge: {
    right: -36,
    top: 13,
  },
}))(Badge)

export default function IsFullBadge({ isFull, isCal, children }) {
  if (isCal) {
    return (
      <div>
        {isFull === true ? (
          <CalBadge
            className="badge-calendar"
            badgeContent={"full"}
            color="secondary"
            // style={{ textTransform: "uppercase" }}
          >
            {children}
          </CalBadge>
        ) : (
          <div>{children}</div>
        )}
      </div>
    )
  } else {
    return (
      <div>
        {isFull ? (
          <ListBadge
            className="badge-calendar"
            badgeContent={"full"}
            color="secondary"
            // style={{ textTransform: "uppercase" }}
          >
            {children}
          </ListBadge>
        ) : (
          <div>{children}</div>
        )}
      </div>
    )
  }
}
