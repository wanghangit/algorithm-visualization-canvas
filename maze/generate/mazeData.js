/**
 * 封装了绘制迷宫需要的数据
 */
class MazeData {
  constructor(n, m) {
    if (n % 2 === 0 || m % 2 === 0) {
      alert("传入的参数不能为偶数");
      return
    }
    let d = {
      n,
      m,
      entryX: 1,
      entryY: 0,
      targetX: n - 2,
      targetY: m - 1,
      direction: [[1, 0], [0, 1], [-1, 0], [0, -1]],
      ROAD: ' ',
      WALL: '#',
      maze: [],
      visited: [],
    };
    MazeData.init(d);
    Object.assign(this, d);
  }
  static init(d){
    for (let i = 0; i < d.n; i++) {
      d.maze[i] = [];
      d.visited[i] = [];
      for (let j = 0; j < d.m; j++) {
        if (i % 2 === 1 && j % 2 === 1) {
          d.maze[i][j] = d.ROAD;
        }else{
          d.maze[i][j] = d.WALL;
        }
        d.visited[i][j] = false;
      }
    }
    d.maze[d.entryX][d.entryY] = d.ROAD;
    d.maze[d.targetX][d.targetY] = d.ROAD;
  }

  inArea(x,y){
    return x>=0&&x<this.m&&y>=0&&y<this.n;
  }
}

/**
 * 实现一个随机可以在数组首尾添加删除元素的队列
 */
class RandomQueue{
  constructor(array = []){
    this.data = array;
  }
  remove(){
    if(Math.random()<0.5){
      return this.data.pop();
    }else{
      return this.data.shift();
    }
  }
  add(position){
    if(Math.random()<0.5){
      this.data.push(position);
    }else{
      this.data.unshift(position);
    }
  }
  size(){
    return this.data.length;
  }
}

class Position {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}
