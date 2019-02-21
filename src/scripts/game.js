import { Container, autoDetectRenderer } from "pixi.js";
import { Climber } from "./GameObjects/climber.js";
import { Platform } from "./GameObjects/platform.js";
import { moveClimber } from "./Functions/movement.js";
import { boxCollissions } from "./Functions/collision.js";
import { handleKeyDown, handleKeyUp } from "./Functions/userinput.js";

export default class Game {
  constructor(element) {
    this.element = element;
    this.stage = new Container();
    this.renderer = autoDetectRenderer(800, 800, { transparent: true }, false);
    this.viewWidth = 500;
    this.viewHeight = 500;
    this.element.appendChild(this.renderer.view);
    this._lastFrameTime = 0;
    this.updatable = [];
    this.platforms = [];
    this.bindInput();
    this.createPlayer();
    this.createPlatforms();
    requestAnimationFrame(this.update.bind(this));
  }
  createPlayer() {
    this.player = new Climber(this, 100, 100);
    this.updatable.push(this.player);
  }
  createPlatforms() {
    const floor = new Platform(this, 0, 485, 500);
    this.platforms.push(floor);
    this.updatable.push(floor);
  }
  update(currentTime) {
    const msSinceLastFrame = currentTime - this._lastFrameTime;
    moveClimber(this.player, msSinceLastFrame);
    boxCollissions(this.player, this.platforms);

    this.updatable.forEach((gameObject) => {
      gameObject.updateViewPos();
    });

    this._lastFrameTime = currentTime;
    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this));
  }
  bindInput() {
    this.element.addEventListener('keydown', (e) => { handleKeyDown(e, this.player) });
    this.element.addEventListener('keyup', (e) => { handleKeyUp(e, this.player) });
  }
}