// premium-ui-injector.js
// Global unified enhancer: glow cursor, ripple clicks, card hover lifts, mouse-tracking glow panels.

(function initPremiumUI() {
  if (window._premiumUI_loaded) return;
  window._premiumUI_loaded = true;

  // ─── 1. GLOW CURSOR ──────────────────────────────────────────────────────────
  const installGlowCursor = () => {
    const el = document.createElement('div');
    el.id = 'kv-glow-cursor';
    document.body.appendChild(el);

    // Hide legacy cursors if they exist (e.g. in Master Nexus)
    const legacyCursor = document.getElementById('cursor');
    if (legacyCursor) legacyCursor.style.display = 'none';

    let curX = window.innerWidth / 2;
    let curY = window.innerHeight / 2;
    let aimX = curX;
    let aimY = curY;

    document.addEventListener('mousemove', (e) => {
      aimX = e.clientX;
      aimY = e.clientY;
    });

    // Lerp for smooth, laggy follow feel
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      curX = lerp(curX, aimX, 0.10);
      curY = lerp(curY, aimY, 0.10);
      el.style.left = curX + 'px';
      el.style.top  = curY + 'px';
      requestAnimationFrame(animate);
    };
    animate();

    // Pulse larger when hovering interactive elements
    document.addEventListener('mouseover', (e) => {
      if (!(e.target instanceof HTMLElement)) return;
      const isInteractive = e.target.closest('button, a, input, select, textarea, [role="button"], .btn');
      el.style.width  = isInteractive ? '500px' : '340px';
      el.style.height = isInteractive ? '500px' : '340px';
    });

    // Hide on touch devices
    window.addEventListener('touchstart', () => { el.style.opacity = '0'; }, { passive: true });
  };

  // ─── 2. CARD HOVER GLOW (mouse-tracking spotlight) ───────────────────────────
  const attachGlowEffects = () => {
    const targets = document.querySelectorAll(
      '.card, .project-card, .btn, button, .concept-shell, .concept-item, ' +
      '.hero-stat, .signal-card, .mega-card, .story-card, .proof-card, .telemetry-card, ' +
      '.app-verse-card, .link-card'
    );
    targets.forEach(el => {
      if (el.dataset.premiumHover) return;
      el.dataset.premiumHover = 'true';
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
      el.classList.add('premium-glow-target');
    });
  };

  // ─── 3. RIPPLE ON CLICK ───────────────────────────────────────────────────────
  const attachRipple = () => {
    const buttons = document.querySelectorAll('button, .btn, .concept-link, .nav-links a');
    buttons.forEach(btn => {
      if (btn.dataset.premiumRipple) return;
      btn.dataset.premiumRipple = 'true';
      if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const circle = document.createElement('span');
        circle.classList.add('premium-ripple');
        circle.style.left = `${e.clientX - rect.left}px`;
        circle.style.top  = `${e.clientY - rect.top}px`;
        this.appendChild(circle);
        setTimeout(() => circle.remove(), 620);
      });
    });
  };

  // ─── 4. INJECT CSS ────────────────────────────────────────────────────────────
  const injectPremiumCSS = () => {
    if (document.getElementById('premium-global-css')) return;
    const style = document.createElement('style');
    style.id = 'premium-global-css';
    style.textContent = `
      /* Glow cursor sizing transition */
      #kv-glow-cursor {
        transition:
          width  0.45s cubic-bezier(0.22,1,0.36,1),
          height 0.45s cubic-bezier(0.22,1,0.36,1),
          opacity 0.3s ease;
      }

      /* Mouse-tracking spotlight on card panels */
      .premium-glow-target { position: relative; overflow: hidden; }
      .premium-glow-target::before {
        content: '';
        position: absolute; inset: 0;
        background: radial-gradient(
          800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
          rgba(255,255,255,0.045),
          transparent 40%
        );
        opacity: 0;
        transition: opacity 0.45s ease;
        pointer-events: none;
        z-index: 0;
      }
      .premium-glow-target:hover::before { opacity: 1; }

      /* Tighter spotlight on small interactive elements */
      button.premium-glow-target::before,
      .btn.premium-glow-target::before,
      a.premium-glow-target::before {
        background: radial-gradient(
          120px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
          rgba(255,255,255,0.18),
          transparent 60%
        );
      }

      /* Click ripple */
      .premium-ripple {
        position: absolute;
        width: 100px; height: 100px;
        margin: -50px 0 0 -50px;
        border-radius: 50%;
        background: rgba(255,255,255,0.22);
        transform: scale(0);
        animation: premiumRippleAnim 620ms cubic-bezier(0.4,0,0.2,1) forwards;
        pointer-events: none;
        z-index: 9999;
      }
      @keyframes premiumRippleAnim {
        to { transform: scale(5); opacity: 0; }
      }

      /* Card glass lift */
      .premium-glow-target {
        transition:
          transform   0.3s cubic-bezier(0.2,0.8,0.2,1),
          box-shadow  0.3s cubic-bezier(0.2,0.8,0.2,1),
          border-color 0.3s ease;
      }
      .card.premium-glow-target:hover,
      .project-card.premium-glow-target:hover,
      .mega-card.premium-glow-target:hover,
      .story-card.premium-glow-target:hover,
      .concept-shell.premium-glow-target:hover,
      .app-verse-card.premium-glow-target:hover,
      .link-card.premium-glow-target:hover {
        transform: translateY(-4px) scale(1.006);
        box-shadow: 0 22px 44px rgba(0,0,0,0.38), 0 0 22px rgba(99,245,210,0.09);
        border-color: rgba(99,245,210,0.28);
      }
    `;
    document.head.appendChild(style);
  };

  // ─── BOOT ─────────────────────────────────────────────────────────────────────
  const startEngine = () => {
    injectPremiumCSS();
    installGlowCursor();
    attachGlowEffects();
    attachRipple();

    // Re-scan dynamically added elements
    new MutationObserver(() => {
      attachGlowEffects();
      attachRipple();
    }).observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startEngine);
  } else {
    startEngine();
  }
})();
