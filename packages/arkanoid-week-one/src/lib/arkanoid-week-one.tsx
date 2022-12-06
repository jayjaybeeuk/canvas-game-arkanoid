import React, { useEffect, useRef } from 'react';

type ArkanoidProps = {
  title?: string;
};

const Arkanoid = (props: ArkanoidProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = (ctx: any, width: number, height: number) => {
    //Define canvas
    let x = width / 2;
    let y = height - 30;
    // Define ball
    let dx = 2;
    let dy = -2;
    const ballRadius = 10;
    // Define paddle
    const paddleHeight = 10;
    const paddleWidth = 75;
    let paddleX = (width - paddleWidth) / 2;

    // Define interactions
    let rightPressed = false;
    let leftPressed = false;

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

    function draw() {
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
          alert('GAME OVER');
          document.location.reload();
          clearInterval(interval); // Needed for Chrome to end game
        }
      }

      //Paddle logic
      if (rightPressed) {
        paddleX = Math.min(paddleX + 7, width - paddleWidth);
      } else if (leftPressed) {
        paddleX = Math.max(paddleX - 7, 0);
      }

      drawBall();
      drawPaddle();

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
    // TODO: we can use react frame rendering here via useEffect
    const interval = setInterval(draw, 10);
  };

  const canvas = canvasRef.current;

  useEffect(() => {
    // 👉️ ref could be null here
    if (canvas != null) {
      const context = canvas.getContext('2d');
      const height = canvas.height;
      const width = canvas.width;
      draw(context, width, height);
    }
  }, [canvas]);

  return (
    <>
      <canvas ref={canvasRef} {...props} width="480" height="320" />
    </>
  );
};

export { Arkanoid };
