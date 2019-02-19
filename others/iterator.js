function createIterator(items) {
  let i = 0
  return {
    next() {
      const done = i >= items.length
      const value = done ? undefined : items[i++]
      return {
        done,
        value
      }
    }
  }
}

const iterator = createIterator([1,2,3,4,5,6])