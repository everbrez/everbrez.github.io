const target = {
  name: 'foo'
}

const proxy = new Proxy(target, {
  getPrototypeOf(target) {
    return 2333
  }

})

// you can change the property exited in target wharever you want
proxy.name = 'mike'

// when you assign a string to a property that do not exited in target
// you will get a TypeError
proxy.count = 'foo' // error
