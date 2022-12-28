const clipBtn = document.getElementById('clipBtn');
const smokeSlide = document.getElementById('smokeSlide');
const titleContainerNoSmoke = document.getElementById('titleNoSmoke');
const titleContainerSmoke = document.getElementById('titleSmoke');

const slideNoSmokeBg = document.getElementById('slideNoSmokeBg');

const postBanner = document.getElementById('postBanner');

const animateSunrise = () => {
    let sunriseIteration = 0;
    slideNoSmokeBg.classList.add('slide--no-smoke__background-shift');
    const sunriseInterval = setInterval(() => {
        if (sunriseIteration >= 20) {
            clearInterval(sunriseInterval);
        } else {
            // if (sunriseIteration === 34) sunriseIteration = 36;
            // if (sunriseIteration > 35) {
            slideNoSmokeBg.style.background = `radial-gradient(circle at center, #FDEB00FF 0, #0dffe7 ${30 + sunriseIteration*2}%,#0dffe7, #0dffe7 100%) top`;
                // slideNoSmoke.style.background = `linear-gradient(to bottom, #0dffe7 0%, #FDEB00FF ${70 - sunriseIteration*0.9}%, #0dffe7 100%)`;
            // } else {
            //     slideNoSmoke.style.background = `radial-gradient(circle at center, #FDEB00FF 0, #0dffe7 30%,#0dffe7, #FDEB00FF 100%) top`;
                // slideNoSmoke.style.background = `linear-gradient(to bottom, #0dffe7 0%, #0dffe7 ${20 - sunriseIteration/5}%, #FDEB00FF ${70 - sunriseIteration*0.9}%, #0dffe7 100%)`;
            // }
            sunriseIteration++;
        }
    }, 70);
};

const SMOKE_SLIDE_LEFT_X = 20;
const SMOKE_SLIDE_RIGHT_X = SMOKE_SLIDE_LEFT_X + smokeSlide.clientWidth + 10;

const smokeSlideMiddle = (SMOKE_SLIDE_RIGHT_X - SMOKE_SLIDE_LEFT_X) / 2;
smokeSlide.style.clip = `rect(auto, ${smokeSlideMiddle}px, auto, auto)`;

let NO_SMOKE_SLIDE_OPENED = false;
let SMOKE_SLIDE_OPENED = false;
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
    const centerX = document.body.clientWidth / 2;
    const smokeSlideTrigger = x > centerX;
    const noSmokeSlideTrigger = x < centerX;
    if (!NO_SMOKE_SLIDE_OPENED && noSmokeSlideTrigger) {
        animateSunrise();
        NO_SMOKE_SLIDE_OPENED = true;
        titleContainerNoSmoke.style.opacity = '1';
    }
    if (!SMOKE_SLIDE_OPENED && smokeSlideTrigger) {
        SMOKE_SLIDE_OPENED = true;
        titleContainerSmoke.style.opacity = '1';
    }
    if (x <= centerX * 0.5 || x >= centerX * 1.7) {
        postBanner.classList.add('postBanner--visible');
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
