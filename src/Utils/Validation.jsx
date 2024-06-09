

export default function Validation(values) {

  let errors = {}

  // const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values?.name) {
    if (values.name === "") {
      errors.name = "Name is empty"
    } else if (values.name.length < 2 || values.name.length > 20) {
      errors.name = "Name must be 2 to 20 char long"
    } else {
      errors.name = ""
    }
  }

  if (values.email === "") {
    errors.email = "Email is empty"
    // } else if (!email_pattern.test(values.email)) {
    //   errors.email = "Invalid email"
  } else {
    errors.email = ""
  }

  if (values.password === "") {
    errors.password = "Password is empty"
    // } else if (!password_pattern.test(values.password)) {
    //   errors.password = "Password should contain 1 small char, 1 capital, 1 number and be min 8 char long"
  } else {
    errors.password = ""
  }

  return errors

}