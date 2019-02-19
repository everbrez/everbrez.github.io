const target = {
  name: 'foo'
}

const { proxy, revoke } = Proxy.revocable(target, {
  set(...args) {
    return Reflect.set(...args)
  }
})

proxy.name = 12
console.log(proxy.name)

revoke()

proxy.name = 233