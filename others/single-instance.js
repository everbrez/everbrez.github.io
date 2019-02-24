function getSingle(fn) {
  let instance = null
  return new Proxy(fn, {
    construct(target, arg) {
      if (!instance) instance = Reflect.construct(target, arg)
      return instance
    },

    apply(...args) {
      if (!instance) instance = Reflect.apply(args)
      return instance
    }
  })
}
