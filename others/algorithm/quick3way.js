function quick3Way(data = [], left = 0, right = data.length - 1) {
  if (left < right) {
    const [lt, gt] = partition(data, left, right)
    quick3Way(data, left, lt - 1)
    quick3Way(data, gt + 1, right)
  }
}

function partition(data, left, right) {
  let lt = left, gt = right, v = data[left]
  let i = lt + 1
  while(i <= gt) {
    console.log(i, gt, lt)
    if (data[i] < v) {
      [data[i], data[lt]] = [data[lt], data[i]]
      i++
      lt++
    } else if (data[i] > v) {
      [data[i], data[gt]] = [data[gt], data[i]]
      gt--
    } else {
      i++
    }
  }
  return [lt, gt]
}

const data = [2,23,47564,4,45,4,4,654,6,5,6,4543,53,4,3,43,5,-3,43,65,6,56,564,56, -4545, -23, -21,-23, -555555]

quick3Way(data)
console.log(data.join())