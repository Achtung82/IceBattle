import { autoDetectRenderer } from "pixi.js";
import { Climber } from "./GameObjects/climber.js";
import { Explosion } from "./GameObjects/explosion.js";
import { Stage } from "./GameObjects/stage.js";
import { resolvePlatforms } from "./Functions/collision.js";
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
    this.moving = false;
    this.updatable = [];
    this.explosions = [];
    this.bindInput();
    this.createPlayer();
    this.stage.createInitialPlatforms();
    requestAnimationFrame(this.update.bind(this));
  }
  createPlayer() {
    this.player = new Climber(this, 50, 300);
    this.updatable.push(this.player);
    this.bindPlayerDeath(this.player);
  }
  bindPlayerDeath(player) {
    this.player.on("die", () => {
      const index = this.updatable.indexOf(unit);
      this.updatable.splice(index, 1);
      //this.createExplosion(this.player);
      //this.player = {};
    })
  }
  createExplosion(origin) {
    const exp = new Explosion(this, origin);
    this.explosions.push(exp);
    this.updatable.push(exp);
    exp.on("die", () => {
      const index = this.explosions.indexOf(exp);
      this.explosions.splice(index, 1);
      const updIndex = this.updatable.indexOf(exp);
      this.updatable.splice(updIndex, 1);
    });
  }
  update(currentTime) {
    const msSinceLastFrame = currentTime - this._lastFrameTime;
    if (!this.moving && this.player.ypos < 300) {
      this.moving = true;
    }
    if (this.moving && this.player.ypos > 400) {
      this.moving = false;
    }
    this.stage.update(currentTime, msSinceLastFrame);
    if (!this.moving) {
      this.player.update(msSinceLastFrame);
    }
    resolvePlatforms(this.player, this.stage.platforms);
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