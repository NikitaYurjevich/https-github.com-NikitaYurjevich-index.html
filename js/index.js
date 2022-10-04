let handsLeft, handsRight, decorations, roll;
let actualHands;
const loadImage = url => {
    const image = new Image();
    image.src = url;
    return image
}

// HANDS
let handsHeight = canvas.width / 3;
const MAX_HANDS_HEIGHT = 250;
if (handsHeight > MAX_HANDS_HEIGHT) {
    handsHeight = MAX_HANDS_HEIGHT;
}

const POSITION_SIZE = canvas.width / 5;
const LEFT_POSITIONS_X = canvas.width * 0.18;
const RIGHT_POSITIONS_X = canvas.width - LEFT_POSITIONS_X - POSITION_SIZE;
const TOP_POSITIONS_Y = canvas.height / 2.8;
const BOTTOM_POSITIONS_Y = canvas.height / 1.4;

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
    handsLeft = loadImage('/img/hands_left.png');
    handsRight = loadImage('/img/hands_right.png');
    decorations = loadImage('/img/decorations.png');
    roll = loadImage('/img/roll.png');
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
    ctx.fillRect(canvas.width / 4, 0, canvas.width / 2, 100);
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

// GAME
const gameFrame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // BACKGROUND
    ctx.fillStyle = '#404853';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // DRAW SPRITES
    if (actualHands) {
        ctx.drawImage(actualHands, handsCurrentPosition.x, handsCurrentPosition.y, handsHeight * 0.8, handsHeight);
        ctx.drawImage(decorations, -canvas.width * 0.2, canvas.height / 4, canvas.width * 1.4, canvas.height / 2);
    }

    // const padding = 50;
    //
    // ctx.strokeStyle = "white";
    // ctx.strokeRect(LEFT_POSITIONS_X - padding / 2, TOP_POSITIONS_Y - padding / 2, POSITION_SIZE + padding, POSITION_SIZE + padding);
    // ctx.strokeRect(LEFT_POSITIONS_X - padding / 2, BOTTOM_POSITIONS_Y - padding / 2, POSITION_SIZE + padding, POSITION_SIZE + padding);
    // ctx.strokeRect(RIGHT_POSITIONS_X - padding / 2, TOP_POSITIONS_Y - padding / 2, POSITION_SIZE + padding, POSITION_SIZE + padding);
    // ctx.strokeRect(RIGHT_POSITIONS_X - padding / 2, BOTTOM_POSITIONS_Y - padding / 2, POSITION_SIZE + padding, POSITION_SIZE + padding);
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

    // DRAW ROLLS
    rollsList.forEach((rollItem) => {
        ctx.drawImage(roll, rollItem.step.x, rollItem.step.y, ROLL_SIZE, ROLL_SIZE);
    })

    getScoreboard();
    getTimer();
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
        actualHands = handsLeft;
        window.addEventListener('mousemove', onMoveHands);
        const createRollIntervalId = setInterval(() => {
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
    const padding = 50;
    if (e.clientX > LEFT_POSITIONS_X - padding && e.clientX < LEFT_POSITIONS_X + POSITION_SIZE + padding) {
        if (e.clientY > TOP_POSITIONS_Y  - padding && e.clientY < TOP_POSITIONS_Y + POSITION_SIZE + padding) {
            actualHands = handsLeft;
            handsCurrentPosition = HANDS_POSITIONS.topLeft;
        } else if(e.clientY > BOTTOM_POSITIONS_Y - padding && e.clientY < BOTTOM_POSITIONS_Y + POSITION_SIZE + padding) {
            actualHands = handsLeft;
            handsCurrentPosition = HANDS_POSITIONS.bottomLeft;
        }
    } else if (e.clientX > RIGHT_POSITIONS_X - padding && e.clientX < RIGHT_POSITIONS_X + POSITION_SIZE + padding) {
        if (e.clientY > TOP_POSITIONS_Y - padding && e.clientY < TOP_POSITIONS_Y + POSITION_SIZE + padding) {
            actualHands = handsRight;
            handsCurrentPosition = HANDS_POSITIONS.topRight;
        } else if(e.clientY > BOTTOM_POSITIONS_Y - padding && e.clientY < BOTTOM_POSITIONS_Y + POSITION_SIZE + padding) {
            handsCurrentPosition = HANDS_POSITIONS.bottomRight;
            actualHands = handsRight;
        }
    }
    window.requestAnimationFrame(gameFrame);
}
