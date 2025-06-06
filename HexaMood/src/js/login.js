import "../styles/login.css";

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

window.handleLogin = function () {
  const email = document.getElementById("email").value.trim(); // Fixed ID to match HTML
  const password = document.getElementById("password").value;

  // Input validation
  if (!email || !password) {
    alert("Mohon isi semua kolom!");
    return;
  }

  if (!isValidEmail(email)) {
    alert('Format email tidak valid!');
    return;
  }

  try {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Find user with matching email and password
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      // Set current user session
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("token", "dummy-token-" + Date.now()); // Generate unique token
      localStorage.setItem("isLoggedIn", "true");
      
      alert(`Selamat datang, ${user.name}!`);
      window.location.href = "index.html";
    } else {
      alert("Email atau kata sandi salah. Silakan coba lagi.");
    }
    
  } catch (error) {
    console.error('Error during login:', error);
    alert('Terjadi kesalahan saat login. Silakan coba lagi.');
  }
};

// Function to handle logout
window.handleLogout = function() {
  try {
    // Clear user session
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

// Add event listener for form submission
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleLogin();
    });
  }
});
