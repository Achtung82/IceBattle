// export const edgeCollision = (newXValue, newYValue, container, width, height) => {
//   const heightRadie = (container.height / 2) + 1;
//   const widthRadie = (container.width / 2) + 1;
//   return newYValue < heightRadie ||
//     newXValue < widthRadie ||
//     newYValue > height - heightRadie ||
//     newXValue > width - widthRadie;
// }

// export const unitCollision = (x, y, container, otherUnits) => {
//   const rect1 = { x, y, height: container.height, width: container.width };
//   for (let i = 0; i < otherUnits.length; i++) {
//     const otherUnit = otherUnits[i];
//     const rect2 = otherUnit._container.getBounds();
//     if (rect1.x < rect2.x + rect2.width &&
//       rect1.x + rect1.width > rect2.x &&
//       rect1.y < rect2.y + rect2.height &&
//       rect1.height + rect1.y > rect2.y) {
//       const currentBounds = container.getBounds();
//       return {
//         dx: Math.abs(currentBounds.x - rect2.x) - rect1.height
//         , dy: Math.abs(currentBounds.y - rect2.y) - rect1.width
//       }
//     }
//   }
//   return false;
// }


export const boxCollission = (a, b) => {
  if (a.xpos < b.xpos + b.viewWidth &&
    a.xpos + a.viewWidth > b.xpos &&
    a.ypos < b.ypos + b.viewHeight &&
    a.viewHeight + a.ypos > b.ypos) {
    return {
      dx: 0, dy: Math.abs(a.ypos - b.ypos) - (a.viewHeight/2 + b.viewHeight/2)
    }
  } else {
    return false;
  }
}

export const boxCollissions = (player, other) => {
  for(let i = 0; i < other.length; i++) {
    const collissionResult = boxCollission(player, other[i]);
    if(collissionResult) {
      player.xpos += collissionResult.dx;
      player.ypos += collissionResult.dy;
      if(player.downSpeed > 0) {
        player.stand = true;
        return;
      }
    }
  }
  player.stand = false;
}