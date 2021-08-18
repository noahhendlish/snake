const Board = require("./board");
const Snake = require('./snake');
class View{
    constructor($el, size, speed, numApples){
        //jquery display element to build game in
        this.$el = $el;
        //set board size, snake speed, max number of apples displayed
        size = size || View.SIZES['Small'];
        /*if(!(Object.keys(View.SIZES).includes(size))){
            size = View.SIZES['Small'];
        }*/
        this.boardSize = size;
        this.speed= speed || View.SPEEDS['Normal']; //speed in Ms
        this.numApples = numApples || Board.numApples;
        //create new board
        this.board = new Board(this.boardSize, this.numApples);
        //sets up intial board display
        this.renderBoard();
        // toggles between pause/play buttons or space bar
        this.paused = true;
        // stays true until game ends, false until new game started
        this.playing = false;
        //tack if menu is displayed
        this.helpDisplayed = false;
        //track if menu is displayed
        this.menuDisplayed = true;
        //bind arrow key events
        this.bindKeyEvents();
        //bind button click events
        this.bindButtonEvents();
        //setup interval (animate game)
        this.highScore = 0;
        this.intervalId = window.setInterval(this.step.bind(this), this.speed);
    }
    //

    restartGame(){
        this.board = new Board(this.boardSize, this.numApples);
        this.hideHelpDisplay();
        this.hideMenu();
        this.hideElement('.game-over');
        this.hideElement('.replay-btn');
        this.showElement('.exit-btn-div');
        this.renderBoard();
        this.unpause();
        window.clearInterval(this.intervalId);
        this.playing = true;
        this.intervalId = window.setInterval(this.step.bind(this), this.speed);
    }
    //helpers for 'help-display'
    toggleHelpDisplay(){
        this.helpDisplayed = !this.helpDisplayed ;
        $('.help-display').toggleClass('hidden');
    }
    showHelpDisplay(){
        this.helpDisplayed = true;
        $('.help-display').removeClass('hidden');
    }
    hideHelpDisplay(){
        this.helpDisplayed = false;
        $('.help-display').addClass('hidden');
    }

    bindKeyEvents(){
        $(window).keydown(  (e)=> {
            e.preventDefault();
            if(Snake.DIRECTIONS[e.key]){ //map arrow key bindings using e.key (the values in Snake.direction)
                if(!this.paused){ //not allowed while paused
                    this.board.snake.turn(Snake.DIRECTIONS[e.key]);
                }
            }
            else if(View.KEYCODESMAP[e.keyCode.toString()]){ //try mapping arrow key bindings using keyCode (# Keycodes in View.KEYCODESMAP)
                if(!this.paused){ //dont allow while paused
                    let dir = View.KEYCODESMAP[e.keyCode.toString()];
                    this.board.snake.turn(Snake.DIRECTIONS[dir]);
                }
            }
            else if(e.key === ' ' || e.keycode == 32 || e.code == 'Space'){ //space triggers pause/play
                e.preventDefault();
                if(this.playing){ //only works while playing
                    if(!(this.menuDisplayed)){ //if no menu displayed and in the middle of game
                            this.togglePause(); //pause
                    }
                }
            }
            else if(e.key === 'm' || e.keyCode == '77' || e.code == 'KeyM'){ //'m' == show/hide menu
                if(!(this.helpDisplayed)){ //if no menu displayed
                    if(this.playing){
                        this.pause();
                        this.toggleMenu();
                    }
                    else{
                        this.showMenu();
                    }
                }
            }
            else if(e.key === 'r' || e.keyCode == '82' || e.code == 'KeyR'){ //'r' == restart game
                this.restartGame();
            }
        });
    }
    hideElement(el){
        $(el).addClass('hidden');
    }
    showElement(el){
        $(el).removeClass('hidden');
    }
    bindButtonEvents(){
        //header buttons:
        //pause
        $(".pause-btn").on('click', (e)=>{
            e.preventDefault();
            //e.currentTarget;
            if(this.playing){
                this.pause();
            }
        });
        //play
        $('.unpause-btn').on('click', (e)=>{
            e.preventDefault();
            this.hideHelpDisplay();
            this.hideMenu();
            if(this.playing){
                this.unpause();
            }
        });
        //replay
        $('.replay-btn').on('click', (e)=>{
            e.preventDefault();
            this.restartGame();
        });

        //change between replay and play button in menu
        //options
        $('.options-btn').on('click', (e)=>{
            e.preventDefault();
            this.hideElement('.game-over');
            if(this.playing){
                this.pause();
                this.toggleMenu();
            }
            else{
                this.showMenu();
            }
        });

        //menu buttons:
        //exit
        $(".exit-btn").on('click', (e)=>{
            e.preventDefault();
            this.hideMenu();
        });

        //start-new-game/play-btn click --> restarts game
        $('.menu-play-game-btn').on('click', (e)=>{
            this.restartGame();
        });
        $('.menu-replay-btn').on('click', (e)=>{
            this.restartGame();
        });

        //apples in menu hover
        $('.apples-selection').hover(function () {
                // over
                $(this).add($(this).prevAll()).addClass('hovered-apple');
            }, function () {
                //out
                $(this).add($(this).prevAll()).removeClass('hovered-apple');
            }
        );
        //apples in menu on click, update
        $('.apples-selection').click((e)=>{
            $('.apples-selection').removeClass('selected-apple');
            $(e.currentTarget).add($(e.currentTarget).prevAll()).addClass('selected-apple');
            this.numApples = parseInt($(e.currentTarget).data('apple'));
        });
        //speed choices in menu on click, update
        $('.speed-choice').click((e)=>{
            $('.speed-choice').removeClass('chosen-speed');
            $(e.currentTarget).addClass('chosen-speed');
            this.speed = View.SPEEDS[$(e.currentTarget).data('speed')];
        });
        //grid size choice in menu on click, update
        $('.grid-size-choice').click((e)=>{
            $('.grid-size-choice').removeClass('chosen-size');
            $(e.currentTarget).addClass('chosen-size');
            this.boardSize = View.SIZES[$(e.currentTarget).data('size')];
        });

        //help-button in menu
        $('.help-btn').on('click', (e)=>{
            console.log('help-click');
            this.showHelpDisplay();
        });
        //instructions display buttons:
        //back-btn
        $('.back-btn').on('click', (e)=>{
            this.hideHelpDisplay();
        });
    }
    //menu helpers
    toggleMenuPlayButton(){
        if(this.playing){
            console.log('toggle menu play btn: playing');
            $('.menu-replay-btn').removeClass('hidden');
            $('.menu-play-game-btn').addClass('hidden');
        }
        else{
            console.log('toggle menu play btn: not playing');
            $('.menu-replay-btn').addClass('hidden');
            $('.menu-play-game-btn').removeClass('hidden');
        }
    }
    showMenu(){
        this.menuDisplayed = true;
        this.toggleMenuPlayButton();
        $('.menu').removeClass('hidden');
    }
    hideMenu(){
        this.menuDisplayed = false;
        $('.menu').addClass('hidden');
    }
    toggleMenu(){
        this.menuDisplayed = !(this.menuDisplayed);
        this.toggleMenuPlayButton();
        $('.menu').toggleClass('hidden');
    }
    //control pause helpers
    togglePause(){
        this.paused = !(this.paused);
        $('.pause-btn').toggleClass('hidden');
        $('.unpause-btn').toggleClass('hidden');
    }

