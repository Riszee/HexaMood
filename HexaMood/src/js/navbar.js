// Debug version of navbar.js
document.addEventListener('DOMContentLoaded', () => {
  console.log('navbar.js loaded');
  
  // Update authentication state on page load
  updateNavbarAuthState();

  // Debug navbar toggle
  const toggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('#navbarNav');

  if (toggler && navbarCollapse) {
    toggler.addEventListener('click', () => {
      console.log('Navbar toggler clicked');
      // Bootstrap should handle the toggle via data-bs-toggle,
      // but we'll add a fallback for debugging
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
        toggler.setAttribute('aria-expanded', 'false');
      } else {
        navbarCollapse.classList.add('show');
        toggler.setAttribute('aria-expanded', 'true');
      }
    });
  } else {
    console.error('Navbar toggler or collapse element not found');
  }

  // Add event listener for logout button after DOM is loaded
  setupLogoutButton();
});

function updateNavbarAuthState() {
  try {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentUser = localStorage.getItem('currentUser');
    
    console.log('Auth state check:', { isLoggedIn, hasCurrentUser: !!currentUser });
    
    const loginBtn = document.getElementById('btn-login');
    const registerBtn = document.getElementById('btn-register');
    const logoutBtn = document.getElementById('btn-logout');
    
    console.log('Button elements found:', { 
      loginBtn: !!loginBtn, 
      registerBtn: !!registerBtn, 
      logoutBtn: !!logoutBtn 
    });
    
    if (isLoggedIn && currentUser) {
      // User is logged in - show logout button, hide login/register
      if (loginBtn) loginBtn.classList.add('d-none');
      if (registerBtn) registerBtn.classList.add('d-none');
      if (logoutBtn) {
        logoutBtn.classList.remove('d-none');
        console.log('Logout button should be visible now');
      }
    } else {
      // User is not logged in - show login/register buttons, hide logout
      if (loginBtn) loginBtn.classList.remove('d-none');
      if (registerBtn) registerBtn.classList.remove('d-none');
      if (logoutBtn) {
        logoutBtn.classList.add('d-none');
        console.log('Logout button should be hidden now');
      }
    }
    
    // Setup logout button event listener after visibility is set
    setupLogoutButton();
    
  } catch (error) {
    console.error('Error updating navbar auth state:', error);
    // Default to logged out state
    const loginBtn = document.getElementById('btn-login');
    const registerBtn = document.getElementById('btn-register');
    const logoutBtn = document.getElementById('btn-logout');
    
    if (loginBtn) loginBtn.classList.remove('d-none');
    if (registerBtn) registerBtn.classList.remove('d-none');
    if (logoutBtn) logoutBtn.classList.add('d-none');
  }
}

function setupLogoutButton() {
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    console.log('Setting up logout button event listener');
    
    // Remove existing event listeners to prevent duplicates
    logoutBtn.replaceWith(logoutBtn.cloneNode(true));
    const newLogoutBtn = document.getElementById('btn-logout');
    
    // Add click event listener
    newLogoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Logout button clicked!');
      handleLogout();
    });
    
    console.log('Logout button event listener added');
  } else {
    console.log('Logout button not found');
  }
}

// Unified logout function that clears all necessary data
function handleLogout() {
  console.log('handleLogout function called');
  
  try {
    // Clear all authentication and user data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    
    // Clear application-specific data
    localStorage.removeItem('lastPrediction');
    localStorage.removeItem('journalHistory');
    
    console.log('LocalStorage cleared');
    
    alert('Anda telah keluar.');
    
    // Update navbar state immediately
    updateNavbarAuthState();
    
    // Redirect to home page
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Error during logout:', error);
    alert('Terjadi kesalahan saat logout.');
  }
}

// Helper functions for authentication
function isAuthenticated() {
  try {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentUser = localStorage.getItem('currentUser');
    const token = localStorage.getItem('token');
    
    return isLoggedIn && currentUser && token;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
}

function getCurrentUser() {
  try {
    if (isAuthenticated()) {
      return JSON.parse(localStorage.getItem('currentUser'));
    }
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

function requireAuth() {
  if (!isAuthenticated()) {
    alert('Anda harus login terlebih dahulu untuk mengakses halaman ini.');
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// Export functions for global use
window.updateNavbarAuthState = updateNavbarAuthState;
window.isAuthenticated = isAuthenticated;
window.getCurrentUser = getCurrentUser;
window.requireAuth = requireAuth;
window.handleLogout = handleLogout;