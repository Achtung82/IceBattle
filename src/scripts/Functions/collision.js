export const boxCollissionWithParameters = (x, y, width, b) => {
  if (x < b.xpos + b.viewWidth &&
    x + width > b.xpos &&
    y < b.ypos + b.viewHeight &&
    20 + y > b.ypos) {
    return true;
  } else {
    return false;
  }
}

export const platformCollission = (x, y, width, platforms) => {
  for(let i= 0; i < platforms.length; i++) {
    if(boxCollissionWithParameters(x, y, width, platforms[i])) {
      return true;
    }
  }
  return false;
}

export const boxCollission = (a, b) => {
  if (a.xpos < b.xpos + b.viewWidth &&
    a.xpos + a.viewWidth > b.xpos &&
    a.ypos < b.ypos + b.viewHeight &&
    a.viewHeight + a.ypos > b.ypos) {
    if (a.xpos + a.viewWidth - b.xpos < 3) {
      return {
        dx: Math.abs(a.xpos - b.xpos) - a.viewWidth,
        dy: 0
      }
    } else if(b.xpos + b.viewWidth - a.xpos < 3) {
      return {
        dx: Math.abs(b.viewWidth + b.xpos - a.xpos),
        dy: 0
      }
    }
    return {
      dx: 0,
      dy: Math.abs(a.ypos - b.ypos) - (a.viewHeight / 2 + b.viewHeight / 2)
    }
  } else {
    return false;
  }
}

export const resolvePlatforms = (player, other) => {
  for (let i = 0; i < other.length; i++) {
    const collissionResult = boxCollission(player, other[i]);
    if (collissionResult) {
      if (collissionResult.dy) {
        if (player.downSpeed > 0) {
          player.ypos += collissionResult.dy;
          player.stand = true;
          player.downSpeed = 0;
          return;
        } else if (player.downSpeed < 0) {
          player.stand = false;
          player.ypos -= collissionResult.dy;
          player.downSpeed = -player.downSpeed * 0.5;
        }
      } else if (collissionResult.dx) {
        if (collissionResult.dx < 0 && player._right) {
          player.xpos += collissionResult.dx;
          player.sideSpeed = -15;
        } else if(collissionResult.dx > 0 && player._left) {
          player.xpos += collissionResult.dx;
          player.sideSpeed = 15;
        }
      }
    }
  }
  player.stand = false;
}