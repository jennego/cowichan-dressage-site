import React from "react"
import mapValues from "lodash/mapValues"
import { object, lazy, string, number, mixed } from "yup"

// let testSchema = lazy(obj =>
//   object(
//     mapValues(obj, (value, key) => {
//       if (key.includes("test")) {
//         return string().required()
//       }
//       if (key.includes("testSource") === "other") {
//         if (key.includes("otherDetails")) {
//           return string().required()
//         }
//       }
//     })
//   )
// )

let waiverSchema = lazy(obj =>
  object(
    mapValues(obj, (value, key) => {
      if (key.includes("waiver")) {
        return mixed().required()
      }
    })
  )
)

// console.log(
//   testSchema.validate(
//     {
//       testName: "Foobar",
//       test2: "hi",
//       test: "",
//     },
//     { strict: true }
//   )
// )

console.log(
  waiverSchema.validate(
    {
      waiver: { file: { path: "filename" } },
      // waiver3: null,
    },
    { strict: true }
  )
)

const About = () => {
  return <div>Hi </div>
}

export default About
