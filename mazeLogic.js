let canvas;
let ctx;
let mazeHeight = 10;
let mazeWidth = 10;
let x1 = 2;
let y1 = 2;
let x2 = 50;
let y2 = 50;
let positions = new Array(mazeHeight); // = [...Array(mazeHeight)].map(e => Array(mazeWidth).fill(0));
let maze; //do not like this
let icon; //do not like this



document.addEventListener("DOMContentLoaded", SetupCanvas);

function SetupCanvas() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    canvas.height = 700;
    canvas.width = 549;

    //var maze = new Maze(mazeHeight, mazeWidth);
    icon = new Icon();

    //maze
    initPos();
    drawGrid();

    debugFunc();
}

/*_____________________ Classes _______________________*/
class Maze {
    constructor() {
        // generate walls
            //
        // draw walls
            // go to each position
            // draw the walls for that position
    }

    //generate walls

    //draw walls
}

class Icon {
    constructor() {
        this.x = 0;
        this.y = 0;

        ctx.fillStyle = 'black';
        ctx.fillRect(x1, y1, x2, y2);

        ctx.fillStyle = 'blue';
        ctx.fillRect(x1, y1+55, x2, y2);
    }

    moveIcon() {
        ctx.fillStyle = 'black';
        ctx.fillRect(x1, y1, x2, y2);
    }

    deleteIcon() {
        ctx.fillStyle = 'white';
        ctx.fillRect(x1, y1, x2, y2);
    }

    moveLeft() {
        if(this.x!=0 && positions[this.x][this.y][0]) {
            --this.x;
            this.deleteIcon();
            x1 -= 55;
            this.moveIcon();
        }
    }

    moveUp() {
        if(this.y!=0 && positions[this.x][this.y][1]) {
            --this.y;
            this.deleteIcon();
            y1 -= 55;
            this.moveIcon();
        }
    }

    moveRight() {
        if(this.x!=mazeWidth-1 && positions[this.x][this.y][2]) {
            ++this.x;
            this.deleteIcon();
            x1 += 55;
            this.moveIcon();
        }
    }

    moveDown() {
        if(this.y!=mazeHeight-1 && positions[this.x][this.y][3]) {
            ++this.y;
            this.deleteIcon();
            y1 += 55;
            this.moveIcon();
        }
    }
    //moveLeft, moveUp, moveRight, moveDown   needs to be refactored later...
}

/*_____________________ Functions _______________________*/
function initPos() {
    for(var i = 0; i < mazeHeight; ++i) {
        positions[i] = new Array(mazeWidth);
        for(var j = 0; j < mazeWidth; ++j) {
            positions[i][j] = [1, 1, 1, 1]; //can be a class position/house/square for more infos (special positions for more time)
        }
    }
}

/*
function drawIcon() {
    ctx.fillStyle = 'black';
    ctx.fillRect(x1, y1, x2, y2);
    ctx.fillStyle = 'blue';
    ctx.fillRect(x1, y1+55, x2, y2);
}

function deleteIcon() {
    ctx.fillStyle = 'white';
    ctx.fillRect(x1, y1, x2, y2);
}

function moveIcon() {
    ctx.fillStyle = 'black';
    ctx.fillRect(x1, y1, x2, y2);
}

function hitWall() {
    if(x1 < 0 || y1 < 0 || x2 < 0 || y2 < 0 || x1 > 505 || y1 > 505 || x2 > 505 || y2 > 505 ) {
        return true;
    }
    return false;
}
*/

function drawGrid() {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = '3';
    for(var i = 0; i < mazeHeight; i++) {
        ctx.moveTo(55+i*55, 0);
        ctx.lineTo(55+i*55, 555);
    }
    for(var i = 0; i < mazeWidth; i++) {
        ctx.moveTo(0, 55+i*55, 0);
        ctx.lineTo(555, 55+i*55);
    }
    ctx.stroke();
}


function debugFunc() {

    /*for(var i = 0; i < positions.length; ++i) {
        pos2[i] = new Array();
        for(var j = 0; j < positions[i].length; ++j) {
            pos2[i][j] = [...positions[i][j]];
        }
    }*/
}


document.addEventListener('keydown', keyHandler);

function keyHandler(e) {
    console.log("e.keyCode = " + e.keyCode);
    switch (e.keyCode) {
        case 37:
            console.log('left');
            icon.moveLeft();
            break;
        case 38:
            console.log('up');
            icon.moveUp();
            break;
        case 39:
            console.log('right');
            icon.moveRight();
            break;
        case 40:
            console.log('down');
            icon.moveDown();
            break;
        default:
            console.log("No function for that key");
            break;
    }
};