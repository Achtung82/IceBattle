import { Container } from "pixi.js";
import { Platform } from "./platform.js";
import { platformCollission } from "../Functions/collision.js";

const randomInt = (min, max) => Math.floor(Math.random() * max) + min;

export class Stage extends Container {
  constructor(game) {
    super();
    this.game = game;
    this.platforms = [];
    this.moving = false;
  }
  createInitialPlatforms() {
    this.addPlatform(0, 480, 500);
    let yposition = 410;
    while (yposition > 30) {
      this.addPlatformForLevel(yposition);
      yposition -= 65;
    }
  }
  addPlatformForLevel(height) {
    for (let i = 0; i < 3; i++) {
      const xstart = randomInt(0, 400);
      const width = randomInt(50, 150);
      if (!platformCollission(xstart, height, width, this.platforms)) {
        this.addPlatform(xstart, height, width);
      }
    }
  }
  addPlatform(x, y, width) {
    const floor = new Platform(this.game, x, y, width);
    this.platforms.push(floor);
    this.game.updatable.push(floor);
  }
  update(currentTime, msSinceLastFrame) {
    if (this.moving) {
      this.platforms.forEach((platform) => {
        platform.ypos += 0.2 * msSinceLastFrame;
      });
      this.platforms.filter((platform) => platform.ypos > 500)
      .map((platform, index) => index).reverse()
      .forEach((i)=> {
        const platform = this.platforms.splice(i, 1)[0];
        const updIndex = this.game.updatable.indexOf(platform);
        this.game.updatable.splice(updIndex, 1);
        platform.destroy();
      });
      if (this.platforms[this.platforms.length - 1].ypos > 65) {
        this.addPlatformForLevel(0);
      }
    }
  }
}