    pause(){
        this.paused = true;
        $('.pause-btn').addClass('hidden');
        $('.unpause-btn').removeClass('hidden');
    }
    unpause(){
        this.paused = false;    //paused
        $('.pause-btn').removeClass('hidden'); //show pause btn
        $('.unpause-btn').addClass('hidden'); //hide unpause btn
    }

    gameOver(){
        this.highScore = Math.max(this.highScore, this.board.snake.eatenApples);
        $('.high-score-counter').text(this.highScore);
        this.showElement('.game-over');
        this.showElement('.replay-btn');
        this.hideElement('.unpause-btn');
        this.hideElement('.exit-btn-div');
        this.hideElement('.pause-btn');
        this.toggleMenuPlayButton();
        this.playing = false;
        setTimeout(()=>{
            if(!(this.playing) && !(this.menuDisplayed)){
                this.hideElement('.game-over');
                this.toggleMenu();
                this.resetBoard();
            }
        }, 2000);
    }
    step(){
        if(this.paused == false){
            if(this.board.snake.segments.length > 0){
                this.drawBoard();
                this.board.snake.move();
            }
            else{
                this.playing = false;
                window.clearInterval(this.intervalId);
                this.gameOver();
            }
        }
        else{
            this.drawBoard();
        }
    }

    drawBoard(){
        this.resetBoard();
        this.board.snake.segments.forEach((segment)=>{
            let $snake = $(`[data-coord= "${segment.arr}"]`);
            $snake.addClass('snake');
        });

        let snakeHeadArr = this.board.snake.head().arr;
        $(`[data-coord= "${snakeHeadArr}"]`).addClass('snake-head');
        $('.apples-counter').text(this.board.snake.eatenApples);
        this.board.apples.forEach((apple)=>{
            let $apple = $(`[data-coord= "${apple.position.arr}"]`);
            $apple.addClass('apple');
        });
    }

    resetBoard(){
        $('.coord').removeClass('snake apple snake-head');
    }

    renderBoard(){ //grid
        $('.grid-100').remove();
        $('.grid-50').remove();
        let size = this.boardSize;
        let $grid = $('<div>').addClass(`grid-${size}`);
        for(let x = 0; x < size; x++){
            for(let y = 0; y < size; y++){
                let $coord = $('<div>').addClass('coord').attr('data-coord', [x, y]);
                $grid.append($coord);
            }
        }
        this.$el.append($grid);
    }
}
View.SIZES = {'Small': 50, 'Large': 100};
View.KEYCODESMAP = {'40': 'ArrowDown', '39': 'ArrowRight', '37': 'ArrowLeft', '38': 'ArrowUp'}
View.SPEEDS = {'Fast': 30, 'Normal': 40, Slow: 50};

module.exports = View;
/*
event.key, event.code, event.which
ArrowDown, ArrowDown, 40
ArrowUp, ArrowUp, 38
ArrowLeft, ArrowLeft, 37
ArrowRight, ArrowRight, 39
*/