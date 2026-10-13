window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname + window.location.search);
  }
});
const buttonMenu = document.querySelector('.burger-btn-menu');
const navMenu = document.querySelector('.menu');

buttonMenu.addEventListener('click', () => {
    navMenu.classList.add('_active');
})