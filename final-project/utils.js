export function render (bindDOM, eleItems) {
  console.log('進入 render');
  if (!eleItems) {
    console.log('沒達成 render 條件');
    return;
  }
  console.log('準備 render');
  bindDOM.innerHTML = eleItems;
}