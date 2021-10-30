import React from "react"
import mapValues from "lodash/mapValues"
import { object, lazy, string, number } from "yup"

let testSchema = lazy(obj =>
  object(
    mapValues(obj, (value, key) => {
      if (key.includes("test")) {
        return string().required()
      }
      if (key.includes("testSource") === "other") {
        if (key.includes("otherDetails")) {
          return string().required()
        }
      }
    })
  )
)

let waiverSchema = lazy(obj =>
  object(
    mapValues(obj, (value, key) => {
      if (key.includes("waiver")) {
        return mixed().required("File is required")
      }
    })
  )
)

console.log(
  schema.validate(
    {
      testName: "Foobar",
      test2: "hi",
      other: "test",
      propertyName_2: "other",
      propertyValue_2: 200,
      propertyName_3: "hi",
      propertyValue_3: 5,
    },
    { strict: true }
  )
)

const About = () => {
  return <div>Hi </div>
}

export default About
