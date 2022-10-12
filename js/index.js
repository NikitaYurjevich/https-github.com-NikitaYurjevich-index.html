let decorations, roll, logo;
const loadImage = (url, isSvg = false) => {
    const image = new Image();
    image.width = canvas.width / 3 * 0.8;
    image.height = canvas.width / 3;
    if (isSvg) {
        image.src = `${url}.svg`;
    } else {
        image.src = `${url}-min.png`;
        image.srcset = `${url}-min.png 1x, ${url}@2x-min.png 2x, ${url}@3x-min.png 3x`;
    }
    return image;
}

// HANDS
let handsIsCreated = false;

let handsHeight = canvas.width / 3;
if (handsHeight > MAX_HANDS_HEIGHT) {
    handsHeight = MAX_HANDS_HEIGHT;
}

const HANDS_POSITIONS = {
    topLeft: {
        id: 'topLeft',
        x: LEFT_POSITIONS_X,
        y: TOP_POSITIONS_Y,
    },
    topRight: {
        id: 'topRight',
        x: RIGHT_POSITIONS_X,
        y: TOP_POSITIONS_Y,
    },
    bottomRight: {
        id: 'bottomRight',
        x: RIGHT_POSITIONS_X,
        y: BOTTOM_POSITIONS_Y,
    },
    bottomLeft: {
        id: 'bottomLeft',
        x: LEFT_POSITIONS_X,
        y: BOTTOM_POSITIONS_Y,
    }
}

let handsCurrentPosition = HANDS_POSITIONS.topLeft;

function loadSprites() {
    decorations = loadImage('./img/decorations');
    roll = loadImage('./img/roll', true);
    logo = loadImage('./img/logo');
}

const SCORES = {
    _value: 0,
    add: () => SCORES._value++,
    clear: () => SCORES._value = 0,
}
let timer;

const addScore = (rollPositionId) => {
    if (rollPositionId === handsCurrentPosition.id) {
        SCORES.add();
    }
};

const getScoreboard = () => {
    ctx.fillStyle = '#9FCABE';
    ctx.fillRect(0, 0, canvas.width, 100);
    ctx.font = "48px serif";
    ctx.fillStyle = '#FFF';
    ctx.textAlign = 'center';
    ctx.fillText(`ОЧКИ: ${SCORES._value}/${SCORES_TO_WIN}`, canvas.width / 2, 65);
};
const getTimer = () => {
    const secondsRemaining = timer < 10 ? `0${timer}` : `${timer}`;
    ctx.font = "48px serif";
    ctx.fillStyle = '#FFF';
    ctx.textAlign = 'center';
    ctx.fillText(`00:${secondsRemaining}`, canvas.width / 2, 150);
};

// LOGO
const MIN_LOGO_WIDTH = 200;
const LOGO_WIDTH = canvas.width / 5 > MIN_LOGO_WIDTH ? canvas.width / 5 : MIN_LOGO_WIDTH;

const drawPositions = () => {
    const paddingX = canvas.width / 5;
    const paddingY = 0;

    ctx.setLineDash([8]);
    ctx.strokeStyle = "white";
    ctx.strokeRect(LEFT_POSITIONS_X - paddingX / 2, TOP_POSITIONS_Y - paddingY / 2, POSITION_SIZE + paddingX, actualHeight + paddingY);
    ctx.strokeRect(LEFT_POSITIONS_X - paddingX / 2, BOTTOM_POSITIONS_Y - paddingY / 2, POSITION_SIZE + paddingX, actualHeight + paddingY);
    ctx.strokeRect(RIGHT_POSITIONS_X - paddingX / 2, TOP_POSITIONS_Y - paddingY / 2, POSITION_SIZE + paddingX, actualHeight + paddingY);
    ctx.strokeRect(RIGHT_POSITIONS_X - paddingX / 2, BOTTOM_POSITIONS_Y - paddingY / 2, POSITION_SIZE + paddingX, actualHeight + paddingY);
}

