export function initAuthForm() {
  const formTitle = document.getElementById('form-title');
  const authForm = document.getElementById('auth-form');
  const toggleBtn = document.getElementById('toggle-btn');
  const toggleText = document.getElementById('toggle-text');
  const submitBtn = document.getElementById('submit-btn');
  const nameGroup = document.getElementById('name-group');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');

  let isLogin = true;

  function clearErrors() {
    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateForm() {
    clearErrors();
    let valid = true;

    if (!validateEmail(emailInput.value.trim())) {
      emailError.textContent = 'Email tidak valid.';
      valid = false;
    }
    if (passwordInput.value.trim().length < 6) {
      passwordError.textContent = 'Kata sandi minimal 6 karakter.';
      valid = false;
    }
    if (!isLogin && nameInput.value.trim().length < 3) {
      nameError.textContent = 'Nama lengkap minimal 3 karakter.';
      valid = false;
    }
    return valid;
  }

  function switchToRegister() {
    isLogin = false;
    formTitle.textContent = 'Daftar ke HexaMood';
    submitBtn.textContent = 'Daftar';
    toggleText.textContent = 'Sudah punya akun?';
    toggleBtn.textContent = 'Masuk';
    nameGroup.style.display = 'block';
    nameInput.setAttribute('required', 'required');
    passwordInput.setAttribute('autocomplete', 'new-password');
    nameInput.focus();
    clearErrors();
  }

  function switchToLogin() {
    isLogin = true;
    formTitle.textContent = 'Masuk ke HexaMood';
    submitBtn.textContent = 'Masuk';
    toggleText.textContent = 'Belum punya akun?';
    toggleBtn.textContent = 'Daftar';
    nameGroup.style.display = 'none';
    nameInput.removeAttribute('required');
    passwordInput.setAttribute('autocomplete', 'current-password');
    emailInput.focus();
    clearErrors();
  }

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isLogin ? switchToRegister() : switchToLogin();
  });

  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLogin) {
      alert(`Berhasil masuk dengan email: ${emailInput.value.trim()}`);
      authForm.reset();
    } else {
      alert(`Berhasil daftar dengan nama: ${nameInput.value.trim()} dan email: ${emailInput.value.trim()}`);
      authForm.reset();
      switchToLogin();
    }
  });

  function addHoverAnimation(button) {
  button.addEventListener('mouseenter', () => {
    gsap.to(button, { scale: 1.05, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)", duration: 0.2 });
  });

  button.addEventListener('mouseleave', () => {
    gsap.to(button, { scale: 1, boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)", duration: 0.2 });
  });
}

addHoverAnimation(submitBtn);
addHoverAnimation(toggleBtn);

  switchToLogin();
}
