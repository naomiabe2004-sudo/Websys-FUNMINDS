const currentUser = localStorage.getItem('loggedInUser');

if (!currentUser) {

    window.location.href = 'index.html';

}

const achievementGrid =
    document.getElementById('achievementGrid');

const certificateSummary =
    document.getElementById('certificateSummary');

const certificateModal =
    document.getElementById('certificateModal');

const certificateName =
    document.getElementById('certificateName');

const certificateLesson =
    document.getElementById('certificateLesson');

const certificateDate =
    document.getElementById('certificateDate');

const certificateStudent =
    document.getElementById('certificateStudent');

const certificateImage =
    document.getElementById('certificateImage');

const lessons = [

    {
        id: 'alphabet',
        title: 'Alphabet',
        image: 'achievements.photo/alphabet.png',
        certificate: 'Alphabet Learner ⭐',
        description: 'Lesson 1: Learn the Alphabet',

        // CERTIFICATE IMAGE
        certImage:
            'cert.photo/alphabet_award.png'
    },

    {
        id: 'colors',
        title: 'Colors',
        image: 'achievements.photo/colorsshape.png',
        certificate: 'Color Master 🌈',
        description: 'Lesson 1: Exploring Colors',

        certImage:
            'cert.photo/color_award.png'
    },

    {
        id: 'phonics',
        title: 'Phonics',
        image: 'achievements.photo/phonics.png',
        certificate: 'Phonics Pro 💫',
        description: 'Lesson 1: Fill it in!',

        certImage:
            'cert.photo/phonics_award.png'
    },

    {
        id: 'reading',
        title: 'Reading & Understanding',
        image: 'achievements.photo/reading.png',
        certificate: 'FunMinds Superstar! ⚡',
        description: "Lesson 1: Let's be attentive!",

        certImage:
            'cert.photo/reading_award.png'
    },

];

function loadProgress() {

    const progress =
        localStorage.getItem('funmindsProgress');

    return progress
        ? JSON.parse(progress)
        : {};

}

const progressData =
    loadProgress();

const userProgress =
    progressData[currentUser] || {

        lessons: {
            alphabet: false,
            colors: false,
            phonics: false,
            reading: false
        },

        lastUnlocked: null

    };

function createAchievementCard(
    lesson,
    unlocked
) {

    const card =
        document.createElement('div');

    card.className =
        'achievement-card';

    const imageBox =
        document.createElement('div');

    imageBox.className =
        'image-box';

    const img =
        document.createElement('img');

    img.src =
        lesson.image;

    img.alt =
        lesson.title;

    img.style.cssText =
        `
        width:100%;
        height:100%;
        object-fit:cover;
        border-radius:inherit;
        `;

    img.onerror = () => {

        imageBox.innerHTML = `
            <div class="placeholder-text">
                ${lesson.title}
            </div>
        `;

    };

    imageBox.appendChild(img);

    const label =
        document.createElement('div');

    label.className =
        'label';

    label.textContent =
        lesson.certificate;

    const status =
        document.createElement('div');

    status.className =
        'certificate-status';

    status.textContent =
        unlocked
            ? '✅ Unlocked'
            : '🔒 Locked';

    status.style.color =
        unlocked
            ? '#1b5c0a'
            : '#756d4e';

    const note =
        document.createElement('p');

    note.style.marginTop =
        '10px';

    note.style.fontSize =
        '18px';

    note.style.color =
        '#4a533a';

    note.style.textAlign =
        'center';

    note.textContent =
        unlocked
            ? 'Tap to view certificate!'
            : 'Complete this lesson to unlock.';

    card.appendChild(imageBox);
    card.appendChild(label);
    card.appendChild(status);
    card.appendChild(note);

    // OPEN CERTIFICATE

    if (unlocked) {

        card.style.cursor =
            'pointer';

        card.addEventListener(
            'click',
            () => {

                openCertificate(lesson);

            }
        );

    }

    return card;

}

function renderAchievements() {

    achievementGrid.innerHTML = '';

    let unlockedCount = 0;

    lessons.forEach(lesson => {

        const unlocked =
            !!userProgress.lessons[lesson.id];

        if (unlocked)
            unlockedCount++;

        achievementGrid.appendChild(

            createAchievementCard(
                lesson,
                unlocked
            )

        );

    });

    if (certificateSummary) {

        certificateSummary.innerHTML =

            unlockedCount > 0

            ? `You have unlocked
               <strong>${unlockedCount}</strong>
               certificate${unlockedCount > 1 ? 's' : ''}.
               Keep learning to unlock the next badge!`

            : `Finish any lesson to unlock your
               first certificate.`;

    }

}

function openCertificate(lesson) {

    certificateName.textContent =
        lesson.certificate;

    certificateLesson.textContent =
        lesson.description;

    certificateStudent.textContent =
        currentUser;

    // CHANGE CERTIFICATE IMAGE
    certificateImage.src =
        lesson.certImage;

    const today =
        new Date();

    certificateDate.textContent =
        today.toLocaleDateString();

    certificateModal.classList.add(
        'show'
    );

}

function closeCertificate() {

    certificateModal.classList.remove(
        'show'
    );

}

renderAchievements();

document
    .querySelector('.close-btn')
    .addEventListener('click', () => {

        window.location.href =
            'dashboard.html';

    });