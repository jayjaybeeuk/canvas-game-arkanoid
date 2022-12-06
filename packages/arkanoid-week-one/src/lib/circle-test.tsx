import React, { useEffect, useRef } from 'react';

type CircleTestProps = {
  title?: string;
};

const CircleTest = (props: CircleTestProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = (ctx: any, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) return; // current may be null
    const context = canvas.getContext('2d');
    if (context == null) return; // context may be null
    let frameCount = 0;
    let animationFrameId: number;

    //Our draw came here
    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return (
    <>
      <canvas ref={canvasRef} {...props} />
    </>
  );
};

export { CircleTest };
