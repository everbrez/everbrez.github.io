const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class MyPromise {
  constructor(fn) {
    this.state = PENDING
    this.value = null
    this.resolvedCallbacks = []
    this.rejectedCallbacks = []

    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
    this.then = this.then.bind(this)

    try{
      fn(this.resolve, this.reject)
    } catch(err) {
      this.reject(err)
    }

  }

  resolve(value) {
    if (this.state === PENDING) {
      this.state = RESOLVED
      this.value = value
      this.resolvedCallbacks.map(fn => fn(this.value))
    }
  }

  reject(value) {
    if (this.state === PENDING) {
      this.state = REJECTED
      this.value = value
      this.rejectedCallbacks.map(fn => fn(this.value))
    }
  }

  then(onFulfilled, onRejected) {
    const that = this
    return new MyPromise(function(resolve, rejecte) {
      if (typeof onFulfilled !== 'function') {
        onFulfilled = v => v
      }
      if (typeof onRejected !== 'function') {
        onRejected = err => { throw err }
      }
  
      if (that.state === PENDING) {
        that.resolvedCallbacks.push(onFulfilled)
      }
  
      if (that.state === RESOLVED) {
        setTimeout(
          () => {onFulfilled(this.value)}
        , 0)
      }
  
      if (that.state === REJECTED) {
        setTimeout(() => {onRejected(this.value)}, 0)
      }
    })
  }

  catch(onRejected = e => {throw e}) {
    if (this.state === PENDING) {
      this.rejectedCallbacks.push(onRejected)
    }
    if (this.state === REJECTED) {
      onRejected(this.value)
    }
  }


}


let promise = new MyPromise((resolve) => {setTimeout(() => {resolve(2)},5000)})
promise.then(e => console.log(e)).then(e =>console.log(e))