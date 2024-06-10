var cor = 'blue';
var cont = 1;
var myGamePiece;
var enemyGamePiece;
var naveImg = document.getElementById("naveImg");
var naveInimigaImg = document.getElementById("naveInimigaImg");
var explosionImg = document.getElementById("explosionImg");

var explosionFrame = 0;
var isExplosion = false;
var explosionFrameWidth = 64;  // Largura de cada quadro da explosão
var explosionFrameHeight = 64; // Altura de cada quadro da explosão
var totalExplosionFrames = 16; // Número total de quadros na imagem de explosão

// Variáveis para armazenar se as teclas de seta estão pressionadas
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

// Variáveis para armazenar se as teclas A, W, S, D estão pressionadas
var wPressed = false;
var aPressed = false;
var sPressed = false;
var dPressed = false;

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    enemyGamePiece = new component(30, 30, "blue", 440, 120);
    myGameArea.start();
    // Adiciona manipuladores de eventos para as teclas de seta
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
}

var myGameArea = {
    canvas: document.getElementById("myCanvas"),
    start: function () {
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        requestAnimationFrame(updateGameArea);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
    this.update = function () {
        var ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function updateGameArea() {
    myGameArea.clear();

    if (isExplosion) {
        // Desenha a explosão
        drawExplosion();
    } else {
        // Movimenta a nave de acordo com as teclas pressionadas
        if (upPressed && myGamePiece.y > 0) {
            myGamePiece.y -= 1;
        }
        if (downPressed && myGamePiece.y < myGameArea.canvas.height - myGamePiece.height) {
            myGamePiece.y += 1;
        }
        if (leftPressed && myGamePiece.x > 0) {
            myGamePiece.x -= 1;
        }
        if (rightPressed && myGamePiece.x < myGameArea.canvas.width - myGamePiece.width) {
            myGamePiece.x += 1;
        }

        // Movimenta a nave inimiga de acordo com as teclas pressionadas
        if (wPressed && enemyGamePiece.y > 0) {
            enemyGamePiece.y -= 1;
        }
        if (sPressed && enemyGamePiece.y < myGameArea.canvas.height - enemyGamePiece.height) {
            enemyGamePiece.y += 1;
        }
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
    }

    // Solicita o próximo quadro de animação
    requestAnimationFrame(updateGameArea);
}

function drawNave() {
    myGameArea.context.drawImage(naveImg, myGamePiece.x, myGamePiece.y, myGamePiece.width, myGamePiece.height);
}

function drawNaveInimiga() {
    myGameArea.context.drawImage(naveInimigaImg, enemyGamePiece.x, enemyGamePiece.y, enemyGamePiece.width, enemyGamePiece.height);
}

function drawExplosion() {
    var ctx = myGameArea.context;
    var sx = explosionFrame * explosionFrameWidth;
    var sy = 0;
    ctx.drawImage(explosionImg, sx, sy, explosionFrameWidth, explosionFrameHeight, (myGamePiece.x + enemyGamePiece.x) / 2, (myGamePiece.y + enemyGamePiece.y) / 2, explosionFrameWidth, explosionFrameHeight);
    explosionFrame++;
    if (explosionFrame >= totalExplosionFrames) {
        // Reinicia a animação e as naves após a explosão
        isExplosion = false;
        explosionFrame = 0;
        myGamePiece = new component(30, 30, "red", 10, 120);
        enemyGamePiece = new component(30, 30, "blue", 440, 120);
    }
}

// Manipuladores de eventos para teclas de seta e teclas A, W, S, D
function keyDownHandler(event) {
    if (event.key == "ArrowUp") {
        upPressed = true;
    } else if (event.key == "ArrowDown") {
        downPressed = true;
    } else if (event.key == "ArrowLeft") {
        leftPressed = true;
    } else if (event.key == "ArrowRight") {
        rightPressed = true;
    } else if (event.key == "w" || event.key == "W") {
        wPressed = true;
    } else if (event.key == "a" || event.key == "A") {
        aPressed = true;
    } else if (event.key == "s" || event.key == "S") {
        sPressed = true;
    } else if (event.key == "d" || event.key == "D") {
        dPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.key == "ArrowUp") {
        upPressed = false;
    } else if (event.key == "ArrowDown") {
        downPressed = false;
    } else if (event.key == "ArrowLeft") {
        leftPressed = false;
    } else if (event.key == "ArrowRight") {
        rightPressed = false;
    } else if (event.key == "w" || event.key == "W") {
        wPressed = false;
    } else if (event.key == "a" || event.key == "A") {
        aPressed = false;
    } else if (event.key == "s" || event.key == "S") {
        sPressed = false;
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
