export default function validateAuthenticationForm(email, password, rePass) {
  const allErrors = {};

  if (email == "") {
    allErrors.email = "Email is a mandatory field";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    allErrors.email = "Invalid email address";
  }

  if (password.length < 3) {
    allErrors.password = "Password should be 3 characters at least";
  }

  if (rePass != undefined && password != rePass) {
    allErrors.rePass = "Passwords should match";
  }

  return allErrors;
}
