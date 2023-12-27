// Defining HTML elements 
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');

// Defining game variables
const gridSize = 20;
let snake = [{x: 10, y: 10 }];
let food = generateFood() //defining a function createFood for random food blocks
let highScore = 0;
let direction  = 'right'
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

//Draw game map,snale, food
function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
}

// Defining draw snake
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div','snake');
        setPosition(snakeElement , segment);
        board.appendChild(snakeElement)
    });
}

//creating a snake or food /div 
function createGameElement(tag, className) {
    const element = document.createElement(tag); 
    //here we are again defining the HTML element but this time we are first creating it and then defining it in one step
    element.className = className;
    return element;
}

// Set the position of the snake or the food 
function setPosition(element, position) {
    element.style.gridColumn = position.x; 
    // position.x means sending it the position of the snake at the starting/ any point 
    element.style.gridRow = position.y;
}

// Testing draw function
// draw();
// drawFood();

// Defining Draw food function
function drawFood() {
    if(gameStarted){
        const foodElement = createGameElement('div', 'food');
        setPosition(foodElement, food);
        board.appendChild(foodElement)    
    }

}

// Generate food
function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1 // generating random food
    const y = Math.floor(Math.random() * gridSize) + 1 // generating random food
    return {x , y};
}

// Moving the Snake
function move() {
    const head = { ...snake[0]}    
    switch (direction) {
        case 'right':
            head.x++ // increasing the x coordinate of the snake 
            break;
        case 'down':
            head.y++ // increasing the y coordinate of the snake 
            break;
        case 'up':
            head.y-- // decreasing the y coordinate of the snake 
            break;
        case 'left':
            head.x-- // decreasing the x coordinate of the snake 
            break;
    }

    snake.unshift(head);

    snake.pop();

    if (head.x === food.x && head.y === food.y) {
        food = generateFood(); // The food in consumed so generating that block again
        increasespeed();
        clearInterval(gameInterval); // doubt => clear past interval
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            draw();
        }, gameSpeedDelay)
    } else {
        snake.pop();
    }
}

// Testing moving
// setInterval(() => {
//     move(); // Move first
//     draw(); // Then draw again new position
// } ,200)

// Start game function
function startGame() {
    gameStarted = true; // Keep track of a running game
    instructionText.style.display = 'none';// while running the game it should not be visible to the user
    logo.style.display = 'none';
    gameInterval = setInterval (() => {
        move();
        checkCollision();
        draw();
    }, gameSpeedDelay)
}  

// keypress event listner 
function handleKeyPress(event) {
  if (
    (!gameStarted && event.code === 'Space') ||
    (!gameStarted && event.key === ' ')
  ) {
    startGame();
  } else {
    switch (event.key) {
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      case 'ArrowLeft':
        direction = 'left';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
    }
  }
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed() {
    console.log(gameSpeedDelay);
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -=5;
    } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -=3;
    } else if (gameSpeedDelay > 50) {
        gameSpeedDelay -=2;
    } else if (gameSpeedDelay > 25) {
        gameSpeedDelay -=1;
    }
}


// Collison function

