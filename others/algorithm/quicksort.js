function quickSort(data = [], left = 0, right = data.length - 1) {
  if (left < right) {
    const center  = patition(data, left, right)
    console.log('center', center)
    quickSort(data, left, center)
    quickSort(data, center + 1, right)
  }
}

function patition(data, left, right) {
  let i = left, j = right + 1
  // cut point
  let v = data[left]
  while(true) {
    // scan left
    while(data[++i] <= v) if (i >= right) break
    // scan right
    while(data[--j] >= v) if (j <= left) break
    if (i >= j) {
      break
    }
    // exchange i and j
    [data[i], data[j]] = [data[j], data[i]]
  }
  [data[j], data[left]] = [data[left], data[j]]
  return j
}

const data = [2,23,47564,4,45,4,4,654,6,5,6,4543,53,4,3,43,5,-3,43,65,6,56,564,56, -4545, -23, -21,-23, -555555]

quickSort(data)
console.log(data.join())