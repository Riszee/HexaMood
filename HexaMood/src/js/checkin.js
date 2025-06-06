import '../styles/checkin.css';
import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;
  if (!currentUser) {
    alert('Silakan login untuk mengakses Daily Check-In.');
    window.location.href = 'login.html';
  }
});

// Handle logout
function handleLogout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}

// Submit check-in form
async function submitCheckIn() {
  const mood = document.querySelector('input[name="mood"]:checked')?.value;
  const sleep = document.querySelector('input[name="sleep"]:checked')?.value;
  const anxiety = document.querySelector('input[name="anxiety"]:checked')?.value;
  const exercise = document.querySelector('input[name="exercise"]:checked')?.value;
  const support = document.querySelector('input[name="support"]:checked')?.value;

  const errorMessage = document.getElementById('errorMessage');
      
  // Validate all fields are filled
  if (!mood || !sleep || !anxiety || !exercise || !support) {
    errorMessage.style.display = 'block';
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  errorMessage.style.display = 'none';

  const data = { 
    mood: parseInt(mood), 
    sleep: parseInt(sleep),
    anxiety: parseInt(anxiety),
    exercise: parseInt(exercise),
    support: parseInt(support)
  };

  const token = localStorage.getItem('token');

  try {
    // Replace with your actual API endpoint
    const response = await fetch('YOUR_API_ENDPOINT_HERE', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    const prediction = result.prediction;
        
    localStorage.setItem('lastPrediction', JSON.stringify({ 
      prediction, 
      date: new Date().toLocaleString('id-ID'),
      data: data
    }));
        
    alert(`Hasil Prediksi Stres Anda: ${prediction}`);
    window.location.href = 'results.html';
      
  } catch (error) {
    console.error('Error:', error);
    alert('Gagal memproses check-in: ' + error.message);
  }
}
