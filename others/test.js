class MyClass {
  get [Symbol.species]() {
    return MyClass
  }
}

class MyClass2 extends MyClass {
  
}