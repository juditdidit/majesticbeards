const adjList = [
    'iconic', 'heroic', 'superb', 'spectacular', 'striking', 'glorious',
    'breathtaking', 'magnificent', 'impressive', 'awe-inspiring', 'neat',
    'resplendent', 'stately', 'gorgeous'
];

/**
 * Generate a random number between 0 and less than total array length.
 * Return the adjective with the matching index.
 */
function getAdjective() {
    let pick = Math.floor(Math.random() * adjList.length);
    let adjective = adjList[pick];
    return adjective;
}

/**
 * Disable options for already answered questions
 */
function disableOptions(clicked) {
    const currentOptions = clicked.closest('.options');
    currentOptions.querySelectorAll('button').forEach((button) => {
        button.setAttribute('disabled', '');
    });
}

/**
 * Fade in question or answer
 */
function fadeIn(content) {
    content.classList.add('in');
    content.scrollIntoView({ alignToTop: true, behavior: 'smooth' });
}

/**
 * Scroll down to the question section
 */
function scrollToStart() {
    const start = document.getElementById('start');
    start.scrollIntoView({ alignToTop: true, behavior: 'smooth' });
    document.querySelector(`[data-question-id="1"]`).classList.add('in');
}

/**
 * Trigger question fade-in once scrolled into viewport
 */
function firstQuestion() {
    let question = document.querySelector(`[data-question-id="1"]`);
    let observer = new IntersectionObserver(function(entries) {
        if(entries[0].isIntersecting === true) {
            question.classList.add('in');
        };
    }, { threshold: [1] });
    observer.observe(question);
}

/**
 * Display the next question
 */
function nextQuestion(clicked) {
    clicked.classList.add('selected');
    disableOptions(clicked);
    const currentQuestion = clicked.closest('.question-block');
    const nextQuestionId = parseInt(currentQuestion.getAttribute('data-question-id')) + 1;
    const nextQuestion = document.querySelector(`[data-question-id="${nextQuestionId}"]`);
    fadeIn(nextQuestion);
    updateContentHeight(currentQuestion);
}

/**
 * Display the final answer
 */
function getAnswer(clicked) {
    clicked.classList.add('selected');
    disableOptions(clicked);
    const currentQuestion = clicked.closest('.question-block');
    const answer = document.querySelector('.answer-block');
    fadeIn(answer);
    updateContentHeight(currentQuestion);
}

/**
 * Calculate and set total height needed to ensure question and answer 
 * are always at the top of the page
 */
function updateContentHeight(question) {
    let container = document.getElementById('start');
    const questionHeight = question.offsetHeight;
    container.style.height = `${container.offsetHeight + questionHeight}px`;
}

// Make sure the document is ready
document.addEventListener('DOMContentLoaded', (event) => {
    // Fade in question #1
    firstQuestion();

    // Populate adjective in answer
    document.getElementById('adjective').innerHTML = getAdjective();

    // Display current year for copyright info
    document.getElementById('year').innerHTML = new Date().getFullYear();
});
