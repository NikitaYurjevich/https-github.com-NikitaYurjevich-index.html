const clipBtn = document.getElementById('clipBtn');
const smokeSlide = document.getElementById('smokeSlide');
const titleContainerNoSmoke = document.getElementById('titleContainerNoSmoke');
const titleContainerSmoke = document.getElementById('titleContainerSmoke');

const SMOKE_SLIDE_LEFT_X = 20;
const SMOKE_SLIDE_RIGHT_X = SMOKE_SLIDE_LEFT_X + smokeSlide.clientWidth + 10;

const smokeSlideMiddle = (SMOKE_SLIDE_RIGHT_X - SMOKE_SLIDE_LEFT_X) / 2;
smokeSlide.style.clip = `rect(auto, ${smokeSlideMiddle}px, auto, auto)`;

let TITLE_VISIBLE = false;

const flashlight = document.getElementById('flashlight');
const minimumCharge = document.getElementById('minimumCharge');
// const minimumChargeBounds = minimumCharge.getBoundingClientRect();
const redSignal = document.getElementById('redSignal').getBoundingClientRect();
console.log(redSignal)

flashlight.style.width = `${redSignal.width - 10}px`;
flashlight.style.left = `${redSignal.left + 5}px`;
flashlight.style.top = `${redSignal.bottom - flashlight.clientHeight - redSignal.height / 4}px`;

const onClip = (e) => {
    const x = e.clientX ?? e.touches[0].clientX;
    if (x > SMOKE_SLIDE_LEFT_X + 20 && x < SMOKE_SLIDE_RIGHT_X - 10) {
        clipBtn.style.left = `${x - 45}px`;
        smokeSlide.style.clip = `rect(auto, ${x - 30}px, auto, auto)`;
    }
    if (!TITLE_VISIBLE && (x < SMOKE_SLIDE_LEFT_X + 50 || x > SMOKE_SLIDE_RIGHT_X - 50)) {
        // titleContainer.style.display = 'flex';
        titleContainerNoSmoke.style.opacity = '1';
        titleContainerSmoke.style.opacity = '1';
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
