
class Task {
  constructor(fn) {
    this.fn = fn
    this.next = null
  }

  after(next) {
    return this.next = next
  }

  passRequest(...args) {
    const res = this.fn(...args)
    if (res === false && this.next) {
      return this.next.passRequest(...args)
    }
    return res
  }

  finally(next) {
    
  }
}

let console1 = new Task(function(a){if(a > 500) return '500+'; return false})
let console300 = new Task(function(a){if(a > 300) return '300+'; return false})
let console2 = new Task(function(a){if (a > 200) return '200+';return false})
let console3 = new Task(function(a){if (a > 100) return '100+';return false})
let normal = new Task(function(a){return 'normal'})

console1.after(console300).after(console2).after(console3).after(normal)