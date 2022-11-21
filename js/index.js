const headerHeight = document.querySelector('header').clientHeight;
const windowHeight = window.screen.availHeight;
document.body.style.setProperty('--window-height', `${windowHeight}px`);
document.body.style.setProperty('--header-height', `${headerHeight}px`);

const START_ANIMATION_TIME = 400;
const TIME_BEFORE_SLIDES = 4500;

const textList = [
    'Бесит, когда отвлекают от работы?',
    'Попробуйте "Пачку" - специальный корпоративный мессенджер, в котором вас никто не прервет',
    'Подробнее',
];
const speedList = [50, 30, 50];

const toggleCaret = action => {
    const caret = document.getElementById('caret')
    switch (action) {
        case 'show':
            caret.style.visibility = 'visible';
            break;
        case 'hide':
            caret.style.visibility = 'hidden';
    }
};

const clickAnimation = () => {
    const sendIcon = document.getElementById('sendMessageIcon');
    sendIcon.classList.remove('click');
    setTimeout(() => {
        sendIcon.classList.add('click');
    }, 50);
};

const typeText = (el, sentMessageBox, text, speed) => {
    text = [...text].reverse();
    toggleCaret('hide');
    const intervalId = setInterval(() => {
        if (text.length) {
            el.innerHTML += text.pop();
        } else {
            toggleCaret('show');
            clearInterval(intervalId);

            clickAnimation();

            const message = sentMessageBox.querySelector('.message__text');
            message.innerHTML = el.innerHTML;

            sentMessageBox.classList.add('section-appearance');
            el.innerHTML = '';
        }
    }, speed);
};

const start = () => {
    const typeMessageField = document.getElementById('typeMessageField');
    const sentMessagesList = document.body.getElementsByClassName('section');
    let currentIndex = 0;

    const typeMessage = () => {
        typeText(
            typeMessageField,
            sentMessagesList[currentIndex],
            textList[currentIndex],
            speedList[currentIndex]
        );
        currentIndex++;
    }

    typeMessage();
    const intervalId = setInterval(() => {
        if (currentIndex >= sentMessagesList.length) {
            clearInterval(intervalId)
        } else {
            typeMessage();
        }
    }, TIME_BEFORE_SLIDES);
};

setTimeout(() => {
    start();
}, START_ANIMATION_TIME);
