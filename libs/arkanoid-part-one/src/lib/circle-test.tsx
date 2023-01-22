import React, { useCallback } from 'react';
import Canvas from './canvas';

const CircleTest = (props: JSX.IntrinsicAttributes & { [x: string]: any }) => {
  // const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback((ctx: any, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  }, []);

  return (
    <>
      <Canvas draw={draw} {...props} />
    </>
  );
};

export { CircleTest };
