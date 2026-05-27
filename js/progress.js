const currentUser = localStorage.getItem('loggedInUser');
if (!currentUser) {
    window.location.href = 'index.html';
}

const lessonId     = document.body.dataset.lessonId;
const lessonStatus = document.getElementById('lessonStatus');
const completeBtn  = document.getElementById('completeLessonBtn');

const certificateNames = {
    alphabet: 'Alphabet Learner ⭐',
    colors:   'Color Master 🌈',
    phonics:  'Phonics Pro 💫',
    reading:  'FunMinds Superstar! ⚡'
};

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

function ensureProgress() {
    const progressData = loadProgress();
    if (!progressData[currentUser]) {
        progressData[currentUser] = defaultProgress();
        saveProgress(progressData);
    }
    return progressData[currentUser];
}

function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('visible'));
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function updateLessonStatus() {
    const progressData = loadProgress();
    const userProgress = progressData[currentUser] || defaultProgress();
    const completed = !!userProgress.lessons[lessonId];
    if (lessonStatus) {
        lessonStatus.textContent = completed
            ? 'This lesson is complete. Great job!'
            : 'Finish the activity, then press Complete Lesson.';
    }
    if (completeBtn) {
        completeBtn.disabled = completed;
        completeBtn.textContent = completed ? 'Lesson Completed' : 'Complete Lesson';
        completeBtn.classList.toggle('completed', completed);
    }
}

function markLessonComplete() {
    const progressData = loadProgress();
    const userProgress = progressData[currentUser] || defaultProgress();
    if (userProgress.lessons[lessonId]) return false;
    userProgress.lessons[lessonId] = true;
    userProgress.lastUnlocked = lessonId;
    progressData[currentUser] = userProgress;
    saveProgress(progressData);
    updateLessonStatus();
    return userProgress;
}

function completeLesson() {
    const progress = markLessonComplete();
    if (!progress) return;
    showToast(`${certificateNames[lessonId]} unlocked! See it on the Achievements page.`, 'certificate');
}

if (!lessonId) {
    throw new Error('Missing data-lesson-id on body element.');
}

ensureProgress();
updateLessonStatus();

if (completeBtn) {
    completeBtn.addEventListener('click', completeLesson);
}