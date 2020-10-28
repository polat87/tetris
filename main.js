var Square = /** @class */ (function () {
    function Square(row, col) {
        this.row = row;
        this.col = col;
    }
    Square.prototype.getRow = function () { return this.row; };
    Square.prototype.getCol = function () { return this.col; };
    Square.prototype.setRow = function (row) { this.row = row; };
    Square.prototype.setCol = function (col) { this.col = col; };
    return Square;
}());
var StraightTetromino = /** @class */ (function () {
    function StraightTetromino(board) {
        this.squares = [];
        this.board = board;
        for (var i = 0; i < 4; i++) {
            this.squares[i] = new Square(0, 3 + i);
            /*             this.squares[i] = new Square(0, 4);
                        this.squares[i] = new Square(0, 5);
                        this.squares[i] = new Square(0, 6);
             */ }
    }
    StraightTetromino.prototype.fall = function () {
        this.squares.forEach(function (sq) {
            board.matrixAt(sq.getRow(), sq.getCol()).setColor("red");
            if (sq.getRow() > 0) {
                //                    console.log("TEST-> ", sq.getRow()-1, sq.getCol())
                board.matrixAt(sq.getRow() - 1, sq.getCol()).setColor("white");
            }
            sq.setRow(sq.getRow() + 1);
        });
    };
    StraightTetromino.prototype.rotate = function () { };
    StraightTetromino.prototype.left = function () { };
    StraightTetromino.prototype.right = function () { };
    return StraightTetromino;
}());
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
        for (var i = 0; i < 20; i++) {
            this.matrix[i] = [];
            for (var j = 0; j < 10; j++)
                this.matrix[i][j] = new Cell("white", i, j);
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
        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 10; j++) {
                var el = document.createElement('div');
                el.id = i + "-" + j;
                el.classList.add("block");
                if (board)
                    board.appendChild(el);
            }
        }
    };
    Board.prototype.matrixAt = function (row, col) {
        console.log(row, " ", col);
        return this.matrix.getMatrix()[row][col];
    };
    return Board;
}());
var board = new Board();
var straight = new StraightTetromino(board);
var simulate = straight.fall();
var jebiga = setInterval(function () { straight.fall(); }, 1000);
