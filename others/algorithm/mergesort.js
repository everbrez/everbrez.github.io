function mergeSort(data =[], left = 0, right = data.length - 1) {
  let center = Math.floor((left + right) / 2)
  if (left < right) {
    mergeSort(data, left, center)
    mergeSort(data, center + 1, right)
    merge(data, left, center, right)
  }
}

function merge(data = [], left, center, right, temp = []) {
  for(let k = left; k <= right; k++) {
    temp[k] = data[k]
  }

  for(let k = left, i = left, j = center + 1; k <= right; k++) {
    if (i > center) data[k] = temp[j++]
    else if (j > right) data[k] = temp[i++]
    else if (temp[i] < temp[j]) data[k] = temp[i++]
    else data[k] = temp[j++]
  }
}

const data = [2,23,4,45,4,4,654,6,5,6,4543,53,4,3,43,5,-3,43,65,6,56,564,56, -4545, -23, -21,-23]

mergeSort(data)
console.log(data)
