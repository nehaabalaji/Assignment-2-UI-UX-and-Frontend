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

// ─── Service Management validation (Samuel Parsons) ───────────────────────

function validateServiceName(name) {
  if (!name || !name.trim()) {
    return 'Service name is required';
  }
  if (name.trim().length > 100) {
    return 'Service name must be 100 characters or fewer';
  }
  return '';
}

function validateDescription(description) {
  if (!description || !description.trim()) {
    return 'Description is required';
  }
  return '';
}

function validateDuration(duration) {
  if (duration === '' || duration === null || duration === undefined) {
    return 'Expected duration is required';
  }
  const value = Number(duration);
  if (Number.isNaN(value)) {
    return 'Duration must be a number';
  }
  if (!Number.isInteger(value)) {
    return 'Duration must be a whole number of minutes';
  }
  if (value <= 0) {
    return 'Duration must be greater than 0';
  }
  return '';
}

function validatePriority(priority) {
  const allowed = ['low', 'medium', 'high'];
  if (!priority) {
    return 'Priority level is required';
  }
  if (!allowed.includes(priority)) {
    return 'Priority must be low, medium, or high';
  }
  return '';
}

function validateServiceForm(values) {
  const errors = {};

  const nameError = validateServiceName(values.name);
  if (nameError) errors.name = nameError;

  const descError = validateDescription(values.description);
  if (descError) errors.description = descError;

  const durationError = validateDuration(values.duration);
  if (durationError) errors.duration = durationError;

  const priorityError = validatePriority(values.priority);
  if (priorityError) errors.priority = priorityError;

  return errors;
}

// Field helpers for the admin service form (uses .invalid class on the
// wrapping .field element, matching admin.html's markup)
function showServiceFieldError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  if (message) {
    field.classList.add('invalid');
    error.textContent = message;
  } else {
    field.classList.remove('invalid');
    error.textContent = '';
  }
}

function clearServiceFieldError(fieldId, errorId) {
  showServiceFieldError(fieldId, errorId, '');
}

