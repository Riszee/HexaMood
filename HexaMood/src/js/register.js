import '../styles/style.css'; // Import CSS
import axios from 'axios';

window.handleRegister = async function () {
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  try {
    const response = await axios.post('http://localhost:3000/api/auth/register', { name, email, password });
    alert('Registrasi berhasil! Silakan login.');
    window.location.href = 'login.html';
  } catch (error) {
    alert('Registrasi gagal: ' + (error.response?.data?.message || error.message));
  }
};