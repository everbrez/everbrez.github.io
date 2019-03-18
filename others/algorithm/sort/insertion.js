function insertionSort(arr = []) {
  if(!arr || !(Array.isArray(arr))) return []

  for(let i = 1; i < arr.length; i++) {
    let j = i
    while(j > 0 && arr[j] < arr[j - 1]) {
      exchange(arr, j, j - 1)
      j--
    }
  }

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

for(let i = 0; i < 50; i++) test(insertionSort)