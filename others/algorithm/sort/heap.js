class Heap {
  constructor() {
    this.data = [0]
    this.size = 0
  }

  insert(item) {
    if (this.size <= 0) {
      this.data[1] = item
      this.size += 1
      return true
    }

    let i = this.size + 1
    while ((i >> 1) >= 1 && this.data[i >> 1] > item) {
      this.data[i] = this.data[i >> 1]
      i = i >> 1
    }

    this.data[i] = item
    this.size++

    return true
  }

  pop() {
    if (this.size <= 0) return
    const min = this.data[1]
    this.data[1] = this.data[this.size--]
    this.data.length = this.size + 1

    let i = 1
    while (2 * i <= this.size) {
      const left = 2 * i
      const right = 2 * i + 1
      let k = left
      if(this.data[left] < this.data[right]) k = left
      else k = right

      if(k > this.size || this.data[i] < this.data[k]) break
      [this.data[i], this.data[k]] = [this.data[k], this.data[i]]
      i = k
    }
    return min
  }
}

const heap = new Heap()

heap.insert(3)
heap.insert(23)
heap.insert(3213)
heap.insert(-3)
heap.insert(13)
heap.insert(323)
heap.insert(523)
