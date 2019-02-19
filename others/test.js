const a = {}
a[Symbol.iterator] = function *() {
  yield 23
  yield 21
  yield 10
}

const b = [...a]

console.log(b)