import React, { useEffect, useRef } from 'react';
import { CanvasWrapper } from './canvas.style';

type ArkanoidProps = {
  title?: string;
};

const Arkanoid = (props: ArkanoidProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = (ctx: any, width: number, height: number) => {
    console.log('draw canvas');
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
    type Bricks = any;
    // | {
    //     x: number;
    //     y: number;
    //   }
    // | number;
    const bricks: Bricks[][] = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }

    let score = 0;

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
      ctx.fillStyle = '#0095DD';
      ctx.fill();
      ctx.closePath();
    }

    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#0095DD';
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
            ctx.fillStyle = '#0095DD';
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
      ctx.fillStyle = '#0095DD';
      ctx.fillText(`Score: ${score}`, 8, 20);
    }

    function getConfirmation() {
      console.log('Get Confirmation');
      const retVal = confirm('GAME OVER: Do you want to continue ?');
      if (retVal) {
        console.log('Get Confirmation - ok');
        initVars();
        return true;
      } else {
        console.log('Get Confirmation - cancel');
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
      collisionDetection();

      //Move ball
      x += dx;
      y += dy;
    }

    function keyDownHandler(e: { key: string }) {
      if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
      } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
      }
    }

    function keyUpHandler(e: { key: string }) {
      if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
      } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
      }
    }

    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    // Draw the screen every 10 milliseconds
    const interval = setInterval(draw, 10);

    console.log('init vars');
    initVars();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    console.log('canvas - check');
    // 👉️ ref could be null here
    if (canvas != null) {
      console.log('canvas - not null 2');
      const context = canvas.getContext('2d');
      const height = canvas.height;
      const width = canvas.width;
      draw(context, width, height);
    }
  }, [canvasRef]);

  return (
    <CanvasWrapper>
      <canvas ref={canvasRef} {...props} width="480" height="320" />
    </CanvasWrapper>
  );
};

export { Arkanoid };
