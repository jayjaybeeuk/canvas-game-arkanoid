import { colours, brickColours } from './colours';
import { randomProperty } from './utils';

const StageGame = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  console.log('draw canvas');
  //global
  let isPaused = false;
  let canPause = false;

  //Define canvas
  let x: number;
  let y: number;
  // Define ball
  let dx: number;
  let dy: number;

  const ballRadius = 10;
  // Define paddle
  const paddleHeight = 10;
  const paddleWidth = 75;
  let paddleX = (width - paddleWidth) / 2;

  // Define interactions
  let rightPressed = false;
  let leftPressed = false;

  //Brick Field
  const brickRowCount = 3;
  const brickColumnCount = 5;
  const brickWidth = 75;
  const brickHeight = 20;
  const brickPadding = 10;
  const brickOffsetTop = 30;
  const brickOffsetLeft = 30;

  //Brick field
  interface Brick {
    x: number;
    y: number;
    status: number;
    colour: string;
  }

  type Bricks = Brick[][];
  const bricks: Bricks = [];
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = {
        x: 0,
        y: 0,
        status: 1,
        colour: randomProperty(brickColours),
      };
    }
  }

  let score = 0,
    lives = 3;

  function initVars() {
    //Define canvas
    x = width / 2;
    y = height - 30;
    // Define ball
    dx = 2;
    dy = -2;
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = colours.blue;
    ctx.fill();
    ctx.closePath();
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = colours.blue;
    ctx.fill();
    ctx.closePath();
  }

  function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status === 1) {
          const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = bricks[c][r].colour;
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        const b = bricks[c][r];
        if (b.status === 1) {
          if (
            x > b.x &&
            x < b.x + brickWidth &&
            y > b.y &&
            y < b.y + brickHeight
          ) {
            dy = -dy;
            // Remove the brick
            b.status = 0;
            score++;
            if (score === brickRowCount * brickColumnCount) {
              getGameWin();
            }
          }
        }
      }
    }
  }

  function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = colours.blue;
    ctx.fillText(`Score: ${score}`, 8, 20);
  }

  function drawLives() {
    ctx.font = '16px Arial';
    ctx.fillStyle = colours.blue;
    ctx.fillText(`Lives: ${lives}`, width - 65, 20);
  }

  function drawText(text: string, x: number, y: number) {
    const textWidth = ctx.measureText(text).width;
    ctx.fillText(text, x - textWidth / 2, y);
  }

  function drawGameOver() {
    ctx.beginPath();

    ctx.globalCompositeOperation = 'destination-over';

    //Write text
    ctx.font = '32px Arial';
    ctx.fillStyle = colours.black;
    drawText('You died', width / 2, height / 2 - 20);
    drawText(`Click to restart`, width / 2, height / 2 + 20);

    // outline the box
    ctx.strokeStyle = colours.red;
    ctx.lineWidth = 2;
    ctx.strokeRect(80, 60, 320, 180);

    // // Write box with drop shadow
    // ctx.shadowColor = colours.black;
    // ctx.shadowBlur = 10;
    // ctx.shadowOffsetX = 5;
    // ctx.shadowOffsetY = 5;

    // fill the box
    ctx.fillStyle = colours.white;
    ctx.fillRect(80, 60, 320, 180);

    // // Reset the drop shadow
    // ctx.shadowOffsetX = 0;
    // ctx.shadowOffsetY = 0;
    // ctx.shadowBlur = 0;
    // ctx.shadowColor = 'rgba(0, 0, 0, 0)';

    ctx.closePath();
  }

  function getConfirmation(): boolean {
    console.log('Get Confirmation');

    let gameOver = false; //temp - we need to set this via a button click
    // remove a life if not zero
    if (lives > 1) {
      lives--;
    } else {
      gameOver = true;
    }

    // Pause game
    canPause = true;
    isPaused = true;

    if (!gameOver) {
      console.log('Get Confirmation - ok');
      drawGameOver();
      initVars();
      return true;
    } else {
      console.log('Get Confirmation - cancel');
      drawGameOver();
      document.location.reload();
      clearInterval(interval); // Needed for Chrome to end game
      return false;
    }
  }

  function getGameWin() {
    alert('YOU WIN, CONGRATULATIONS!');
    document.location.reload();
    clearInterval(interval); // Needed for Chrome to end game
  }

  function draw() {
    // console.log('Ball position ', dx, dy, x, y);

    // Clear canvas before redraw
    ctx.clearRect(0, 0, width, height);

    //Ball logic Left/Right
    if (x + dx > width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }

    //Ball logic - left or right
    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy > height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        console.log('trigger getConfirmation', x, y);
        getConfirmation();
      }
    }

    //Paddle logic
    if (rightPressed) {
      paddleX = Math.min(paddleX + 7, width - paddleWidth);
    } else if (leftPressed) {
      paddleX = Math.max(paddleX - 7, 0);
    }

    drawBall();
    drawBricks();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    //Move ball
    x += dx;
    y += dy;
  }

  function handleKeyDown(e: { key: string }) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      leftPressed = true;
    }
  }

  function handleKeyUp(e: { key: string }) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      leftPressed = false;
    }
  }

  function handleMouseMove(e: { clientX: number }) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth / 2;
    }
  }

  function handleOrientation(event: DeviceOrientationEvent) {
    // Do something with the event data
    console.log(event.alpha, event.beta, event.gamma);
  }

  function handleClick(e: MouseEvent) {
    console.log('click', e);
    if (canPause) {
      isPaused = !isPaused;
    }
  }

  // Add event listeners
  window.addEventListener('deviceorientation', handleOrientation, true);
  document.addEventListener('keydown', handleKeyDown, false);
  document.addEventListener('keyup', handleKeyUp, false);
  document.addEventListener('mousemove', handleMouseMove, false);
  document.addEventListener('click', handleClick, false);

  // Draw the screen every 10 milliseconds
  const interval = setInterval(function () {
    if (!isPaused) {
      draw();
    }
  }, 10);

  console.log('init vars');
  initVars();

  return {
    initVars,
  };
};

export { StageGame };
