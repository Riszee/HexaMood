class NavbarComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.updateAuthState();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${this.getStyles()}
      </style>
      <header class="navbar-header">
        <nav class="navbar">
          <div class="container">
            <a class="navbar-brand" href="index.html">
              <img alt="Logo HexaMood" class="logo" src="images/logo.jpg"/>
              <span class="logo-text">HexaMood</span>
            </a>
            
            <button class="navbar-toggler" type="button" aria-label="Toggle navigation">
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </button>
            
            <div class="navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="index.html">Beranda</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="checkin.html">Daily Check-In</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="results.html">Hasil Prediksi</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="journaling.html">Journaling</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="recommendations.html">Rekomendasi</a>
                </li>
              </ul>
              
              <div class="auth-buttons">
                <button class="btn btn-masuk d-none" id="btn-login">Masuk</button>
                <button class="btn btn-daftar d-none" id="btn-register">Daftar</button>
                <button class="btn btn-logout d-none" id="btn-logout">Keluar</button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    `;
  }

  getStyles() {
    return `
      /* Import Inter font */
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      .navbar-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #ffffff;
        border-bottom: 1px solid #e5e7eb;
        z-index: 1000;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
      }

      .navbar {
        padding: 0;
        min-height: 80px;
        display: flex;
        align-items: center;
      }

      .container {
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
        padding: 0 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .navbar-brand {
        display: flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
        color: inherit;
      }

      .navbar-brand:hover {
        text-decoration: none;
      }

      .logo {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        object-fit: cover;
      }

      .logo-text {
        font-weight: 700;
        font-size: 24px;
        color: #1f2937;
        user-select: none;
      }

      /* Hamburger Button */
      .navbar-toggler {
        display: none;
        flex-direction: column;
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        gap: 4px;
        z-index: 1100;
      }

      .hamburger-line {
        width: 24px;
        height: 3px;
        background-color: #374151;
        border-radius: 2px;
        transition: all 0.3s ease;
      }

      .navbar-toggler.active .hamburger-line:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
      }

      .navbar-toggler.active .hamburger-line:nth-child(2) {
        opacity: 0;
      }

      .navbar-toggler.active .hamburger-line:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
      }

      /* Navigation */
      .navbar-collapse {
        display: flex;
        align-items: center;
        gap: 48px;
      }

      .navbar-nav {
        display: flex;
        align-items: center;
        gap: 40px;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .nav-item {
        margin: 0;
      }

      .nav-link {
        color: #6b7280;
        text-decoration: none;
        font-weight: 500;
        font-size: 16px;
        padding: 8px 0;
        position: relative;
        transition: color 0.2s ease;
        cursor: pointer;
      }

      .nav-link:hover {
        color: #f56a9a;
        text-decoration: none;
      }

      .nav-link.active {
        color: #f56a9a;
        font-weight: 600;
      }

      /* Auth Buttons */
      .auth-buttons {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .btn {
        border-radius: 25px;
        padding: 10px 24px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        border: none;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        white-space: nowrap;
      }

      .btn-masuk {
        background: #ec4899;
        color: white;
        box-shadow: 0 2px 8px rgba(236, 72, 153, 0.2);
      }

      .btn-masuk:hover {
        background: transparent;
        color: #ec4899;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);
      }

      .btn-daftar {
        background: transparent;
        color: #ec4899;
        border: 1px solid #ec4899;
        box-shadow: 0 2px 8px rgba(236, 72, 153, 0.2);
      }

      .btn-daftar:hover {
        background: #ec4899;
        color: white;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);
      }

      .btn-logout {
        background: transparent;
        color:  #ec4899;
        border: 1px solid  #f56a9a;
        box-shadow: 0 2px 8px rgba(236, 72, 153, 0.2);
      }

      .btn-logout:hover {
        background: #ec4899;
        color:  white;
        border-color: #f56a9a;
        box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);
      }

      /* Mobile Styles */
      @media (max-width: 991px) {
        .navbar-toggler {
          display: flex;
        }

        .navbar-collapse {
          position: fixed;
          top: 0;
          right: -100%;
          width: 300px;
          height: 100vh;
          background: #ffffff;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
          padding: 100px 30px 30px;
          box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
          transition: right 0.3s ease;
          gap: 0;
        }

        .navbar-collapse.show {
          right: 0;
        }

        .navbar-nav {
          flex-direction: column;
          align-items: stretch;
          gap: 0;
          width: 100%;
          margin-bottom: 30px;
        }

        .nav-item {
          width: 100%;
          border-bottom: 1px solid #f3f4f6;
        }

        .nav-link {
          padding: 16px 0;
          display: block;
          width: 100%;
          text-align: left;
          font-size: 16px;
        }

        .auth-buttons {
          flex-direction: column;
          width: 100%;
          gap: 12px;
        }

        .btn {
          width: 100%;
          padding: 14px 24px;
          font-size: 16px;
        }

        /* Overlay for mobile menu */
        .navbar-collapse::before {
          content: '';
          position: fixed;
          top: 0;
          left: -100vw;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          z-index: -1;
          transition: left 0.3s ease;
        }

        .navbar-collapse.show::before {
          left: -300px;
        }
      }

      @media (max-width: 768px) {
        .container {
          padding: 0 16px;
        }

        .navbar {
          min-height: 70px;
        }

        .logo {
          width: 36px;
          height: 36px;
        }

        .logo-text {
          font-size: 20px;
        }
      }

      @media (max-width: 480px) {
        .navbar-collapse {
          width: 280px;
        }

        .logo-text {
          font-size: 18px;
        }
      }

      /* Utility classes */
      .d-none {
        display: none !important;
      }
    `;
  }

  setupEventListeners() {
    const toggler = this.shadowRoot.querySelector('.navbar-toggler');
    const navbarCollapse = this.shadowRoot.querySelector('#navbarNav');
    const loginBtn = this.shadowRoot.querySelector('#btn-login');
    const registerBtn = this.shadowRoot.querySelector('#btn-register');
    const logoutBtn = this.shadowRoot.querySelector('#btn-logout');

    if (toggler && navbarCollapse) {
      toggler.addEventListener('click', (e) => {
        e.stopPropagation();
        navbarCollapse.classList.toggle('show');
        toggler.classList.toggle('active');
      });

      // Close navbar when clicking outside or on overlay
      document.addEventListener('click', (e) => {
        if (!this.shadowRoot.contains(e.target) || e.target === navbarCollapse) {
          navbarCollapse.classList.remove('show');
          toggler.classList.remove('active');
        }
      });

      // Close navbar when clicking on nav links in mobile
      const navLinks = this.shadowRoot.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 991) {
            navbarCollapse.classList.remove('show');
            toggler.classList.remove('active');
          }
        });
      });
    }

    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        window.location.href = 'login.html';
      });
    }

    if (registerBtn) {
      registerBtn.addEventListener('click', () => {
        window.location.href = 'register.html';
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleLogout();
      });
    }

    // Set active nav link based on current page
    this.setActiveNavLink();

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 991) {
        navbarCollapse.classList.remove('show');
        toggler.classList.remove('active');
      }
    });
  }

  setActiveNavLink() {
    const navLinks = this.shadowRoot.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  updateAuthState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentUser = localStorage.getItem('currentUser');
    const loginBtn = this.shadowRoot.querySelector('#btn-login');
    const registerBtn = this.shadowRoot.querySelector('#btn-register');
    const logoutBtn = this.shadowRoot.querySelector('#btn-logout');

    if (isLoggedIn && currentUser) {
      loginBtn?.classList.add('d-none');
      registerBtn?.classList.add('d-none');
      logoutBtn?.classList.remove('d-none');
    } else {
      loginBtn?.classList.remove('d-none');
      registerBtn?.classList.remove('d-none');
      logoutBtn?.classList.add('d-none');
    }
  }

  handleLogout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('lastPrediction');
    localStorage.removeItem('journalHistory');
    this.updateAuthState();
    window.location.href = 'index.html';
  }
}

customElements.define('navbar-component', NavbarComponent);
