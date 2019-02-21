import {Container} from "pixi.js";
export default class GameObject extends Container {
  constructor(game, x, y) {
    super();
    this.game = game;
    this.xpos = x;
    this.ypos = y;
    this.viewAspectX = this.game.viewWidth / this.game.renderer.width;
    this.viewAspectY = this.game.viewHeight / this.game.renderer.height;
  }
  updateViewPos() {
    this.position.x = this.xpos * this.viewAspectX;
    this.position.y = this.ypos * this.viewAspectY;
  }
}