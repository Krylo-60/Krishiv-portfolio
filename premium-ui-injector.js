// premium-ui-injector.js
// This script acts as a global unified enhancer. It automatically transforms all standard panels,
// cards, and buttons across 200+ pages into highly reactive glass-morphic elements with 0 manual CSS tweaks.

(function initPremiumUI() {
  if (window._premiumUI_loaded) return;
  window._premiumUI_loaded = true;

  // 1. Dynamic Hover Glow Effect across components
  const attachGlowEffects = () => {
    // Specifically target panels, cards, inputs, and buttons globally
    const interactibles = document.querySelectorAll(".card, .project-card, .btn, button, .concept-shell, .concept-item, .hero-stat, .signal-card, .mega-card, .story-card, .proof-card, .telemetry-card");
    
    interactibles.forEach(el => {
      // Prevent double attachment
      if (el.dataset.premiumHover) return;
      el.dataset.premiumHover = "true";
      
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty("--mouse-x", `${x}px`);
        el.style.setProperty("--mouse-y", `${y}px`);
      });
      
      // Inject the base logic class dynamically
      el.classList.add("premium-glow-target");
    });
  };

  // 2. Beautiful Ripple Animation on Clicks
  const attachRipple = () => {
    const buttons = document.querySelectorAll('button, .btn, .concept-link, .nav-links a');
    buttons.forEach(btn => {
      if (btn.dataset.premiumRipple) return;
      btn.dataset.premiumRipple = "true";
      
      // We must map it specifically for position absolute relative tracking.
      if (getComputedStyle(btn).position === "static") {
        btn.style.position = "relative";
      }
      
      // Keep overflow hidden for the ripple clipping
      btn.style.overflow = "hidden";

      btn.addEventListener("click", function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const circle = document.createElement("span");
        circle.classList.add("premium-ripple");
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
        
        this.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
      });
    });
  };

  // 3. Inject Master Styles inside JS to prevent CORS/Link drops across 200 apps
  const injectPremiumCSS = () => {
    if (document.getElementById("premium-global-css")) return;
    const style = document.createElement("style");
    style.id = "premium-global-css";
    style.innerHTML = `
      .premium-glow-target {
        position: relative;
        overflow: hidden;
      }
      .premium-glow-target::before {
        content: "";
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: radial-gradient(
          800px circle at var(--mouse-x, 0) var(--mouse-y, 0),
          rgba(255, 255, 255, 0.05),
          transparent 40%
        );
        z-index: 0;
        opacity: 0;
        transition: opacity 0.5s;
        pointer-events: none;
      }
      .premium-glow-target:hover::before {
        opacity: 1;
      }
      
      button.premium-glow-target::before, .btn.premium-glow-target::before, a.premium-glow-target::before {
        background: radial-gradient(
          120px circle at var(--mouse-x, 0) var(--mouse-y, 0),
          rgba(255, 255, 255, 0.2),
          transparent 50%
        );
      }

      .premium-ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: premiumRippleAnim 600ms cubic-bezier(0.4, 0, 0.2, 1);
        background-color: rgba(255, 255, 255, 0.25);
        pointer-events: none;
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-top: -50px;
        z-index: 9999;
      }

      @keyframes premiumRippleAnim {
        to {
          transform: scale(5);
          opacity: 0;
        }
      }
      
      /* Global Glass Elevators */
      .premium-glow-target {
        transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s;
      }
      .card.premium-glow-target:hover, .project-card.premium-glow-target:hover, .concept-shell.premium-glow-target:hover, .mega-card.premium-glow-target:hover, .story-card.premium-glow-target:hover {
        transform: translateY(-4px) scale(1.005);
        box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(99, 245, 210, 0.08);
        border-color: rgba(99, 245, 210, 0.3);
      }
    `;
    document.head.appendChild(style);
  };

  // Bootstrap sequence
  const startEngine = () => {
    injectPremiumCSS();
    attachGlowEffects();
    attachRipple();
    
    // Mutation tracking to self-heal newly added elements (React/AJAX support)
    const observer = new MutationObserver(() => {
      attachGlowEffects();
      attachRipple();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };

  // Wait for document ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startEngine);
  } else {
    startEngine();
  }
})();
