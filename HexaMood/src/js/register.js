import '../styles/register.css';

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate password strength
function isValidPassword(password) {
  return password.length >= 6; // Minimum 6 characters
}

window.handleRegister = function () {
  const name = document.getElementById('register-name').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;

  // Input validation
  if (!name || !email || !password) {
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
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      alert('Email sudah terdaftar. Silakan gunakan email lain.');
      return;
    }

    // Create new user object
    const newUser = {
      id: Date.now(), // Simple ID generation
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    };

    // Add new user to users array
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registrasi berhasil!\nNama: ' + name + '\nEmail: ' + email);
    
    // Redirect to login page
    window.location.href = 'login.html';
    
  } catch (error) {
    console.error('Error during registration:', error);
    alert('Terjadi kesalahan saat registrasi. Silakan coba lagi.');
  }
};

// Add event listener for form submission
document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleRegister();
    });
  }
});
