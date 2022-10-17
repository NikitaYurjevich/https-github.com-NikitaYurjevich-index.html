// ROLLS

const ROLL_POSITIONS_LEFT_X = {
    first: canvas.width / 50,
    second: canvas.width / 11.5,
    third: canvas.width / 6.5,
}
const ROLL_POSITIONS_RIGHT_X = {
    first: canvas.width - ROLL_POSITIONS_LEFT_X.first - ROLL_SIZE,
    second: canvas.width - ROLL_POSITIONS_LEFT_X.second - ROLL_SIZE,
    third: canvas.width - ROLL_POSITIONS_LEFT_X.third - ROLL_SIZE,
}
const ROLL_POSITIONS_TOP_Y = {
    first: canvas.height / 4,
    second: canvas.height / 3.75,
    third: canvas.height / 3.45,
}
const ROLL_POSITIONS_BOTTOM_Y = {
    first: canvas.height / 1.66,
    second: canvas.height / 1.6,
    third: canvas.height / 1.55,
}

const ROLLS_POSITIONS = {
    topLeft: {
        id: 'topLeft',
        first: {x: ROLL_POSITIONS_LEFT_X.first, y: ROLL_POSITIONS_TOP_Y.first},
        second: {x: ROLL_POSITIONS_LEFT_X.second, y: ROLL_POSITIONS_TOP_Y.second},
        third: {x: ROLL_POSITIONS_LEFT_X.third, y: ROLL_POSITIONS_TOP_Y.third},
    },
    topRight: {
        id: 'topRight',
        first: {x: ROLL_POSITIONS_RIGHT_X.first, y: ROLL_POSITIONS_TOP_Y.first},
        second: {x: ROLL_POSITIONS_RIGHT_X.second, y: ROLL_POSITIONS_TOP_Y.second},
        third: {x: ROLL_POSITIONS_RIGHT_X.third, y: ROLL_POSITIONS_TOP_Y.third},
    },
    bottomRight: {
        id: 'bottomRight',
        first: {x: ROLL_POSITIONS_RIGHT_X.first, y: ROLL_POSITIONS_BOTTOM_Y.first},
        second: {x: ROLL_POSITIONS_RIGHT_X.second, y: ROLL_POSITIONS_BOTTOM_Y.second},
        third: {x: ROLL_POSITIONS_RIGHT_X.third, y: ROLL_POSITIONS_BOTTOM_Y.third},
    },
    bottomLeft: {
        id: 'bottomLeft',
        first: {x: ROLL_POSITIONS_LEFT_X.first, y: ROLL_POSITIONS_BOTTOM_Y.first},
        second: {x: ROLL_POSITIONS_LEFT_X.second, y: ROLL_POSITIONS_BOTTOM_Y.second},
        third: {x: ROLL_POSITIONS_LEFT_X.third, y: ROLL_POSITIONS_BOTTOM_Y.third},
    },
}
const rollsList = [];

function* rollSteps(position) {
    yield position.first;
    yield position.second;
    return position.third;
}

function createRoll() {
    const random = Math.round(Math.random() * 100);
    let rollPosition;

    if (random % 2 === 0) {
        if (random >= 50) {
            rollPosition = ROLLS_POSITIONS.topLeft;
        } else {
            rollPosition = ROLLS_POSITIONS.topRight;
        }
    } else {
        if (random <= 50) {
            rollPosition = ROLLS_POSITIONS.bottomLeft;
        } else {
            rollPosition = ROLLS_POSITIONS.bottomRight;
        }
    }
    const generator = rollSteps(rollPosition);
    const firstStep = generator.next();
    const id = new Date().getMilliseconds().toString();
    rollsList.push({
        id,
        step: firstStep.value,
    });
    window.requestAnimationFrame(gameFrame);
    const intervalId = setInterval(() => {
        if (timer <= 0) {
            clearInterval(intervalId);
        } else {
            const nextStep = generator.next();
            if (nextStep.done) {
                rollsList.find(roll => roll.id === id).step = nextStep.value;
                clearInterval(intervalId);

                setTimeout(() => {
                    const rollIndex = rollsList.findIndex(roll => roll.id === id);
                    rollsList.splice(rollIndex, 1);
                    addScore(rollPosition.id);
                }, ROLL_MOVING_SPEED);
            } else {
                rollsList.find(roll => roll.id === id).step = nextStep.value;
            }
            window.requestAnimationFrame(gameFrame);
        }
    }, ROLL_MOVING_SPEED);
}
// ROLLS

