import '../styles/register.css';
import { registerUser } from './data/apiService.js';

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  return password.length >= 6; // Minimum 6 characters
}

window.handleRegister = async function () {
  const username = document.getElementById('register-name').value.trim(); 
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;

  if (!username || !email || !password) {
    alert('Semua kolom harus diisi!');
    return;
  }

  if (!isValidEmail(email)) {
    alert('Format email tidak valid!');
    return;
  }

  if (!isValidPassword(password)) {
    alert('Kata sandi harus minimal 6 karakter!');
    return;
  }

  try {
    const registerButton = document.querySelector('button[type="submit"]');
    const originalText = registerButton ? registerButton.textContent : '';
    if (registerButton) {
      registerButton.textContent = 'Sedang mendaftar...';
      registerButton.disabled = true;
    }

    const response = await registerUser(username, email, password);

    if (registerButton) {
      registerButton.textContent = originalText;
      registerButton.disabled = false;
    }

    if (response && response.status === 'success') {
      alert('Registrasi berhasil!\nNama: ' + username + '\nEmail: ' + email);

      document.getElementById('register-name').value = '';
      document.getElementById('register-email').value = '';
      document.getElementById('register-password').value = '';

      window.location.href = 'login.html';
    } else {
      const errorMessage = response?.message || 'Registrasi gagal. Silakan coba lagi.';
      alert(errorMessage);
    }

  } catch (error) {
    if (registerButton) {
      registerButton.textContent = 'Daftar';
      registerButton.disabled = false;
    }

    console.error('Error during registration:', error);
    alert('Terjadi kesalahan saat registrasi. Silakan periksa koneksi internet dan coba lagi.');
  }
};

document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handleRegister();
    });
  }
});
