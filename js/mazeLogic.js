let canvas;
let ctx;

/* Customized variables */
let cellSize = 50;
let mazeHeight = 8;
let mazeWidth = 8;
/* ____________________ */
let x1 = cellSize/10;
let y1 = cellSize/10;
let x2 = cellSize - (cellSize/10)*2;
let y2 = cellSize - (cellSize/10)*2;

let oppx = {"N": 0, "E": 1, "S": 0, "W": -1};
let oppy = {"N": -1, "E": 0, "S": 1, "W": 0};
let opp = {"N": "S", "E": "W", "S": "N", "W": "E"};


let maze; //do not like this
let icon; //do not like this



var finished = false;
var isFirstLoop = true;
var nextTime;
var vec = new Array();
var count = 0;

function Timer(time){

    if(!finished) {
        requestAnimationFrame(Timer);
    }

    if(isFirstLoop){
        isFirstLoop=false;
        nextTime = time;
    }
    
    let elapsedTime = time - nextTime;
    if(elapsedTime>100) {
        nextTime = time;
        maze.delWall(vec[count][0], vec[count][1], vec[count][2]);
        count++;
        if(count >= vec.length) {
            finished = true;
        }
    }
}






document.addEventListener("DOMContentLoaded", SetupCanvas);
document.addEventListener("keydown", keyHandler);

function SetupCanvas() { //main
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    canvas.height = cellSize * mazeHeight;
    canvas.width = cellSize * mazeWidth;

    requestAnimationFrame(Timer);

    /*
    maze = new Maze(mazeHeight, mazeWidth);
    maze.init();
    icon = new Icon();
    icon.init();
    */

    maze = new Maze(mazeHeight, mazeWidth);
    maze.generate();
    icon = new Icon(maze);
    icon.drawIcon();
}

/*_____________________ Classes _______________________*/
class Maze {
    constructor(height, width) {
        this.maze_height = height;
        this.maze_width = width;
        
        /* init var positions */
        /* using the x,y major order (or Column major order) != from memory and C (Row major order) */
        this.positions = [...Array(this.maze_width)].map(e => Array(this.maze_height));
        this.initPositions();

        /* init var set */
        /* put this variable set inside of kruskal algorithm method because thats the only place that this variable is used */
        this.set = [...Array(mazeWidth)].map(e => Array(mazeHeight));
        this.initSet();

        /* init var edges */
        this.edges = new Array();
        this.initEdges();
    }

    generate() {
        this.drawGrid();

        this.kruskalAlgorithm();
    }

    drawGrid() {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = "3";
        for(let i = 0; i < this.positions.length+1 ; ++i) {
            ctx.moveTo(cellSize*i, 0);
            ctx.lineTo(cellSize*i, cellSize*this.positions.length);
        }
        for(let i = 0; i < this.positions[0].length+1 ; ++i) {
            ctx.moveTo(0, cellSize*i);
            ctx.lineTo(cellSize*this.positions[0].length, cellSize*i);
        }
        ctx.stroke();
    }

    delWall(x, y, side) {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = "5";
        switch(side) { // +2 and -2 is just adjusts, nothing to do with the grid
            case "N":
                ctx.moveTo(cellSize*x  +2, cellSize*y);
                ctx.lineTo(cellSize*(x+1) -2, cellSize*y);
                break;
            case "E":
                ctx.moveTo(cellSize*(x+1), cellSize*y  +2);
                ctx.lineTo(cellSize*(x+1), cellSize*(y+1)  -2);
                break;
            case "S":
                ctx.moveTo(cellSize*x  +2, cellSize*(y+1));
                ctx.lineTo(cellSize*(x+1)  -2, cellSize*(y+1));
                break;
            case "W":
                ctx.moveTo(cellSize*x, cellSize*y  +2);
                ctx.lineTo(cellSize*x, cellSize*(y+1)  -2);
                break;
            default:
                console.log("HOW!?");
                break;
        }
        ctx.stroke();
    }

