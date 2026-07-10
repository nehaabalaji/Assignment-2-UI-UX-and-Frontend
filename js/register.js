document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  const button = document.getElementById('register-button');
  const card = document.querySelector('.auth-card');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    clearFormErrors([
      { fieldId: 'email-field', errorId: 'email-error' },
      { fieldId: 'password-field', errorId: 'password-error' },
    ]);

    const errors = validateRegisterForm(email, password);

    if (hasErrors(errors)) {
      if (errors.email) showFieldError('email-field', 'email-error', errors.email);
      if (errors.password) showFieldError('password-field', 'password-error', errors.password);
      return;
    }

    button.disabled = true;
    button.textContent = 'Creating account...';

    // Mock registration — replace with API call in Assignment 3
    await new Promise((resolve) => setTimeout(resolve, 400));

    card.innerHTML = `
      <div class="auth-success" role="status">
        <div class="auth-success__icon" aria-hidden="true">✓</div>
        <h2 class="auth-success__title">Registration Successful</h2>
        <p class="auth-success__message">Validation passed. Ready to connect to backend.</p>
      </div>
      <p class="auth-footer-link">
        <a href="login.html" class="auth-link">Back to sign in</a>
      </p>
    `;
  });

  ['email', 'password'].forEach((name) => {
    form[name].addEventListener('input', () => {
      const fieldId = `${name}-field`;
      const errorId = `${name}-error`;
      showFieldError(fieldId, errorId, '');
    });
  });
});
