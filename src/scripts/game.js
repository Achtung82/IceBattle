import { autoDetectRenderer } from "pixi.js";
import { Climber } from "./GameObjects/climber.js";
import { Stage } from "./GameObjects/stage.js";
import { moveClimber } from "./Functions/movement.js";
import { boxCollissions } from "./Functions/collision.js";
import { handleKeyDown, handleKeyUp } from "./Functions/userinput.js";

export default class Game {
  constructor(element) {
    this.element = element;
    this.stage = new Stage(this);
    this.renderer = autoDetectRenderer(800, 800, { transparent: true }, false);
    this.viewWidth = 500;
    this.viewHeight = 500;
    this.element.appendChild(this.renderer.view);
    this._lastFrameTime = 0;
    this.updatable = [];
    this.platforms = [];
    this.bindInput();
    this.createPlayer();
    this.stage.createInitialPlatforms();
    requestAnimationFrame(this.update.bind(this));
  }
  createPlayer() {
    this.player = new Climber(this, 100, 100);
    this.updatable.push(this.player);
  }
  update(currentTime) {
    const msSinceLastFrame = currentTime - this._lastFrameTime;
    moveClimber(this.player, msSinceLastFrame);
    boxCollissions(this.player, this.platforms);

    this.updatable.forEach((gameObject) => {
      gameObject.updateViewPos();
    });

    this.stage.update(currentTime, msSinceLastFrame);

    this._lastFrameTime = currentTime;
    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this));
  }
  bindInput() {
    this.element.addEventListener('keydown', (e) => { handleKeyDown(e, this.player) });
    this.element.addEventListener('keyup', (e) => { handleKeyUp(e, this.player) });
  }
}