const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

export const processForm = (values, actions, formName) => {
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({ "form-name": formName, ...values }),
  })
    .then(() => {
      alert("Success")
      actions.resetForm()
    })
    .catch(() => {
      alert("Error")
    })
    .finally(() => actions.setSubmitting(false))
}
