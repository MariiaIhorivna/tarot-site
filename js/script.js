window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname + window.location.search);
  }
});
const buttonMenu = document.querySelector('.burger-btn-menu');
const navMenu = document.querySelector('.menu');

buttonMenu.addEventListener('click', () => {
    document.body.classList.toggle('_lock');
    buttonMenu.classList.toggle('_active');
    navMenu.classList.toggle('_active');
})