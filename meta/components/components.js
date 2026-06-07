/* =============================================
   meta/components/components.js
   
   Rendert Topbar, Sidebar und Footer auf jeder
   Seite. Einfach einbinden und initComponents()
   rufen – oder <script src> ans Ende des body.
   ============================================= */

(function () {

  /* ─── Helfer: aktuellen Tab bestimmen ─────── */
  function currentTab() {
    const p = window.location.pathname;
    if (p.includes('/test/'))  return 'test';
    if (p.includes('/learn/')) return 'learn';
    if (p.includes('/stats/')) return 'stats';
    return '';
  }

  /* ─── Pfad-Präfix zur Wurzel ermitteln ────── */
  function rootPrefix() {
    const p = window.location.pathname;
    // Wenn wir in /tabs/xxx/ sitzen: zwei Ebenen hoch
    if (p.includes('/tabs/')) return '../../';
    return './';
  }

  /* ─── NAV-Einträge ───────────────────────── */
  const NAV = [
    { id: 'test',  label: 'Test',        path: 'tabs/test/test.html',   sub: 'Kurstest' },
    { id: 'learn', label: 'Lernmodus',   path: 'tabs/learn/learn.html', sub: 'Vorbereitung' },
    { id: 'stats', label: 'Auswertung',  path: 'tabs/stats/stats.html', sub: 'Nur Lehrende' },
  ];

  /* ─── TOPBAR ─────────────────────────────── */
  function renderTopbar(tab) {
    const root = rootPrefix();
    const titles = {
      test:  { title: 'Kurstest',   sub: 'Seminar · Wissensüberprüfung' },
      learn: { title: 'Lernmodus',  sub: 'Seminar · Vorbereitung'       },
      stats: { title: 'Auswertung', sub: 'Live Statistik · Lehrende'    },
    };
    const info = titles[tab] || { title: 'LdL', sub: 'Heterogenität an Schulen' };

    // Wissen/Üben-Tabs nur auf learn-Seite
    const learnTabs = tab === 'learn' ? `
      <div class="topbar-tabs" id="topbarLearnTabs">
        <button class="topbar-tab active" data-tab="wissen" onclick="switchTab('wissen')">Wissen</button>
        <button class="topbar-tab"        data-tab="ueben"  onclick="switchTab('ueben')">Üben</button>
        <button class="topbar-tab"        data-tab="karten" onclick="switchTab('karten')">Karten</button>
      </div>` : '';

    // Live-Dot nur auf stats
    const liveIndicator = tab === 'stats' ? `
      <div class="topbar-right">
        <div class="live-dot-anim"></div>
        <span class="live-label-text">Live</span>
        <button class="btn-topbar-danger" onclick="confirmResetWithPin()">Ergebnisse löschen</button>
      </div>` : '';

    return `
      <header class="topbar" id="topbar">
        <div class="topbar-info">
          <div class="topbar-title">${info.title}</div>
          <div class="topbar-sub">Heterogenität an Schulen · ${info.sub}</div>
        </div>
        ${learnTabs}
        ${liveIndicator}
      </header>`;
  }

  /* ─── SIDEBAR ────────────────────────────── */
  function renderSidebar(tab, extra) {
    const root = rootPrefix();
    const items = NAV.map(n => `
      <a href="${root}${n.path}" class="nav-item ${n.id === tab ? 'active' : ''}">
        <div>
          <div class="nav-label">${n.label}</div>
          <div class="nav-sub">${n.sub}</div>
        </div>
      </a>`).join('');

    // Optionaler extra-Inhalt (z.B. Topic-Nav auf Learn-Seite)
    const extraHtml = extra
      ? `<div class="sidebar-divider"></div><div id="${extra}"></div>`
      : '';

    return `
      <aside class="sidebar" id="sidebar">
        <nav class="sidebar-nav">${items}</nav>
        ${extraHtml}
      </aside>`;
  }

  /* ─── FOOTER ─────────────────────────────── */
  function renderFooter() {
    const root = rootPrefix();
    return `
      <footer class="site-footer">
        <div class="footer-inner">
          <span>LdL · Heterogenität an Schulen</span>
          <nav class="footer-nav">
            ${NAV.map(n =>
              `<a href="${root}${n.path}">${n.label}</a>`
            ).join('')}
          </nav>
        </div>
      </footer>`;
  }

  /* ─── TOAST (global) ─────────────────────── */
  function renderToast() {
    return `<div id="globalToast" class="global-toast"></div>`;
  }

  /* ─── HAUPT-INIT ─────────────────────────── */
  window.initComponents = function (options) {
    options = options || {};
    const tab = options.tab || currentTab();

    // Topbar: vor dem body-Inhalt einfügen
    const topbarEl = document.getElementById('app-topbar');
    if (topbarEl) topbarEl.innerHTML = renderTopbar(tab);

    // Sidebar: in jede .sidebar-slot einfügen
    document.querySelectorAll('.sidebar-slot').forEach(slot => {
      slot.innerHTML = renderSidebar(tab, slot.dataset.extra || null);
    });

    // Footer
    const footerEl = document.getElementById('app-footer');
    if (footerEl) footerEl.innerHTML = renderFooter();

    // Toast
    if (!document.getElementById('globalToast')) {
      document.body.insertAdjacentHTML('beforeend', renderToast());
    }
  };

  /* ─── GLOBALER TOAST ─────────────────────── */
  window.showToast = function (msg, type) {
    const t = document.getElementById('globalToast');
    if (!t) return;
    t.textContent = msg;
    t.className = 'global-toast show' + (type ? ' ' + type : '');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 3200);
  };

  /* ─── Auto-init wenn DOM ready ──────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.initComponents());
  } else {
    window.initComponents();
  }

})();
