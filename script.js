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

var isExplosion = false;
var explosionFrame = 0;
var explosionFrameWidth = 170.67; // Tamanho do quadro individual da explosão
var explosionFrameHeight = 192;
var explosionRenderWidth = 64;
var explosionRenderHeight = 64;
var totalExplosionFrames = 6;
var framesPerRow = 3;

function startGame() {
    console.log("O jogo está começando!");
    myGamePiece = new component(50, 50, naveImg, 225, 900); // Nave do jogador na parte inferior
    enemyGamePiece = new component(50, 50, naveInimigaImg, 225, 0); // Nave inimiga na parte superior
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

    if (isExplosion) {
        drawExplosion();
    } else {
        if (leftPressed && myGamePiece.x > 0) {
            myGamePiece.x -= 5; // Movendo mais rápido
        }
        if (rightPressed && myGamePiece.x < myGameArea.canvas.width - myGamePiece.width) {
            myGamePiece.x += 5; // Movendo mais rápido
        }

        if (aPressed && enemyGamePiece.x > 0) {
            enemyGamePiece.x -= 2; // Movendo mais devagar
        }
        if (dPressed && enemyGamePiece.x < myGameArea.canvas.width - enemyGamePiece.width) {
            enemyGamePiece.x += 2; // Movendo mais devagar
        }

        if (checkCollision(myGamePiece, enemyGamePiece)) {
            isExplosion = true;
            explosionFrame = 0;
        }

        myGamePiece.update();
        enemyGamePiece.update();
    }

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

function drawExplosion() {
    var ctx = myGameArea.context;
    var sx = (explosionFrame % framesPerRow) * explosionFrameWidth;
    var sy = Math.floor(explosionFrame / framesPerRow) * explosionFrameHeight;
    var x = ((myGamePiece.x + myGamePiece.width / 2) + (enemyGamePiece.x + enemyGamePiece.width / 2)) / 2 - explosionRenderWidth / 2;
    var y = ((myGamePiece.y + myGamePiece.height / 2) + (enemyGamePiece.y + enemyGamePiece.height / 2)) / 2 - explosionRenderHeight / 2;

    ctx.drawImage(explosionImg, sx, sy, explosionFrameWidth, explosionFrameHeight, x, y, explosionRenderWidth, explosionRenderHeight);

    explosionFrame++;
    if (explosionFrame >= totalExplosionFrames) {
        isExplosion = false;
        myGamePiece = new component(50, 50, naveImg, 225, 900); // Reposiciona a nave do jogador
        enemyGamePiece = new component(50, 50, naveInimigaImg, 225, 0); // Reposiciona a nave inimiga
    }
}
