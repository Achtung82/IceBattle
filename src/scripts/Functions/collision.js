export const boxCollission = (a, b) => {
  if (a.xpos < b.xpos + b.viewWidth &&
    a.xpos + a.viewWidth > b.xpos &&
    a.ypos < b.ypos + b.viewHeight &&
    a.viewHeight + a.ypos > b.ypos) {
    return {
      dx: 0,//Math.abs(a.xpos - b.xpos) - (a.viewWidth / 2 + b.viewWidth / 2), 
      dy: Math.abs(a.ypos - b.ypos) - (a.viewHeight / 2 + b.viewHeight / 2)
    }
  } else {
    return false;
  }
}

export const boxCollissions = (player, other) => {
  for (let i = 0; i < other.length; i++) {
    const collissionResult = boxCollission(player, other[i]);
    if (collissionResult) {
      player.xpos += collissionResult.dx;
      player.ypos += collissionResult.dy;
      if (player.downSpeed > 0) {
        player.stand = true;
        player.downSpeed = 0;
        return;
      }
    }
  }
  player.stand = false;
}