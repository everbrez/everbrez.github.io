function mergeSort(arr = [], left = 0, right = arr.length - 1) {
  if(left >= right) return 
  let mid = left + ((right - left) >> 1)

  mergeSort(arr, left, mid)
  mergeSort(arr, mid + 1, right)
  merge(arr, left, mid, right)
  return arr
}

function merge(arr, left, mid, right) {
  let arrCopy = []
  for(let i = left; i <= right; i++) {
    arrCopy[i] = arr[i]
  }

  let j = left, k = mid + 1

  for(let i = left; i <= right; i++) {
    if(j > mid) arr[i] = arrCopy[k++]
    else if(k > right) arr[i] = arrCopy[j++]
    else if(arrCopy[j] > arrCopy[k]) arr[i] = arrCopy[k++]
    else arr[i] = arrCopy[j++]
  }

  return arr
}


function random() {
  return Math.random().toString().slice(2)
}

function test(sort) {
  const data = random().split('').map(num => +num + +random().substr(0, 2))
  const res = sort(data)
  console.log(res === data.sort((a, b) => a - b))
}

for(let i = 0; i < 50; i++) test(mergeSort)