    kruskalAlgorithm() {
        let x, y, ox, oy, set1, set2;
        for(let i = 0; i < this.edges.length; ++i) {
            x = this.edges[i].x;
            y = this.edges[i].y;
            ox = this.edges[i].x + oppx[this.edges[i].dir];
            oy = this.edges[i].y + oppy[this.edges[i].dir];
    
            set1 = this.set[x][y];
            set2 = this.set[ox][oy];
            if(!(set1.connected(set2))) {
                set1.connect(set2);
                this.positions[x][y][this.edges[i].dir] = 1;
                this.positions[ox][oy][opp[this.edges[i].dir]] = 1;

                vec.push([x, y, this.edges[i].dir]);
            }
        }
    }

    checkWinner() {
        if(icon.x == this.positions.length-1 && icon.y == this.positions[0].length-1) {
            document.getElementById("win").innerHTML = "Winner";
            // pop up message: "winner"
            // delay
            // automatically closes
            /* reset */
            SetupCanvas();
        }
        else
            document.getElementById("win").innerHTML = "";
    }

    initPositions() {
        for(let i = 0; i < this.positions.length; ++i) {
            for(let j = 0; j < this.positions[i].length; ++j) {
                this.positions[i][j] = {"N": 0, "E": 0, "S": 0, "W": 0};
            }
        }
    }

    initSet() {
        for(var i = 0; i < this.set.length; ++i) {
            for(var j = 0; j < this.set[i].length; ++j) {
                this.set[i][j] = new Tree;
            }
        }
    }

    initEdges() {
        for(var i = 0; i < this.positions.length; ++i) {
            for(let j = 0; j < this.positions[i].length; ++j) {
                if(j>0) {
                    this.edges.push(new Edge(i, j, "N"));
                }
                if(i>0) {
                    this.edges.push(new Edge(i, j, "W"));
                }
            }
        }
        this.edges.shuffle();
    }
}


class Tree {
    constructor() {
        this.parent = null;
        this.rootV = null;
    }

    root() { //this recursion could be improved with "memory" of the root
        if(this.parent == null) {
            return this;
        }
        else
            return this.parent.root();
    }

    connected(tree) {
        return this.root() == tree.root();
    }

    connect(tree) {
        tree.root().parent = this.root();
    }
}


class Edge {
    constructor(x, y, dir) {
        this.x = x;
        this.y = y;
        this.dir = dir;
    }
}


class Icon {
    constructor(myMaze) {
        this.x = 0;
        this.y = 0;
        this.myMaze = myMaze;
    }

    moveIcon() {
        ctx.fillStyle = "black";
        ctx.fillRect(x1, y1, x2, y2);
    }

    drawIcon() {
        ctx.fillStyle = "black";
        ctx.fillRect(x1+cellSize*this.x, y1+cellSize*this.y, x2, y2);

        ctx.fillStyle = "blue";
        ctx.fillRect(x1, y1+cellSize, x2, y2);
    }

    deleteIcon() {
        ctx.fillStyle = "white";
        ctx.fillRect(x1+cellSize*this.x, y1+cellSize*this.y, x2, y2);
    }

    move(dir){
        if(this.myMaze.positions[this.x][this.y][dir]) {
            this.deleteIcon();
            this.x += oppx[dir];
            this.y += oppy[dir];
            this.drawIcon();
            this.myMaze.checkWinner();
            finished = false;
        }
    }
}

/*_____________________ Functions _______________________*/
Array.prototype.shuffle = function() {
    let m = this.length;
    let i;
    while(m) {
      i = (Math.random() * m--) >>> 0;
      [this[m], this[i]] = [this[i], this[m]]
    }
    return this;
}


function keyHandler(e) {
    switch (e.keyCode) {
        case 37: //left
            icon.move("W");
            break;
        case 38: //up
            icon.move("N");
            break;
        case 39: //right
            icon.move("E");
            break;
        case 40: //down
            icon.move("S");
            break;
        default:
            //console.log("No function for that key");
            break;
    }
};