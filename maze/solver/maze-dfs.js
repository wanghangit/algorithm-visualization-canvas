window.onload = function () {
  const canvas = document.getElementById("app");
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  const ctx = canvas.getContext("2d");
  let delay = 10, step = delay;
  let width = canvas.width / m,
    height = canvas.height / n;
  const data = new mazeData();
  const {maze, visited, entryX, entryY, targetX, targetY, inArea, ROAD, direction} = data;

  main();

  /**
   * 绘制迷宫
   * @param array
   */
  function drawMaze(array) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (array[i][j] === ROAD) {
          ctx.fillStyle = 'white'
        } else {
          ctx.fillStyle = 'rgb(147,224,255)'
        }
        drawRect(ctx, j * width, height * i, width, height);
      }
    }
    ctx.fill();
  }

  /**
   * 执行走迷宫主方法
   */
  function main() {
    drawMaze(maze);
    if (!go(entryX, entryY)) {
      alert("迷宫没有解");
    }
  }

  /**
   * 走迷宫的每一步
   * @param x
   * @param y
   * @returns {boolean}
   */
  function go(x, y) {
    visited[x][y] = true;
    drawPath(ctx, x, y, true);
    if (x === targetX && y === targetY) return true;
    for (let i = 0; i < direction.length; i++) {
      let x0 = x + direction[i][0], y0 = y + direction[i][1];
      if (inArea(x0, y0) && maze[y0][x0] === ROAD && !visited[x0][y0]) {
        if (go(x0, y0)) {
          return true;
        }
      }
    }
    drawPath(ctx, x, y, false);
    return false;
  }

  /**
   * 绘制迷宫路径
   * @param context
   * @param x
   * @param y
   * @param isPath
   */
  function drawPath(context, x, y, isPath) {
    setTimeout(() => {
      if (isPath) {
        context.fillStyle = 'yellow';
      } else {
        context.fillStyle = 'white';
      }
      drawRect(context, x * width, y * height, width, height)
    }, delay);
    delay += step;
  }
};



