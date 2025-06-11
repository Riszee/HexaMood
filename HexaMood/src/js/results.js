import '../styles/results.css';

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;
  if (!currentUser) {
    alert('Silakan login untuk mengakses Hasil Prediksi.');
    window.location.href = 'login.html';
    return;
  }

  const prediction = JSON.parse(localStorage.getItem('lastPrediction'));
  console.log(prediction);
  const resultsDiv = document.getElementById('prediction-results');

  if (!prediction) {
    displayNoPrediction(resultsDiv);
    return;
  }

  displayPredictionResult(prediction, resultsDiv);
  displayPredictionHistory(resultsDiv);
});

function displayNoPrediction(container) {
  container.innerHTML = `
    <div class="no-prediction">
      <div class="no-prediction-emoji">🤔</div>
      <h4>Belum Ada Hasil Prediksi</h4>
      <p>Mulai perjalanan kesehatan mental Anda dengan melakukan Daily Check-In terlebih dahulu.</p>
      <a href="checkin.html" class="cta-button">Mulai Daily Check-In</a>
    </div>
  `;
}

function displayPredictionResult(prediction, container) {
  const stressData = getStressLevelData(prediction.prediction);
  const formattedDate = formatDate(prediction.date);
  
  container.innerHTML = `
    <div class="prediction-card ${stressData.class}">
      <div class="prediction-date">
         ${formattedDate}
      </div>
      
      <div class="stress-emoji">${stressData.emoji}</div>
      
      <div class="stress-level">${stressData.level}</div>
      
      <div class="stress-description">
        ${stressData.description}
      </div>
      
      <div class="stress-meter">
        <div class="stress-meter-label">Tingkat Stres Anda (${stressData.scaleText})</div>
        <div class="stress-progress">
          <div class="stress-progress-bar ${stressData.progressClass}" style="width: ${stressData.percentage}%"></div>
        </div>
      </div>
      
      <div class="recommendations">
        <h5>Langkah Selanjutnya</h5>
        <p>Lakukan Daily Check-In secara rutin untuk monitoring dan gunakan fitur Journaling untuk refleksi diri. Untuk panduan lebih lengkap, klik tombol di bawah ini.</p>
      </div>
      
      <div class="recommendation-cta">
        <a href="recommendations.html" class="cta-button">Lihat Rekomendasi</a>
      </div>
    </div>
  `;

  // Animate progress bar
  setTimeout(() => {
    const progressBar = container.querySelector('.stress-progress-bar');
    if (progressBar) {
      progressBar.style.width = '0%';
      setTimeout(() => {
        progressBar.style.width = `${stressData.percentage}%`;
      }, 100);
    }
  }, 500);
}

function displayPredictionHistory(container) {
  const historyData = JSON.parse(localStorage.getItem('predictionHistory')) || [];
  
  if (historyData.length === 0) return;

  const historyHTML = `
    <div class="history-section">
      <h5>Riwayat Prediksi</h5>
      <div class="history-list">
        ${historyData.slice(-5).reverse().map(item => {
          const stressData = getStressLevelData(item.prediction);
          return `
            <div class="history-item">
              <div class="history-date">${formatDate(item.date)}</div>
              <div class="history-level ${stressData.class}" style="background-color: ${stressData.color}; color: white;">
                ${stressData.emoji} ${stressData.level}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
  
  container.insertAdjacentHTML('beforeend', historyHTML);
}

function getStressLevelData(prediction) {
  // Convert prediction to number for consistency
  const stressLevelMap = {
  'Tidak Stress': 0,
  'Sedikit Stress': 1,
  'Normal': 2,
  'Stress': 3,
  'Sangat Stress': 4
};

  const level = typeof prediction === 'string' ? stressLevelMap[prediction] : prediction;
  console.log("Mapped stress level:", level); // Debugging log
  switch(level) {
    case 0:
      return {
        level: 'Tidak Stres',
        emoji: '😊',
        class: 'stress-low',
        progressClass: 'progress-low',
        percentage: 5,
        color: '#10b981',
        scaleText: 'Level 0/4',
        description: 'Luar biasa! Anda dalam kondisi mental yang sangat baik dan tidak mengalami stres sama sekali. Terus pertahankan pola hidup sehat ini.'
      };
    
    case 1:
      return {
        level: 'Stres Minimal',
        emoji: '😌',
        class: 'stress-low',
        progressClass: 'progress-low',
        percentage: 25,
        color: '#10b981',
        scaleText: 'Level 1/4',
        description: 'Kondisi mental Anda sangat baik! Tingkat stres yang minimal menunjukkan Anda dapat mengelola tekanan dengan baik.'
      };
    
    case 2:
      return {
        level: 'Agak Stres',
        emoji: '😐',
        class: 'stress-medium',
        progressClass: 'progress-medium',
        percentage: 50,
        color: '#f59e0b',
        scaleText: 'Level 2/4',
        description: 'Anda mulai merasakan sedikit tekanan. Ini adalah waktu yang tepat untuk mulai memperhatikan kesehatan mental dan melakukan langkah preventif.'
      };
    
    case 3:
      return {
        level: 'Cukup Stres',
        emoji: '😟',
        class: 'stress-high',
        progressClass: 'progress-high',
        percentage: 75,
        color: '#f59e0b',
        scaleText: 'Level 3/4',
        description: 'Tingkat stres Anda cukup tinggi dan memerlukan perhatian. Penting untuk mulai menerapkan strategi manajemen stres secara konsisten.'
      };
    
    case 4:
      return {
        level: 'Sangat Stres',
        emoji: '😰',
        class: 'stress-high',
        progressClass: 'progress-high',
        percentage: 95,
        color: '#ef4444',
        scaleText: 'Level 4/4',
        description: 'Tingkat stres Anda sangat tinggi. Sangat disarankan untuk segera mengambil langkah-langkah serius dalam mengelola stres dan mempertimbangkan bantuan profesional.'
      };
    
    default:
      // Fallback for any other values
      return {
        level: 'Status Tidak Diketahui',
        emoji: '❓',
        class: 'stress-medium',
        progressClass: 'progress-medium',
        percentage: 50,
        color: '#6b7280',
        scaleText: 'Level ?/4',
        description: 'Tidak dapat menentukan tingkat stres. Silakan lakukan Daily Check-In ulang untuk hasil yang akurat.'
      };
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('id-ID', options);
}

// Save prediction to history
function savePredictionToHistory(prediction) {
  const history = JSON.parse(localStorage.getItem('predictionHistory')) || [];
  
  // Check if this prediction already exists
  const exists = history.some(item => 
    item.date === prediction.date && item.prediction === prediction.prediction
  );
  
  if (!exists) {
    history.push(prediction);
    // Keep only last 10 predictions
    if (history.length > 10) {
      history.shift();
    }
    localStorage.setItem('predictionHistory', JSON.stringify(history));
  }
}

// Load and save current prediction to history if it exists
const currentPrediction = JSON.parse(localStorage.getItem('lastPrediction'));
if (currentPrediction) {
  savePredictionToHistory(currentPrediction);
}

// Function to handle logout (if needed by navbar)
function handleLogout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('lastPrediction');
  localStorage.removeItem('predictionHistory');
  alert('Anda telah keluar dari akun.');
  window.location.href = 'login.html';
}
