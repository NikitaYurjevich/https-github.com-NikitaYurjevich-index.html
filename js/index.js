const clipBtn = document.getElementById('clipBtn');
const smokeSlide = document.getElementById('smokeSlide');
const titleContainerNoSmoke = document.getElementById('titleContainerNoSmoke');
const titleContainerSmoke = document.getElementById('titleContainerSmoke');

const slideNoSmoke = document.getElementById('slideNoSmoke');

const animateSunrise = () => {
    let sunriseIteration = 0;
    const sunriseInterval = setInterval(() => {
        if (sunriseIteration >= 70) {
            clearInterval(sunriseInterval);
        } else {
            if (sunriseIteration === 34) sunriseIteration = 36;
            if (sunriseIteration > 35) {
                slideNoSmoke.style.background = `linear-gradient(to bottom, #0dffe7 0%, #FDEB00FF ${70 - sunriseIteration*0.9}%, #0dffe7 100%)`;
            } else {
                slideNoSmoke.style.background = `linear-gradient(to bottom, #0dffe7 0%, #0dffe7 ${20 - sunriseIteration/5}%, #FDEB00FF ${70 - sunriseIteration*0.9}%, #0dffe7 100%)`;
            }
            sunriseIteration++;
        }
    }, 25);
};

const SMOKE_SLIDE_LEFT_X = 20;
const SMOKE_SLIDE_RIGHT_X = SMOKE_SLIDE_LEFT_X + smokeSlide.clientWidth + 10;

const smokeSlideMiddle = (SMOKE_SLIDE_RIGHT_X - SMOKE_SLIDE_LEFT_X) / 2;
smokeSlide.style.clip = `rect(auto, ${smokeSlideMiddle}px, auto, auto)`;

let NO_SMOKE_SLIDE_OPENED = false;
let TITLE_VISIBLE = false;

const flashlight = document.getElementById('flashlight');
const redSignal = document.getElementById('redSignal').getBoundingClientRect();

flashlight.style.width = `${redSignal.width - 10}px`;
flashlight.style.left = `${redSignal.left + 5}px`;
flashlight.style.top = `${redSignal.bottom - flashlight.clientHeight - redSignal.height / 4}px`;

const onClip = (e) => {
    const x = e.clientX ?? e.touches[0].clientX;
    if (x > SMOKE_SLIDE_LEFT_X + 20 && x < SMOKE_SLIDE_RIGHT_X - 10) {
        clipBtn.style.left = `${x - 45}px`;
        smokeSlide.style.clip = `rect(auto, ${x - 30}px, auto, auto)`;
    }
    const smokeSlideTrigger = x > SMOKE_SLIDE_RIGHT_X - 50;
    const noSmokeSlideTrigger = x < SMOKE_SLIDE_LEFT_X + 50;
    if (!NO_SMOKE_SLIDE_OPENED && noSmokeSlideTrigger) {
        animateSunrise();
        NO_SMOKE_SLIDE_OPENED = true;
    }
    if (!TITLE_VISIBLE && (smokeSlideTrigger || noSmokeSlideTrigger)) {
        titleContainerNoSmoke.style.opacity = '1';
        titleContainerSmoke.style.opacity = '1';
        document.querySelectorAll('.images-container__slide-title').forEach(title => {
            title.style.opacity = '1';
        })

        TITLE_VISIBLE = true;
    }
}

clipBtn.addEventListener('mousedown', () => {
    window.addEventListener('mousemove', onClip);
});
window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', onClip);
});

clipBtn.addEventListener('touchstart', () => {
    window.addEventListener('touchmove', onClip);
});
window.addEventListener('touchend', () => {
    window.removeEventListener('touchmove', onClip);
});
