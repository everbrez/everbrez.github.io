function quickSort(arr, left = 0, right = arr.length - 1) {
  if(left >= right) return
  const v = arr[left]

  let i = left
  let j = right + 1

  while(true) {
    while(arr[++i] < v) if(i > right) break
    while(arr[--j] >= v) if(j <= left) break

    if(i >= j) break
    exchange(arr, i, j)
  }

  exchange(arr, j, left)
  quickSort(arr, left, j - 1)
  quickSort(arr, i, right)

  return arr
}

function quickSort2(arr = [], left = 0, right = arr.length - 1) {
  if(left >= right) return

  let i = left + 1
  let j = right
  const v = arr[left]
  while(true) {
    while(arr[i] < v) if(++i > right) break
    while(arr[j] >= v) if(--j <= left) break

    if(i >= j) break
    exchange(arr, i, j)
  }

  exchange(arr, left, j)

  quickSort2(arr, left, j - 1)
  quickSort2(arr, i, right)
  return arr
}

function exchange(arr, i, j) {
  return [arr[i], arr[j]] = [arr[j], arr[i]]
}


function random() {
  return Math.random().toString().slice(2)
}

function test(sort) {
  const data = random().split('').map(num => +num + +random().substr(0, 2))
  const res = sort(data)
  console.log(res === data.sort((a, b) => a - b))
}

for(let i = 0; i < 50; i++) test(quickSort2)