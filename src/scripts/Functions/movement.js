const MOVE_SPEED = 8;
const GRAVITY = 15;
const MAX_FALL_SPEED = 60;

export const moveClimber = (climber, msSinceLastFrame) => {
  const deltaTime = msSinceLastFrame / 100;
  climber.xpos += (climber._right ? MOVE_SPEED * deltaTime : 0) + (climber._left ? -MOVE_SPEED * deltaTime : 0);
  if(climber.stand && !climber._right && !climber._left) {
    return;
  }
  climber.downSpeed += GRAVITY * deltaTime;
  if (climber.downSpeed > MAX_FALL_SPEED) {
    climber.downSpeed = MAX_FALL_SPEED;
  }
  climber.ypos += climber.downSpeed * deltaTime;
}