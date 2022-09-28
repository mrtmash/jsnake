const canvas = document.getElementById('baseCV');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snakeSize = 10;
const appleSize = 40;
const snakeArr = [];
const snakeSpd = {x: 0, y: 0};
const apple = {x: 0, y: 0};
const speed = 5;
var isApple = false;

class Snake {
    constructor() {
        if (snakeArr == 0) {
            this.x = canvas.width/2;
            this.y = canvas.height/2;
            this.posX;
            this.posY;
        } else {
            this.x = snakeArr[snakeArr.length-1].posX;
            this.y = snakeArr[snakeArr.length-1].posY;
            this.posX;
            this.posY;
        }
    }
    plupdate() {
        this.posX = this.x;
        this.posY = this.y;
        this.x += snakeSpd.x;
        this.y += snakeSpd.y;
    }
    update(xps, yps) {
        this.posX = this.x;
        this.posY = this.y;
        this.x = xps;
        this.y = yps;
    }
    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, snakeSize, snakeSize);
    }
}

function handleApple() {
    if (!isApple) {
        apple.x = Math.random()*canvas.width+1;
        apple.y = Math.random()*canvas.height+1;
        ctx.fillStyle = 'red';
        ctx.fillRect(apple.x, apple.y, appleSize, appleSize);
        isApple = true;
    } else {
        ctx.fillStyle = 'red';
        ctx.fillRect(apple.x, apple.y, appleSize, appleSize);
        isApple = true;
    }
    if (!(snakeArr[0].x > apple.x+appleSize || apple.x > snakeArr[0].x+snakeSize || snakeArr[0].y > apple.y+appleSize || apple.y > snakeArr[0].y+snakeSize)) {
        isApple = false;
        snakeArr.push(new Snake);
    }
}

function handleSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (a = 0; a < snakeArr.length; a++) {
        if (a == 0) {
            snakeArr[a].plupdate();
            snakeArr[a].draw();
        } else {
            snakeArr[a].update(snakeArr[a-1].posX, snakeArr[a-1].posY);
            snakeArr[a].draw();
        }
        if (snakeArr[a].x < 0) {
            snakeArr[a].x = canvas.width;
        } else if (snakeArr[a].x > canvas.width) {
            snakeArr[a].x = 0;
        }
        if (snakeArr[a].y < 0) {
            snakeArr[a].y = canvas.height;
        } else if ( snakeArr[a].y > canvas.height) {
            snakeArr[a].y = 0;
        }
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('touchstart', (data) => {
    if (data.changedTouches[0].pageX < canvas.width/2 && data.changedTouches[0].pageY > canvas.width/2) {
        snakeSpd.x = 0;
        snakeSpd.y = -speed;
    } else if (data.changedTouches[0].pageX > canvas.width/2 && data.changedTouches[0].pageY > canvas.width/2) {
        snakeSpd.x = 0;
        snakeSpd.y = speed;
    } else if (data.changedTouches[0].pageX < canvas.width/2 && data.changedTouches[0].pageY < canvas.width/2) {
        snakeSpd.x = -speed;
        snakeSpd.y = 0;
    } else if (data.changedTouches[0].pageX > canvas.width/2 && data.changedTouches[0].pageY < canvas.width/2) {
        snakeSpd.x = speed;
        snakeSpd.y = 0;
    }
});

window.addEventListener('keypress', (data) => {
    switch (data.key) {
        case 'w':
            snakeSpd.x = 0;
            snakeSpd.y = -speed;
            break;
        case 'a':
            snakeSpd.x = -speed;
            snakeSpd.y = 0;
            break;
        case 's':
            snakeSpd.x = 0;
            snakeSpd.y = speed;
            break;
        case 'd':
            snakeSpd.x = speed;
            snakeSpd.y = 0;
            break;
    }
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleSnake();
    handleApple();
    requestAnimationFrame(gameLoop);
}

snakeArr.push(new Snake);
gameLoop();