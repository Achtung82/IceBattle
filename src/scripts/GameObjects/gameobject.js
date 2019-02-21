import {Container} from "pixi.js";
export default class GameObject extends Container {
  constructor(game, x, y, width, height) {
    super();
    this.game = game;
    this.xpos = x;
    this.ypos = y;
    this.viewWidth = width;
    this.viewHeight = height;
    this.viewAspectX = this.game.renderer.width / this.game.viewWidth;
    this.viewAspectY = this.game.renderer.height / this.game.viewHeight;
    this.renderWidth = width  * this.viewAspectX;
    this.renderHeight = height * this.viewAspectY;
  }
  updateViewPos() {
    this.position.x = this.xpos * this.viewAspectX;
    this.position.y = this.ypos * this.viewAspectY;
  }
}