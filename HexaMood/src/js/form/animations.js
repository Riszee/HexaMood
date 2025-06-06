import { gsap } from "gsap";

const safeAnimate = async (selector, options) => {
  if (document.querySelector(selector)) {
    await gsap.from(selector, options);
  }
};

export const initializeAnimations = () => {
  // console.log("disable gsap");

  /* gsap.to("body", {
    opacity: 1,
    duration: 2.2,
    ease: "power2.out",
    stagger: 0.15,
  });

  const defaultAnimation = {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: "power2.out",
  };

  safeAnimate(".logo-container", { ...defaultAnimation, y: -50 });
  safeAnimate(".btn-masuk", { ...defaultAnimation, duration: 1 });
  safeAnimate(".btn-daftar", { ...defaultAnimation, duration: 1 });
  safeAnimate(".hero-text", defaultAnimation);
  safeAnimate(".hero-illustration", defaultAnimation);
  safeAnimate(".btn-learnmore", defaultAnimation);
  safeAnimate(".btn-switch", defaultAnimation);
  safeAnimate(".section-howitworks", defaultAnimation);
  safeAnimate(".howitworks-cards", defaultAnimation);
  safeAnimate(".section-stress", defaultAnimation);
  safeAnimate(".stress-left", defaultAnimation);
  safeAnimate(".stress-right", defaultAnimation);
  safeAnimate(".stress-box", defaultAnimation);
  safeAnimate(".symptom-item", { ...defaultAnimation, stagger: 0.2 });
  safeAnimate(".footer-top", defaultAnimation);
  safeAnimate(".footer-subtext", defaultAnimation);
  safeAnimate(".footer-bottom", defaultAnimation);

  safeAnimate(".navbar-toggler", {
    opacity: 0,
    y: -50,
    duration: 1.5,
    ease: "power2.out",
    onComplete: () => {
      document.querySelector(".navbar-toggler").style.pointerEvents = "auto";
    },
  });

  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link, {
        color: "#FF6B6B",
        scale: 1.1,
        duration: 0.3,
        ease: "power1.out",
      });
    });
    link.addEventListener("mouseleave", () => {
      gsap.to(link, {
        color: link.classList.contains("active") ? "#ec4e4e" : "#333333",
        scale: 1,
        duration: 0.3,
        ease: "power1.out",
      });
    });
  }); */
};
