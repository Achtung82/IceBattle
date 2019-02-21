import { Graphics } from "pixi.js";
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
    this.stand = false;
  }
  createGraphic() {
    const graphics = new Graphics();
    graphics.beginFill(0xffeb3b, 1);
    graphics.drawRect(0, 0, this.renderWidth, this.renderHeight);
    graphics.position.x = (this.width / 2) - (graphics.width / 2);
    graphics.position.y = (this.height / 2) - (graphics.height / 2);
    this.addChild(graphics);
  }
  left(value) {
    this._left = value;
  }
  right(value) {
    this._right = value;
  }
  jump() {
    if (this.stand) {
      this.downSpeed = -50;
    }
  }
}