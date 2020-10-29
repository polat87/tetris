class Square{
    private row: number;
    private col: number;
    private dropped: boolean;
    private color: string;

    public constructor(row: number, col: number, color: string){
        this.row = row;
        this.col = col;
        this.dropped = false;
        this.color = color;
    } 

    getRow(): number {return this.row;}
    getCol(): number {return this.col;}
    setRow(row: number): void {this.row = row;}
    setCol(col: number): void {this.col = col;}
    isDropped(): boolean{ return this.dropped;}
    setDropped(): void {this.dropped = true;}
    getColor(): string{return this.color;}

}

interface ITetromino{
    rotate(): void;
    left(): void;
    right(): void;
    fall(): void;
    isDropped(): boolean;
}


class StraightTetromino implements ITetromino{
    private squares: Square[] = [];
    private board: Board;

    public constructor(board: Board){
        this.board = board;

        for(let i=0; i < 4; i++)
        {
            this.squares[i] = new Square(0, 3+i, 'red');
        }
    }

    isDropped(){
        let ret_val = false;
        this.squares.forEach(function(sq){
            ret_val = ret_val || sq.isDropped();
        })
        return ret_val;        
    }

    fall(){
        this.squares.forEach(function(sq)
        {
            board.matrixAt(sq.getRow(), sq.getCol()).setColor(sq.getColor());

            if(sq.getRow() > 0){
                board.matrixAt(sq.getRow()-1, sq.getCol()).setColor("white");
            }

/*             if(sq.getRow() >= 0 && board.matrixAt(sq.getRow()+1, sq.getCol()).getColor() != 'white'){
//                console.log("next is colored??..." + sq.getRow()+2);
                sq.setDropped();
            }
 */ 
            if(sq.getRow() >= 19)
             {
//                 console.log("set dropped -> " + sq.getRow())                 
                 sq.setDropped();
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

    public getColor(): string{
        return this.color;
    }

}

class Matrix{
    private matrix: Cell[][] = [];
    private row: number;
    private col: number;

    public constructor(row: number, col: number){
        this.row = row;
        this.col = col;
        this.initMatrix();
    }

    public initMatrix(){
        for (let i = 0; i < this.row; i++) {
            this.matrix[i] = [];
            for(let j=0; j < this.col; j++)
            this.matrix[i][j] = new Cell("white", i, j);
        }
    }

    public getMatrix(): Cell[][]{
        return this.matrix;
    }
}

class Board{
    private matrix: Matrix;
    private row: number = 20;
    private col: number = 10;

    public constructor(){
        this.matrix = new Matrix(20, 10);
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

    public getRow(): number{
        return this.row;
    }

    public getCol(): number{
        return this.col;
    }
}


const board = new Board();

let tetromino:StraightTetromino;

let go = setInterval(simulate, 300);

function simulate(): void{

    if(tetromino == null)
    {
        console.log("null")
        tetromino = new StraightTetromino(board);
    }

    if(tetromino.isDropped())
    {
        console.log("is Dropped")
        tetromino = new StraightTetromino(board);
    }

    tetromino.fall();
}




