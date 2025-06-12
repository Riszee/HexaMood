import "../styles/login.css";
import { loginUser } from "./data/apiService.js";

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

window.handleLogin = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Mohon isi semua kolom!");
    return;
  }

  if (!isValidEmail(email)) {
    alert('Format email tidak valid!');
    return;
  }

  try {
    const loginButton = document.querySelector('button[type="submit"]');
    const originalText = loginButton ? loginButton.textContent : '';
    if (loginButton) {
      loginButton.textContent = 'Sedang masuk...';
      loginButton.disabled = true;
    }

    const response = await loginUser(email, password);
    if (loginButton) {
      loginButton.textContent = originalText;
      loginButton.disabled = false;
    }

    if (response && response.status === "success") {
      const userData = {
        id: response.data.id,
        name: response.data.username,
        email: response.data.email
      };

      localStorage.setItem("currentUser", JSON.stringify(userData));
      localStorage.setItem("token", response.token || "api-token-" + Date.now());
      localStorage.setItem("isLoggedIn", "true");

      alert(`Selamat datang, ${response.data.username}!`);
      window.location.href = "index.html";
    } else {
      const errorMessage = response?.message || "Email atau kata sandi salah. Silakan coba lagi.";
      alert(errorMessage);
    }

  } catch (error) {
    if (loginButton) {
      loginButton.textContent = 'Masuk';
      loginButton.disabled = false;
    }

    console.error('Error during login:', error);
    alert('Terjadi kesalahan saat login. Silakan periksa koneksi internet dan coba lagi.');
  }
};

window.handleLogout = function () {
  try {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");

    alert("Anda telah keluar dari akun.");
    window.location.href = "index.html";
  } catch (error) {
    console.error('Error during logout:', error);
    alert('Terjadi kesalahan saat logout.');
  }
};

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handleLogin();
    });
  }
});
