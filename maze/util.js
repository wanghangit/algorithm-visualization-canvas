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

function copyArray(array) {
  return array.map((item) => {
    return [].concat(item);
  });
}
