import "../styles/main.css";
import { initializeAnimations } from "./form/animations.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("main.js loaded, checking images...");
  
  // Image loading check
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    console.log(`Image: ${img.src}, Alt: ${img.alt}`);
    if (!img.complete || img.naturalWidth === 0) {
      console.error(`Failed to load image: ${img.src}`);
    }
  });

  // User authentication logic
  const currentUser = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : null;
  
  const loginBtn = document.getElementById("btn-login");
  const registerBtn = document.getElementById("btn-register");
  const logoutBtn = document.getElementById("btn-logout");

  if (currentUser) {
    loginBtn?.classList.add("d-none");
    registerBtn?.classList.add("d-none");
    logoutBtn?.classList.remove("d-none");
  } else {
    loginBtn?.classList.remove("d-none");
    registerBtn?.classList.remove("d-none");
    logoutBtn?.classList.add("d-none");
  }

  // Initialize animations
  try {
    await initializeAnimations();
  } catch (error) {
    console.error("Failed to initialize animations:", error);
  }

  // Card navigation logic with improved error handling and user feedback
  const cardNavigations = [
    {
      id: "card-question",
      url: "checkin.html",
      title: "Kuesioner Stres"
    },
    {
      id: "card-journaling", 
      url: "journaling.html",
      title: "Journaling"
    },
    {
      id: "card-analysis",
      url: "results.html", 
      title: "Hasil Analisis"
    },
    {
      id: "card-rekomendasi",
      url: "recommendations.html",
      title: "Rekomendasi"
    }
  ];

  // Setup card click handlers
  cardNavigations.forEach(({ id, url, title }) => {
    const card = document.getElementById(id);
    
    if (card) {
      // Add cursor pointer style
      card.style.cursor = "pointer";
      
      // Add click event listener
      card.addEventListener("click", (event) => {
        event.preventDefault();
        
        console.log(`Navigating to ${title} (${url})`);
        
        // Optional: Add loading state or animation
        card.style.opacity = "0.7";
        
        // Navigate to the page
        try {
          window.location.href = url;
        } catch (error) {
          console.error(`Failed to navigate to ${url}:`, error);
          // Reset card state if navigation fails
          card.style.opacity = "1";
          alert(`Gagal membuka halaman ${title}. Silakan coba lagi.`);
        }
      });

      // Add keyboard navigation support (accessibility)
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          card.click();
        }
      });

      // Add hover effects
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-5px) scale(1.02)";
        card.style.transition = "all 0.3s ease";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
      });

      // Make card focusable for keyboard navigation
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Navigasi ke ${title}`);
      
      console.log(`Card ${id} click handler initialized`);
    } else {
      console.warn(`Card with ID ${id} not found in DOM`);
    }
  });

  // Optional: Add visual feedback when cards are being hovered
  const allCards = document.querySelectorAll('.card');
  allCards.forEach(card => {
    if (!card.style.cursor) {
      card.style.cursor = "pointer";
    }
  });

  console.log("All card navigation handlers initialized successfully");
});

// Optional: Add global error handler for navigation issues
window.addEventListener('error', (event) => {
  if (event.filename && event.filename.includes('main.js')) {
    console.error('Error in main.js:', event.error);
  }
});

// Export for testing purposes (optional)
export { };
