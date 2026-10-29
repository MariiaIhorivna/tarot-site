window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname + window.location.search);
  }
});

const buttonMenu = document.querySelector('.burger-btn-menu');
const navMenu = document.querySelector('.menu');
const containerBurgerMenu = document.querySelector('.container-btn-burger-menu');

buttonMenu.addEventListener('click', () => {
    document.body.classList.toggle('_lock');
    buttonMenu.classList.toggle('_active');
    navMenu.classList.toggle('_active');
    containerBurgerMenu.classList.toggle('_active');
})

function renderCards(items, containerId) {
  const container = document.getElementById(containerId);

  container.innerHTML = items.map(item => `
    <article class="service-card">
        <h3>${item.title}</h3>

        <p>${item.description} 
        ${item.extra ? `
            <br>(наприклад,  
            ${item.extra.map(extra =>
              `«<em>${extra}</em>»`
            ).join(", ")}
            )
        ` : ""}
        </p>
      </article>
  `).join("");
}

async function renderServices() {
  const response = await fetch("json/services.json");
  const data = await response.json();

  renderCards(data.relationship, "relationship");
  renderCards(data.career, "career");
  renderCards(data["self-development"], "self-development");
} 

async function renderPrice() {
  const response = await fetch("json/price.json");
  const data = await response.json();

  const container = document.getElementById('price-container');

  container.innerHTML = data.map(item => `
    <article class="service-card price-card">
        <h3>${item.title}</h3>
        ${item.first_part ? `<p>${item.first_part}</p>` : ''}
        <ul role="list">
          ${item.items_for_list ? item.items_for_list.map(listItem => `<li>${listItem}</li>`).join('') : ''}
        </ul>
        ${item.last_part ? `<p>${item.last_part}
          ${item.line_break ? `<br>${item.line_break}` : ''}
        </p>` : ''}
        <p>${item.price} грн</p>
      </article>
  `).join("");
}

async function renderFeedbacks() {
  const response = await fetch("json/feedbacks.json");
  const data = await response.json();

  const container = document.getElementById('feedback-container');

  container.innerHTML = data.map(item => `
    <article class="feedback-card">
        <h3>${item.name}</h3>
        <p>${item.feedback} 
        ${Array.isArray(item.lineBreak) 
          ? item.lineBreak.map(line => `<br>${line}`).join("") 
          : (item.lineBreak ? `<br>${item.lineBreak}` : "")}
        </p>
      </article>
  `).join("");
}

async function renderQuestions() {
  const response = await fetch("json/questions.json");
  const data = await response.json();

  const container = document.getElementById('question-container');

  container.innerHTML = data.map(item => `
    <article class="question-card">
        <div class="question-title-btn-container">
            <h3>${item.title}</h3>
            <button class="qtn-btn">
                <svg class="icon-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
        <p class="qtn-answer">${item.description}</p>
      </article>
  `).join("");
}


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

const container = document.getElementById('question-container');

if (container) {
    container.addEventListener('click', (event) => {
        const button = event.target.closest('.qtn-btn');
        
        if (!button) return;

        const card = button.closest('.question-card');
        if (card) {
            card.classList.toggle('_active');
        }
    });
}

renderFeedbacks();
renderServices();
renderPrice();
renderQuestions();



