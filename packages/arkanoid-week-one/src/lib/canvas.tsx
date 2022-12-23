import React, { useRef, useEffect } from 'react';
import { CanvasWrapper } from './canvas.style';

type CanvasProps = {
  draw: (context: CanvasRenderingContext2D | null, frameCount: number) => void;
};

const Canvas = (props: CanvasProps) => {
  const { draw, ...rest } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas != null) {
      const context = canvas.getContext('2d');
      let frameCount = 0;
      let animationFrameId: number;

      const render = () => {
        frameCount++;
        draw(context, frameCount);
        animationFrameId = window.requestAnimationFrame(render);
      };

      render();

      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    } else {
      return () => {
        null;
      };
    }
  }, [draw]);

  return (
    <CanvasWrapper>
      <canvas ref={canvasRef} {...rest} />
    </CanvasWrapper>
  );
};

export default Canvas;
