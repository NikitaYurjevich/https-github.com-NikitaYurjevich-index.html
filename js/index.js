const getCaret = (parent) => {
    const caret = document.createElement('div');
    caret.innerHTML = '|';
    caret.classList.add('caret');

    parent.appendChild(caret);
};

const typeText = (el, elBox, text, speed, isLastSlide = false) => {
    text = [...text].reverse();
    const intervalId = setInterval(() => {
        if (text.length) {
            el.innerHTML += text.pop();
        } else {
            getCaret(el);
            clearInterval(intervalId);

            if (!isLastSlide) {
                setTimeout(() => {
                    console.log('___ DISAPPEARANCE ___')
                    elBox.classList.add('section-disappearance')
                }, 800);
            } else {
                const linkEl = document.getElementById('link');
                linkEl.style.top = `${elBox.offsetTop + elBox.clientHeight + 15}px`;
                linkEl.style.left = `${elBox.offsetLeft}px`;

                linkEl.classList.add('link-appearance');
            }
        }
    }, speed);
};

const textList = [
    'Бесит, когда отвлекают от работы?',
    'Попробуйте "Пачку" - специальный корпоративный мессенджер',
    'В котором вас никто не прервет'
];
const speedList = [90, 60, 80]

const startSliding = () => {
    const sectionsList = document.body.getElementsByClassName('section');
    let currentIndex = 0;

    const showSlide = () => {
        const currentSection = sectionsList[currentIndex];

        const textEl = currentSection.getElementsByClassName('section__text')[0];
        currentSection.classList.add('section-appearance');

        const isLastSlide = currentIndex === sectionsList.length - 1;

        typeText(textEl, currentSection, textList[currentIndex], speedList[currentIndex], isLastSlide);
        currentIndex++;
    }

    showSlide();
    const intervalId = setInterval(() => {
        if (currentIndex > sectionsList.length) {
            clearInterval(intervalId)
        } else {
            showSlide();
        }
    }, 4500);
};

setTimeout(() => {
    startSliding();
}, 400);
