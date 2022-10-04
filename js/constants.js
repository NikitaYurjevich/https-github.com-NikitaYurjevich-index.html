const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = document.body.clientWidth;
const height = document.body.clientHeight;
canvas.width = width;
canvas.height = height;

const GAME_DURATION = 10000;
const ROLL_SIZE = canvas.width / 29;
const ROLL_MOVING_SPEED = 500;
const ROLL_CREATING_SPEED = 800;
let SCORES_TO_WIN = 5;
