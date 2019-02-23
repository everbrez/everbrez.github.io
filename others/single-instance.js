class Person {
  constructor(name) {
    this.name = name
  }

  say() {
    console.log(this.name)
  }
}

function construct() {
  let instance = null
  return function(target, arg) {
    if (instance) {
      return instance
    }
    return instance = Reflect.construct(target, arg)
  }
}

const PersonProxy = new Proxy(Person, {
  construct: construct()
})