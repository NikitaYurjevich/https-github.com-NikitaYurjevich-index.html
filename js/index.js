const clipBtn = document.getElementById('clipBtn');
const smokeSlide = document.getElementById('smokeSlide');

const SMOKE_SLIDE_LEFT_X = 20;
const SMOKE_SLIDE_RIGHT_X = SMOKE_SLIDE_LEFT_X + smokeSlide.clientWidth + 10;

const smokeSlideMiddle = (SMOKE_SLIDE_RIGHT_X - SMOKE_SLIDE_LEFT_X) / 2;
smokeSlide.style.clip = `rect(auto, ${smokeSlideMiddle}px, auto, auto)`;

// const flashlight = document.getElementById('flashlight');
// const minimumCharge = document.getElementById('minimumCharge');
// const minimumChargeBounds = minimumCharge.getBoundingClientRect();
// const redSignal = document.getElementById('redSignal').getBoundingClientRect();
// console.log(redSignal)
//
// flashlight.style.left = `${redSignal.left}px`;
// flashlight.style.top = `${redSignal.bottom}px`;

const onClip = (e) => {
    const x = e.clientX ?? e.touches[0].clientX;
    if (x > SMOKE_SLIDE_LEFT_X && x < SMOKE_SLIDE_RIGHT_X) {
        clipBtn.style.left = `${x - 45}px`;
        smokeSlide.style.clip = `rect(auto, ${x - 30}px, auto, auto)`;
    }
}

clipBtn.addEventListener('mousedown', () => {
    console.log('TI GAVNO MAUS UP')
    window.addEventListener('mousemove', onClip);
});
window.addEventListener('mouseup', () => {
    console.log('TI CHE GOVNO')
    window.removeEventListener('mousemove', onClip);
});

clipBtn.addEventListener('touchstart', () => {
    window.addEventListener('touchmove', onClip);
});
window.addEventListener('touchend', () => {
    window.removeEventListener('touchmove', onClip);
});
