// Fade-up ao scroll
const elements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

// FAQ
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

// Drive
function openDrive(url) {
  window.open(url, '_blank');
}

// Copiar apenas a resposta do FAQ
document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation(); // não abre/fecha o FAQ

    const faqItem = button.closest('.faq-item');
    const answer = faqItem.querySelector('p').innerText;

    navigator.clipboard.writeText(answer).then(() => {
      button.classList.add('copied');
      button.innerText = 'Copiado';

      setTimeout(() => {
        button.classList.remove('copied');
        button.innerText = 'Copiar';
      }, 1500);
    });
  });
});
