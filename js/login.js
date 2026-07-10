document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const button = document.getElementById('login-button');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    clearFormErrors([
      { fieldId: 'email-field', errorId: 'email-error' },
      { fieldId: 'password-field', errorId: 'password-error' },
    ]);

    const errors = validateLoginForm(email, password);

    if (hasErrors(errors)) {
      if (errors.email) showFieldError('email-field', 'email-error', errors.email);
      if (errors.password) showFieldError('password-field', 'password-error', errors.password);
      return;
    }

    button.disabled = true;
    button.textContent = 'Signing in...';

    // Mock login — replace with API call in Assignment 3
    await new Promise((resolve) => setTimeout(resolve, 400));

    window.location.href = 'home.html';
  });

  ['email', 'password'].forEach((name) => {
    form[name].addEventListener('input', () => {
      const fieldId = `${name}-field`;
      const errorId = `${name}-error`;
      showFieldError(fieldId, errorId, '');
    });
  });
});
