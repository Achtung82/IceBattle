const MOVE_SPEED = 4;
const GRAVITY = 10;

export const moveClimber = (climber, msSinceLastFrame) => {
  const deltaTime = msSinceLastFrame / 100;
  climber.xpos += (climber._right ? MOVE_SPEED * deltaTime : 0) + (climber._left ? -MOVE_SPEED * deltaTime : 0);
  climber.downSpeed += GRAVITY * deltaTime;
  climber.ypos += climber.downSpeed * deltaTime;
}