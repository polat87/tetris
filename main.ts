class Square{
    private row: number;
    private col: number;
    private dropped: boolean;
    private color: string;

    public constructor(row: number, col: number, color: string){
        this.row = row;
        this.col = col;
        this.color = color;
        this.dropped = false;
    } 

    getRow(): number {return this.row;}
    getCol(): number {return this.col;}
    setRow(row: number): void {this.row = row;}
    setCol(col: number): void {this.col = col;}
    addCols(cols: number): void {this.col+= cols;}
    addRows(rows: number): void {this.row+= rows;}
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
    clearColors(): void;
    setColors(color: string):void;
}

class StraightTetromino implements ITetromino{
    private squares : Square[] = [];
    private matrix: Matrix;

    public constructor(matrix: Matrix){
        this.matrix = matrix;

        for(let i=0; i < 4; i++)
        {
            this.squares[i] = new Square(-1, 3+i, 'red');
        }

        let left_btn = document.querySelector('#left_btn');
        this.left = this.left.bind(this);
        left_btn?.addEventListener('click', this.left);

        let right_btn = document.querySelector('#right_btn');
        this.right = this.right.bind(this);
        right_btn?.addEventListener('click', this.right);

        let down_btn = document.querySelector('#down_btn');
        this.fall = this.fall.bind(this);
        down_btn?.addEventListener('click', this.fall);

        let rotate_btn = document.querySelector('#rotate_btn');
        this.rotate = this.rotate.bind(this);
        rotate_btn?.addEventListener('click', this.rotate);
    }

    clearColors(){
        this.squares.forEach((sq) => {
            matrix.matrixAt(sq.getRow(), sq.getCol()).setColor("white");
        })
    }

    setColors(color: string){
        this.squares.forEach((sq) => {
            matrix.matrixAt(sq.getRow(), sq.getCol()).setColor(color);
        })
    }

    isDropped(){
        let ret_val = false;
        this.squares.forEach(function(sq){
            ret_val = ret_val || sq.isDropped();
        })
        return ret_val;        
    }

    fall(){

        if(this.squares[0].getRow() >= 0)
            this.clearColors();
        
        this.squares.forEach(function(sq)
        {
            sq.addRows(1)

            if(sq.getRow() == 20 || matrix.matrixAt(sq.getRow(), sq.getCol()).getColor() != 'white')
            {
                sq.setDropped();                
            } 
         }) 

         if(this.squares[0].getRow() >=0)
             this.setColors("red");
    }

    left(){        
        if(this.squares[0].getCol() == 0)
            return;

        this.squares.forEach((sq) => {
            console.log("BEFORE-> " +  sq.getRow(), " ", sq.getCol())
            matrix.matrixAt(sq.getRow(), sq.getCol()).setColor("white");
            sq.addCols(-1)
            matrix.matrixAt(sq.getRow(), sq.getCol()).setColor("red");
            console.log("AFTER-> " +  sq.getRow(), " ", sq.getCol())
        })
    }

    right(){
        if(this.squares[3].getCol() == 9)
        return;

        this.squares.forEach((sq, i) => {
            console.log("BEFORE-> " +  sq.getRow(), " ", sq.getCol())
            if(i==0)
                matrix.matrixAt(sq.getRow(), sq.getCol()).setColor("white");
    
            sq.addCols(1)
            matrix.matrixAt(sq.getRow(), sq.getCol()).setColor("red");
            console.log("AFTER-> " +  sq.getRow(), " ", sq.getCol())
        })
    }

    rotate(){
        this.squares.forEach((sq) => {
            matrix.matrixAt(sq.getRow(), sq.getCol()).setColor("white");
        })

        this.squares[0].addRows(-3);
        this.squares[1].addRows(-2);
        this.squares[1].addCols(-1);
        this.squares[2].addRows(-1);
        this.squares[2].addCols(-2);
        this.squares[3].addCols(-3);

        this.squares.forEach((sq) => {
            matrix.matrixAt(sq.getRow(), sq.getCol()).setColor("red");
        })

    }
}

class Cell{
    private color: string;
    private row: number;
    private col: number;
    private div: HTMLDivElement;

    public constructor(color: string, row: number, col: number, div: HTMLDivElement){
        this.color = color;
        this.row = row;
        this.col = col;
        this.div = div;
    }

    public setColor(color: string)
    {
        let el = document.getElementById(this.row + "-" + this.col);
        if(el != null)
            el.style.background = color;
    }

    public getColor(): string{
        return this.color;
    }

}

class Matrix{
    private matrix: Cell[][] = [];
    private row: number = 20;
    private col: number = 10;

    public constructor(){
        this.initMatrix();
    }

    public initMatrix(){
        let board = document.querySelector('#board');

        for (let i = 0; i < this.row; i++) {
            this.matrix[i] = [];

            for(let j=0; j < this.col; j++){
                let div = document.createElement('div');
                div.id = i + "-" + j;                
                div.classList.add("block");
                this.matrix[i][j] = new Cell("white", i, j, div);

                if(board)
                    board.appendChild(div);
            }
        }
    }

    public getMatrix(): Cell[][]{
        return this.matrix;
    }

    public matrixAt(row: number, col: number)
    {
        return this.matrix[row][col];
    }

    public getRow(): number{
        return this.row;
    }

    public getCol(): number{
        return this.col;
    }
}

const matrix = new Matrix();

let tetromino:StraightTetromino = new StraightTetromino(matrix);

/* let go = setInterval(simulate, 5000);


function simulate(): void{

    if(tetromino == null)
    {
        console.log("null")
        tetromino = new StraightTetromino(matrix);
    }

    if(tetromino.isDropped())
    {
        console.log("is Dropped")
        tetromino = new StraightTetromino(matrix);
    }

    tetromino.fall();
} */




