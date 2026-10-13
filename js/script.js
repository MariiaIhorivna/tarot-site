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

const slider = document.querySelector('.feedbacks-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function getScrollAmount() {
    const card = slider.querySelector('.feedback-card');
    if (!card) {
      return 300; 
    } 
    
    return card.offsetWidth + 20; // Gap in CSS
}

nextBtn.addEventListener('click', () => {
    slider.scrollBy({
        left: getScrollAmount(), 
        behavior: 'smooth'       
    });
});

prevBtn.addEventListener('click', () => {
    slider.scrollBy({
        left: -getScrollAmount(), 
        behavior: 'smooth'        
    });
});

const questionCards = document.querySelectorAll('.question-card');

questionCards.forEach(card => {
    const button = card.querySelector('.qtn-btn');

    button.addEventListener('click', () => {
        card.classList.toggle('_active');
    });
});