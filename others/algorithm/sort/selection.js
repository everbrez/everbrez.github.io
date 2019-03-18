function selectionSort(arr = []) {
  if (!arr || !(arr instanceof Array)) return []

  for (let i = 0; i < arr.length; i++) {
    let min = i
    for (let j = i + 1; j < arr.length - 1; j++) {
      if (arr[j] < arr[min]) min = j
    }
    exchange(arr, i, min)
  }

  return arr
}

function exchange(arr, i, j) {
  return [arr[i], arr[j]] = [arr[j], arr[i]]
}

function random() {
  return Math.random().toString().slice(2)
}

function test() {
  const data = random().split('').map(num => +num + +random().substr(0, 2))
  const res = selectionSort(data)
  console.log(res === data.sort((a, b) => a - b))
}

for(let i = 0; i < 50; i++) test()