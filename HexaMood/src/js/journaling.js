import '../styles/journaling.css';

class JournalingApp {
  constructor() {
    this.currentUser = null;
    this.mlApiEndpoint = 'http://localhost:8000/analyze'; // ML API endpoint
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.checkAuthentication();
      this.setupEventListeners();
      this.setupTextareaAutoResize();
      this.setupAccessibility();
      this.setupKeyboardShortcuts();
    });
  }

  checkAuthentication() {
    this.currentUser = localStorage.getItem('currentUser') 
      ? JSON.parse(localStorage.getItem('currentUser')) 
      : null;
    
    if (!this.currentUser) {
      alert('Silakan login untuk mengakses Journaling.');
      window.location.href = 'login.html';
      return;
    }

    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
      logoutBtn.classList.remove('d-none');
    }
  }

  setupEventListeners() {
    const form = document.getElementById('journaling-form');
    if (form) {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.handleLogout());
    }

    const textarea = document.getElementById('journal-entry');
    if (textarea) {
      textarea.addEventListener('input', () => this.saveDraft());
      this.loadDraft();
    }
  }

  setupTextareaAutoResize() {
    const textarea = document.getElementById('journal-entry');
    if (textarea) {
      textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.max(200, this.scrollHeight) + 'px';
      });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn') || e.target.querySelector('button[type="submit"]');
    const journalEntry = document.getElementById('journal-entry').value.trim();
    const resultDiv = document.getElementById('emotion-result');
    
    if (!this.validateEntry(journalEntry)) {
      return;
    }

    this.setLoadingState(submitBtn, true);
    if (resultDiv) {
      resultDiv.innerHTML = '';
    }

    try {
      const mlResult = await this.callMLAPI(journalEntry);
      
      const savedData = await this.saveJournalEntry(journalEntry, mlResult);
      
      this.displayMLResult(mlResult, resultDiv);
      
      document.getElementById('journal-entry').value = '';
      this.clearDraft();
      
      this.showNotification('Jurnal berhasil disimpan dan dianalisis!', 'success');

      this.trackJournalEvent('journal_submitted', {
        emotion: mlResult.emotion,
        confidence: mlResult.confidence
      });
      
    } catch (error) {
      this.handleSubmissionError(error, resultDiv);
    } finally {
      this.setLoadingState(submitBtn, false);
    }
  }

  async callMLAPI(journalText) {
    try {
      const response = await fetch(this.mlApiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: journalText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Gagal menghubungi server ML!`);
      }

      const data = await response.json();
      return {
        emotion: data.emotion,
        confidence: data.confidence,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('ML API Error:', error);
      throw error;
    }
  }

  async saveJournalEntry(journalText, mlResult) {
    const journalData = {
      id: this.generateEntryId(),
      user_id: this.currentUser.id,
      journal_text: journalText,
      ml_analysis: mlResult,
      timestamp: new Date().toISOString(),
      source: 'web_app'
    };

    const entriesKey = `journal_entries_${this.currentUser.id}`;
    let entries = JSON.parse(localStorage.getItem(entriesKey)) || [];
    
    entries.unshift(journalData);
    
    if (entries.length > 100) {
      entries = entries.slice(0, 100);
    }
    
    localStorage.setItem(entriesKey, JSON.stringify(entries));
    
    this.updateJournalSummary(mlResult);
    
    return journalData;
  }

  displayMLResult(mlResult, resultDiv) {
    if (!resultDiv) return;
    
    const confidencePercent = (mlResult.confidence * 100).toFixed(2);
    
    resultDiv.innerHTML = `
      <div class="alert alert-info fade show" role="alert">
        <h6 class="alert-heading">📊 Hasil Analisis Emosi</h6>
        <p class="mb-1">
          <strong>Prediksi Emosi:</strong> 
          <span class="badge bg-primary fs-6">${mlResult.emotion}</span>
        </p>
        <p class="mb-0">
          <strong>Tingkat Keyakinan:</strong> ${confidencePercent}%
        </p>
        <div class="progress mt-2" style="height: 6px;">
          <div class="progress-bar" role="progressbar" 
               style="width: ${confidencePercent}%" 
               aria-valuenow="${confidencePercent}" 
               aria-valuemin="0" aria-valuemax="100">
          </div>
        </div>
      </div>
    `;
  }

  validateEntry(entry) {
    if (!entry) {
      this.showNotification('Harap isi jurnal sebelum mengirim.', 'warning');
      return false;
    }

    if (entry.length < 10) {
      this.showNotification('Jurnal terlalu pendek. Harap tulis minimal 10 karakter.', 'warning');
      return false;
    }

    if (entry.length > 5000) {
      this.showNotification('Jurnal terlalu panjang. Maksimal 5000 karakter.', 'warning');
      return false;
    }

    if (this.detectSpam(entry)) {
      this.showNotification('Konten terdeteksi sebagai spam. Harap tulis dengan normal.', 'warning');
      return false;
    }

    return true;
  }

  updateJournalSummary(mlResult) {
    const summaryKey = `journal_summary_${this.currentUser.id}`;
    let summary = JSON.parse(localStorage.getItem(summaryKey)) || {
      total_entries: 0,
      emotion_history: [],
      last_updated: null
    };

    summary.total_entries += 1;
    summary.emotion_history.push({
      emotion: mlResult.emotion,
      confidence: mlResult.confidence,
      date: new Date().toISOString().split('T')[0]
    });
    summary.last_updated = new Date().toISOString();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const cutoffDate = thirtyDaysAgo.toISOString().split('T')[0];

    summary.emotion_history = summary.emotion_history.filter(entry => entry.date >= cutoffDate);

    localStorage.setItem(summaryKey, JSON.stringify(summary));
  }

  handleSubmissionError(error, resultDiv) {
    console.error('Error submitting journal:', error);
    
    const errorMessage = this.getErrorMessage(error);
    
    if (resultDiv) {
      resultDiv.innerHTML = `
        <div class="alert alert-danger" role="alert">
          <h6 class="alert-heading">❌ Terjadi Kesalahan</h6>
          <p class="mb-0">${errorMessage}</p>
        </div>
      `;
    }
    
    this.showNotification(errorMessage, 'danger');
  }

  getErrorMessage(error) {
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return 'Koneksi internet bermasalah. Silakan periksa koneksi Anda dan coba lagi.';
    }
    
    if (error.message.includes('server ML') || error.message.includes('analyze')) {
      return 'Server analisis emosi sedang bermasalah. Coba lagi dalam beberapa saat.';
    }
    
    if (error.message.includes('unauthorized') || error.message.includes('401')) {
      return 'Sesi Anda telah berakhir. Silakan login kembali.';
    }
    
    return 'Terjadi kesalahan saat mengirim jurnal. Silakan coba lagi.';
  }

  setLoadingState(submitBtn, isLoading) {
    if (!submitBtn) return;
    
    submitBtn.disabled = isLoading;
    
    if (isLoading) {
      const originalText = submitBtn.innerHTML;
      submitBtn.setAttribute('data-original-text', originalText);
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Menganalisis...';
    } else {
      const originalText = submitBtn.getAttribute('data-original-text') || 'Submit';
      submitBtn.innerHTML = originalText;
      submitBtn.removeAttribute('data-original-text');
    }
  }

  saveDraft() {
    const textarea = document.getElementById('journal-entry');
    if (textarea && textarea.value.trim()) {
      const draftKey = `journal_draft_${this.currentUser.id}`;
      localStorage.setItem(draftKey, JSON.stringify({
        text: textarea.value,
        timestamp: new Date().toISOString()
      }));
    }
  }

  loadDraft() {
    const draftKey = `journal_draft_${this.currentUser.id}`;
    const draft = localStorage.getItem(draftKey);
    
    if (draft) {
      const draftData = JSON.parse(draft);
      const textarea = document.getElementById('journal-entry');
      
      const draftAge = new Date() - new Date(draftData.timestamp);
      const twentyFourHours = 24 * 60 * 60 * 1000;
      
      if (draftAge < twentyFourHours && textarea) {
        textarea.value = draftData.text;
        this.showDraftNotification();
      } else {
        localStorage.removeItem(draftKey);
      }
    }
  }

  clearDraft() {
    const draftKey = `journal_draft_${this.currentUser.id}`;
    localStorage.removeItem(draftKey);
  }

  showDraftNotification() {
    this.showNotification('📝 Draft tersimpan telah dimuat', 'info');
  }

  // User Management
  handleLogout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
      
      this.clearDraft();
      
      this.trackJournalEvent('user_logout');
      
      window.location.href = 'login.html';
    }
  }

  generateEntryId() {
    return 'entry_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  detectSpam(text) {
    const spamPatterns = [
      /(.)\1{10,}/g, // Repeated characters
      /https?:\/\/[^\s]+/g, // URLs
      /\b\d{4,}\b/g // Long numbers
    ];

    return spamPatterns.some(pattern => pattern.test(text));
  }

  setupAccessibility() {
    const textarea = document.getElementById('journal-entry');
    if (textarea) {
      textarea.setAttribute('aria-describedby', 'journal-help');
      
      if (!document.getElementById('journal-help')) {
        const helpText = document.createElement('div');
        helpText.id = 'journal-help';
        helpText.className = 'form-text';
        helpText.textContent = 'Bagikan perasaan dan pengalaman Anda dengan bebas. Tulisan Anda akan dianalisis untuk memberikan wawasan tentang kondisi emosi Anda.';
        textarea.parentNode.appendChild(helpText);
      }
    }
  }

  // Keyboard Shortcuts
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + Enter to submit
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        const form = document.getElementById('journaling-form');
        if (form) {
          form.dispatchEvent(new Event('submit'));
        }
      }
      
      // Ctrl/Cmd + S to save draft
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        this.saveDraft();
        this.showNotification('Draft tersimpan', 'success');
      }
    });
  }

  // Notifications
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show notification-toast`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    notification.innerHTML = `
      ${message}
      <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  // Analytics
  trackJournalEvent(eventType, data = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventType, {
        event_category: 'journaling',
        event_label: this.currentUser?.id || 'anonymous',
        ...data
      });
    }

    console.log('Journal Event:', eventType, {
      user_id: this.currentUser?.id,
      timestamp: new Date().toISOString(),
      ...data
    });
  }

  getJournalHistory(limit = 10) {
    const entriesKey = `journal_entries_${this.currentUser.id}`;
    const entries = JSON.parse(localStorage.getItem(entriesKey)) || [];
    return entries.slice(0, limit);
  }

  getJournalSummary() {
    const summaryKey = `journal_summary_${this.currentUser.id}`;
    return JSON.parse(localStorage.getItem(summaryKey)) || {
      total_entries: 0,
      emotion_history: [],
      last_updated: null
    };
  }

  searchJournalEntries(query) {
    const entries = this.getJournalHistory(100);
    return entries.filter(entry => 
      entry.journal_text.toLowerCase().includes(query.toLowerCase()) ||
      entry.ml_analysis.emotion.toLowerCase().includes(query.toLowerCase())
    );
  }
}

const journalingApp = new JournalingApp();

export default journalingApp;
