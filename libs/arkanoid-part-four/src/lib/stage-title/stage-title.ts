import { Game } from '../game';

class StageTitle {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  parent: Game;
  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    parent: Game
  ) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.parent = parent;
    this.#init();
  }

  #init(): void {
    this.createTitle();
  }

  createTitle(): void {
    console.log('createTitle');
    this.ctx.font = '48px serif';
    this.ctx.fillText('Arkanoid', 10, 50);
    this.ctx.fillText('Press start to play', 10, 100);
  }

  clearTitle(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

export { StageTitle };
