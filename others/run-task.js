function run(taskDef) {
  const task = taskDef()

  // start run task
  let result = task.next()

  function step() {
    if (!result.done) {
      let promise = null
      if (result.value instanceof Promise) {
        promise = result.value
      } else {
        promise = Promise.resolve(result.value)
      }

      promise.then(value => {
          result = task.next(value)
          step()
        })
        .catch(err => {
          err => result = task.throw(err)
          step()
        })

    }
  }

  step()
}

function async1() {
  console.log('async1 end')
}

function async2() {
  console.log('async2 end')
}

run(function* () {
  yield async1()
  yield async2()
})

setTimeout(() => console.log('setTImeout'), 0)

Promise.resolve(2).then(() => console.log('promise1')).then(() => console.log('promise2'))
console.log('later')