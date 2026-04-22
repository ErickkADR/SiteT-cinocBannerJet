/* === Bannerjet Group — script.js === */

// ─── TEMA (dark / light) ────────────────────────────────────────────────────
const html = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('bj-theme', theme);
  if (toggleBtn) {
    toggleBtn.innerHTML = theme === 'dark'
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
    toggleBtn.setAttribute('aria-label',
      theme === 'dark' ? 'Modo claro' : 'Modo escuro');
  }
}

// Aplica tema salvo sem flash
(function () {
  const saved = localStorage.getItem('bj-theme') || 'light';
  html.setAttribute('data-theme', saved);
})();

if (toggleBtn) {
  const saved = localStorage.getItem('bj-theme') || 'light';
  applyTheme(saved);
  toggleBtn.addEventListener('click', () => {
    applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
}

// ─── FADE-UP AO SCROLL ───────────────────────────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => observer.observe(el));
}

// ─── FAQ ACCORDION ───────────────────────────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ─── COPIAR RESPOSTA DO FAQ ──────────────────────────────────────────────────
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const p = btn.closest('.faq-item')?.querySelector('.faq-answer-inner p');
    if (!p) return;
    navigator.clipboard.writeText(p.innerText).then(() => {
      btn.textContent = 'Copiado!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copiar'; btn.classList.remove('copied'); }, 1600);
    }).catch(() => {
      btn.textContent = 'Erro';
      setTimeout(() => { btn.textContent = 'Copiar'; }, 1600);
    });
  });
});

// ─── PESQUISA DE FIRMWARES ───────────────────────────────────────────────────
const searchInput = document.getElementById('firmware-search');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    document.querySelectorAll('#firmware-table tbody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

// ─── ICON MENU — pulso ao clicar ─────────────────────────────────────────────
document.querySelectorAll('.icon-item').forEach(item => {
  item.addEventListener('click', () => {
    const c = item.querySelector('.icon-circle');
    if (!c) return;
    c.style.transform = 'scale(0.88)';
    setTimeout(() => { c.style.transform = ''; }, 180);
  });
});
