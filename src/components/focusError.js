import { useEffect } from "react"
import { useFormikContext } from "formik"

const ErrorFocus = () => {
  const { isSubmitting, isValidating, errors } = useFormikContext()

  useEffect(() => {
    const keys = Object.keys(errors)

    if (keys.length > 0 && isSubmitting && !isValidating) {
      const errorElement = document.querySelector(`[id="${keys[0]}"]`)

      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [isSubmitting, isValidating, errors])

  return null
}

export default ErrorFocus

// code from https://gist.github.com/dphrag/4db3b453e02567a0bb52592679554a5b
