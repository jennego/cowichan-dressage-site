import React from "react"
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik"

const initialValues = {
  friends: [
    {
      name: "",
      email: "",
    },
  ],
}

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const BasicArrayExample = () => {
  return (
    <div>
      <h1>Friends</h1>
      <Formik
        initialValues={{
          friends: ["jared", "ian", "bob"],
        }}
        onSubmit={(values, actions) => {
          fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({
              "form-name": `Array-Testing`,
              ...values,
            }),
          })
            .then(() => {
              alert(JSON.stringify(values, null, 2))
              // handleOpen("Success!", "Form has been successfully submitted!")
              actions.resetForm()
            })
            .catch(() => {
              alert(JSON.stringify(values, null, 2))

              alert("Error")
            })
            .finally(() => actions.setSubmitting(false))
        }}
      >
        <Form>
          <Field name="friends[0]" />
          <Field name="friends[1]" />
          <Field name="friends[2]" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

// const InviteFriends = () => (
//   <div>
//     <h1>Invite friends</h1>
//     <Formik
//       initialValues={initialValues}
//       onSubmit={(values, actions) => {
//         fetch("/", {
//           method: "POST",
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//           body: encode({
//             "form-name": `Array-Testing`,
//             ...values,
//           }),
//         })
//           .then(() => {
//             alert(JSON.stringify(values, null, 2))
//             // handleOpen("Success!", "Form has been successfully submitted!")
//             actions.resetForm()
//           })
//           .catch(() => {
//             alert(JSON.stringify(values, null, 2))

//             alert("Error")
//           })
//           .finally(() => actions.setSubmitting(false))
//       }}
//     >
//       {({ values }) => (
//         <Form name="Array-Testing" data-netlify="true">
//           <FieldArray name="friends">
//             {({ insert, remove, push }) => (
//               <div>
//                 {values.friends.length > 0 &&
//                   values.friends.map((friend, index) => (
//                     <div className="row" key={index}>
//                       <div className="col">
//                         <label htmlFor={`friends.${index}.name`}>Name</label>
//                         <Field
//                           name={`friends.${index}.name`}
//                           placeholder="Jane Doe"
//                           type="text"
//                         />
//                         <ErrorMessage
//                           name={`friends.${index}.name`}
//                           component="div"
//                           className="field-error"
//                         />
//                       </div>
//                       <div className="col">
//                         <label htmlFor={`friends.${index}.email`}>Email</label>
//                         <Field
//                           name={`friends.${index}.email`}
//                           placeholder="jane@acme.com"
//                           type="email"
//                         />
//                         <ErrorMessage
//                           name={`friends.${index}.name`}
//                           component="div"
//                           className="field-error"
//                         />
//                       </div>
//                       <div className="col">
//                         <button
//                           type="button"
//                           className="secondary"
//                           onClick={() => remove(index)}
//                         >
//                           X
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 <button
//                   type="button"
//                   className="secondary"
//                   onClick={() => push({ name: "", email: "" })}
//                 >
//                   Add Friend
//                 </button>
//               </div>
//             )}
//           </FieldArray>
//           <button type="submit">SUBMIT FORM</button>
//         </Form>
//       )}
//     </Formik>
//   </div>
// )

export default BasicArrayExample
