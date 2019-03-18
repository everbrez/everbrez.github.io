function bubbleSort(arr = []) {
  if(!arr || !(arr instanceof Array)) return []

  for(let j = arr.length - 1; j >= 0; j--) {
    for(let i = 1; i <= j; i++) {
      if(arr[i] < arr[i - 1]) exchange(arr, i, i - 1)
    }
  }

  return arr
}

function bubbleSort2(arr = []) {
  if(!arr || !(arr instanceof Array)) return []

  let swapped
  let lastUnsortIndex = arr.length - 1

  do {
    swapped = false

    for(let i = 1; i <= lastUnsortIndex; i++) {
      if(arr[i] < arr[i - 1]) exchange(arr, i, i - 1)
      swapped = true
    }
    
    lastUnsortIndex--

  } while(swapped)

  return arr
}

function exchange(arr, i, j) {
  return [arr[i], arr[j]] = [arr[j], arr[i]]
}

function random() {
  return Math.random().toString().slice(2)
}
const data = random().split('').map(num => +num + +random().substr(0, 2))

const res = bubbleSort2(data)

console.log(res === data.sort((a, b) => a - b))