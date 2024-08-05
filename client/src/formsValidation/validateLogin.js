export default function validateLoginForm(email, password) {
    const allErrors = {};

    if (email == '') {
        allErrors.email = 'Email is a mandatory field';
      }
  
      if (password.length == 0) {
        allErrors.password = 'Password is a mandatory field';
      }

      return allErrors;
}