// Prevent auto-scrolling to anchor on page load
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname + window.location.search);
  }
});

const buttonMenu = document.querySelector('.burger-btn-menu');
const navMenu = document.querySelector('.menu');
const containerBurgerMenu = document.querySelector('.container-btn-burger-menu');

// Logic for burger menu
buttonMenu.addEventListener('click', () => {
    document.body.classList.toggle('_lock');
    buttonMenu.classList.toggle('_active');
    navMenu.classList.toggle('_active');
})

function throwError (response) {
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
}

function doesContainerExist (container, title)
{
  if (!container) {
      throw new Error(`${title} container not found`);
    }
}

// Render service cards (use for process JSON array from fetch in function renderServices)
function renderCards(items, containerId) {
  const container = document.getElementById(containerId);

    doesContainerExist(container, 'Service');

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

// Process JSON (info about services)
async function renderServices() {
  try {
    const response = await fetch("json/services.json");

    throwError(response);

    const data = await response.json();

    renderCards(data.relationship, "relationship");
    renderCards(data.career, "career");
    renderCards(data["self-development"], "self-development");
  } catch (error)
  {
    console.error('Сталася помилка:', error);
  }
} 

// TODO: Improve error handling in the future:
// add specific error messages for each category

// Render price cards and process JSON
async function renderPrice() {
  try {
    const response = await fetch("json/price.json");

    throwError(response);

    const data = await response.json();

    const container = document.getElementById('price-container');

    doesContainerExist(container, 'Price');

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
  } catch (error) {
    console.error('Сталася помилка:', error);

    const container = document.getElementById('price-container');

    if (container) {
        container.textContent = 'Не вдалося завантажити тарифи. Спробуйте пізніше.';
    }
  }
}

// Render feedback cards and process JSON
async function renderFeedbacks() {
  try {
    const response = await fetch("json/feedbacks.json");

    throwError(response);

    const data = await response.json();

    const container = document.getElementById('feedback-container');

    doesContainerExist(container, 'Feedback');

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
  } catch (error) {
    console.error('Сталася помилка:', error);
    const container = document.getElementById('feedback-container');

    if (container) {
        container.textContent = 'Не вдалося завантажити відгуки. Спробуйте пізніше.';
    }
  }
}

// Render question cards and process JSON
async function renderQuestions() {
  try {
    const response = await fetch("json/questions.json");

    throwError(response);

    const data = await response.json();

    const container = document.getElementById('question-container');

    doesContainerExist(container, 'Question');

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
  } catch (error) {
    console.error('Сталася помилка:', error);

    const container = document.getElementById('question-container');

    if (container) {
        container.textContent = 'Не вдалося завантажити запитання. Спробуйте пізніше.';
    }
  }
}

// For slider (feedback section)
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

// Open answers to questions in question section
const container = document.getElementById('question-container');

if (container) {
    container.addEventListener('click', (event) => {
        const button = event.target.closest('.qtn-btn');
        
        if (!button) 
        {
          return;
        }

        const card = button.closest('.question-card');
        if (card) {
            card.classList.toggle('_active');
        }
    });
}

// Function calls for loading and rendering data from JSON
renderFeedbacks();
renderServices();
renderPrice();
renderQuestions();



