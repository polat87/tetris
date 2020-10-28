class Square{
    private row: number;
    private col: number;

    public constructor(row: number, col: number){
        this.row = row;
        this.col = col;
    } 

    getRow(): number {return this.row;}
    getCol(): number {return this.col;}
    setRow(row: number): void {this.row = row;}
    setCol(col: number): void {this.col = col;}
}

interface ITetromino{
    rotate(): void;
    left(): void;
    right(): void;
    fall(): void;
}

class StraightTetromino implements ITetromino{
    private squares: Square[] = [];
    private board: Board;

    public constructor(board: Board){
        this.board = board;

        for(let i=0; i < 4; i++)
        {
            this.squares[i] = new Square(0, 3+i);
        }
    }

    fall(){
        this.squares.forEach(function(sq)
        {
            board.matrixAt(sq.getRow(), sq.getCol()).setColor("red");

            if(sq.getRow() > 0){
                board.matrixAt(sq.getRow()-1, sq.getCol()).setColor("white");
            }
            sq.setRow(sq.getRow()+1);
        })  
    }

    rotate(){}
    left(){}
    right(){}
}

class Cell{
    private color: string;
    private row: number;
    private col: number;

    public constructor(color: string, row: number, col: number){
        this.color = color;
        this.row = row;
        this.col = col;
    }

    public setColor(color: string)
    {
        if(color == "white")
        {
            let el = document.getElementById(this.row + "-" + this.col);
            el?.classList.remove(this.color) 
        }
        
        this.color = color;
        let el = document.getElementById(this.row + "-" + this.col);
        el?.classList.add(color);
    }
}

class Matrix{
    private matrix: Cell[][] = [];
    public constructor(){
        this.initMatrix();
    }

    public initMatrix(){
        for (let i = 0; i < 20; i++) {
            this.matrix[i] = [];
            for(let j=0; j < 10; j++)
            this.matrix[i][j] = new Cell("white", i, j);
        }
    }

    public getMatrix(): Cell[][]{
        return this.matrix;
    }
}

class Board{
    private matrix: Matrix;

    public constructor(){
        this.matrix = new Matrix();
        this.initBoard();
    }

    public initBoard(){
        let board = document.querySelector('#board');
        for(let i=0; i < 20; i++){
            for(let j=0; j < 10; j++){
                let el = document.createElement('div');
                el.id = i + "-" + j;                
                el.classList.add("block");

                if(board)
                    board.appendChild(el);
            }
        }
    }

    public matrixAt(row: number, col: number)
    {
        console.log(row, " ",  col)        
        return this.matrix.getMatrix()[row][col];
    }
}


const board = new Board();
const straight = new StraightTetromino(board);

let simulate = straight.fall();
let jebiga = setInterval(function() { straight.fall() }, 1000);

