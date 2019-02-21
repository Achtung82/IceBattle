import { Container } from "pixi.js";
import { Platform } from "./platform.js";

export class Stage extends Container {
  constructor(game) {
    super();
    this.game = game;
  }
  createInitialPlatforms() {
    const floor = new Platform(this.game, 0, 480, 500);
    this.game.platforms.push(floor);
    this.game.updatable.push(floor);

    const firstLevel = new Platform(this.game, 150, 430, 150);
    this.game.platforms.push(firstLevel);
    this.game.updatable.push(firstLevel);

    const secondLevel = new Platform(this.game, 320, 380, 100);
    this.game.platforms.push(secondLevel);
    this.game.updatable.push(secondLevel);
  }
  update(currentTime, msSinceLastFrame) {
    // Move stage upwards here
  }
}