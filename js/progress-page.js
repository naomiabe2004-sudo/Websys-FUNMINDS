const currentUser = localStorage.getItem('loggedInUser');
if (!currentUser) {
    window.location.href = 'index.html';
}

const usernameEl    = document.getElementById('username');
const overallCircle = document.getElementById('overallCircle');

const lessonCards = [
    { id: 'alphabet', circleId: 'alphabetCircle', title: 'Alphabet', description: 'Lesson 1: Learn the Alphabet'   },
    { id: 'colors',   circleId: 'colorsCircle',   title: 'Colors',   description: 'Lesson 2: Exploring Colors'     },
    { id: 'phonics',  circleId: 'phonicsCircle',  title: 'Phonics',  description: 'Lesson 3: Fill it in!'          },
    { id: 'reading',  circleId: 'readingCircle',  title: 'Reading',  description: "Lesson 4: Let's be attentive!"  },
];

function loadProgress() {
    const progress = localStorage.getItem('funmindsProgress');
    return progress ? JSON.parse(progress) : {};
}

function saveProgress(progress) {
    localStorage.setItem('funmindsProgress', JSON.stringify(progress));
}

function defaultProgress() {
    return {
        lessons: { alphabet: false, colors: false, phonics: false, reading: false },
        lastUnlocked: null
    };
}

function getUserProgress() {
    const progressData = loadProgress();
    if (!progressData[currentUser]) {
        progressData[currentUser] = defaultProgress();
        saveProgress(progressData);
    }
    return progressData[currentUser];
}

function updateProgressDisplay(progress) {
    usernameEl.textContent = currentUser;

    const lessonIds = lessonCards.map(lesson => lesson.id);
    let completedCount = 0;

    lessonCards.forEach(lesson => {
        const completed   = !!progress.lessons[lesson.id];
        const circle      = document.getElementById(lesson.circleId);
        const label       = document.getElementById(`${lesson.id}Label`);
        const description = document.getElementById(`${lesson.id}Description`);

        if (circle) {
            const pct = completed ? 100 : 0;
            circle.style.setProperty('--progress', pct);
            circle.querySelector('span').textContent = `${pct}%`;
        }

        if (label)       label.textContent       = lesson.title;
        if (description) description.textContent = lesson.description;

        if (completed) completedCount++;
    });

    const percent = Math.round((completedCount / lessonIds.length) * 100);
    overallCircle.style.setProperty('--progress', percent);
    overallCircle.querySelector('span').textContent = `${percent}%`;
}

const progress = getUserProgress();
updateProgressDisplay(progress);