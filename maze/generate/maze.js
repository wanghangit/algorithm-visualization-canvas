window.onload = function () {
  const canvas = document.getElementById("app");
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  let canvasHeight = canvas.height,
    canvasWidth = canvas.width;
  const ctx = canvas.getContext("2d");
  let data,
      queue,
      delay = 10,
      step = delay;

  main();

  /**
   * 执行的主方法
   */
  function main() {
    data = new MazeData(51, 51);
    console.log(data);
    const { direction, visited, maze } = data;
    drawMaze(maze);
    queue = new RandomQueue();
    queue.add(new Position(data.entryX, data.entryY+1));
    while (queue.size()>0){
      const cur = queue.remove();
      for (let i = 0; i < direction.length; i++) {
        let newX = cur.x+direction[i][0]*2,
          newY = cur.y+direction[i][1]*2;
        if(data.inArea(newX,newY)&&!visited[newX][newY]){
          visited[newX][newY] = true;
          setData(cur.x+direction[i][0], cur.y+direction[i][1]);
          drawMaze(copyArray(maze));
          queue.add(new Position(newX, newY))
        }
      }
    }
  }

  /**
   * 单纯的深度优先搜索遍历
   * @param x
   * @param y
   */
  function go(x, y) {
    const { direction, visited } = data;
    for (let i = 0; i < direction.length; i++) {
      let newX = x+direction[i][0]*2,
          newY = y+direction[i][1]*2;
      if(data.inArea(newX,newY)&&!visited[newX][newY]){
        visited[newX][newY] = true;
        setData(x+direction[i][0], y+direction[i][1]);
        drawMaze(copyArray(data.maze));
        go(newX,newY)
      }
    }
  }

  /**
   * 将路之间的墙打破
   * @param x
   * @param y
   */
  function setData(x ,y) {
    data.maze[x][y] = data.ROAD;
  }

  /**
   * 绘制迷宫
   * @param maze
   */
  function drawMaze(maze) {
    const { ROAD } = data;
    let width = canvasWidth / data.m;
    let height = canvasHeight / data.n;
    setTimeout(() => {
      for (let i = 0; i < data.n; i++) {
        for (let j = 0; j < data.m; j++) {
          if (maze[i][j] === ROAD) {
            ctx.fillStyle = 'white';
          } else {
            ctx.fillStyle = 'rgb(147,224,255)';
          }
          drawRect(ctx, width * j, height * i, width, height);
        }
      }
    }, delay);
    delay+=step;
  }
};
