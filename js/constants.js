const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = document.body.clientWidth;
const height = document.body.clientHeight;
canvas.width = width;
canvas.height = height;

const GAME_DURATION = 10000;
let SCORES_TO_WIN = 5;

const MAX_HANDS_HEIGHT = 250;

const MIN_POSITION_HEIGHT = 200;
const POSITION_SIZE = canvas.width / 6.5;
// const actualHeight = POSITION_SIZE > MIN_POSITION_HEIGHT ? POSITION_SIZE : MIN_POSITION_HEIGHT
const actualHeight = canvas.height / 3.7;
const LEFT_POSITIONS_X = canvas.width * 0.18;
const RIGHT_POSITIONS_X = canvas.width - LEFT_POSITIONS_X - POSITION_SIZE;
const TOP_POSITIONS_Y = canvas.height / 2.8;
const BOTTOM_POSITIONS_Y = canvas.height / 1.4;

const MIN_ROLL_SIZE = 40;
let ROLL_SIZE = canvas.width / 29 > MIN_ROLL_SIZE ? canvas.width / 29 : MIN_ROLL_SIZE;
const ROLL_MOVING_SPEED = 500;
const ROLL_CREATING_SPEED = 800;
