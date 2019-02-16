class Heap {
  constructor() {
    this.heap = []
    this.size = 0
  }

  insert(item) {
    let i
    for (i = ++this.size; this.heap[Math.floor(i / 2)] > item; i = Math.floor(i / 2)) {
      this.heap[i] = this.heap[Math.floor(i / 2)]
    }

    this.heap[i] = item
  }

  deleteMin() {
    const min = this.heap[1]
    this.size -= 1
    let i = 1
    while(2 * i <= this.size) {
      if (this.heap[2 * i] > this.heap[2 * i + 1]) {
        this.heap[i] = this.heap[2 * i + 1]
        i = 2 * i + 1
      } else {
        this.heap[i] = this.heap[2 * i]
        i = 2 * i
      }
    }
    if (i < this.size) this.heap[i] = this.heap[this.size + 1]
    this.heap.length--
    return min
  }
}

const heap = new Heap()
heap.insert(2)
heap.insert(4)
heap.insert(90)
heap.insert(6)
heap.insert(1)

