    (function() {
      const sections = Array.from(document.querySelectorAll('main section[id]'));
      const header = document.querySelector('.site-header');
      const navMenuBtn = document.getElementById('navMenuBtn');
      const mainNav = document.getElementById('mainNav');
      const scrollProgressBar = document.getElementById('scrollProgressBar');
      const quickTopBtn = document.getElementById('quickTopBtn');
      const launcherBtn = document.getElementById('launcherBtn');
      const headerLaunchBtn = document.getElementById('headerLaunchBtn');
      const commandPalette = document.getElementById('commandPalette');
      const paletteSearch = document.getElementById('paletteSearch');
      const paletteList = document.getElementById('paletteList');
      const paletteCloseBtn = document.getElementById('paletteCloseBtn');
      const navSearchForm = document.getElementById('navSearchForm');
      const navSearchInput = document.getElementById('navSearchInput');
      const navSearchOptions = document.getElementById('navSearchOptions');
      const heroQuickApp = document.getElementById('heroQuickApp');
      const heroQuickGo = document.getElementById('heroQuickGo');
      const heroRandomGo = document.getElementById('heroRandomGo');
      const musicPlayer = document.getElementById('musicPlayer');
      const musicPlayBtn = document.getElementById('musicPlayBtn');
      const musicProgress = document.getElementById('musicProgress');
      const musicTime = document.getElementById('musicTime');
      const musicVolume = document.getElementById('musicVolume');
      const musicTrackState = document.getElementById('musicTrackState');
      const musicMuteBtn = document.getElementById('musicMuteBtn');
      const heroProjectsStat = document.getElementById('heroProjectsStat');
      const heroPagesStat = document.getElementById('heroPagesStat');
      const heroAppsStat = document.getElementById('heroAppsStat');
      const heroBackendStat = document.getElementById('heroBackendStat');
      const appCountStat = document.getElementById('appCountStat');
      const categoryCountStat = document.getElementById('categoryCountStat');
      const totalLaunchesStat = document.getElementById('totalLaunchesStat');
      const backendModeStat = document.getElementById('backendModeStat');
      const appLeaderboard = document.getElementById('appLeaderboard');
      const recentAppTray = document.getElementById('recentAppTray');
      const dailyBuilderTip = document.getElementById('dailyBuilderTip');
      const appVerseGrid = document.querySelector('.app-verse-grid');
      const appVerseSearch = document.getElementById('appVerseSearch');
      const appVerseCategory = document.getElementById('appVerseCategory');
      const appVerseStatus = document.getElementById('appVerseStatus');
      const appTierButtons = Array.from(document.querySelectorAll('.app-tier-btn'));
      const proofProjectCount = document.getElementById('proofProjectCount');
      const proofLiveCount = document.getElementById('proofLiveCount');
      const proofAppCount = document.getElementById('proofAppCount');
      const proofSectionCount = document.getElementById('proofSectionCount');
      const missionProgress = document.getElementById('missionProgress');
      const openTopAppBtn = document.getElementById('openTopAppBtn');
      const shuffleAppsBtn = document.getElementById('shuffleAppsBtn');
      const scanImagesBtn = document.getElementById('scanImagesBtn');
      const imageScanStatus = document.getElementById('imageScanStatus');
      const ccBackendMode = document.getElementById('ccBackendMode');
      const ccSyncSource = document.getElementById('ccSyncSource');
      const ccSyncTime = document.getElementById('ccSyncTime');
      const ccSubs = document.getElementById('ccSubs');
      const ccViews = document.getElementById('ccViews');
      const ccVideos = document.getElementById('ccVideos');
      const ccMessage = document.getElementById('ccMessage');
      const ccClock = document.getElementById('ccClock');
      const ccQualityScore = document.getElementById('ccQualityScore');
      const ccAiLoaded = document.getElementById('ccAiLoaded');
      const ccAiReady = document.getElementById('ccAiReady');
      const ccAiCooling = document.getElementById('ccAiCooling');
      const ccAiSuccesses = document.getElementById('ccAiSuccesses');
      const ccAiStatus = document.getElementById('ccAiStatus');
      const ccPublicApps = document.getElementById('ccPublicApps');
      const ccReviewCount = document.getElementById('ccReviewCount');
      const ccIdeaCount = document.getElementById('ccIdeaCount');
      const ccSessionCount = document.getElementById('ccSessionCount');
      const ccTopApps = document.getElementById('ccTopApps');
      const feedbackSummary = document.getElementById('feedbackSummary');
      const feedbackPreviewGrid = document.getElementById('feedbackPreviewGrid');
      const futureClock = document.getElementById('futureClock');
      const futureLaunches = document.getElementById('futureLaunches');
      const futureQuality = document.getElementById('futureQuality');
      const futurePulse = document.getElementById('futurePulse');
      const installAppBtn = document.getElementById('installAppBtn');

      const APP_ANALYTICS_KEY = 'krishiv_home_app_launches_v1';
      const APP_RECENT_KEY = 'krishiv_home_recent_launches_v1';
      const HOME_THEME_KEY = 'krishiv_home_theme_v1';
      const HOME_THEMES = [
        { key: 'default', label: 'Aurora' },
        { key: 'neon', label: 'Neon' },
        { key: 'solar', label: 'Solar' }
      ];

      let launchAnalytics = {};
      let recentLaunches = [];
      let paletteTargets = [];
      let paletteActiveIndex = -1;
      let appVerseSearchTerm = '';
      let appVerseCategoryValue = 'all';
      let appVerseTierValue = 'all';
      let installPromptEvent = null;

      const escapeHtml = (value) => String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

      const createAppCardMarkup = (item) => {
        const tier = String(item.tier || 'live').trim().toLowerCase();
        const status = tier === 'featured' ? 'Featured Build' : 'Working App';
        const icon = escapeHtml(item.icon || 'logo.svg');
        const description = escapeHtml(item.description || item.lead || 'Open this app from the Krishiv Velocity app galaxy.');
        const title = escapeHtml(item.name || 'Untitled App');
        const tag = escapeHtml(item.cardKicker || item.tag || 'App');
        const searchTags = escapeHtml(item.searchTags || [item.name, item.tag, item.description].filter(Boolean).join(' '));
        const href = escapeHtml(item.href || '#');
        return `
          <a class="app-verse-card" href="${href}" data-launch-name="${title}" data-launch-tags="${searchTags}" data-tier="${tier}" aria-label="Open ${title}">
            <div class="app-verse-head">
              <img class="app-mini-logo-img" src="${icon}" alt="" loading="lazy" decoding="async" width="32" height="32" />
              <span class="card-kicker">${tag}</span>
            </div>
            <h3>${title}</h3>
            <span class="app-status-chip">${status}</span>
            <p>${description}</p>
          </a>
        `;
      };

      const bonusApps = Array.isArray(window.KRISHIV_BONUS_APPS) ? window.KRISHIV_BONUS_APPS : [];
      const injectBonusApps = () => {
        const existingHrefs = new Set(Array.from(document.querySelectorAll('.app-verse-card'))
          .map((card) => String(card.getAttribute('href') || '').trim())
          .filter(Boolean));

        bonusApps.forEach((item) => {
          const href = String(item && item.href || '').trim();
          if (!href || existingHrefs.has(href)) return;
          if (appVerseGrid) appVerseGrid.insertAdjacentHTML('beforeend', createAppCardMarkup(item));
          existingHrefs.add(href);
        });

        if (heroQuickApp) {
          const optionHrefs = new Set(Array.from(heroQuickApp.options || []).map((option) => option.value));
          bonusApps.forEach((item) => {
            const href = String(item && item.href || '').trim();
            if (!href || optionHrefs.has(href)) return;
            const option = document.createElement('option');
            option.value = href;
            option.textContent = item.name || href;
            heroQuickApp.appendChild(option);
            optionHrefs.add(href);
          });
        }
      };
      injectBonusApps();

      let appCards = Array.from(document.querySelectorAll('.app-verse-card'));
      const links = Array.from(document.querySelectorAll('a[href]'));

      const navDestinations = [
        { title: 'Home', href: '#home', subtitle: 'Jump to homepage hero' },
        { title: 'Projects', href: '#projects', subtitle: 'Featured builds and case studies' },
        { title: 'Apps Galaxy', href: '#app-verse', subtitle: 'Open the app directory on the homepage' },
        { title: 'All Links', href: 'all-links.html', subtitle: 'Full live site map' },
        { title: 'Games', href: 'games.html', subtitle: 'Gaming pages and profiles' },
        { title: 'Contact', href: '#contact', subtitle: 'Reach Krishiv PB' },
        ...bonusApps.map((item) => ({
          title: item.name || 'Extra App',
          href: item.href || '#',
          subtitle: item.tag || 'New app'
        }))
      ];

      const buildPaletteTargets = () => {
        const sectionTargets = sections.map((section) => {
          const heading = section.querySelector('h2, h1, h3');
          const title = (heading ? heading.textContent : section.id || 'Section').trim();
          return {
            title,
            href: '#' + section.id,
            subtitle: 'Section',
            search: (title + ' ' + section.id + ' section').toLowerCase()
          };
        });

        const appTargets = appCards.map((card) => {
          const title = String(card.dataset.launchName || (card.querySelector('h3') ? card.querySelector('h3').textContent : 'App')).trim();
          const href = String(card.getAttribute('href') || '#').trim();
          const subtitle = getAppCardCategory(card) || getAppCardStatus(card);
          const search = `${title} ${subtitle} ${card.dataset.launchTags || ''} ${href}`.toLowerCase();
          return { title, href, subtitle, search };
        });

        const navTargets = navDestinations.map((item) => ({
          title: item.title,
          href: item.href,
          subtitle: item.subtitle,
          search: `${item.title} ${item.subtitle} ${item.href}`.toLowerCase()
        }));

        const seen = new Set();
        paletteTargets = [...sectionTargets, ...navTargets, ...appTargets].filter((item) => {
          const key = `${item.href}|${item.title}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      };

      const populateNavSearch = () => {
        if (!navSearchOptions) return;
        navSearchOptions.innerHTML = paletteTargets
          .slice()
          .sort((left, right) => left.title.localeCompare(right.title))
          .map((item) => `<option value="${escapeHtml(item.title)}"></option>`)
          .join('');
      };

      const closeMobileMenu = () => {
        document.body.classList.remove('nav-open');
        if (navMenuBtn) {
          navMenuBtn.setAttribute('aria-expanded', 'false');
          navMenuBtn.textContent = 'Menu';
        }
      };

      const openMobileMenu = () => {
        document.body.classList.add('nav-open');
        if (navMenuBtn) {
          navMenuBtn.setAttribute('aria-expanded', 'true');
          navMenuBtn.textContent = 'Close';
        }
      };

      if (navMenuBtn) {
        navMenuBtn.addEventListener('click', () => {
          if (document.body.classList.contains('nav-open')) closeMobileMenu();
          else openMobileMenu();
        });
      }

      links.forEach((link) => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 900) closeMobileMenu();
        });
      });

      const applyHomeTheme = (themeKey, modeKey) => {
        const theme = HOME_THEMES.find((item) => item.key === themeKey) || HOME_THEMES[0];
        document.body.setAttribute('data-theme', theme.key);
        document.documentElement.setAttribute('data-theme', theme.key);
        document.body.setAttribute('data-mode', 'dark');
      };

      try {
        const savedTheme = localStorage.getItem(HOME_THEME_KEY) || String(document.body.getAttribute('data-theme') || 'default');
        applyHomeTheme(savedTheme, 'dark');
      } catch {
        applyHomeTheme(String(document.body.getAttribute('data-theme') || 'default'), 'dark');
      }

      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        installPromptEvent = event;
        if (installAppBtn) installAppBtn.style.display = '';
      });

      if (installAppBtn) {
        installAppBtn.addEventListener('click', async () => {
          if (!installPromptEvent) return;
          installPromptEvent.prompt();
          try {
            await installPromptEvent.userChoice;
          } catch {}
          installPromptEvent = null;
          installAppBtn.style.display = 'none';
        });
      }

      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('service-worker.js').catch(() => {});
        });
      }

      if (navSearchForm && navSearchInput) {
        navSearchForm.addEventListener('submit', (event) => {
          event.preventDefault();
          const query = navSearchInput.value.trim().toLowerCase();
          const exact = paletteTargets.find((item) => item.title.toLowerCase() === query);
          const firstMatch = exact || paletteTargets.find((item) => item.search.includes(query));
          if (firstMatch) {
            window.location.href = firstMatch.href;
          } else if (query) {
            openPalette();
            if (paletteSearch) {
              paletteSearch.value = navSearchInput.value.trim();
              renderPalette(navSearchInput.value.trim());
            }
          }
        });
      }

      const getAppCardCategory = (card) => {
        const kicker = card.querySelector('.card-kicker');
        return (kicker ? kicker.textContent : '').trim();
      };

      const getAppCardTier = (card) => {
        const tier = String(card.dataset.tier || '').trim().toLowerCase();
        if (tier) return tier;
        return 'live';
      };

      const getAppCardStatus = (card) => {
        const status = String(card.dataset.status || '').trim();
        if (status) return status;
        const tier = getAppCardTier(card);
        if (tier === 'featured') return 'Featured Build';
        return 'Working App';
      };

      const ensureAppStatusChips = () => {
        appCards.forEach((card) => {
          let chip = card.querySelector('.app-status-chip');
          if (!chip) {
            chip = document.createElement('span');
            chip.className = 'app-status-chip';
            const heading = card.querySelector('h3');
            if (heading) heading.insertAdjacentElement('afterend', chip);
            else card.appendChild(chip);
          }
          const tier = getAppCardTier(card);
          const status = getAppCardStatus(card);
          chip.textContent = status;
          chip.classList.toggle('is-featured', tier === 'featured');
          chip.classList.toggle('is-live', tier === 'live');
          chip.classList.toggle('is-concept', tier === 'concept');
          chip.classList.toggle('is-new', status.toLowerCase() === 'new');
          card.classList.toggle('is-featured-card', tier === 'featured');
        });
      };

      const syncTierButtons = () => {
        appTierButtons.forEach((button) => {
          const isActive = button.dataset.tierFilter === appVerseTierValue;
          button.classList.toggle('is-active', isActive);
          button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
      };

      buildPaletteTargets();
      populateNavSearch();

      ensureAppStatusChips();
      syncTierButtons();

      const populateAppCategories = () => {
        if (!appVerseCategory) return;
        const categories = Array.from(new Set(appCards.map((card) => getAppCardCategory(card)).filter(Boolean)));
        categories.forEach((category) => {
          const option = document.createElement('option');
          option.value = category.toLowerCase();
          option.textContent = category;
          appVerseCategory.appendChild(option);
        });
      };

      const applyAppFilter = () => {
        const term = appVerseSearchTerm.trim().toLowerCase();
        const category = appVerseCategoryValue;
        const tier = appVerseTierValue;
        let visibleCount = 0;

        appCards.forEach((card) => {
          const name = String(card.dataset.launchName || '').toLowerCase();
          const tags = String(card.dataset.launchTags || '').toLowerCase();
          const categoryText = getAppCardCategory(card).toLowerCase();
          const tierText = getAppCardTier(card);
          const matchesTerm = !term || name.includes(term) || tags.includes(term) || categoryText.includes(term);
          const matchesCategory = category === 'all' || categoryText === category;
          const matchesTier = tier === 'all' || tierText === tier;
          const show = matchesTerm && matchesCategory && matchesTier;
          card.style.display = show ? '' : 'none';
          if (show) visibleCount += 1;
        });

        if (appVerseStatus) {
          const activeFilters = [];
          if (tier !== 'all') activeFilters.push(tier === 'live' ? 'working apps' : tier);
          if (category !== 'all') activeFilters.push(category);
          const filterLabel = activeFilters.length
            ? ' in ' + activeFilters.join(' + ')
            : ' across featured and working app tiers';
          const searchLabel = term ? ' matching "' + appVerseSearchTerm.trim() + '"' : '';
          appVerseStatus.textContent = visibleCount === appCards.length && !term && category === 'all' && tier === 'all'
            ? 'Showing all apps across featured and working app tiers.'
            : 'Showing ' + visibleCount + ' of ' + appCards.length + ' apps' + filterLabel + searchLabel + '.';
        }
      };

      const loadAnalytics = () => {
        try {
          const raw = localStorage.getItem(APP_ANALYTICS_KEY);
          const parsed = raw ? JSON.parse(raw) : {};
          launchAnalytics = parsed && typeof parsed === 'object' ? parsed : {};
        } catch {
          launchAnalytics = {};
        }
        try {
          const rawRecent = localStorage.getItem(APP_RECENT_KEY);
          const parsedRecent = rawRecent ? JSON.parse(rawRecent) : [];
          recentLaunches = Array.isArray(parsedRecent) ? parsedRecent : [];
        } catch {
          recentLaunches = [];
        }
      };
      const saveAnalytics = () => {
        try {
          localStorage.setItem(APP_ANALYTICS_KEY, JSON.stringify(launchAnalytics));
          localStorage.setItem(APP_RECENT_KEY, JSON.stringify(recentLaunches.slice(0, 8)));
        } catch {
          // ignore private-mode quota failures
        }
      };
      const trackRecentLaunch = (href) => {
        if (!href) return;
        recentLaunches = [href, ...recentLaunches.filter((item) => item !== href)].slice(0, 8);
      };
      const renderAppStats = () => {
        const totalApps = appCards.length;
        const featuredCount = appCards.filter((card) => getAppCardTier(card) === 'featured').length;
        const workingCount = appCards.filter((card) => getAppCardTier(card) === 'live').length;

        if (appCountStat) appCountStat.textContent = String(totalApps);
        if (heroAppsStat) heroAppsStat.textContent = String(totalApps);
        if (categoryCountStat) categoryCountStat.textContent = String(featuredCount);
        if (totalLaunchesStat) totalLaunchesStat.textContent = String(workingCount);

        if (appLeaderboard) {
          const top = appCards
            .map((card) => {
              const cardHeading = card.querySelector('h3');
              const title = (card.dataset.launchName || (cardHeading ? cardHeading.textContent : '') || 'App').trim();
              const href = card.getAttribute('href') || '#';
              return { title, href, launches: Number(launchAnalytics[href] || 0) };
            })
            .sort((a, b) => b.launches - a.launches || a.title.localeCompare(b.title))
            .slice(0, 5);

          appLeaderboard.innerHTML = top
            .map((item, idx) => `
              <a class="app-leaderboard-item" href="${item.href}">
                <strong>#${idx + 1} ${item.title}</strong>
                <span>${item.launches} launches</span>
              </a>
            `)
            .join('');
        }

        if (recentAppTray) {
          const lookupTitle = (href) => {
            const card = appCards.find((item) => (item.getAttribute('href') || '') === href);
            if (!card) return href;
            const heading = card.querySelector('h3');
            return (card.dataset.launchName || (heading ? heading.textContent : href) || href).trim();
          };
          recentAppTray.innerHTML = recentLaunches.length
            ? recentLaunches.map((href, idx) => `
                <a class="app-leaderboard-item" href="${href}">
                  <strong>#${idx + 1} ${lookupTitle(href)}</strong>
                  <span>Recent launch</span>
                </a>
              `).join('')
            : '<p class="meta">No recent launches yet.</p>';
        }

        if (dailyBuilderTip) {
          const tips = [
            'Tip: Launch one app every day and improve one small feature.',
            'Tip: Keep app names clear so users instantly understand purpose.',
            'Tip: Add one keyboard shortcut to your most-used app.',
            'Tip: Use icons + short text for faster scanning.',
            'Tip: Track launches and improve your top 3 apps weekly.',
            'Tip: Keep forms simple: less fields, better completion.',
            'Tip: Save user data locally so apps feel reliable.'
          ];
          const tip = tips[new Date().getDay() % tips.length];
          dailyBuilderTip.textContent = 'Daily Builder Tip: ' + tip;
        }
      };
      const renderProofMetrics = () => {
        const projectCards = Array.from(document.querySelectorAll('.project-card'));
        const liveProjectCount = projectCards.filter((card) => {
          const stateText = ((card.querySelector('.project-state') || {}).textContent || '').toLowerCase();
          return /live now|active/.test(stateText);
        }).length;
        const publicPages = Array.from(document.querySelectorAll('.app-verse-card'))
          .map((card) => String(card.getAttribute('href') || '').trim())
          .filter((href) => href.endsWith('.html'));
        const uniquePublicPages = new Set(publicPages);
        if (heroProjectsStat) heroProjectsStat.textContent = String(projectCards.length);
        if (heroPagesStat) heroPagesStat.textContent = String(uniquePublicPages.size);
        if (proofProjectCount) proofProjectCount.textContent = String(projectCards.length);
        if (proofLiveCount) proofLiveCount.textContent = String(liveProjectCount);
        if (proofAppCount) proofAppCount.textContent = String(appCards.length);
        if (proofSectionCount) proofSectionCount.textContent = String(sections.length);
      };

      const MISSION_KEY = 'krishiv_power_missions_v1';
      const loadMissionState = () => {
        try {
          const raw = localStorage.getItem(MISSION_KEY);
          const parsed = raw ? JSON.parse(raw) : {};
          return parsed && typeof parsed === 'object' ? parsed : {};
        } catch {
          return {};
        }
      };
      const saveMissionState = (state) => {
        try { localStorage.setItem(MISSION_KEY, JSON.stringify(state)); } catch {}
      };
      const renderMissionState = () => {
        const state = loadMissionState();
        const checks = Array.from(document.querySelectorAll('input[type="checkbox"][data-mission]'));
        let done = 0;
        checks.forEach((check) => {
          const key = String(check.dataset.mission || '');
          const value = Boolean(state[key]);
          check.checked = value;
          if (value) done += 1;
        });
        if (missionProgress) missionProgress.textContent = 'Progress: ' + done + '/' + checks.length + ' complete';
      };
      const installMissionBoard = () => {
        const checks = Array.from(document.querySelectorAll('input[type="checkbox"][data-mission]'));
        if (!checks.length) return;
        checks.forEach((check) => {
          check.addEventListener('change', () => {
            const state = loadMissionState();
            const key = String(check.dataset.mission || '');
            state[key] = check.checked;
            saveMissionState(state);
            renderMissionState();
          });
        });
        renderMissionState();
      };

      const replacePlaceholderImages = () => {
        const imgs = Array.from(document.querySelectorAll('img'));
        let changed = 0;
        imgs.forEach((img) => {
          const src = String(img.getAttribute('src') || '');
          const isPlaceholder = !src || /placeholder|dummy|temp-image|coming-soon/i.test(src);
          if (isPlaceholder) {
            img.setAttribute('src', 'logo.svg');
            changed += 1;
          }
          img.addEventListener('error', () => {
            if (img.getAttribute('src') !== 'logo.svg') {
              img.setAttribute('src', 'logo.svg');
            }
          }, { once: true });
        });
        return changed;
      };

      appCards.forEach((card) => {
        card.addEventListener('click', () => {
          const href = card.getAttribute('href') || '';
          if (!href) return;
          launchAnalytics[href] = Number(launchAnalytics[href] || 0) + 1;
          trackRecentLaunch(href);
          saveAnalytics();
          renderAppStats();
        });
      });
      populateAppCategories();
      applyAppFilter();
      if (appVerseSearch) {
        appVerseSearch.addEventListener('input', () => {
          appVerseSearchTerm = appVerseSearch.value;
          applyAppFilter();
        });
      }
      if (appVerseCategory) {
        appVerseCategory.addEventListener('change', () => {
          appVerseCategoryValue = String(appVerseCategory.value || 'all').toLowerCase();
          applyAppFilter();
        });
      }
      appTierButtons.forEach((button) => {
        button.addEventListener('click', () => {
          appVerseTierValue = String(button.dataset.tierFilter || 'all').toLowerCase();
          syncTierButtons();
          applyAppFilter();
        });
      });
      loadAnalytics();
      renderAppStats();
      renderProofMetrics();
      installMissionBoard();
      const replacedOnBoot = replacePlaceholderImages();
      if (imageScanStatus) imageScanStatus.textContent = replacedOnBoot > 0
        ? 'Image scan: fixed ' + replacedOnBoot + ' placeholder image(s).'
        : 'Image scan: no placeholder images found.';

      if (openTopAppBtn) {
        openTopAppBtn.addEventListener('click', () => {
          const top = Object.entries(launchAnalytics)
            .sort((a, b) => Number(b[1] || 0) - Number(a[1] || 0))[0];
          if (top && top[0]) {
            launchHref(top[0]);
            return;
          }
          if (heroQuickApp) launchHref(heroQuickApp.value);
        });
      }
      if (shuffleAppsBtn) {
        shuffleAppsBtn.addEventListener('click', () => {
          const cards = Array.from(document.querySelectorAll('.app-verse-grid .app-verse-card'));
          const parent = cards[0] ? cards[0].parentElement : null;
          if (!parent || cards.length < 2) return;
          const shuffled = cards.slice().sort(() => Math.random() - 0.5);
          shuffled.forEach((card) => parent.appendChild(card));
        });
      }
      if (scanImagesBtn) {
        scanImagesBtn.addEventListener('click', () => {
          const changed = replacePlaceholderImages();
          if (imageScanStatus) imageScanStatus.textContent = changed > 0
            ? 'Image scan: fixed ' + changed + ' placeholder image(s).'
            : 'Image scan: all images already look good.';
        });
      }

      const loadBackendHealth = async () => {
        // Static Vercel site - no /api/health endpoint, ping the site itself
        if (heroBackendStat) { heroBackendStat.textContent = 'live Γ£à'; heroBackendStat.style.color = '#56d5a6'; }
        if (backendModeStat) backendModeStat.textContent = 'static';
        if (ccBackendMode) ccBackendMode.textContent = 'static';
        // Also try a no-cors ping to confirm online
        try {
          await fetch('https://krishiv-new-portfoilo.vercel.app/', { mode: 'no-cors', cache: 'no-store' });
        } catch {
          if (heroBackendStat) heroBackendStat.textContent = 'ΓÜá∩╕Å check network';
        }
      };
      loadBackendHealth();

      const loadPlatformOverview = async () => {
        try {
          const response = await fetch('/api/platform/overview', { cache: 'no-store' });
          if (!response.ok) throw new Error('platform overview failed');
          const data = await response.json();
          if (ccAiLoaded) ccAiLoaded.textContent = String(Number(data?.ai?.loadedKeys || 0));
          if (ccAiReady) ccAiReady.textContent = String(Number(data?.ai?.readyKeys || 0));
          if (ccAiCooling) ccAiCooling.textContent = String(Number(data?.ai?.coolingKeys || 0));
          if (ccAiSuccesses) ccAiSuccesses.textContent = String(Number(data?.ai?.totalSuccesses || 0));
          if (ccAiStatus) {
            ccAiStatus.textContent = 'Model: ' + String(data?.ai?.model || 'unknown') + ' - failures tracked: ' + String(Number(data?.ai?.totalFailures || 0));
          }
          if (ccPublicApps) ccPublicApps.textContent = String(Number(data?.appCount || 0));
          if (heroAppsStat && data?.appCount) heroAppsStat.textContent = String(data.appCount);
          if (heroPagesStat && data?.appCount) heroPagesStat.textContent = String(data.appCount);
          if (ccReviewCount) ccReviewCount.textContent = String(Number(data?.reviewCount || 0));
          if (ccIdeaCount) ccIdeaCount.textContent = String(Number(data?.ideaCount || 0));
          if (ccSessionCount) ccSessionCount.textContent = String(Number(data?.usage?.uniqueSessionsTotal || 0));
          if (ccTopApps) {
            const topApps = Array.isArray(data?.usage?.topApps) ? data.usage.topApps : [];
            ccTopApps.innerHTML = topApps.length
              ? topApps.map((item, index) => `
                  <div class="command-center-list-item">
                    <span>#${index + 1}</span>
                    <strong>${escapeHtml(String(item.page || 'unknown'))}</strong>
                    <em>${Number(item.count || 0)} launches</em>
                  </div>
                `).join('')
              : `<p class="meta">Top app usage will appear here after more activity.</p>`;
          }
        } catch {
          if (ccAiStatus) ccAiStatus.textContent = 'Platform overview unavailable right now.';
          if (ccTopApps) ccTopApps.innerHTML = `<p class="meta">Live overview is offline for this session.</p>`;
        }
      };
      loadPlatformOverview();
      setInterval(loadPlatformOverview, 90000);

      const loadFeedbackPreview = async () => {
        if (!feedbackPreviewGrid || !feedbackSummary) return;
        try {
          const response = await fetch('/api/reviews', { cache: 'no-store' });
          if (!response.ok) throw new Error('review request failed');
          const data = await response.json();
          const reviews = Array.isArray(data.reviews) ? data.reviews : [];
          if (!reviews.length) {
            feedbackSummary.textContent = 'No public reviews yet. Be the first to leave feedback.';
            feedbackPreviewGrid.innerHTML = `
              <article class="feedback-card">
                <span class="card-kicker">Review Preview</span>
                <h3>Waiting for the first public review</h3>
                <p>When feedback is added through the Review App, this section can highlight what people enjoy most about the portfolio.</p>
              </article>
            `;
            return;
          }

          const avgRating = reviews.reduce((sum, item) => sum + Number(item.rating || 0), 0) / Math.max(1, reviews.length);
          feedbackSummary.textContent = 'Showing ' + Math.min(3, reviews.length) + ' recent reviews - Average rating ' + avgRating.toFixed(1) + '/5';
          feedbackPreviewGrid.innerHTML = reviews.slice(0, 3).map((item) => `
            <article class="feedback-card">
              <span class="card-kicker">${escapeHtml(item.category || 'Feedback')} - ${'\u2605'.repeat(Math.max(1, Math.min(5, Number(item.rating || 0))))}</span>
              <h3>${escapeHtml(item.name || 'Anonymous builder')}</h3>
              <p>${escapeHtml(item.message || 'Shared feedback appears here.')}</p>
            </article>
          `).join('');
        } catch {
          feedbackSummary.textContent = 'Feedback preview is unavailable right now, but the Review App is still ready.';
          feedbackPreviewGrid.innerHTML = `
            <article class="feedback-card">
              <span class="card-kicker">Review Preview</span>
              <h3>Preview temporarily offline</h3>
              <p>The feedback section could not load shared reviews right now. You can still use the Review App directly.</p>
            </article>
          `;
        }
      };
      loadFeedbackPreview();
      setInterval(loadFeedbackPreview, 90000);

      const loadCommandCenterSync = async (options = {}) => {
        try {
          const fastMode = options.fast === true;
          const syncPath = fastMode ? '/api/yt-portfolio-sync?fast=1' : '/api/yt-portfolio-sync';
          const response = await fetch(syncPath, { cache: 'no-store' });
          if (!response.ok) throw new Error('sync fetch failed');
          const data = await response.json();
          if (ccSyncSource) ccSyncSource.textContent = String(data.syncSource || data.source || 'local');
          if (ccSubs) ccSubs.textContent = String(Number(data.subs || 0));
          if (ccViews) ccViews.textContent = String(Number(data.views || 0));
          if (ccVideos) ccVideos.textContent = String(Number(data.uploads || 0));
          if (ccMessage) ccMessage.textContent = String(data.message || 'No broadcast message');
          if (ccSyncTime) {
            const date = data.syncedAt ? new Date(data.syncedAt) : null;
            ccSyncTime.textContent = date && !Number.isNaN(date.getTime())
              ? date.toLocaleString()
              : 'just now';
          }
        } catch {
          if (ccSyncSource) ccSyncSource.textContent = 'unavailable';
          if (ccSyncTime) ccSyncTime.textContent = 'offline';
        }
      };
      loadCommandCenterSync({ fast: true });
      setInterval(loadCommandCenterSync, 45000);

      const updateCommandCenterLiveStats = () => {
        if (ccClock) {
          ccClock.textContent = new Date().toLocaleTimeString();
        }
        if (ccQualityScore) {
          const appCount = Number((appCountStat && appCountStat.textContent) || 12) || 12;
          const launches = Number((totalLaunchesStat && totalLaunchesStat.textContent) || 0) || 0;
          const backendOnline = String((backendModeStat && backendModeStat.textContent) || '').toLowerCase() !== 'offline';
          const score = Math.min(100, 65 + appCount * 2 + Math.min(15, launches) + (backendOnline ? 6 : 0));
          ccQualityScore.textContent = String(score) + "/100";
        }
      };
      updateCommandCenterLiveStats();
      setInterval(updateCommandCenterLiveStats, 1000);

      const updateFutureLab = () => {
        if (futureClock) {
          futureClock.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        }
        const totalLaunches = Object.values(launchAnalytics).reduce((sum, value) => sum + Number(value || 0), 0);
        const qualityText = String((ccQualityScore && ccQualityScore.textContent) || '88/100');
        const backendOnline = String((backendModeStat && backendModeStat.textContent) || '').toLowerCase() !== 'offline';
        if (futureLaunches) futureLaunches.textContent = totalLaunches + ' events';
        if (futureQuality) futureQuality.textContent = qualityText;
        if (futurePulse) {
          futurePulse.textContent = backendOnline
            ? (totalLaunches > 10 ? 'surging' : 'stable')
            : 'standby';
        }
      };
      updateFutureLab();
      setInterval(updateFutureLab, 1000);

      const launchHref = (href) => {
        if (!href) return;
        launchAnalytics[href] = Number(launchAnalytics[href] || 0) + 1;
        trackRecentLaunch(href);
        saveAnalytics();
        renderAppStats();
        window.location.href = href;
      };

      if (heroQuickGo && heroQuickApp) {
        heroQuickGo.addEventListener('click', () => {
          launchHref(heroQuickApp.value);
        });
        heroQuickApp.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            launchHref(heroQuickApp.value);
          }
        });
      }
      if (heroRandomGo && heroQuickApp) {
        heroRandomGo.addEventListener('click', () => {
          const options = Array.from(heroQuickApp.options || []).map((opt) => opt.value).filter(Boolean);
          if (!options.length) return;
          const randomHref = options[Math.floor(Math.random() * options.length)];
          heroQuickApp.value = randomHref;
          launchHref(randomHref);
        });
      }

      const formatAudioTime = (seconds) => {
        const value = Number(seconds) || 0;
        const min = Math.floor(value / 60);
        const sec = Math.floor(value % 60);
        return min + ':' + String(sec).padStart(2, '0');
      };

      const updateMusicDisplay = () => {
        if (!musicPlayer) return;
        const current = formatAudioTime(musicPlayer.currentTime);
        const duration = formatAudioTime(musicPlayer.duration);
        if (musicTime) musicTime.textContent = current + ' / ' + (duration || '0:00');
        if (musicProgress && musicPlayer.duration) {
          musicProgress.max = String(musicPlayer.duration);
          musicProgress.value = String(musicPlayer.currentTime);
        }
        if (musicTrackState) {
          musicTrackState.textContent = musicPlayer.paused ? 'Paused' : 'Playing';
        }
        if (musicVolume) {
          musicVolume.value = String(musicPlayer.volume);
        }
        if (musicMuteBtn) {
          musicMuteBtn.textContent = musicPlayer.muted ? 'Unmute' : 'Mute';
        }
        if (musicPlayBtn) {
          musicPlayBtn.textContent = musicPlayer.paused ? 'Play' : 'Pause';
        }
      };

      if (musicPlayer) {
        musicPlayer.volume = 0.7;
        musicPlayer.addEventListener('timeupdate', updateMusicDisplay);
        musicPlayer.addEventListener('loadedmetadata', updateMusicDisplay);
        musicPlayer.addEventListener('ended', updateMusicDisplay);
      }

      if (musicPlayBtn && musicPlayer) {
        musicPlayBtn.addEventListener('click', () => {
          if (musicPlayer.paused) {
            musicPlayer.play().catch(() => {});
          } else {
            musicPlayer.pause();
          }
          updateMusicDisplay();
        });
      }

      if (musicMuteBtn && musicPlayer) {
        musicMuteBtn.addEventListener('click', () => {
          musicPlayer.muted = !musicPlayer.muted;
          updateMusicDisplay();
        });
      }

      if (musicProgress && musicPlayer) {
        musicProgress.addEventListener('input', () => {
          musicPlayer.currentTime = Number(musicProgress.value || 0);
          updateMusicDisplay();
        });
      }

      if (musicVolume && musicPlayer) {
        musicVolume.addEventListener('input', () => {
          musicPlayer.volume = Number(musicVolume.value || 0.7);
          musicPlayer.muted = musicPlayer.volume === 0;
          updateMusicDisplay();
        });
      }

      updateMusicDisplay();

      const renderPalette = (query = '') => {
        if (!paletteList) return;
        const q = query.trim().toLowerCase();
        const filtered = q
          ? paletteTargets.filter((item) => item.search.includes(q))
          : paletteTargets;
        paletteList.innerHTML = filtered.map((item) => `
          <a class="palette-item" href="${item.href}" data-palette-item="true">
            <strong>${item.title}</strong>
            <span>${item.subtitle} - ${item.href}</span>
          </a>
        `).join('') || '<p class="meta">No matching sections or apps.</p>';
        paletteActiveIndex = -1;
      };

      const setPaletteActive = (nextIndex) => {
        if (!paletteList) return;
        const items = Array.from(paletteList.querySelectorAll('a.palette-item'));
        if (!items.length) {
          paletteActiveIndex = -1;
          return;
        }
        paletteActiveIndex = Math.max(0, Math.min(nextIndex, items.length - 1));
        items.forEach((item, index) => item.classList.toggle('is-active', index === paletteActiveIndex));
        items[paletteActiveIndex].scrollIntoView({ block: 'nearest' });
      };

      const openPalette = () => {
        if (!commandPalette) return;
        commandPalette.classList.add('is-open');
        commandPalette.setAttribute('aria-hidden', 'false');
        renderPalette('');
        if (paletteSearch) {
          paletteSearch.value = '';
          paletteSearch.focus();
        }
      };

      const closePalette = () => {
        if (!commandPalette) return;
        commandPalette.classList.remove('is-open');
        commandPalette.setAttribute('aria-hidden', 'true');
      };

      if (launcherBtn) {
        launcherBtn.addEventListener('click', openPalette);
      }
      if (headerLaunchBtn) {
        headerLaunchBtn.addEventListener('click', openPalette);
      }
      if (quickTopBtn) {
        const updateQuickTopVisibility = () => {
          quickTopBtn.classList.toggle('is-visible', window.scrollY > 300);
        };
        quickTopBtn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        window.addEventListener('scroll', updateQuickTopVisibility);
        updateQuickTopVisibility();
      }
      if (paletteCloseBtn) {
        paletteCloseBtn.addEventListener('click', closePalette);
      }
      if (commandPalette) {
        commandPalette.addEventListener('click', (event) => {
          if (event.target === commandPalette) {
            closePalette();
          }
        });
      }
      if (paletteSearch) {
        paletteSearch.addEventListener('input', () => {
          const val = paletteSearch.value.toLowerCase().trim();
          if (val === 'do a barrel roll') {
            document.body.style.transition = 'transform 2s ease-in-out';
            document.body.style.transform = 'rotate(360deg)';
            setTimeout(() => {
              document.body.style.transition = '';
              document.body.style.transform = '';
            }, 2000);
            paletteSearch.value = '';
          } else if (val === 'godmode' || val === 'matrix') {
            document.body.classList.toggle('matrix-mode');
            const aiStatusNode = document.getElementById('ccAiStatus');
            if (aiStatusNode) aiStatusNode.textContent = 'GOD MODE ACTIVE - SYSTEM OVERRIDE';
            paletteSearch.value = '';
            closePalette();
            alert('GOD MODE INITIATED: Matrix Mode Unlocked!');
          } else {
            renderPalette(paletteSearch.value);
          }
        });
      }
      if (paletteList) {
        paletteList.addEventListener('click', (event) => {
          const target = event.target;
          if (target instanceof HTMLElement && target.closest('a.palette-item')) {
            closePalette();
          }
        });
      }

      const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
      const projectGrid = document.querySelector('.project-grid');
      const projectCards = Array.from(document.querySelectorAll('.project-card'));
      const projectSearchInput = document.getElementById('projectSearch');
      const projectSortSelect = document.getElementById('projectSort');
      const projectSearchStatus = document.getElementById('projectSearchStatus');
      const showLiveProjectsBtn = document.getElementById('showLiveProjectsBtn');
      const resetProjectViewBtn = document.getElementById('resetProjectViewBtn');
      const FILTER_FADE_MS = 220;

      let activeProjectFilter = 'all';
      let projectSearchTerm = '';
      let projectSortMode = 'featured';
      let liveOnlyMode = false;

      const stateRank = (stateText) => {
        const state = String(stateText || '').toLowerCase();
        if (state.includes('live now')) return 0;
        if (state.includes('active')) return 1;
        if (state.includes('expanding')) return 2;
        if (state.includes('in progress')) return 3;
        if (state.includes('concept ready')) return 4;
        return 5;
      };

      const projectMeta = projectCards.map((card, index) => {
        const stateText = (card.querySelector('.project-state') || {}).textContent || '';
        const name = ((card.querySelector('h3') || {}).textContent || '').trim();
        return {
          card,
          index,
          name,
          stateText,
          tags: (card.dataset.tags || '').trim().split(/\s+/).filter(Boolean),
          isLive: /live now|active/i.test(stateText),
          searchText: card.textContent.toLowerCase().replace(/\s+/g, ' ').trim()
        };
      });

      const showProjectCard = (card) => {
        if (card.dataset.hideTimer) {
          clearTimeout(Number(card.dataset.hideTimer));
          card.dataset.hideTimer = '';
        }
        card.style.display = '';
        requestAnimationFrame(() => card.classList.remove('is-filtered-out'));
        card.setAttribute('aria-hidden', 'false');
      };

      const hideProjectCard = (card) => {
        card.classList.add('is-filtered-out');
        card.setAttribute('aria-hidden', 'true');
        const timer = window.setTimeout(() => {
          card.style.display = 'none';
        }, FILTER_FADE_MS);
        card.dataset.hideTimer = String(timer);
      };

      const getSortedMeta = () => {
        const items = [...projectMeta];
        if (projectSortMode === 'alphabetical') {
          items.sort((a, b) => a.name.localeCompare(b.name));
        } else if (projectSortMode === 'status') {
          items.sort((a, b) => stateRank(a.stateText) - stateRank(b.stateText) || a.name.localeCompare(b.name));
        } else {
          items.sort((a, b) => a.index - b.index);
        }
        return items;
      };

      const applyProjectView = () => {
        const sorted = getSortedMeta();
        if (projectGrid) {
          sorted.forEach((item) => projectGrid.appendChild(item.card));
        }

        let visibleCount = 0;
        sorted.forEach((item) => {
          const matchesFilter = activeProjectFilter === 'all' || item.tags.includes(activeProjectFilter);
          const matchesSearch = !projectSearchTerm || item.searchText.includes(projectSearchTerm);
          const matchesLive = !liveOnlyMode || item.isLive;
          const show = matchesFilter && matchesSearch && matchesLive;

          if (show) {
            visibleCount += 1;
            showProjectCard(item.card);
          } else {
            hideProjectCard(item.card);
          }
        });

        if (projectSearchStatus) {
          if (visibleCount === 0) {
            projectSearchStatus.textContent = 'No matching projects right now. Try another keyword or reset view.';
          } else {
            const modeText = liveOnlyMode ? ' | Live mode on' : '';
            projectSearchStatus.textContent = 'Showing ' + visibleCount + ' of ' + projectCards.length + ' projects.' + modeText;
          }
        }
      };

      filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
          activeProjectFilter = button.dataset.filter || 'all';
          filterButtons.forEach((btn) => {
            btn.classList.remove('is-active');
            btn.setAttribute('aria-pressed', 'false');
          });
          button.classList.add('is-active');
          button.setAttribute('aria-pressed', 'true');
          applyProjectView();
        });
      });

      if (projectSearchInput) {
        projectSearchInput.addEventListener('input', () => {
          projectSearchTerm = projectSearchInput.value.trim().toLowerCase();
          applyProjectView();
        });
      }

      if (projectSortSelect) {
        projectSortSelect.addEventListener('change', () => {
          projectSortMode = projectSortSelect.value || 'featured';
          applyProjectView();
        });
      }

      if (showLiveProjectsBtn) {
        showLiveProjectsBtn.addEventListener('click', () => {
          liveOnlyMode = !liveOnlyMode;
          showLiveProjectsBtn.textContent = liveOnlyMode ? 'Show All Projects' : 'Show Live Projects';
          applyProjectView();
        });
      }

      if (resetProjectViewBtn) {
        resetProjectViewBtn.addEventListener('click', () => {
          activeProjectFilter = 'all';
          projectSearchTerm = '';
          projectSortMode = 'featured';
          liveOnlyMode = false;

          filterButtons.forEach((btn) => {
            const isAll = (btn.dataset.filter || '') === 'all';
            btn.classList.toggle('is-active', isAll);
            btn.setAttribute('aria-pressed', isAll ? 'true' : 'false');
          });
          if (projectSearchInput) projectSearchInput.value = '';
          if (projectSortSelect) projectSortSelect.value = 'featured';
          if (showLiveProjectsBtn) showLiveProjectsBtn.textContent = 'Show Live Projects';
          applyProjectView();
        });
      }

      window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMobileMenu();
        if (commandPalette && commandPalette.classList.contains('is-open')) {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setPaletteActive(paletteActiveIndex + 1);
            return;
          }
          if (event.key === 'ArrowUp') {
            event.preventDefault();
            setPaletteActive(paletteActiveIndex - 1);
            return;
          }
          if (event.key === 'Enter') {
            const items = paletteList ? Array.from(paletteList.querySelectorAll('a.palette-item')) : [];
            if (items.length && paletteActiveIndex >= 0 && items[paletteActiveIndex]) {
              event.preventDefault();
              items[paletteActiveIndex].click();
              closePalette();
              return;
            }
          }
        }
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
          event.preventDefault();
          openPalette();
          return;
        }
        if (event.key === 'Escape' && commandPalette && commandPalette.classList.contains('is-open')) {
          closePalette();
          return;
        }
        if (event.key !== '/' || !projectSearchInput) return;
        const tag = (event.target && event.target.tagName) ? event.target.tagName.toLowerCase() : '';
        if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
        event.preventDefault();
        projectSearchInput.focus();
      });

      applyProjectView();

      const copyEmailBtn = document.getElementById('copyEmailBtn');
      const copyEmailStatus = document.getElementById('copyEmailStatus');
      const emailValue = 'krylobloxyt@gmail.com';

      const fallbackCopy = (text) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(textarea);
        return ok;
      };

      if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
          let success = false;
          try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              await navigator.clipboard.writeText(emailValue);
              success = true;
            } else {
              success = fallbackCopy(emailValue);
            }
          } catch {
            success = fallbackCopy(emailValue);
          }

          if (copyEmailStatus) {
            copyEmailStatus.textContent = success
              ? 'Email copied: ' + emailValue
              : 'Could not copy automatically. Email: ' + emailValue;
          }
        });
      }

      const spotlight = document.getElementById('spotlight');
      let spotlightFrame = null;
      window.addEventListener('pointermove', (event) => {
        if (!spotlight || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (spotlightFrame) cancelAnimationFrame(spotlightFrame);
        const clientX = event.clientX;
        const clientY = event.clientY;
        spotlightFrame = requestAnimationFrame(() => {
          spotlight.style.setProperty('--spot-x', clientX + 'px');
          spotlight.style.setProperty('--spot-y', clientY + 'px');
        });
      });

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.innerWidth >= 900) {
        const tiltTargets = Array.from(document.querySelectorAll('.project-card, .app-verse-card, .skill-card, .story-card, .milestone-card, .case-study-card, .skill-level-card, .codebase-card, .now-building-card, .devlog-card, .feedback-card'));
        tiltTargets.forEach((card) => {
          card.addEventListener('pointermove', (event) => {
            if (!document.body.classList.contains('future-mode')) return;
            const rect = card.getBoundingClientRect();
            const px = (event.clientX - rect.left) / Math.max(1, rect.width);
            const py = (event.clientY - rect.top) / Math.max(1, rect.height);
            const rotY = (px - 0.5) * 5;
            const rotX = (0.5 - py) * 4;
            card.style.transform = 'perspective(900px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) translateY(-2px)';
          });
          card.addEventListener('pointerleave', () => {
            card.style.transform = '';
          });
        });
      }
      const hideLoader = () => {
        if (window._loaderHandled) return;
        window._loaderHandled = true;
        const loader = document.getElementById('pageLoader');
        document.body.classList.add('page-ready');
        if (loader) {
          loader.style.opacity = '0';
          loader.style.transition = 'opacity 0.6s ease';
          setTimeout(() => {
            loader.remove();
            document.body.classList.remove('preboot');
          }, 600);
        } else {
          document.body.classList.remove('preboot');
        }
      };
      
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideLoader);
      } else {
        hideLoader();
      }
      // Cursor Aura
      const cursorAura = document.getElementById('cursorAura');
      if (cursorAura) {
        let auraX = -1000; let auraY = -1000;
        let msX = -1000; let msY = -1000;
        window.addEventListener('mousemove', (e) => {
          msX = e.clientX; msY = e.clientY;
        });
        function animateAura() {
          auraX += (msX - auraX) * 0.15;
          auraY += (msY - auraY) * 0.15;
          cursorAura.style.transform = `translate(${auraX}px, ${auraY}px)`;
          requestAnimationFrame(animateAura);
        }
        animateAura();
        
        window.addEventListener('mousedown', () => { cursorAura.style.width = '400px'; cursorAura.style.height = '400px'; });
        window.addEventListener('mouseup', () => { cursorAura.style.width = '300px'; cursorAura.style.height = '300px'; });
      }



      // Typewriter Effect
      const twText = document.getElementById('typewriterText');
      if (twText) {
        const phrases = ['stuff on the internet', 'AI applications', 'games on Roblox', 'cool web experiences'];
        let phraseIdx = 0; let charIdx = 0; let isDeleting = false;
        function typeWriter() {
          const currentPhrase = phrases[phraseIdx];
          if (isDeleting) {
            twText.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
          } else {
            twText.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
          }
          let speed = isDeleting ? 40 : 80;
          if (!isDeleting && charIdx === currentPhrase.length) {
            speed = 2500;
            isDeleting = true;
          } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            speed = 400;
          }
          setTimeout(typeWriter, speed);
        }
        setTimeout(typeWriter, 1200);
      }

      // Safety timeout
      setTimeout(hideLoader, 3000);
    })();
