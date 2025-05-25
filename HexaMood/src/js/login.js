import '../styles/style.css'; // Import CSS
import axios from 'axios';

window.handleLogin = async function () {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    alert('Login berhasil!');
    window.location.href = 'checkin.html';
  } catch (error) {
    alert('Login gagal: ' + (error.response?.data?.message || error.message));
  }
};