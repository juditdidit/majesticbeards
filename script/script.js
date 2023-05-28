const questionListRaw = [
    {
        q: 'Have you ever been mistaken for a viking?',
        y: 'Yes, constantly',
        n: 'No, never in my life',
    },
    {
        q: 'Do you chop wood in the forest in your flannel shirt?',
        y: 'Yes, is there any other way?',
        n: "No, can't say that I do",
    },
    {
        q: 'Have you ever hand-wrestled a bear and won?',
        y: "Yes, clearly I'm still here",
        n: 'No, that sounds terrifying',
    },
    {
        q: 'Does your beard boost your confidence?',
        y: 'Yes, extremely',
        n: 'No, not really',
    },
    {
        q: 'Have you ever built a log cabin with your two bare hands?',
        y: 'Yes, of course I have',
        n: "No, that's too much work",
    },
];

let questionList = [];

const adjList = [
    'iconic', 'heroic', 'superb', 'spectacular', 'striking', 'glorious',
    'breathtaking', 'magnificent', 'impressive', 'awe-inspiring',
    'resplendent', 'gorgeous'
];

/**
 * Scroll down to the question section
 */
function scrollToStart() {
    const start = document.getElementById('start');
    start.scrollIntoView({ alignToTop: true, behavior: 'smooth' });
    document.querySelector(`[data-question-id="1"]`).classList.add('in');
}

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
 * Take the questions list and randomize their order
 */
function randomizeQuestions() {
    questionList = questionListRaw
        .map(question => ({ question, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ question }) => question);

    console.log(questionList);
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
function next(clicked) {
    clicked.classList.add('selected');
    disableOptions(clicked);
    const currentQuestion = clicked.closest('.question-block');
    const nextQuestionId = parseInt(currentQuestion.getAttribute('data-question-id')) + 1;

    console.log(questionList.length);
    console.log(nextQuestionId -2);

    // Note: our question list index and question IDs don't match up, hence the '-2'
    if (questionList.length > nextQuestionId -2) {
        currentQuestion.insertAdjacentHTML(
            'afterend',
            `
                <div class="question-block" data-question-id="${nextQuestionId}">
                    <p class="question">${questionList[nextQuestionId -2].q}</p>
                    <div class="options">
                        <button type="button" onClick="next(this)">
                            ${questionList[nextQuestionId -2].y}
                        </button>
                        <button type="button" onClick="next(this)">
                            ${questionList[nextQuestionId -2].n}
                        </button>
                    </div>
                </div>
            `,
        );
    
        updateContentHeight(currentQuestion);
        fadeIn(document.querySelector(`[data-question-id="${nextQuestionId}"]`));

    // Display the answer
    } else {
        updateContentHeight(currentQuestion);
        fadeIn(document.querySelector('.answer-block'));
    }
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

// Document ready
document.addEventListener('DOMContentLoaded', (event) => {
    randomizeQuestions();
    firstQuestion();
    document.getElementById('adjective').innerHTML = getAdjective();

    // Display current year for copyright info
    document.getElementById('year').innerHTML = new Date().getFullYear();
});
