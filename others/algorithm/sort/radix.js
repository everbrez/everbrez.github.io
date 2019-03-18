function radixSort(arr = []) {
  let buckets = []
  for(let i = 0; i < 10; i++) {
    buckets[i] = []
  }

  const max = Math.max(...arr).toString().length

  for(let i = 0; i <= max; i++) {
    for(let i = 0; i < arr.length; i++) {
      let num = arr[i].toString()
      let digit = num[num.length - i - 1]
      digit = digit === undefined ? 0 : digit
      buckets[digit].push(arr[i])
    }

    let i = 0
    let j = 0
    while(i < arr.length) {
      while(buckets[j].length > 0) {
        arr[i++] = buckets[j].shift()
      }
      j++
    }
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

for(let i = 0; i < 50; i++) test(radixSort)