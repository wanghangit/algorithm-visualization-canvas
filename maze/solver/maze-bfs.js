window.onload = function () {
  const canvas = document.getElementById("app");
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  const ctx = canvas.getContext("2d");
  let delay = 10, step = delay;
  let width = canvas.width / m,
    height = canvas.height / n;
  let queue = []; // 存放位置的队列
  const data = new mazeData();
  const {maze, visited, result, entryX, entryY, targetX, targetY, inArea, ROAD, direction} = data;

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
    const entry = new Position(entryX,entryY, -1);
    queue.push(entry);
    while (queue.length>0){
      const cur = queue.pop();
      const { x, y } = cur;
      drawPath(ctx, x,y,true);
      if(x===targetX&&y===targetY){
        success(cur);
        break;
      }
      for (let i = 0; i < direction.length; i++) {
        let newX = x+direction[i][0], newY = y+direction[i][1];
        if(inArea(newX,newY)&&!visited[newX][newY]&&maze[newY][newX] === ROAD){
          visited[newX][newY] = true;
          queue.push(new Position(newX, newY, cur))
        }
      }
    }
  }

  function success(position) {
    while (position.prev){
      result[position.x][position.y] = true;
      position = position.prev;
    }
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
      if(result[x][y]){
        context.fillStyle = 'red';
      }
      drawRect(context, x * width, y * height, width, height)
    }, delay);
    delay += step;
  }
};



