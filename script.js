var cor = 'blue';
var cont = 1;
var myGamePiece;
var naveImg = document.getElementById("naveImg");

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGameArea.start();
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

    // Desenha a nave
    myGamePiece.update();
    drawNave();
}

function drawNave() {
    myGameArea.context.drawImage(naveImg, myGamePiece.x, myGamePiece.y, myGamePiece.width, myGamePiece.height);
}