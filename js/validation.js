const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
  if (!email || !email.trim()) {
    return 'Email is required';
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return '';
}

function validatePassword(password) {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  return '';
}

function validateLoginForm(email, password) {
  const errors = {};

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  return errors;
}

function validateRegisterForm(email, password) {
  return validateLoginForm(email, password);
}

function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}

function showFieldError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);

  if (message) {
    field.classList.add('form-field--error');
    error.textContent = message;
  } else {
    field.classList.remove('form-field--error');
    error.textContent = '';
  }
}

function clearFormErrors(fields) {
  fields.forEach(({ fieldId, errorId }) => {
    showFieldError(fieldId, errorId, '');
  });
}
