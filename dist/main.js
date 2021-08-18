/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apple.js":
/*!**********************!*\
  !*** ./src/apple.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Coord = __webpack_require__(/*! ./coord */ \"./src/coord.js\");\n\nclass Apple{\n    constructor(board){\n        this.board = board;\n        this.newPosition();\n    }\n    newPosition(){\n        let randX = this.randPointInBoard()\n        let randY = this.randPointInBoard();\n        //new position if snake or any apples already occupy new position\n        while(this.board.snake.isOccupying([randX, randY]) || this.appleOccupyingPosition([randX, randY])){\n            randX = this.randPointInBoard();\n            randY = this.randPointInBoard();\n        }\n        this.position = new Coord(randX, randY); \n        return new Coord(randX, randY)\n    }\n    randPointInBoard(){\n        return Math.floor(Math.random()*this.board.size);\n    }\n    appleOccupyingPosition(pos){\n        this.board.apples.forEach((apple)=>{\n            let appleArr = apple.position.toArray;\n            if( appleArr[0] == pos[0] && applesArr[1] == pos[1]){\n                return true;\n            }\n        });\n        return false;\n    }\n}\nmodule.exports = Apple;\n\n//# sourceURL=webpack:///./src/apple.js?");

/***/ }),

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Snake = __webpack_require__(/*! ./snake */ \"./src/snake.js\");\n\nconst Apple = __webpack_require__(/*! ./apple */ \"./src/apple.js\");\n\nclass Board{\n    constructor(size, numApples){\n        this.size = size;\n        this.snake = new Snake(this);\n        this.apples = [];\n        this.numApples = numApples || Board.NUM_APPLES;\n        for(let i = 0; i < this.numApples; i++){\n            this.apples.push(new Apple(this));\n        }\n    }\n    validPosition(coord){\n        return ( ((coord.x >= 0) && (coord.x < this.size)) && ((coord.y >= 0) && (coord.y < this.size)) )\n    }\n\n}\nBoard.NUM_APPLES = 1;\nmodule.exports = Board;\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/coord.js":
/*!**********************!*\
  !*** ./src/coord.js ***!
  \**********************/
/***/ ((module) => {

eval("class Coord{\n    constructor(x, y){\n        this.x = x;\n        this.y = y;\n        this.arr = [x,y];\n    }\n    equals(coord){\n        return (this.x == coord.x) && (this.y == coord.y);\n    }\n    isOpposite(coord){\n        return (this.x == (-1*coord.x)) && (this.y ==(-1*coord.y));\n    }\n    plus(coord){\n        return new Coord((this.x + coord.x), (this.y + coord.y));\n    }\n    toArray(){\n        return this.arr;\n    }\n}\nmodule.exports = Coord;\n\n//# sourceURL=webpack:///./src/coord.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const View = __webpack_require__(/*! ./view */ \"./src/view.js\");\n\n$(function() {\n    const rootEl = $('.snake-game');\n    new View(rootEl);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/snake.js":
/*!**********************!*\
  !*** ./src/snake.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Apple = __webpack_require__(/*! ./apple */ \"./src/apple.js\");\nconst Coord = __webpack_require__(/*! ./coord */ \"./src/coord.js\");\n//const Board = require('./board');\nclass Snake{\n    constructor(board){\n        this.board = board;\n        this.direction = Snake.DIRECTIONS.ArrowUp;\n        let centerBoardCoord = new Coord(Math.floor(board.size/2), Math.floor(board.size/2));\n        this.turning = false;\n        this.segments = [centerBoardCoord];\n        this.growTurns = 0;\n        this.eatenApples = 0;\n    }\n    arrToCoord(arr){\n        if((arr instanceof Coord)){\n            return arr;\n        } else {\n            return new Coord(arr[0], arr[1]);\n        }\n    }\n    randDirection(){\n        return Object.keys(Snake.DIRECTIONS)[Math.floor(Math.random()*4)];\n    }\n    move(){\n        //move snake forward\n        this.segments.push(this.head().plus(this.direction));\n        //allow turning\n        this.turning = false;\n        //try to eat apple\n        this.eatApples();\n        //if not growing, remove tail segment\n        if(this.growTurns > 0){\n            this.growTurns = -1;\n        } else{\n            this.segments.shift();\n        }\n        //if invalid position (off board or collides with self), remove snake\n        if(!this.isValid()){\n            this.segments = [];\n        }\n    }\n    head(){\n        return this.segments.slice(-1)[0];\n    }\n    turn(direction){\n        //avoid turning backwards on itself (no 180 turns) OR is already turning\n        if(this.direction.isOpposite(direction) || this.turning){\n            return;\n        } else { //otherwise, set turning to true, and change direction\n            this.turning = true;\n            this.direction = direction;\n        }\n    }\n    eatApples(){\n        this.board.apples.forEach((apple, idx)=>{\n            if(this.head().equals(apple.position)){\n                this.growTurns += 3;\n                //move apple to new position\n                apple.position = apple.newPosition();\n                this.eatenApples +=1;\n            }\n        })\n    }\n    isOccupying(pos){\n        pos = this.arrToCoord(pos);\n        let occupying = false;\n        this.segments.forEach((segment)=>{\n            if(segment.equals(pos)){\n                occupying = true;\n                return occupying;\n            }\n        });\n        return occupying;\n    }\n\n    isValid(){\n        const head = this.head();\n        if(!this.board.validPosition(head)){ //off screen\n            return false;\n        }\n        for(let i =0; i < this.segments.length-1; i++){ //this.segments[i] !== head\n            if(this.segments[i].equals(head)){\n                return false;\n            }\n        }\n        return true;\n    }\n}\n\nSnake.DIRECTIONS = {'ArrowUp':new Coord(-1,0), 'ArrowLeft':new Coord(0, -1), 'ArrowDown':new Coord(1,0), 'ArrowRight':new Coord(0,1)}; //event.key : coord\nmodule.exports = Snake;\n\n//# sourceURL=webpack:///./src/snake.js?");

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Board = __webpack_require__(/*! ./board */ \"./src/board.js\");\nconst Snake = __webpack_require__(/*! ./snake */ \"./src/snake.js\");\nclass View{\n    constructor($el, size, speed, numApples){\n        //jquery display element to build game in\n        this.$el = $el;\n        //set board size, snake speed, max number of apples displayed\n        size = size || View.SIZES['Small'];\n        /*if(!(Object.keys(View.SIZES).includes(size))){\n            size = View.SIZES['Small'];\n        }*/\n        this.boardSize = size;\n        this.speed= speed || View.SPEEDS['Normal']; //speed in Ms\n        this.numApples = numApples || Board.numApples;\n        //create new board\n        this.board = new Board(this.boardSize, this.numApples);\n        //sets up intial board display\n        this.renderBoard();\n        // toggles between pause/play buttons or space bar\n        this.paused = true;\n        // stays true until game ends, false until new game started\n        this.playing = false;\n        //tack if menu is displayed\n        this.helpDisplayed = false;\n        //track if menu is displayed\n        this.menuDisplayed = true;\n        //bind arrow key events\n        this.bindKeyEvents();\n        //bind button click events\n        this.bindButtonEvents();\n        //setup interval (animate game)\n        this.highScore = 0;\n        this.intervalId = window.setInterval(this.step.bind(this), this.speed);\n    }\n    //\n\n    restartGame(){\n        this.board = new Board(this.boardSize, this.numApples);\n        this.hideHelpDisplay();\n        this.hideMenu();\n        this.hideElement('.game-over');\n        this.hideElement('.replay-btn');\n        this.showElement('.exit-btn-div');\n        this.renderBoard();\n        this.unpause();\n        window.clearInterval(this.intervalId);\n        this.playing = true;\n        this.intervalId = window.setInterval(this.step.bind(this), this.speed);\n    }\n    //helpers for 'help-display'\n    toggleHelpDisplay(){\n        this.helpDisplayed = !this.helpDisplayed ;\n        $('.help-display').toggleClass('hidden');\n    }\n    showHelpDisplay(){\n        this.helpDisplayed = true;\n        $('.help-display').removeClass('hidden');\n    }\n    hideHelpDisplay(){\n        this.helpDisplayed = false;\n        $('.help-display').addClass('hidden');\n    }\n\n    bindKeyEvents(){\n        $(window).keydown(  (e)=> {\n            e.preventDefault();\n            if(Snake.DIRECTIONS[e.key]){ //map arrow key bindings using e.key (the values in Snake.direction)\n                if(!this.paused){ //not allowed while paused\n                    this.board.snake.turn(Snake.DIRECTIONS[e.key]);\n                }\n            }\n            else if(View.KEYCODESMAP[e.keyCode.toString()]){ //try mapping arrow key bindings using keyCode (# Keycodes in View.KEYCODESMAP)\n                if(!this.paused){ //dont allow while paused\n                    let dir = View.KEYCODESMAP[e.keyCode.toString()];\n                    this.board.snake.turn(Snake.DIRECTIONS[dir]);\n                }\n            }\n            else if(e.key === ' ' || e.keycode == 32 || e.code == 'Space'){ //space triggers pause/play\n                e.preventDefault();\n                if(this.playing){ //only works while playing\n                    if(!(this.menuDisplayed)){ //if no menu displayed and in the middle of game\n                            this.togglePause(); //pause\n                    }\n                }\n            }\n            else if(e.key === 'm' || e.keyCode == '77' || e.code == 'KeyM'){ //'m' == show/hide menu\n                if(!(this.helpDisplayed)){ //if no menu displayed\n                    if(this.playing){\n                        this.pause();\n                        this.toggleMenu();\n                    }\n                    else{\n                        this.showMenu();\n                    }\n                }\n            }\n            else if(e.key === 'r' || e.keyCode == '82' || e.code == 'KeyR'){ //'r' == restart game\n                this.restartGame();\n            }\n        });\n    }\n    hideElement(el){\n        $(el).addClass('hidden');\n    }\n    showElement(el){\n        $(el).removeClass('hidden');\n    }\n    bindButtonEvents(){\n        //header buttons:\n        //pause\n        $(\".pause-btn\").on('click', (e)=>{\n            e.preventDefault();\n            //e.currentTarget;\n            if(this.playing){\n                this.pause();\n            }\n        });\n        //play\n        $('.unpause-btn').on('click', (e)=>{\n            e.preventDefault();\n            this.hideHelpDisplay();\n            this.hideMenu();\n            if(this.playing){\n                this.unpause();\n            }\n        });\n        //replay\n        $('.replay-btn').on('click', (e)=>{\n            e.preventDefault();\n            this.restartGame();\n        });\n\n        //change between replay and play button in menu\n        //options\n        $('.options-btn').on('click', (e)=>{\n            e.preventDefault();\n            this.hideElement('.game-over');\n            if(this.playing){\n                this.pause();\n                this.toggleMenu();\n            }\n            else{\n                this.showMenu();\n            }\n        });\n\n        //menu buttons:\n        //exit\n        $(\".exit-btn\").on('click', (e)=>{\n            e.preventDefault();\n            this.hideMenu();\n        });\n\n        //start-new-game/play-btn click --> restarts game\n        $('.menu-play-game-btn').on('click', (e)=>{\n            this.restartGame();\n        });\n        $('.menu-replay-btn').on('click', (e)=>{\n            this.restartGame();\n        });\n\n        //apples in menu hover\n        $('.apples-selection').hover(function () {\n                // over\n                $(this).add($(this).prevAll()).addClass('hovered-apple');\n            }, function () {\n                //out\n                $(this).add($(this).prevAll()).removeClass('hovered-apple');\n            }\n        );\n        //apples in menu on click, update\n        $('.apples-selection').click((e)=>{\n            $('.apples-selection').removeClass('selected-apple');\n            $(e.currentTarget).add($(e.currentTarget).prevAll()).addClass('selected-apple');\n            this.numApples = parseInt($(e.currentTarget).data('apple'));\n        });\n        //speed choices in menu on click, update\n        $('.speed-choice').click((e)=>{\n            $('.speed-choice').removeClass('chosen-speed');\n            $(e.currentTarget).addClass('chosen-speed');\n            this.speed = View.SPEEDS[$(e.currentTarget).data('speed')];\n        });\n        //grid size choice in menu on click, update\n        $('.grid-size-choice').click((e)=>{\n            $('.grid-size-choice').removeClass('chosen-size');\n            $(e.currentTarget).addClass('chosen-size');\n            this.boardSize = View.SIZES[$(e.currentTarget).data('size')];\n        });\n\n        //help-button in menu\n        $('.help-btn').on('click', (e)=>{\n            console.log('help-click');\n            this.showHelpDisplay();\n        });\n        //instructions display buttons:\n        //back-btn\n        $('.back-btn').on('click', (e)=>{\n            this.hideHelpDisplay();\n        });\n    }\n    //menu helpers\n    toggleMenuPlayButton(){\n        if(this.playing){\n            console.log('toggle menu play btn: playing');\n            $('.menu-replay-btn').removeClass('hidden');\n            $('.menu-play-game-btn').addClass('hidden');\n        }\n        else{\n            console.log('toggle menu play btn: not playing');\n            $('.menu-replay-btn').addClass('hidden');\n            $('.menu-play-game-btn').removeClass('hidden');\n        }\n    }\n    showMenu(){\n        this.menuDisplayed = true;\n        this.toggleMenuPlayButton();\n        $('.menu').removeClass('hidden');\n    }\n    hideMenu(){\n        this.menuDisplayed = false;\n        $('.menu').addClass('hidden');\n    }\n    toggleMenu(){\n        this.menuDisplayed = !(this.menuDisplayed);\n        this.toggleMenuPlayButton();\n        $('.menu').toggleClass('hidden');\n    }\n    //control pause helpers\n    togglePause(){\n        this.paused = !(this.paused);\n        $('.pause-btn').toggleClass('hidden');\n        $('.unpause-btn').toggleClass('hidden');\n    }\n\n    pause(){\n        this.paused = true;\n        $('.pause-btn').addClass('hidden');\n        $('.unpause-btn').removeClass('hidden');\n    }\n    unpause(){\n        this.paused = false;    //paused\n        $('.pause-btn').removeClass('hidden'); //show pause btn\n        $('.unpause-btn').addClass('hidden'); //hide unpause btn\n    }\n\n    gameOver(){\n        this.highScore = Math.max(this.highScore, this.board.snake.eatenApples);\n        $('.high-score-counter').text(this.highScore);\n        this.showElement('.game-over');\n        this.showElement('.replay-btn');\n        this.hideElement('.unpause-btn');\n        this.hideElement('.exit-btn-div');\n        this.hideElement('.pause-btn');\n        this.toggleMenuPlayButton();\n        this.playing = false;\n        setTimeout(()=>{\n            if(!(this.playing) && !(this.menuDisplayed)){\n                this.hideElement('.game-over');\n                this.toggleMenu();\n                this.resetBoard();\n            }\n        }, 2000);\n    }\n    step(){\n        if(this.paused == false){\n            if(this.board.snake.segments.length > 0){\n                this.drawBoard();\n                this.board.snake.move();\n            }\n            else{\n                this.playing = false;\n                window.clearInterval(this.intervalId);\n                this.gameOver();\n            }\n        }\n        else{\n            this.drawBoard();\n        }\n    }\n\n    drawBoard(){\n        this.resetBoard();\n        this.board.snake.segments.forEach((segment)=>{\n            let $snake = $(`[data-coord= \"${segment.arr}\"]`);\n            $snake.addClass('snake');\n        });\n\n        let snakeHeadArr = this.board.snake.head().arr;\n        $(`[data-coord= \"${snakeHeadArr}\"]`).addClass('snake-head');\n        $('.apples-counter').text(this.board.snake.eatenApples);\n        this.board.apples.forEach((apple)=>{\n            let $apple = $(`[data-coord= \"${apple.position.arr}\"]`);\n            $apple.addClass('apple');\n        });\n    }\n\n    resetBoard(){\n        $('.coord').removeClass('snake apple snake-head');\n    }\n\n    renderBoard(){ //grid\n        $('.grid-100').remove();\n        $('.grid-50').remove();\n        let size = this.boardSize;\n        let $grid = $('<div>').addClass(`grid-${size}`);\n        for(let x = 0; x < size; x++){\n            for(let y = 0; y < size; y++){\n                let $coord = $('<div>').addClass('coord').attr('data-coord', [x, y]);\n                $grid.append($coord);\n            }\n        }\n        this.$el.append($grid);\n    }\n}\nView.SIZES = {'Small': 50, 'Large': 100};\nView.KEYCODESMAP = {'40': 'ArrowDown', '39': 'ArrowRight', '37': 'ArrowLeft', '38': 'ArrowUp'}\nView.SPEEDS = {'Fast': 30, 'Normal': 40, Slow: 50};\n\nmodule.exports = View;\n/*\nevent.key, event.code, event.which\nArrowDown, ArrowDown, 40\nArrowUp, ArrowUp, 38\nArrowLeft, ArrowLeft, 37\nArrowRight, ArrowRight, 39\n*/\n\n//# sourceURL=webpack:///./src/view.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;