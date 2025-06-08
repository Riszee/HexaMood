class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: #f8f9fa;
          padding: 16px 0;
          border-top: 1px solid #dee2e6;
          font-size: 13px;
          color: #6c757d;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .copyright {
          color: #6c757d;
          margin: 0;
        }
        
        .nav-links {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 24px;
          flex-wrap: wrap;
        }
        
        .nav-links li {
          margin: 0;
        }
        
        .nav-links a {
          color: #6c757d;
          text-decoration: none;
          transition: color 0.3s ease;
          font-weight: 400;
        }
        
        .nav-links a:hover {
          color: #f56a9a;
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
          .container {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
          
          .nav-links {
            gap: 16px;
            justify-content: center;
          }
          
          footer {
            font-size: 12px;
          }
        }
        
        @media (max-width: 480px) {
          .nav-links {
            flex-direction: column;
            gap: 8px;
          }
        }
      </style>
      <footer>
        <div class="container">
          <div class="copyright">© 2025 HexaMood</div>
          <ul class="nav-links">
            <li><a href="index.html">Beranda</a></li>
            <li><a href="checkin.html">Daily Check-In</a></li>
            <li><a href="results.html">Hasil Prediksi</a></li>
            <li><a href="journaling.html">Journaling</a></li>
            <li><a href="recommendations.html">Rekomendasi</a></li>
          </ul>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-component', FooterComponent);