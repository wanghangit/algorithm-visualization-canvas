function compare(array, a, b) {
  return array[a]<=array[b];
}

function swap(array, a, b) {
  // array[a]^=array[b];
  // array[b]^=array[a];
  // array[a]^=array[b];
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}

function isSort(array) {
  for (let i = 1; i < array.length; i++) {
    if(array[i]<array[i-1]) return false;
  }
  return true;
}

function print(array) {
  let str = '';
  for (let i = 0; i < array.length; i++) {
    if(i!==array.length-1){
      str+=array[i]+',';
    }else{
      str+=array[i];
    }
  }
  console.log(str);
}

/**
 *
 * @param num 生成数组的数量
 * @param max 生成数组的最大值
 * @returns {Array}
 */
function crateArray(num, max) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr[i] = Math.ceil(Math.random() * (max - 1) + 1);
  }
  return arr;
}

/**
 * 绘制矩形
 * @param context
 * @param x
 * @param y
 * @param width
 * @param height
 */
function drawRect(context, x, y, width, height) {
  context.fillRect(x, y, width, height);
}

function drawSwap(context, index1, index2, array, canvasHeight, canvasWidth) {
  let width = canvasWidth/array.length;
  let step = 5;
  let x =
  context.clearRect(width * index1- 2,canvasHeight - array[index1], width - 2, array[index1]);
  requestAnimationFrame(drawSwap(context, index1, index2, array, canvasHeight, canvasWidth))
}

function copyArray(array) {
  return [].concat(array);
}


