function quick3Way(arr = [], left = 0, right = arr.length) {
  if(left >= right) return

  let i = left + 1
  let lf = left
  let gt = right
  const v = arr[left]
  while(i < gt) {
    if(arr[i] < v) exchange(arr, i++, lf++)
    else if(arr[i] > v) exchange(arr, i, gt--)
    else i++
  }

  quick3Way(arr, left, lf - 1)
  quick3Way(arr, gt + 1, right)
  return arr
}

function exchange(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}


function random() {
  return Math.random().toString().slice(2)
}

function test(sort) {
  const data = random().split('').map(num => +num + +random().substr(0, 2))
  const res = sort(data)
  console.log(res === data.sort((a, b) => a - b))
}

for (let i = 0; i < 50; i++) test(quick3Way)