export default function validateRegisterForm(email, password, rePass) {
    const allErrors = {};

    if (email == '') {
        allErrors.email = 'Email is a mandatory field';
      }
  
      if (password.length < 3) {
        allErrors.password = 'Password should be 3 characters at least';
      }
  
      if (password != rePass) {
        allErrors.rePass = 'Passwords should match';
      }

      return allErrors;
}