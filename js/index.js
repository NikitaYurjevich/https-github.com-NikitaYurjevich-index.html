const headerHeight = document.querySelector('header').clientHeight;
const windowHeight = window.screen.availHeight;
document.body.style.setProperty('--window-height', `${windowHeight}px`);
document.body.style.setProperty('--header-height', `${headerHeight}px`);

// const containerHeight = document.getElementById('container').clientHeight;
// const linesIcon = document.getElementById('linesIcon');

// linesIcon.style.height = `${containerHeight * 1.1}px`;
// blind.clientHeight = containerHeight;

const START_ANIMATION_TIME = 400;
const TIME_BEFORE_SLIDES = 2000;

const textList = [
    'Бесит, когда отвлекают от работы?',
    'Попробуйте "Пачку" - специальный корпоративный мессенджер, в котором вас никто не прервет',
    'Подробнее →',
];
const speedList = [45, 40, 50];

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

        const showSectionAndTypeText = (index = currentIndex) => {
            sentMessagesList[index].classList.add('section-appearance');
            typeText(
                sentMessagesList[index],
                textList[index],
                speedList[index],
                isLast,
            );
        }

        if (isLast) {
            const currentIndexClosure = currentIndex;

            setTimeout(() => {
                const blindList = document.getElementsByClassName(`lines-icon__blind`);
                for (const blind of blindList) {
                    if (blind) {
                        blind.classList.add('lines-icon__blind--shifted');
                    }
                }

                const linesIconBoxList = document.getElementsByClassName('lines-icon__box');
                for (const linesIconBox of linesIconBoxList) {
                    if (linesIconBox) {
                        linesIconBox.style.visibility = 'visible';
                    }
                }

                const crossBox = document.getElementById('crossBox');
                crossBox.classList.add('cross__box--appearance');

                showSectionAndTypeText(currentIndexClosure);
            }, 2000);
        } else {
            sentMessagesList[currentIndex].classList.add('section-appearance');
            showSectionAndTypeText();
        }
        currentIndex++;
    }

    typeMessage();
    const intervalId = setInterval(() => {
        const preLast = currentIndex === sentMessagesList.length - 1;
        if (currentIndex > sentMessagesList.length - 1) {
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
