import { Graphics } from "pixi.js";
import { moveClimber } from "../Functions/movement.js";
import GameObject from "./gameobject.js"

export class Climber extends GameObject {
  constructor(game, x, y) {
    super(game, x, y, 20, 20);
    this.updateViewPos();
    this.createGraphic();
    this.game.stage.addChild(this);
    this._left = false;
    this._right = false;
    this.downSpeed = 0;
    this.sideSpeed = 0;
    this.doubleJumpSaved = 0;
    this.stand = false;
  }
  createGraphic() {
    const graphics = new Graphics();
    graphics.beginFill(0xffeb3b, 1);
    graphics.drawRect(0, 0, this.renderWidth, this.renderHeight);
    this.addChild(graphics);
  }
  update(msSinceLastFrame) {
    moveClimber(this, msSinceLastFrame);
    if(this.xpos > 500) {
      this.emit("death");
    }
  }
  left(value) {
    this._left = value;
  }
  right(value) {
    this._right = value;
  }
  jump() {
    if (this.stand) {
      this.doubleJumpSaved = 1;
      this.downSpeed = -50;
    } else if (this.doubleJumpSaved > 0) {
      this.doubleJumpSaved--;
      this.downSpeed = -50;
    }
  }
}