import "../styles/main.css";
import { initializeAnimations } from "./form/animations.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("main.js loaded, checking images...");
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    console.log(`Image: ${img.src}, Alt: ${img.alt}`);
    if (!img.complete || img.naturalWidth === 0) {
      console.error(`Failed to load image: ${img.src}`);
    }
  });

  const currentUser = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : null;
  const loginBtn = document.getElementById("btn-login");
  const registerBtn = document.getElementById("btn-register");
  const logoutBtn = document.getElementById("btn-logout");

  if (currentUser) {
    loginBtn.classList.add("d-none");
    registerBtn.classList.add("d-none");
    logoutBtn.classList.remove("d-none");
  } else {
    loginBtn.classList.remove("d-none");
    registerBtn.classList.remove("d-none");
    logoutBtn.classList.add("d-none");
  }

  const cardQuestion = document.getElementById("card-question");
  const cardJournaling = document.getElementById("card-journaling");
  const cardAnalysis = document.getElementById("card-analysis");
  const cardRekomendasi = document.getElementById("card-rekomendasi");

  await initializeAnimations();

  if (cardQuestion) {
    cardQuestion.addEventListener("click", () => {
      window.location.href = "checkin.html";
    });
  }

  if (cardJournaling) {
    cardJournaling.addEventListener("click", () => {
      window.location.href = "journaling.html";
    });
  }

  if (cardAnalysis) {
    cardAnalysis.addEventListener("click", () => {
      window.location.href = "results.html";
    });
  }

  if (cardRekomendasi) {
    cardRekomendasi.addEventListener("click", () => {
      window.location.href = "recommendations.html";
    });
  }
});
