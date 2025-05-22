const initializeAnimations = () => {
    // Fade in body
    gsap.to("body", {
        opacity: 1,
        duration: 2.2,
        ease: "power2.out",
        stagger: 0.15
    });

    // Common animation configuration
    const defaultAnimation = {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power2.out"
    };

    // Header animations
    gsap.from(".logo-container", { ...defaultAnimation, y: -50 });
    gsap.from(".btn-masuk", { ...defaultAnimation, duration: 1 });
    gsap.from(".btn-daftar", { ...defaultAnimation, duration: 1 });

    // Main content animations
    gsap.from(".hero-text", defaultAnimation);
    gsap.from(".hero-illustration", defaultAnimation);
    gsap.from(".btn-learnmore", defaultAnimation);
    gsap.from(".btn-switch", defaultAnimation);

    // Sections animations
    gsap.from(".section-howitworks", defaultAnimation);
    gsap.from(".howitworks-cards", defaultAnimation);
    gsap.from(".section-stress", defaultAnimation);
    gsap.from(".stress-left", defaultAnimation);
    gsap.from(".stress-right", defaultAnimation);
    gsap.from(".stress-box", defaultAnimation);

    // Symptom items with stagger
    gsap.from(".symptom-item", {
        ...defaultAnimation,
        stagger: 0.2
    });

    // Footer animations
    gsap.from(".footer-top", defaultAnimation);
    gsap.from(".footer-subtext", defaultAnimation);
    gsap.from(".footer-bottom", defaultAnimation);
};

export { initializeAnimations };