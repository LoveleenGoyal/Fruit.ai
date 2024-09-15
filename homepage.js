// Get the about button and pop-up elements
const aboutBtn = document.querySelector('.about-btn');
const aboutPopup = document.querySelector('.about-popup');
const closeBtn = document.querySelector('.close-btn');

// Open the pop-up when the "About" button is clicked
aboutBtn.addEventListener('click', () => {
  aboutPopup.classList.add('active');
});

// Close the pop-up when the close button is clicked
closeBtn.addEventListener('click', () => {
  aboutPopup.classList.remove('active');
});

const faqBtn = document.querySelector('.faq-btn');
const faqSection = document.querySelector('.faq-section');
const bigWrapper = document.querySelector('.big-wrapper');
const closebuttn = document.querySelector('.close')


faqBtn.addEventListener('click', () => {
  bigWrapper.style.display = 'none';

  faqSection.classList.remove('hidden');
  faqSection.style.display = 'block';
});

closebuttn.addEventListener('click', () => {
  faqSection.style.display = 'none';
  bigWrapper.style.display = 'block';
});

const faqForm = document.getElementById('faq-form');
const faqList = document.getElementById('faq-list');
const updateForm = document.getElementById('update-form');
const updateId = document.getElementById('update-id');
const updateQuestion = document.getElementById('update-question');
const updateAnswer = document.getElementById('update-answer');
const updateBtn = document.getElementById('update-btn');

const apiUrl = 'http://localhost:5000/faqs';

// Fetch and display FAQs
async function fetchFaqs() {
    const response = await fetch(apiUrl);
    const faqs = await response.json();
    faqList.innerHTML = '';
    faqs.forEach(faq => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${faq.question}</strong><br>${faq.answer}</span>
            <div>
                <button onclick="editFaq('${faq._id}')">Edit</button>
                <button onclick="deleteFaq('${faq._id}')">Delete</button>
            </div>
        `;
        faqList.appendChild(li);
    });
}

// Add a new FAQ
faqForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const question = document.getElementById('question').value.trim();
    const answer = document.getElementById('answer').value.trim();
    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, answer }),
    });
    fetchFaqs();
    faqForm.reset();
});

// Edit an FAQ
window.editFaq = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`);
    const faq = await response.json();
    updateId.value = faq._id;
    updateQuestion.value = faq.question;
    updateAnswer.value = faq.answer;
    updateForm.style.display = 'block';
};

// Update an FAQ
updateBtn.addEventListener('click', async () => {
    const id = updateId.value;
    const question = updateQuestion.value.trim();
    const answer = updateAnswer.value.trim();
    await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, answer }),
    });
    fetchFaqs();
    updateForm.style.display = 'none';
});

// Delete an FAQ
window.deleteFaq = async (id) => {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    });
    fetchFaqs();
};

// Initial fetch of FAQs
fetchFaqs();