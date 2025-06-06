import '../styles/journaling.css';

class JournalingApp {
  constructor() {
    this.currentUser = null;
    this.apiEndpoint = '/api/journal'; // Update with your actual API endpoint
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.checkAuthentication();
      this.setupEventListeners();
      this.setupTextareaAutoResize();
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

    // Show logout button if user is authenticated
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
      logoutBtn.classList.remove('d-none');
    }
  }

  setupEventListeners() {
    // Form submission
    const form = document.getElementById('journaling-form');
    if (form) {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    // Logout button
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.handleLogout());
    }

    // Auto-save draft (optional)
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
    
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const journalEntry = document.getElementById('journal-entry').value.trim();
    const successMessage = document.getElementById('success-message');
    
    if (!this.validateEntry(journalEntry)) {
      return;
    }

    // Show loading state
    this.setLoadingState(submitBtn, btnText, true);
    successMessage.classList.add('d-none');

    try {
      const result = await this.submitJournal(journalEntry);
      this.handleSuccessfulSubmission(result);
      
      // Clear form and draft
      document.getElementById('journal-entry').value = '';
      this.clearDraft();
      
      // Show success message
      successMessage.classList.remove('d-none');
      
    } catch (error) {
      this.handleSubmissionError(error);
    } finally {
      this.setLoadingState(submitBtn, btnText, false);
    }
  }

  validateEntry(entry) {
    if (!entry) {
      alert('Harap isi jurnal sebelum mengirim.');
      return false;
    }

    if (entry.length < 10) {
      alert('Jurnal terlalu pendek. Harap tulis minimal 10 karakter.');
      return false;
    }

    if (entry.length > 5000) {
      alert('Jurnal terlalu panjang. Maksimal 5000 karakter.');
      return false;
    }

    return true;
  }

  async submitJournal(journalText) {
    const journalData = {
      journal_text: journalText,
      user_id: this.currentUser?.id || 'anonymous',
      timestamp: new Date().toISOString(),
      source: 'web_app',
      // Add any additional metadata your ML model needs
      metadata: {
        session_id: this.generateSessionId(),
        user_agent: navigator.userAgent,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    };

    // TODO: Replace with actual API call
    /*
    const response = await fetch(`${this.apiEndpoint}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`,
        'X-User-ID': this.currentUser.id
      },
      body: JSON.stringify(journalData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit journal');
    }

    return await response.json();
    */

    // Simulate API call for development
    return this.simulateMLAnalysis(journalData);
  }

  async simulateMLAnalysis(journalData) {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate ML model response
    const mockAnalysis = {
      sentiment: this.analyzeSentiment(journalData.journal_text),
      emotions: this.extractEmotions(journalData.journal_text),
      stress_level: this.assessStressLevel(journalData.journal_text),
      confidence: Math.random() * 0.3 + 0.7, // 70-100%
      keywords: this.extractKeywords(journalData.journal_text),
      timestamp: new Date().toISOString()
    };

    return mockAnalysis;
  }

  analyzeSentiment(text) {
    const positiveWords = ['happy', 'joy', 'good', 'great', 'amazing', 'wonderful', 'excited', 'bahagia', 'senang', 'gembira'];
    const negativeWords = ['sad', 'angry', 'frustrated', 'stressed', 'worried', 'anxious', 'sedih', 'marah', 'stress', 'khawatir'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  extractEmotions(text) {
    const emotionMap = {
      happy: ['happy', 'joy', 'excited', 'bahagia', 'senang', 'gembira'],
      sad: ['sad', 'depressed', 'down', 'sedih', 'murung'],
      angry: ['angry', 'frustrated', 'annoyed', 'marah', 'kesal'],
      anxious: ['anxious', 'worried', 'nervous', 'cemas', 'khawatir'],
      calm: ['calm', 'peaceful', 'relaxed', 'tenang', 'damai']
    };

    const lowerText = text.toLowerCase();
    const detectedEmotions = [];

    for (const [emotion, keywords] of Object.entries(emotionMap)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        detectedEmotions.push(emotion);
      }
    }

    return detectedEmotions.length > 0 ? detectedEmotions : ['neutral'];
  }

  assessStressLevel(text) {
    const stressIndicators = ['stress', 'overwhelmed', 'pressure', 'deadline', 'busy', 'tired', 'exhausted', 'tertekan', 'lelah', 'capek'];
    const lowerText = text.toLowerCase();
    
    const stressCount = stressIndicators.filter(indicator => lowerText.includes(indicator)).length;
    
    if (stressCount >= 3) return 'high';
    if (stressCount >= 1) return 'moderate';
    return 'low';
  }

  extractKeywords(text) {
    const words = text.toLowerCase().split(/\s+/);
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'yang', 'dan', 'di', 'ke', 'dari', 'untuk'];
    
    const filteredWords = words.filter(word => 
      word.length > 3 && 
      !stopWords.includes(word) && 
      /^[a-zA-Z]+$/.test(word)
    );

    // Return top 5 most frequent words
    const wordCount = {};
    filteredWords.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word);
  }

  handleSuccessfulSubmission(result) {
    // Store analysis result for use in other pages
    localStorage.setItem('lastJournalAnalysis', JSON.stringify({
      ...result,
      journal_text: document.getElementById('journal-entry').value.trim(),
      submission_timestamp: new Date().toISOString()
    }));

    // Optional: Update user's journal history summary
    this.updateJournalSummary(result);

    console.log('Journal analysis completed:', result);
  }

  updateJournalSummary(analysis) {
    const summaryKey = `journal_summary_${this.currentUser.id}`;
    let summary = JSON.parse(localStorage.getItem(summaryKey)) || {
      total_entries: 0,
      sentiment_history: [],
      stress_trends: [],
      last_updated: null
    };

    summary.total_entries += 1;
    summary.sentiment_history.push({
      sentiment: analysis.sentiment,
      date: new Date().toISOString().split('T')[0]
    });
    summary.stress_trends.push({
      level: analysis.stress_level,
      date: new Date().toISOString().split('T')[0]
    });
    summary.last_updated = new Date().toISOString();

    // Keep only last 30 days of data
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const cutoffDate = thirtyDaysAgo.toISOString().split('T')[0];

    summary.sentiment_history = summary.sentiment_history.filter(entry => entry.date >= cutoffDate);
    summary.stress_trends = summary.stress_trends.filter(entry => entry.date >= cutoffDate);

    localStorage.setItem(summaryKey, JSON.stringify(summary));
  }

  handleSubmissionError(error) {
    console.error('Error submitting journal:', error);
    
    // Show user-friendly error message
    const errorMessage = this.getErrorMessage(error);
    alert(errorMessage);
  }

  getErrorMessage(error) {
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return 'Koneksi internet bermasalah. Silakan periksa koneksi Anda dan coba lagi.';
    }
    
    if (error.message.includes('unauthorized') || error.message.includes('401')) {
      return 'Sesi Anda telah berakhir. Silakan login kembali.';
    }
    
    if (error.message.includes('rate limit')) {
      return 'Terlalu banyak permintaan. Silakan tunggu beberapa saat sebelum mencoba lagi.';
    }
    
    return 'Terjadi kesalahan saat mengirim jurnal. Silakan coba lagi.';
  }

  setLoadingState(submitBtn, btnText, isLoading) {
    submitBtn.disabled = isLoading;
    
    if (isLoading) {
      btnText.innerHTML = '<span class="loading"></span>Menganalisis...';
    } else {
      btnText.innerHTML = 'Submit';
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
      
      // Only load draft if it's less than 24 hours old
      const draftAge = new Date() - new Date(draftData.timestamp);
      const twentyFourHours = 24 * 60 * 60 * 1000;
      
      if (draftAge < twentyFourHours && textarea) {
        textarea.value = draftData.text;
        
        // Show draft notification
        this.showDraftNotification();
      } else {
        // Remove old draft
        localStorage.removeItem(draftKey);
      }
    }
  }

  clearDraft() {
    const draftKey = `journal_draft_${this.currentUser.id}`;
    localStorage.removeItem(draftKey);
  }

  showDraftNotification() {
    const notification = document.createElement('div');
    notification.className = 'draft-notification';
    notification.innerHTML = `
      <div class="alert alert-info alert-dismissible fade show" role="alert">
        📝 Draft tersimpan telah dimuat
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
    
    const form = document.getElementById('journaling-form');
    form.insertBefore(notification, form.firstChild);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  handleLogout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      // Clear user data
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
      
      // Clear draft for this user
      this.clearDraft();
      
      // Redirect to login
      window.location.href = 'login.html';
    }
  }

  generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  getAuthToken() {
    return localStorage.getItem('authToken') || '';
  }

  // Analytics and tracking methods
  trackJournalEvent(eventType, data = {}) {
    // For analytics integration (Google Analytics, etc.)
    if (typeof gtag !== 'undefined') {
      gtag('event', eventType, {
        event_category: 'journaling',
        event_label: this.currentUser?.id || 'anonymous',
        ...data
      });
    }

    // For custom analytics
    console.log('Journal Event:', eventType, data);
  }

  // Utility methods for API integration
  async makeAPIRequest(endpoint, options = {}) {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`,
        'X-User-ID': this.currentUser?.id || 'anonymous'
      }
    };

    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    };

    try {
      const response = await fetch(`${this.apiEndpoint}${endpoint}`, mergedOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Real API integration methods (replace simulation methods)
  async submitJournalToML(journalData) {
    try {
      // Real API call to your ML backend
      const response = await this.makeAPIRequest('/analyze', {
        method: 'POST',
        body: JSON.stringify(journalData)
      });

      return response;
    } catch (error) {
      console.error('ML API Error:', error);
      throw error;
    }
  }

  async getJournalHistory(limit = 10) {
    try {
      const response = await this.makeAPIRequest(`/history?limit=${limit}`);
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch journal history:', error);
      return [];
    }
  }

  async getAnalyticsSummary() {
    try {
      const response = await this.makeAPIRequest('/analytics/summary');
      return response.data || {};
    } catch (error) {
      console.error('Failed to fetch analytics summary:', error);
      return {};
    }
  }

  // Enhanced validation methods
  sanitizeInput(text) {
    // Remove potentially harmful content
    return text
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .trim();
  }

  validateTextLength(text, minLength = 10, maxLength = 5000) {
    return text.length >= minLength && text.length <= maxLength;
  }

  detectSpam(text) {
    const spamPatterns = [
      /(.)\1{10,}/g, // Repeated characters
      /https?:\/\/[^\s]+/g, // URLs
      /\b\d{4,}\b/g // Long numbers
    ];

    return spamPatterns.some(pattern => pattern.test(text));
  }

  // Accessibility enhancements
  setupAccessibility() {
    const textarea = document.getElementById('journal-entry');
    if (textarea) {
      // Add ARIA labels
      textarea.setAttribute('aria-describedby', 'journal-help');
      
      // Add help text
      const helpText = document.createElement('div');
      helpText.id = 'journal-help';
      helpText.className = 'form-text';
      helpText.textContent = 'Bagikan perasaan dan pengalaman Anda dengan bebas. Tulisan Anda akan dianalisis untuk memberikan wawasan tentang kondisi mental Anda.';
      textarea.parentNode.appendChild(helpText);
    }
  }

  // Keyboard shortcuts
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

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show notification-toast`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
    `;
    notification.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }
}

// Initialize the application
const journalingApp = new JournalingApp();

// Export for use in other modules
export default journalingApp;