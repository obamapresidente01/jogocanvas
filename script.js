var cor = 'blue';
var cont = 1;
var myGamePiece;
var naveImg = document.getElementById("naveImg");

// Variáveis para armazenar se as teclas de seta estão pressionadas
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGameArea.start();
    // Adiciona manipuladores de eventos para as teclas de seta
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
}

var myGameArea = {
    canvas: document.getElementById("myCanvas"),
    start: function () {
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
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
    this.color;
    this.update = function () {
        ctx = myGameArea.context;
        if (cont % 10 == 0)
            cor = 'red';
        else
            cor = 'blue';
        ctx.fillStyle = cor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        cont++;
    }
}

function updateGameArea() {
    myGameArea.clear();

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

    // Desenha a nave
    drawNave();
}

function drawNave() {
    myGameArea.context.drawImage(naveImg, myGamePiece.x, myGamePiece.y, myGamePiece.width, myGamePiece.height);
}

// Manipuladores de eventos para teclas de seta
function keyDownHandler(event) {
    if (event.key == "ArrowUp") {
        upPressed = true;
    } else if (event.key == "ArrowDown") {
        downPressed = true;
    } else if (event.key == "ArrowLeft") {
        leftPressed = true;
    } else if (event.key == "ArrowRight") {
        rightPressed = true;
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
    }
}
