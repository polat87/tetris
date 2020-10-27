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
        return this.matrix.getMatrix()[row][col];
    }
}

const board = new Board();

let i=0;

function simulate()
{
    if(i>0)
        board.matrixAt(i-1,5).setColor("white");

    board.matrixAt(i,5).setColor("red");
    i++;

}

setInterval(simulate, 1000);

