import { Graphics } from "pixi.js";
import GameObject from "./gameobject.js"

export class Platform extends GameObject {
  constructor(game, x, y, width) {
    super(game, x, y, width, 20);
    this.updateViewPos();
    this.createGraphic();
    this.game.stage.addChild(this);
  }
  createGraphic() {
    var graphics = new Graphics();
    graphics.beginFill(0x13f403, 1);
    graphics.drawRect(0, 0, this.renderWidth, this.renderHeight);
    this.addChild(graphics);
  }
}