// GAME
const gameFrame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // BACKGROUND
    ctx.fillStyle = '#404853';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawPositions();
    // ctx.strokeRect(ROLLS_POSITIONS.topLeft.first.x, ROLLS_POSITIONS.topLeft.first.y, ROLL_SIZE, ROLL_SIZE);
    // ctx.strokeRect(ROLLS_POSITIONS.topLeft.second.x, ROLLS_POSITIONS.topLeft.second.y, ROLL_SIZE, ROLL_SIZE);
    // ctx.strokeRect(ROLLS_POSITIONS.topLeft.third.x, ROLLS_POSITIONS.topLeft.third.y, ROLL_SIZE, ROLL_SIZE);
    //
    // ctx.strokeRect(ROLLS_POSITIONS.bottomLeft.first.x, ROLLS_POSITIONS.bottomLeft.first.y, ROLL_SIZE, ROLL_SIZE);
    // ctx.strokeRect(ROLLS_POSITIONS.bottomLeft.second.x, ROLLS_POSITIONS.bottomLeft.second.y, ROLL_SIZE, ROLL_SIZE);
    // ctx.strokeRect(ROLLS_POSITIONS.bottomLeft.third.x, ROLLS_POSITIONS.bottomLeft.third.y, ROLL_SIZE, ROLL_SIZE);
    //
    // ctx.strokeRect(ROLLS_POSITIONS.topRight.first.x, ROLLS_POSITIONS.topRight.first.y, ROLL_SIZE, ROLL_SIZE);
    // ctx.strokeRect(ROLLS_POSITIONS.topRight.second.x, ROLLS_POSITIONS.topRight.second.y, ROLL_SIZE, ROLL_SIZE);
    // ctx.strokeRect(ROLLS_POSITIONS.topRight.third.x, ROLLS_POSITIONS.topRight.third.y, ROLL_SIZE, ROLL_SIZE);
    //
    // ctx.strokeRect(ROLLS_POSITIONS.bottomRight.first.x, ROLLS_POSITIONS.bottomRight.first.y, ROLL_SIZE, ROLL_SIZE);
    // ctx.strokeRect(ROLLS_POSITIONS.bottomRight.second.x, ROLLS_POSITIONS.bottomRight.second.y, ROLL_SIZE, ROLL_SIZE);
    // ctx.strokeRect(ROLLS_POSITIONS.bottomRight.third.x, ROLLS_POSITIONS.bottomRight.third.y, ROLL_SIZE, ROLL_SIZE);

    ctx.drawImage(decorations, -canvas.width * 0.2, canvas.height / 4, canvas.width * 1.4, canvas.height / 2);

    // DRAW ROLLS
    rollsList.forEach((rollItem) => {
        ctx.drawImage(roll, rollItem.step.x, rollItem.step.y, ROLL_SIZE, ROLL_SIZE);
    })

    getScoreboard();
    getTimer();
    ctx.drawImage(logo, (canvas.width - LOGO_WIDTH) / 2, 180, LOGO_WIDTH, LOGO_WIDTH * 0.23);
}
const endGameFrame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // BACKGROUND
    ctx.fillStyle = '#404853';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    getScoreboard();
    getTimer();
}

function gameOverHandler() {

    document.getElementById('leftHands').style.visibility = 'hidden';
    document.getElementById('rightHands').style.visibility = 'hidden';

    document.getElementById('endGameBox').classList.add('end-game__box-appearance')
    if (SCORES._value >= SCORES_TO_WIN) {
        document.getElementById('endGameLose').style.display = 'none';
        document.getElementById('endGameWin').style.display = 'flex';

        if (SCORES_TO_WIN === 5) {
            document.getElementById('endGameWinFirstLevel').style.display = 'flex';
        } else if (SCORES_TO_WIN === 10) {
            document.getElementById('endGameWinFirstLevel').style.display = 'none';
            document.getElementById('endGameWinSecondLevel').style.display = 'flex';
        }
    } else {
        document.getElementById('endGameWin').style.display = 'none';
        document.getElementById('endGameLose').style.display = 'flex';
    }
}

const showGameControlHint = () => {
    if (GAME_CONTROL === 'mouse') {
        const cursor = document.createElement('img');
        cursor.src = 'img/cursor.svg';
        cursor.style.width = `${canvas.width / 10}px`;
        cursor.style.top = `${TOP_POSITIONS_Y + POSITION_SIZE / 5}px`;
        cursor.style.left = `${LEFT_POSITIONS_X + POSITION_SIZE + canvas.width / 10}px`;

        cursor.style.setProperty('--step-length', `-${canvas.width / 40}px`);
        cursor.style.setProperty('--close-to-step-length', `-${canvas.width / 5 - 10}px`);
        cursor.classList.add('cursor-move');

        document.body.appendChild(cursor);
    } else if (GAME_CONTROL === 'finger') {
        const cursor = document.createElement('img');
        cursor.src = 'img/tap-finger.svg';
        cursor.style.width = `${canvas.width / 7}px`;
        cursor.style.top = `${TOP_POSITIONS_Y + actualHeight}px`;
        cursor.style.left = `${LEFT_POSITIONS_X + POSITION_SIZE / 2}px`;

        cursor.style.setProperty('--tap-translate-length', `-${actualHeight * 0.7}px`);
        cursor.style.setProperty('--close-to-step-length', `-${canvas.width / 5 - 10}px`);
        cursor.classList.add('finger-tap');

        document.body.appendChild(cursor);
    }
};

