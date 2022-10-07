let handsLeft, handsRight, decorations, roll, logo;
let actualHands;
const loadImage = url => {
    const image = new Image();
    image.width = canvas.width / 3 * 0.8;
    image.height = canvas.width / 3;
    image.src = `${url}-min.png`;
    image.srcset = `${url}-min.png 1x, ${url}@2x-min.png 2x, ${url}@3x-min.png 3x`;
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
    // handsLeft = loadImage('./img/hands_left');
    // handsRight = loadImage('./img/hands_right');
    decorations = loadImage('./img/decorations');
    roll = loadImage('./img/roll');
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

// GAME
const gameFrame = () => {
    if (!handsIsCreated) {
        const leftHands = document.createElement('img');
        leftHands.id = 'leftHands';
        leftHands.src = './img/hands_left-min.png';
        leftHands.srcset = './img/hands_left@2x-min.png 2x, ./img/hands_left@3x-min.png 3x';
        leftHands.width = handsHeight * 0.8;
        leftHands.height = handsHeight;
        leftHands.style.position = 'absolute';
        leftHands.style.zIndex = '10';
        leftHands.style.left = `${HANDS_POSITIONS.topLeft.x}px`;
        leftHands.style.top = `${HANDS_POSITIONS.topLeft.y}px`;

        const rightHands = document.createElement('img');
        rightHands.id = 'rightHands';
        rightHands.src = './img/hands_right-min.png';
        rightHands.srcset = './img/hands_right@2x-min.png 2x, ./img/hands_right@3x-min.png 3x';
        rightHands.width = handsHeight * 0.8;
        rightHands.height = handsHeight;
        rightHands.style.position = 'absolute';
        rightHands.style.zIndex = '10';
        rightHands.style.visibility = 'hidden';

        document.body.appendChild(leftHands);
        document.body.appendChild(rightHands);

        handsIsCreated = true;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // BACKGROUND
    ctx.fillStyle = '#404853';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const paddingX = canvas.width / 5;
    const paddingY = 0;

    ctx.setLineDash([8]);
    ctx.strokeStyle = "white";
    ctx.strokeRect(LEFT_POSITIONS_X - paddingX / 2, TOP_POSITIONS_Y - paddingY / 2, POSITION_SIZE + paddingX, actualHeight + paddingY);
    ctx.strokeRect(LEFT_POSITIONS_X - paddingX / 2, BOTTOM_POSITIONS_Y - paddingY / 2, POSITION_SIZE + paddingX, actualHeight + paddingY);
    ctx.strokeRect(RIGHT_POSITIONS_X - paddingX / 2, TOP_POSITIONS_Y - paddingY / 2, POSITION_SIZE + paddingX, actualHeight + paddingY);
    ctx.strokeRect(RIGHT_POSITIONS_X - paddingX / 2, BOTTOM_POSITIONS_Y - paddingY / 2, POSITION_SIZE + paddingX, actualHeight + paddingY);
    //
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

    // DRAW SPRITES
    // if (actualHands) {
        // ctx.imageSmoothingQuality = "high";
        // ctx.drawImage(actualHands, handsCurrentPosition.x, handsCurrentPosition.y, canvas.width / 3 * 0.8, canvas.width / 3);
    // }
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
    setTimeout(() => {

        window.addEventListener('mousemove', onMoveHands);
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
        const gameIntervalId = setInterval(() => {
            timer--;

            if (timer <= 0) {
                window.removeEventListener('mousemove', onMoveHands);
                window.requestAnimationFrame(endGameFrame);
                clearInterval(createRollIntervalId);
                clearInterval(gameIntervalId);
                rollsList.length = 0;

                gameOverHandler();
            }
        }, 1000);
    }, 1000);
}
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