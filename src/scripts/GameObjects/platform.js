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
    // graphics.position.x = (this.width / 2) - (graphics.width / 2);
    // graphics.position.y = (this.height / 2) - (graphics.height / 2);
    this.addChild(graphics);
  }
}