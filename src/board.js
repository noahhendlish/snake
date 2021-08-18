const Snake = require("./snake");

const Apple = require("./apple");

class Board{
    constructor(size, numApples){
        this.size = size;
        this.snake = new Snake(this);
        this.apples = [];
        this.numApples = numApples || Board.NUM_APPLES;
        for(let i = 0; i < this.numApples; i++){
            this.apples.push(new Apple(this));
        }
    }
    validPosition(coord){
        return ( ((coord.x >= 0) && (coord.x < this.size)) && ((coord.y >= 0) && (coord.y < this.size)) )
    }

}
Board.NUM_APPLES = 1;
module.exports = Board;