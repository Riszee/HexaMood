import '../styles/recommendations.css';

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;
  if (!currentUser) {
    alert('Silakan login untuk mengakses Rekomendasi.');
    window.location.href = 'login.html';
    return;
  }

  const prediction = JSON.parse(localStorage.getItem('lastPrediction'));
  const recommendationContainer = document.getElementById('recommendations');

  if (!prediction) {
    displayNoRecommendation(recommendationContainer);
    return;
  }

  displayRecommendations(prediction, recommendationContainer);
});

function displayNoRecommendation(container) {
  container.innerHTML = `
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="no-recommendation">
          <div class="no-recommendation-emoji">🤔</div>
          <h4>Belum Ada Rekomendasi</h4>
          <p>Lakukan Daily Check-In terlebih dahulu untuk mendapatkan rekomendasi yang sesuai dengan kondisi Anda.</p>
          <a href="checkin.html" class="cta-button">Mulai Daily Check-In</a>
        </div>
      </div>
    </div>
  `;
}

function displayRecommendations(prediction, container) {
  const stressLevel = typeof prediction.prediction === 'string' ? parseInt(prediction.prediction) : prediction.prediction;
  const stressData = getStressLevelData(stressLevel);
  const recommendations = getRecommendations(stressLevel);

  container.innerHTML = `
    <div class="row justify-content-center">
      <div class="col-md-10 col-lg-8">
        <div class="recommendation-header ${stressData.class}">
          <div class="stress-indicator">
            <span class="stress-emoji">${stressData.emoji}</span>
            <div class="stress-info">
              <h3>${stressData.level}</h3>
              <p class="stress-date">Berdasarkan hasil prediksi ${formatDate(prediction.date)}</p>
            </div>
          </div>
        </div>

        <div class="recommendations-content">
          <h4>Rekomendasi untuk Anda</h4>
          <div class="recommendations-grid">
            ${recommendations.map((rec, index) => `
              <div class="recommendation-card" data-category="${rec.category}">
                <div class="recommendation-icon ${rec.category}">
                  ${rec.icon}
                </div>
                <div class="recommendation-content">
                  <h5>${rec.title}</h5>
                  <p>${rec.description}</p>
                  ${rec.action ? `<div class="recommendation-action">${rec.action}</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>

          <div class="additional-tips">
            <h5>Tips Tambahan</h5>
            <div class="tips-list">
              ${getAdditionalTips(stressLevel).map(tip => `
                <div class="tip-item">
                  <span class="tip-bullet">💡</span>
                  <span>${tip}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="recommendation-footer">
            <p class="disclaimer">
              <strong>Catatan:</strong> Rekomendasi ini bersifat umum dan tidak menggantikan konsultasi dengan profesional kesehatan mental. 
              Jika Anda merasa membutuhkan bantuan lebih lanjut, jangan ragu untuk mencari bantuan ahli.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Animate cards
  setTimeout(() => {
    const cards = container.querySelectorAll('.recommendation-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, 300);
}

function getStressLevelData(level) {
  switch(level) {
    case 0:
      return {
        level: 'Tidak Stres',
        emoji: '😊',
        class: 'stress-low'
      };
    case 1:
      return {
        level: 'Stres Minimal',
        emoji: '😌',
        class: 'stress-low'
      };
    case 2:
      return {
        level: 'Agak Stres',
        emoji: '😐',
        class: 'stress-medium'
      };
    case 3:
      return {
        level: 'Cukup Stres',
        emoji: '😟',
        class: 'stress-high'
      };
    case 4:
      return {
        level: 'Sangat Stres',
        emoji: '😰',
        class: 'stress-high'
      };
    default:
      return {
        level: 'Status Tidak Diketahui',
        emoji: '❓',
        class: 'stress-medium'
      };
  }
}

function getRecommendations(stressLevel) {
  switch(stressLevel) {
    case 0:
    case 1:
      return [
        {
          category: 'wellness',
          icon: '🧘‍♀️',
          title: 'Pertahankan Keseimbangan',
          description: 'Terus lakukan rutinitas sehat yang sudah Anda jalani. Lakukan olahraga ringan 30 menit setiap hari.',
          action: 'Buat jadwal olahraga rutin'
        },
        {
          category: 'sleep',
          icon: '😴',
          title: 'Jaga Pola Tidur',
          description: 'Pertahankan jadwal tidur yang konsisten 7-8 jam per malam untuk menjaga kesehatan mental.',
          action: 'Atur alarm tidur dan bangun'
        },
        {
          category: 'hobby',
          icon: '🎨',
          title: 'Luangkan Waktu untuk Hobi',
          description: 'Nikmati aktivitas yang Anda sukai untuk menjaga suasana hati tetap positif.',
          action: 'Jadwalkan waktu me-time'
        },
        {
          category: 'gratitude',
          icon: '🙏',
          title: 'Praktikkan Rasa Syukur',
          description: 'Tulis 3 hal positif setiap hari di jurnal untuk meningkatkan kebahagiaan.',
          action: 'Mulai jurnal syukur'
        }
      ];

    case 2:
      return [
        {
          category: 'breathing',
          icon: '🫁',
          title: 'Latihan Pernapasan',
          description: 'Lakukan teknik pernapasan dalam 4-7-8 selama 5-10 menit untuk menenangkan pikiran.',
          action: 'Praktek 2x sehari'
        },
        {
          category: 'meditation',
          icon: '🧘',
          title: 'Meditasi Terpandu',
          description: 'Cobalah meditasi mindfulness 10 menit setiap hari untuk mengurangi ketegangan.',
          action: 'Download aplikasi meditasi'
        },
        {
          category: 'organization',
          icon: '📅',
          title: 'Atur Jadwal Harian',
          description: 'Buat struktur harian yang jelas untuk mengurangi perasaan kewalahan.',
          action: 'Buat to-do list harian'
        },
        {
          category: 'social',
          icon: '👥',
          title: 'Berbagi dengan Orang Terdekat',
          description: 'Ceritakan perasaan Anda kepada teman atau keluarga untuk mendapatkan dukungan.',
          action: 'Hubungi seseorang hari ini'
        }
      ];

    case 3:
    case 4:
      return [
        {
          category: 'meditation',
          icon: '🧘‍♂️',
          title: 'Meditasi Intensif',
          description: 'Lakukan meditasi mindfulness 15-20 menit, 2 kali sehari untuk mengurangi stres berat.',
          action: 'Ikuti kelas meditasi'
        },
        {
          category: 'nature',
          icon: '🌿',
          title: 'Terapi Alam',
          description: 'Habiskan waktu di alam terbuka minimal 30 menit setiap hari untuk menyegarkan pikiran.',
          action: 'Jadwalkan jalan di taman'
        },
        {
          category: 'professional',
          icon: '👨‍⚕️',
          title: 'Konsultasi Profesional',
          description: 'Pertimbangkan untuk berkonsultasi dengan psikolog atau konselor untuk bantuan lebih lanjut.',
          action: 'Cari profesional terdekat'
        },
        {
          category: 'lifestyle',
          icon: '🥗',
          title: 'Perbaiki Gaya Hidup',
          description: 'Kurangi kafein, gula, dan alkohol. Tingkatkan konsumsi makanan bergizi untuk stabilitas mood.',
          action: 'Buat meal plan sehat'
        }
      ];

    default:
      return [
        {
          category: 'assessment',
          icon: '📊',
          title: 'Lakukan Penilaian Ulang',
          description: 'Hasil prediksi tidak valid. Lakukan Daily Check-In kembali untuk mendapatkan rekomendasi yang tepat.',
          action: 'Kembali ke Daily Check-In'
        }
      ];
  }
}

function getAdditionalTips(stressLevel) {
  const commonTips = [
    'Batasi penggunaan media sosial dan berita negatif',
    'Lakukan aktivitas fisik ringan seperti stretching setiap 2 jam',
    'Minum air putih minimal 8 gelas per hari',
    'Hindari multitasking berlebihan'
  ];

  const specificTips = {
    0: ['Bagikan kebahagiaan Anda dengan orang lain', 'Coba tantangan baru yang positif'],
    1: ['Pertahankan rutinitas yang sudah baik', 'Rayakan pencapaian kecil'],
    2: ['Buat prioritas tugas harian', 'Ambil break 15 menit setiap 2 jam kerja'],
    3: ['Praktikkan teknik grounding 5-4-3-2-1', 'Batasi konsumsi kafein setelah jam 2 siang'],
    4: ['Hubungi hotline kesehatan mental jika diperlukan', 'Pertimbangkan cuti singkat jika memungkinkan']
  };

  return [...commonTips, ...(specificTips[stressLevel] || [])];
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

// Function to handle logout (if needed by navbar)
function handleLogout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('lastPrediction');
  localStorage.removeItem('predictionHistory');
  alert('Anda telah keluar dari akun.');
  window.location.href = 'login.html';
}