const ROLL_POSITIONS_LEFT_X = {
    first: canvas.width / 50,
    second: canvas.width / 11.5,
    third: canvas.width / 6.5,
}
const ROLL_POSITIONS_RIGHT_X = {
    first: canvas.width - ROLL_POSITIONS_LEFT_X.first - ROLL_SIZE,
    second: canvas.width - ROLL_POSITIONS_LEFT_X.second - ROLL_SIZE,
    third: canvas.width - ROLL_POSITIONS_LEFT_X.third - ROLL_SIZE,
}
const ROLL_POSITIONS_TOP_Y = {
    first: canvas.height / 4,
    second: canvas.height / 3.75,
    third: canvas.height / 3.45,
}
const ROLL_POSITIONS_BOTTOM_Y = {
    first: canvas.height / 1.66,
    second: canvas.height / 1.6,
    third: canvas.height / 1.55,
}

const ROLLS_POSITIONS = {
    topLeft: {
        id: 'topLeft',
        first: {x: ROLL_POSITIONS_LEFT_X.first, y: ROLL_POSITIONS_TOP_Y.first},
        second: {x: ROLL_POSITIONS_LEFT_X.second, y: ROLL_POSITIONS_TOP_Y.second},
        third: {x: ROLL_POSITIONS_LEFT_X.third, y: ROLL_POSITIONS_TOP_Y.third},
    },
    topRight: {
        id: 'topRight',
        first: {x: ROLL_POSITIONS_RIGHT_X.first, y: ROLL_POSITIONS_TOP_Y.first},
        second: {x: ROLL_POSITIONS_RIGHT_X.second, y: ROLL_POSITIONS_TOP_Y.second},
        third: {x: ROLL_POSITIONS_RIGHT_X.third, y: ROLL_POSITIONS_TOP_Y.third},
    },
    bottomRight: {
        id: 'bottomRight',
        first: {x: ROLL_POSITIONS_RIGHT_X.first, y: ROLL_POSITIONS_BOTTOM_Y.first},
        second: {x: ROLL_POSITIONS_RIGHT_X.second, y: ROLL_POSITIONS_BOTTOM_Y.second},
        third: {x: ROLL_POSITIONS_RIGHT_X.third, y: ROLL_POSITIONS_BOTTOM_Y.third},
    },
    bottomLeft: {
        id: 'bottomLeft',
        first: {x: ROLL_POSITIONS_LEFT_X.first, y: ROLL_POSITIONS_BOTTOM_Y.first},
        second: {x: ROLL_POSITIONS_LEFT_X.second, y: ROLL_POSITIONS_BOTTOM_Y.second},
        third: {x: ROLL_POSITIONS_LEFT_X.third, y: ROLL_POSITIONS_BOTTOM_Y.third},
    },
}
const rollsList = [];

function* rollSteps(position) {
    yield position.first;
    yield position.second;
    return position.third;
}

function createRoll() {
    const random = Math.round(Math.random() * 100);
    let rollPosition;

    if (random % 2 === 0) {
        if (random >= 50) {
            rollPosition = ROLLS_POSITIONS.topLeft;
        } else {
            rollPosition = ROLLS_POSITIONS.topRight;
        }
    } else {
        if (random <= 50) {
            rollPosition = ROLLS_POSITIONS.bottomLeft;
        } else {
            rollPosition = ROLLS_POSITIONS.bottomRight;
        }
    }
    const generator = rollSteps(rollPosition);
    const firstStep = generator.next();
    const id = new Date().getMilliseconds().toString();
    rollsList.push({
        id,
        step: firstStep.value,
    });
    window.requestAnimationFrame(gameFrame);
    const intervalId = setInterval(() => {
        if (timer <= 0) {
            clearInterval(intervalId);
        } else {
            const nextStep = generator.next();
            if (nextStep.done) {
                rollsList.find(roll => roll.id === id).step = nextStep.value;
                clearInterval(intervalId);

                setTimeout(() => {
                    const rollIndex = rollsList.findIndex(roll => roll.id === id);
                    rollsList.splice(rollIndex, 1);
                    addScore(rollPosition.id);
                }, ROLL_MOVING_SPEED);
            } else {
                rollsList.find(roll => roll.id === id).step = nextStep.value;
            }
            window.requestAnimationFrame(gameFrame);
        }
    }, ROLL_MOVING_SPEED);
}
