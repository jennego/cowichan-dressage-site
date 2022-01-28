import React from "react"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"

const LocationInfo = props => {
  const { locationName, lat, lon } = props
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lon}`

  return (
    <Typography
      style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}
    >
      <LocationOnIcon />
      <Link href={mapLink} target="_blank" rel="noreferrer">
        {locationName}
      </Link>
    </Typography>
  )
}

export default LocationInfo
