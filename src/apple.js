const Coord = require("./coord");

class Apple{
    constructor(board){
        this.board = board;
        this.newPosition();
    }
    newPosition(){
        let randX = this.randPointInBoard()
        let randY = this.randPointInBoard();
        //new position if snake or any apples already occupy new position
        while(this.board.snake.isOccupying([randX, randY]) || this.appleOccupyingPosition([randX, randY])){
            randX = this.randPointInBoard();
            randY = this.randPointInBoard();
        }
        this.position = new Coord(randX, randY); 
        return new Coord(randX, randY)
    }
    randPointInBoard(){
        return Math.floor(Math.random()*this.board.size);
    }
    appleOccupyingPosition(pos){
        this.board.apples.forEach((apple)=>{
            let appleArr = apple.position.toArray;
            if( appleArr[0] == pos[0] && applesArr[1] == pos[1]){
                return true;
            }
        });
        return false;
    }
}
module.exports = Apple;