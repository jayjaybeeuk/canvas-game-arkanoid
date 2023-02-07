import React, { useEffect, useRef } from 'react';
import { CanvasWrapper } from './canvas.style';
import { Game } from './game';

type ArkanoidProps = {
  title?: string;
};

const Arkanoid = (props: ArkanoidProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // 👉️ ref could be null here
    if (canvas != null) {
      const context = canvas.getContext('2d');
      const height = canvas.height;
      const width = canvas.width;
      if (context) {
        new Game(canvas, context, width, height);
      }
    }
  }, [canvasRef]);

  return (
    <CanvasWrapper>
      <canvas ref={canvasRef} {...props} width="480" height="320" />
    </CanvasWrapper>
  );
};

export { Arkanoid };
