var canvas;
var ctx;
var x1 = 5;
var y1 = 5;
var x2 = 50;
var y2 = 50;


document.addEventListener("DOMContentLoaded", SetupCanvas);

function SetupCanvas() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    canvas.width = 555;
    canvas.height = 555;

    ctx.fillStyle = 'black';
    ctx.fillRect(x1, y1, x2, y2);
    ctx.fillStyle = 'blue';
    ctx.fillRect(x1, y1+55, x2, y2);
}

document.addEventListener('keydown', keyHandler);

function keyHandler(e) {
    console.log("e.keyCode = " + e.keyCode);
    switch (e.keyCode) {
        case 37:
            console.log('left');
            deleteIcon();
            x1 -= 55;
            if(hitWall()) {
                x1 += 55;
            }
            moveIcon();
            break;
        case 38:
            console.log('up');
            deleteIcon();
            y1 -= 55;
            if(hitWall()) {
                y1 += 55;
            }
            moveIcon();
            break;
        case 39:
            console.log('right');
            deleteIcon();
            x1 += 55;
            if(hitWall()) {
                x1 -= 55;
            }
            moveIcon();
            break;
        case 40:
            console.log('down');
            deleteIcon();
            y1 += 55;
            if(hitWall()) {
                y1 -= 55;
            }
            moveIcon();
            break;
        default:
            console.log("No function for that key");
            break;
    }
};


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