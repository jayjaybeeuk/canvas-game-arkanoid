import { StageGame } from '../stage-game';
import { StageTitle } from '../stage-title';

class Game {
  stageTitle: StageTitle;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.stageTitle = new StageTitle(this.ctx, this.width, this.height, this);
    this.#init();
  }

  #init(): void {
    this.startGame = this.startGame.bind(this);
    this.canvas.addEventListener('click', this.startGame, true);
  }

  startTitle(): void {
    this.stageTitle.createTitle();
  }

  startGame(): void {
    this.clearTitle();
    this.canvas.removeEventListener('click', this.startGame, true);
    StageGame(this.canvas, this.ctx, this.width, this.height);
  }

  clearTitle(): void {
    this.stageTitle.clearTitle();
  }
}

export { Game };
