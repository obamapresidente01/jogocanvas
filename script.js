var myGamePiece;
var enemyGamePiece;
var naveImg = document.getElementById("naveImg");
var naveInimigaImg = document.getElementById("naveInimigaImg");
var explosionImg = document.getElementById("explosionImg");

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

var aPressed = false;
var dPressed = false;

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    enemyGamePiece = new component(30, 30, "blue", 440, 120);
    myGameArea.start();
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
}

var myGameArea = {
    canvas: document.getElementById("myCanvas"),
    start: function () {
        this.context = this.canvas.getContext("2d");
        requestAnimationFrame(updateGameArea);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
}

function updateGameArea() {
    myGameArea.clear();

    // Movimenta a nave de acordo com as teclas pressionadas
    if (leftPressed && myGamePiece.x > 0) {
        myGamePiece.x -= 1;
    }
    if (rightPressed && myGamePiece.x < myGameArea.canvas.width - myGamePiece.width) {
        myGamePiece.x += 1;
    }

    // Movimenta a nave inimiga de acordo com as teclas pressionadas
    if (aPressed && enemyGamePiece.x > 0) {
        enemyGamePiece.x -= 1;
    }
    if (dPressed && enemyGamePiece.x < myGameArea.canvas.width - enemyGamePiece.width) {
        enemyGamePiece.x += 1;
    }

    // Verifica colisão
    if (checkCollision(myGamePiece, enemyGamePiece)) {
        // Colisão detectada, inicia a explosão
        isExplosion = true;
    }

    // Desenha as naves
    drawNave();
    drawNaveInimiga();

    // Solicita o próximo quadro de animação
    requestAnimationFrame(updateGameArea);
}

function drawNave() {
    var ctx = myGameArea.context;
    ctx.fillStyle = myGamePiece.color;
    ctx.fillRect(myGamePiece.x, myGamePiece.y, myGamePiece.width, myGamePiece.height);
}

function drawNaveInimiga() {
    var ctx = myGameArea.context;
    ctx.fillStyle = enemyGamePiece.color;
    ctx.fillRect(enemyGamePiece.x, enemyGamePiece.y, enemyGamePiece.width, enemyGamePiece.height);
}

function keyDownHandler(event) {
    if (event.key == "ArrowLeft") {
        leftPressed = true;
    } else if (event.key == "ArrowRight") {
        rightPressed = true;
    } else if (event.key == "a" || event.key == "A") {
        aPressed = true;
    } else if (event.key == "d" || event.key == "D") {
        dPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.key == "ArrowLeft") {
        leftPressed = false;
    } else if (event.key == "ArrowRight") {
        rightPressed = false;
    } else if (event.key == "a" || event.key == "A") {
        aPressed = false;
    } else if (event.key == "d" || event.key == "D") {
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
    // Implemente a função drawExplosion aqui
}
a