const questionList = [];
const adjList = [
    'iconic', 'heroic', 'superb', 'spectacular', 'striking', 'glorious',
    'breathtaking', 'magnificent', 'impressive', 'awe-inspiring', 'neat',
    'resplendent', 'stately', 'gorgeous'
];

/**
 * Generate a random number between 0 and less than total array length.
 * Return the adjective with the matching index.
 */
function grabAdj() {
    let pick = Math.floor(Math.random() * adjList.length);
    let adjective = adjList[pick];
    return adjective;
}

/**
 * Start the question process by scrolling down to the section
 */
function start() {
    const start = document.getElementById('start');
    start.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", function(event) { 
    // Display current year
    document.getElementById('year').innerHTML = new Date().getFullYear();

    // Populate adjective
    document.getElementById('adj').innerHTML = grabAdj();
});
