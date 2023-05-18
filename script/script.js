const questionList = [];
const adjList = [
    'iconic', 'heroic', 'superb', 'spectacular', 'striking', 'glorious',
    'breathtaking', 'magnificent', 'impressive', 'awe-inspiring', 'neat',
    'resplendent', 'stately', 'gorgeous'
];

let questionCounter = 1; // TODO - make this work

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
 * Scroll down to the question section
 */
function scrollToStart() {
    const start = document.getElementById('start');
    start.scrollIntoView({ behavior: 'smooth' });
    document.querySelector('[data-id="1"]').classList.add('scrolled');
}

/**
 * Trigger text fade-in once scrolled into viewport
 */
function fadeInQuestion(questionId) {
    let question = document.querySelector(`[data-id="${questionId}"]`);
    let observer = new IntersectionObserver(function(entries) {
        if(entries[0].isIntersecting === true) {
            question.classList.add('in');
        };
    }, { threshold: [1] });
    observer.observe(question);
}

// Make sure the document is ready
document.addEventListener("DOMContentLoaded", function(event) {
    // Start off question #1
    fadeInQuestion(1);

    // Populate adjective in answer
    document.getElementById('adjective').innerHTML = getAdjective();

    // Display current year for copyright info
    document.getElementById('year').innerHTML = new Date().getFullYear();
});