function checkCollision() {
    const head = snake[0];

    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if(head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

// Resetgame function

function resetGame() {
    updateHighScore();
    stopGame();
    snake = [{x:10, y:10}];
    food = generateFood();
    direction = 'right';
    gameSpeedDelay = 200;
    updateScore();
}

function updateScore() {
    const currentScore = snake.length -1;
    score.textContent = currentScore.toString().padStart(3,'0');
}

function stopGame() {
    clearInterval(gameInterval);
    gameStarted = false;
    instructionTest.style.display = 'block';
    logo.style.display = 'block';
}

function updateHighScore() {
    const currentScore = snake.length -1;
    if(currentScore > highScore) {
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3,'0');
    }
    highScoreText.style.display = 'block';
}

//---------------------------------------------------------

// // Define HTML elements
// const board = document.getElementById('game-board');
// const instructionText = document.getElementById('instruction-text');
// const logo = document.getElementById('logo');
// const score = document.getElementById('score');
// const highScoreText = document.getElementById('highScore');

// // Define game variables
// const gridSize = 20;
// let snake = [{ x: 10, y: 10 }];
// let food = generateFood();
// let highScore = 0;
// let direction = 'right';
// let gameInterval;
// let gameSpeedDelay = 200;
// let gameStarted = false;

// // Draw game map, snake, food
// function draw() {
//   board.innerHTML = '';
//   drawSnake();
//   drawFood();
//   updateScore();
// }

// // Draw snake
// function drawSnake() {
//   snake.forEach((segment) => {
//     const snakeElement = createGameElement('div', 'snake');
//     setPosition(snakeElement, segment);
//     board.appendChild(snakeElement);
//   });
// }

// // Create a snake or food cube/div
// function createGameElement(tag, className) {
//   const element = document.createElement(tag);
//   element.className = className;
//   return element;
// }

// // Set the position of snake or food
// function setPosition(element, position) {
//   element.style.gridColumn = position.x;
//   element.style.gridRow = position.y;
// }

// // Testing draw function
// // draw();

// // Draw food function
// function drawFood() {
//   if (gameStarted) {
//     const foodElement = createGameElement('div', 'food');
//     setPosition(foodElement, food);
//     board.appendChild(foodElement);
//   }
// }

// // Generate food
// function generateFood() {
//   const x = Math.floor(Math.random() * gridSize) + 1;
//   const y = Math.floor(Math.random() * gridSize) + 1;
//   return { x, y };
// }

// // Moving the snake
// function move() {
//   const head = { ...snake[0] };
//   switch (direction) {
//     case 'up':
//       head.y--;
//       break;
//     case 'down':
//       head.y++;
//       break;
//     case 'left':
//       head.x--;
//       break;
//     case 'right':
//       head.x++;
//       break;
//   }

//   snake.unshift(head);

//   //   snake.pop();

//   if (head.x === food.x && head.y === food.y) {
//     food = generateFood();
//     increaseSpeed();
//     clearInterval(gameInterval); // Clear past interval
//     gameInterval = setInterval(() => {
//       move();
//       checkCollision();
//       draw();
//     }, gameSpeedDelay);
//   } else {
//     snake.pop();
//   }
// }

// // Test moving
// // setInterval(() => {
// //   move(); // Move first
// //   draw(); // Then draw again new position
// // }, 200);

// // Start game function
// function startGame() {
//   gameStarted = true; // Keep track of a running game
//   instructionText.style.display = 'none';
//   logo.style.display = 'none';
//   gameInterval = setInterval(() => {
//     move();
//     checkCollision();
//     draw();
//   }, gameSpeedDelay);
// }

// // Keypress event listener
// function handleKeyPress(event) {
//   if (
//     (!gameStarted && event.code === 'Space') ||
//     (!gameStarted && event.key === ' ')
//   ) {
//     startGame();
//   } else {
//     switch (event.key) {
//       case 'ArrowUp':
//         direction = 'up';
//         break;
//       case 'ArrowDown':
//         direction = 'down';
//         break;
//       case 'ArrowLeft':
//         direction = 'left';
//         break;
//       case 'ArrowRight':
//         direction = 'right';
//         break;
//     }
//   }
// }

// document.addEventListener('keydown', handleKeyPress);

// function increaseSpeed() {
//   //   console.log(gameSpeedDelay);
//   if (gameSpeedDelay > 150) {
//     gameSpeedDelay -= 5;
//   } else if (gameSpeedDelay > 100) {
//     gameSpeedDelay -= 3;
//   } else if (gameSpeedDelay > 50) {
//     gameSpeedDelay -= 2;
//   } else if (gameSpeedDelay > 25) {
//     gameSpeedDelay -= 1;
//   }
// }

// function checkCollision() {
//   const head = snake[0];

//   if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
//     resetGame();
//   }

//   for (let i = 1; i < snake.length; i++) {
//     if (head.x === snake[i].x && head.y === snake[i].y) {
//       resetGame();
//     }
//   }
// }

// function resetGame() {
//   updateHighScore();
//   stopGame();
//   snake = [{ x: 10, y: 10 }];
//   food = generateFood();
//   direction = 'right';
//   gameSpeedDelay = 200;
//   updateScore();
// }

// function updateScore() {
//   const currentScore = snake.length - 1;
//   score.textContent = currentScore.toString().padStart(3, '0');
// }

// function stopGame() {
//   clearInterval(gameInterval);
//   gameStarted = false;
//   instructionText.style.display = 'block';
//   logo.style.display = 'block';
// }

// function updateHighScore() {
//   const currentScore = snake.length - 1;
//   if (currentScore > highScore) {
//     highScore = currentScore;
//     highScoreText.textContent = highScore.toString().padStart(3, '0');
//   }
//   highScoreText.style.display = 'block';
// }