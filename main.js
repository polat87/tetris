var Cell = /** @class */ (function () {
    function Cell(color, row, col) {
        this.color = color;
        this.row = row;
        this.col = col;
    }
    Cell.prototype.setColor = function (color) {
        if (color == "white") {
            var el_1 = document.getElementById(this.row + "-" + this.col);
            el_1 === null || el_1 === void 0 ? void 0 : el_1.classList.remove(this.color);
        }
        this.color = color;
        var el = document.getElementById(this.row + "-" + this.col);
        el === null || el === void 0 ? void 0 : el.classList.add(color);
    };
    return Cell;
}());
var Matrix = /** @class */ (function () {
    function Matrix() {
        this.matrix = [];
        this.initMatrix();
    }
    Matrix.prototype.initMatrix = function () {
        for (var i_1 = 0; i_1 < 20; i_1++) {
            this.matrix[i_1] = [];
            for (var j = 0; j < 10; j++)
                this.matrix[i_1][j] = new Cell("white", i_1, j);
        }
    };
    Matrix.prototype.getMatrix = function () {
        return this.matrix;
    };
    return Matrix;
}());
var Board = /** @class */ (function () {
    function Board() {
        this.matrix = new Matrix();
        this.initBoard();
    }
    Board.prototype.initBoard = function () {
        var board = document.querySelector('#board');
        for (var i_2 = 0; i_2 < 20; i_2++) {
            for (var j = 0; j < 10; j++) {
                var el = document.createElement('div');
                el.id = i_2 + "-" + j;
                el.classList.add("block");
                if (board)
                    board.appendChild(el);
            }
        }
    };
    Board.prototype.matrixAt = function (row, col) {
        return this.matrix.getMatrix()[row][col];
    };
    return Board;
}());
var board = new Board();
var i = 0;
function simulate() {
    if (i > 0)
        board.matrixAt(i - 1, 5).setColor("white");
    board.matrixAt(i, 5).setColor("red");
    i++;
}
setInterval(simulate, 1000);
