const headerHeight = document.querySelector('header').clientHeight;
const windowHeight = window.screen.availHeight;
document.body.style.setProperty('--window-height', `${windowHeight}px`);
document.body.style.setProperty('--header-height', `${headerHeight}px`);

const START_ANIMATION_TIME = 400;
const TIME_BEFORE_SLIDES = 2000;

const textList = [
    'Бесит, когда отвлекают от работы?',
    'Попробуйте "Пачку" - специальный корпоративный мессенджер, в котором вас никто не прервет',
    'Подробнее',
];
const speedList = [45, 30, 50];

const addCaret = parent => {
    const caret = document.createElement('div')
    caret.innerHTML = '|';
    caret.classList.add('caret');
    parent.appendChild(caret);
    /*const caret = document.getElementById('caret')
    switch (action) {
        case 'show':
            caret.style.visibility = 'visible';
            break;
        case 'hide':
            caret.style.visibility = 'hidden';
    }*/
};

const removeCaret = parent => {
    const caret = parent.querySelector('.caret');
    caret.style.display = 'none';
}

const clickAnimation = () => {
    const sendIcon = document.getElementById('sendMessageIcon');
    sendIcon.classList.remove('click');
    setTimeout(() => {
        sendIcon.classList.add('click');
    }, 50);
};

const typeText = (el, text, speed, isLast = false) => {
    text = [...text].reverse();
    const elText = el.querySelector('.message__text');
    const intervalId = setInterval(() => {
        if (text.length) {
            elText.innerHTML += text.pop();
        } else {
            if (!isLast) {
                addCaret(el)
            }
            clearInterval(intervalId);

            // clickAnimation();
        }
    }, speed);
};

const start = () => {
    // const typeMessageField = document.getElementById('typeMessageField');
    const sentMessagesList = document.body.getElementsByClassName('section');
    let currentIndex = 0;

    const typeMessage = () => {
        const isLast = currentIndex === sentMessagesList.length - 1;

        const showSectionAndTypeText = () => {
            sentMessagesList[currentIndex].classList.add('section-appearance');
            typeText(
                sentMessagesList[currentIndex],
                textList[currentIndex],
                speedList[currentIndex],
                isLast,
            );
            currentIndex++;
        }

        if (isLast) {
            setTimeout(() => {
                showSectionAndTypeText();
            }, 1000);
        } else {
            sentMessagesList[currentIndex].classList.add('section-appearance');
            showSectionAndTypeText();
        }
    }

    typeMessage();
    const intervalId = setInterval(() => {
        const preLast = currentIndex === sentMessagesList.length - 1;
        if (currentIndex >= sentMessagesList.length) {
            clearInterval(intervalId)
        } else {
            if (!preLast) {
                removeCaret(sentMessagesList[currentIndex-1])
            }
            typeMessage();
        }
    }, TIME_BEFORE_SLIDES);
};

setTimeout(() => {
    start();
}, START_ANIMATION_TIME);
