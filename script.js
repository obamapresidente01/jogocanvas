var myGamePiece;
var enemyGamePiece;
var naveImg = new Image();
naveImg.src = "nave.png";
var naveInimigaImg = new Image();
naveInimigaImg.src = "nave_inimiga.png";
var explosionImg = new Image();
explosionImg.src = "explosion.png";

var leftPressed = false;
var rightPressed = false;

var aPressed = false;
var dPressed = false;

function startGame() {
    console.log("O jogo está começando!");
    myGamePiece = new component(30, 30, naveImg, 10, 120);
    enemyGamePiece = new component(30, 30, naveInimigaImg, 440, 120);
    myGameArea.start();
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
}

var myGameArea = {
    canvas: document.getElementById("myCanvas"),
    start: function () {
        this.context = this.canvas.getContext("2d");
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        requestAnimationFrame(updateGameArea);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, image, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.image = image;
    this.update = function () {
        var ctx = myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

function updateGameArea() {
    myGameArea.clear();

    if (leftPressed && myGamePiece.x > 0) {
        myGamePiece.x -= 1;
    }
    if (rightPressed && myGamePiece.x < myGameArea.canvas.width - myGamePiece.width) {
        myGamePiece.x += 1;
    }

    if (aPressed && enemyGamePiece.x > 0) {
        enemyGamePiece.x -= 1;
    }
    if (dPressed && enemyGamePiece.x < myGameArea.canvas.width - enemyGamePiece.width) {
        enemyGamePiece.x += 1;
    }

    if (checkCollision(myGamePiece, enemyGamePiece)) {
        console.log("Colisão detectada!");
    }

    myGamePiece.update();
    enemyGamePiece.update();

    requestAnimationFrame(updateGameArea);
}

function keyDownHandler(event) {
    if (event.key === "ArrowLeft") {
        leftPressed = true;
    } else if (event.key === "ArrowRight") {
        rightPressed = true;
    } else if (event.key === "a" || event.key === "A") {
        aPressed = true;
    } else if (event.key === "d" || event.key === "D") {
        dPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.key === "ArrowLeft") {
        leftPressed = false;
    } else if (event.key === "ArrowRight") {
        rightPressed = false;
    } else if (event.key === "a" || event.key === "A") {
        aPressed = false;
    } else if (event.key === "d" || event.key === "D") {
        dPressed = false;
    }
}

function checkCollision(piece1, piece2) {
    return !(piece1.x > piece2.x + piece2.width ||
        piece1.x + piece1.width < piece2.x ||
        piece1.y > piece2.y + piece2.height ||
        piece1.y + piece1.height < piece2.y);
}
