document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid'); 
    let squares = Array.from(document.querySelectorAll('.grid div')); 
    const scoreDisplay = document.querySelector('#score'); 
    const startBtn = document.querySelector('#start-button');
    const width = 10; 
    let timerId; 

    // The Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2], 
        [width, width+1, width+2, width*2+2], 
        [1, width+1, width*2+1, width*2], 
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0, width, width+1, width*2+1], 
        [width+1, width+2, width*2, width*2+1], 
        [0, width, width+1, width*2+1], 
        [width+1, width+2, width*2, width*2+1]
    ]

    const tTetromino = [
        [1, width, width+1, width+2], 
        [1, width+1, width+2, width*2+1], 
        [width, width+1, width+2, width*2+1], 
        [1, width, width+1, width*2+1]
    ]

    const oTetromino = [
        [0, 1, width, width+1], 
        [0, 1, width, width+1], 
        [0, 1, width, width+1], 
        [0, 1, width, width+1]
    ]

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1], 
        [width, width+1, width+2, width+3], 
        [1, width+1, width*2+1, width*3+1], 
        [width, width+1, width+2, width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let currentPosition = 4; 
    let currentRotation = 0;

    // random select a Tetromino and its first rotation
    let random = Math.floor(Math.random()*theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation]; 
    
    // draw the first rotation in the first Tetromino 
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
        })
    } 

    // undraw the Tetromino
    function undraw() { 
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
        })
    }

    // make the Tetromino move down every second 
    timerId = setInterval(moveDown, 1000); 

    // assign functions to keyCodes 
    function control(e) {
        if (e.keyCode === 37) { 
            // tetris piece moves left
            moveLeft()
        } else if (e.keyCode === 38) {
            // tetris piece rotates when pressing 'up' keycode 
            rotate()
        } else if (e.keyCode === 39) {
            // tetris piece moves right 
            moveRight()
        } else if (e.keyCode === 40) {
            // tetris pieces moves down faster with 'down' keycode 
            moveDown()
        } 
    }
    document.addEventListener('keyup', control)

    // move down function 
    function moveDown() {
        undraw()
        currentPosition += width;
        draw() 
        freeze()
    }

    // freeze function 
    // starting new falling tetris piece when current tetris piece is index plus whole width 
    // i.e. when current tetris piece moves next space down
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));
            // start a new falling tetris piece 
            random = Math.floor(Math.random() * theTetrominoes.length); 
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw()
        }
    }

    // move the tetromino left, unless at the edge or a blockage exists 
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0); 
        if(!isAtLeftEdge) currentPosition -= 1;
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }
        draw()
    }

    // move the tetromino right, unless at the edge or a blockage exists 
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
        if(!isAtRightEdge) currentPosition += 1;
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        draw()
    }

    // rotate the tetromino 
    function rotate() {
        undraw() 
        currentRotation++;
        if (currentRotation === current.length) {
            currentRotation = 0;
        } 
        current = theTetrominoes[random][currentRotation];
        draw()
    } 

    // show next tetris piece in mini-grid display 
    const displaySquares = document.querySelectorAll('.mini-grid div'); 
    const displayWidth = 4; 
    let displayIndex = 0; 
})
