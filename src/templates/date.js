import React from "react"

import mapValues from "lodash/mapValues"
import { object, lazy, string, number } from "yup"

let schema = lazy(obj =>
  object(
    mapValues(obj, (value, key) => {
      if (key.includes("property")) {
        return string().required()
      }
      if (key.includes("propertyValue")) {
        return number().required()
      }
    })
  )
)
console.log(
  schema.validate(
    {
      Property: null,
      propertyValue_1: 1000,
      propertyName_2: "Foobar",
      propertyValue_2: 200,
      propertyName_3: "",
      propertyValue_3: null,
    },
    { strict: true }
  )
)

console.log("hi")

const Date = () => {
  return <div>Date</div>
}

export default Date
