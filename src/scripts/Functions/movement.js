const MOVE_SPEED = 10;
const GRAVITY = 16;
const MAX_FALL_SPEED = 60;

const decreaseValue = (value, delta) => {
  const absValue = Math.abs(value);
  if(absValue <= delta) {
    return 0;
  }
  return Math.sign(value) * (Math.abs(value) - delta);
}

export const moveClimber = (climber, msSinceLastFrame) => {
  const deltaTime = msSinceLastFrame / 100;
  climber.xpos += (climber._right ? MOVE_SPEED * deltaTime : 0) + (climber._left ? -MOVE_SPEED * deltaTime : 0) + climber.sideSpeed * deltaTime;
  if(climber.xpos > 500) {
    climber.xpos -= 500;
  } else if(climber.xpos < 0) {
    climber.xpos += 500;
  }
  climber.sideSpeed = decreaseValue(climber.sideSpeed, deltaTime * 8);
  if(climber.stand && !climber._right && !climber._left) {
    return;
  }
  climber.downSpeed += GRAVITY * deltaTime;
  if (climber.downSpeed > MAX_FALL_SPEED) {
    climber.downSpeed = MAX_FALL_SPEED;
  }
  climber.ypos += climber.downSpeed * deltaTime;
}