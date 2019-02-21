function run(taskDef) {
  const task = taskDef()
  let result = task.next()

  function step() {
    const {value, done} = result
    if (!done) {
      if (value instanceof Promise) {
        value.then(value => {result = task.next(value); step()})
      } else {
        Promise.resolve(value).then(value => {result = task.next(value); step()})
      }
    }
  }

  step()
}