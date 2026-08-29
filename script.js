document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.main-nav a').forEach((navLink) => navLink.removeAttribute('aria-current'));
    if (link.closest('.main-nav')) link.setAttribute('aria-current', 'page');
  });
});
