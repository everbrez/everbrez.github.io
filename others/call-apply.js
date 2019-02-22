Function.prototype.myCall = function(context = window, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }
  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result
}

Function.prototype.myApply = function(context = window, args) {
  if (typeof this !== 'function') {
    throw new Error('not a function')
  }

  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result
}

Function.prototype.bind = function(context = window, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }

  const that = this
  return function F(...arguments) {
    if (this instanceof F) {
      return new that(...args, ...arguments)
    }
    return that.call(context, ...args, ...arguments)
  }
}

// new

function create(Con, ...args) {
  const obj = {}
  Object.setPrototypeOf(obj, Con.prototype)
  const result = Con.call(obj, ...args)
  return result instanceof Object ? result : obj
}