// ENTRYPOINT
function startGame(isSecondLevel = null) {
    if (isSecondLevel) SCORES_TO_WIN = 10;

    timer = GAME_DURATION / 1000;
    SCORES.clear();
    document.getElementById('endGameBox').classList.remove('end-game__box-appearance')
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // BACKGROUND
    ctx.fillStyle = '#404853';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    loadSprites();

    let gameIsStarted = false;

    setTimeout(() => {

        canvas.addEventListener('mousemove', onMoveHands);
        canvas.addEventListener('gesturechange', onMoveHands, false);
        const createRollIntervalId = setInterval(() => {
            const leftHands = document.getElementById('leftHands');
            if (handsIsCreated
                && leftHands.style.visibility === 'hidden'
                && document.getElementById('rightHands').style.visibility === 'hidden') {
                leftHands.style.top = `${HANDS_POSITIONS.topLeft.y}px`;
                leftHands.style.left = `${HANDS_POSITIONS.topLeft.x}px`;
                leftHands.style.visibility = 'visible';
            }
            createRoll();
        }, ROLL_CREATING_SPEED);

        const leftHands = document.getElementById('leftHands');
        leftHands.width = handsHeight * 0.8;
        leftHands.height = handsHeight;
        leftHands.style.position = 'absolute';
        leftHands.style.zIndex = '10';
        leftHands.style.left = `${HANDS_POSITIONS.topLeft.x}px`;
        leftHands.style.top = `${HANDS_POSITIONS.topLeft.y}px`;
        const rightHands = document.getElementById('rightHands');
        rightHands.width = handsHeight * 0.8;
        rightHands.height = handsHeight;
        rightHands.style.position = 'absolute';
        rightHands.style.zIndex = '10';
        rightHands.style.visibility = 'hidden';
        handsIsCreated = true;

        const gameIntervalId = setInterval(() => {
            timer--;

            if (timer <= 0) {
                canvas.removeEventListener('mousemove', onMoveHands);
                canvas.removeEventListener('gesturechange', onMoveHands, false);
                window.requestAnimationFrame(endGameFrame);
                clearInterval(createRollIntervalId);
                clearInterval(gameIntervalId);
                rollsList.length = 0;

                gameOverHandler();
            }
        }, 1000);
        gameIsStarted = true;
    }, gameIsStarted ? 1000 : 1000 + TIME_TO_SHOW_HINT);
}
setTimeout(() => {
    drawPositions();
    showGameControlHint();
}, 2000);
startGame();

function onMoveHands(e) {
    const padding = canvas.width / 10;
    const leftHands = document.getElementById('leftHands');
    const rightHands = document.getElementById('rightHands');

    if (e.clientX > LEFT_POSITIONS_X - padding && e.clientX < LEFT_POSITIONS_X + POSITION_SIZE + padding) {
        if (e.clientY > TOP_POSITIONS_Y && e.clientY < TOP_POSITIONS_Y + actualHeight) {
            leftHands.style.visibility = 'visible';
            rightHands.style.visibility = 'hidden';

            handsCurrentPosition = HANDS_POSITIONS.topLeft;
            leftHands.style.top = `${HANDS_POSITIONS.topLeft.y}px`;
            leftHands.style.left = `${HANDS_POSITIONS.topLeft.x}px`;
        } else if(e.clientY > BOTTOM_POSITIONS_Y && e.clientY < BOTTOM_POSITIONS_Y + actualHeight) {
            leftHands.style.visibility = 'visible';
            rightHands.style.visibility = 'hidden';

            handsCurrentPosition = HANDS_POSITIONS.bottomLeft;
            leftHands.style.top = `${HANDS_POSITIONS.bottomLeft.y}px`;
            leftHands.style.left = `${HANDS_POSITIONS.bottomLeft.x}px`;
        }
    } else if (e.clientX > RIGHT_POSITIONS_X - padding && e.clientX < RIGHT_POSITIONS_X + actualHeight + padding) {
        if (e.clientY > TOP_POSITIONS_Y && e.clientY < TOP_POSITIONS_Y + actualHeight) {
            leftHands.style.visibility = 'hidden';
            rightHands.style.visibility = 'visible';

            handsCurrentPosition = HANDS_POSITIONS.topRight;
            rightHands.style.top = `${HANDS_POSITIONS.topRight.y}px`;
            rightHands.style.left = `${HANDS_POSITIONS.topRight.x - 50}px`;
        } else if(e.clientY > BOTTOM_POSITIONS_Y && e.clientY < BOTTOM_POSITIONS_Y + actualHeight) {
            leftHands.style.visibility = 'hidden';
            rightHands.style.visibility = 'visible';

            handsCurrentPosition = HANDS_POSITIONS.bottomRight;
            rightHands.style.top = `${HANDS_POSITIONS.bottomRight.y}px`;
            rightHands.style.left = `${HANDS_POSITIONS.bottomRight.x - 50}px`;
        }
    }
    window.requestAnimationFrame(gameFrame);
}
