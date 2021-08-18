const Apple = require("./apple");
const Coord = require("./coord");
//const Board = require('./board');
class Snake{
    constructor(board){
        this.board = board;
        this.direction = Snake.DIRECTIONS.ArrowUp;
        let centerBoardCoord = new Coord(Math.floor(board.size/2), Math.floor(board.size/2));
        this.turning = false;
        this.segments = [centerBoardCoord];
        this.growTurns = 0;
        this.eatenApples = 0;
    }
    arrToCoord(arr){
        if((arr instanceof Coord)){
            return arr;
        } else {
            return new Coord(arr[0], arr[1]);
        }
    }
    randDirection(){
        return Object.keys(Snake.DIRECTIONS)[Math.floor(Math.random()*4)];
    }
    move(){
        //move snake forward
        this.segments.push(this.head().plus(this.direction));
        //allow turning
        this.turning = false;
        //try to eat apple
        this.eatApples();
        //if not growing, remove tail segment
        if(this.growTurns > 0){
            this.growTurns = -1;
        } else{
            this.segments.shift();
        }
        //if invalid position (off board or collides with self), remove snake
        if(!this.isValid()){
            this.segments = [];
        }
    }
    head(){
        return this.segments.slice(-1)[0];
    }
    turn(direction){
        //avoid turning backwards on itself (no 180 turns) OR is already turning
        if(this.direction.isOpposite(direction) || this.turning){
            return;
        } else { //otherwise, set turning to true, and change direction
            this.turning = true;
            this.direction = direction;
        }
    }
    eatApples(){
        this.board.apples.forEach((apple, idx)=>{
            if(this.head().equals(apple.position)){
                this.growTurns += 3;
                //move apple to new position
                apple.position = apple.newPosition();
                this.eatenApples +=1;
            }
        })
    }
    isOccupying(pos){
        pos = this.arrToCoord(pos);
        let occupying = false;
        this.segments.forEach((segment)=>{
            if(segment.equals(pos)){
                occupying = true;
                return occupying;
            }
        });
        return occupying;
    }

    isValid(){
        const head = this.head();
        if(!this.board.validPosition(head)){ //off screen
            return false;
        }
        for(let i =0; i < this.segments.length-1; i++){ //this.segments[i] !== head
            if(this.segments[i].equals(head)){
                return false;
            }
        }
        return true;
    }
}

Snake.DIRECTIONS = {'ArrowUp':new Coord(-1,0), 'ArrowLeft':new Coord(0, -1), 'ArrowDown':new Coord(1,0), 'ArrowRight':new Coord(0,1)}; //event.key : coord
module.exports = Snake;