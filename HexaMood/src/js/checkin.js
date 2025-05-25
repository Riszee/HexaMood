import '../styles/style.css'; // Import CSS
import axios from 'axios';

window.submitCheckIn = async function () {
  const mood = document.querySelector('input[name="mood"]:checked')?.value;
  const anxiety = document.querySelector('input[name="anxiety"]:checked')?.value;
  const sleep = document.querySelector('input[name="sleep"]:checked')?.value;

  if (!mood || !anxiety || !sleep) {
    alert('Harap isi semua pertanyaan.');
    return;
  }

  const data = { mood: parseInt(mood), anxiety: parseInt(anxiety), sleep: parseInt(sleep) };
  const token = localStorage.getItem('token');

  try {
    const response = await axios.post('http://localhost:3000/api/checkin', data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const prediction = response.data.prediction;
    alert(`Hasil Prediksi Stres Anda: ${prediction}`);
    // Redirect or update UI with prediction
  } catch (error) {
    alert('Gagal memproses check-in: ' + (error.response?.data?.message || error.message));
  }
};

window.logout = function () {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
};