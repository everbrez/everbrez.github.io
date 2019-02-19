---
layout: post
title:  "Javascript fundamental"
date:   2019-02-05 
categories: Javascript 
---

# javascript 中的基本类型

- undefined
- null
- number
- string
- boolean
- symbol
- object

> 需要注意的地方
- NaN属于number类型，且不等于自身，即

```javascript
NaN === NaN // false
Object.is(NaN,NaN) // true
```

- 对于基本类型来说，如果使用字面量的方式，那么这个变量只是一个字面量，只有在需要的时候才会转化为对应的类型，即

```javascript
const a = 11 // 此时a 为字面量，不是number类型
a.toString() // 在需要的时候才会转化成相应类型

// 顺便一提
11.toString() // SyntaxError
```

## typeof 操作符 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)

| Type                                                    | Result                   |
| :------------------------------------------------------ | :----------------------- |
| Undefined                                               | "undefined"              |
| Null                                                    | "object" (see below)     |
| Boolean                                                 | "boolean"                |
| Number                                                  | "number"                 |
| String                                                  | "string"                 |
| Symbol (new in ECMAScript 2015)                         | "symbol"                 |
| Host object (provided by the JS environment)            | Implementation-dependent |
| Function object (implements [[Call]] in ECMA-262 terms) | "function"               |
| Any other object                                        | "object"                 |

```javascript
typeof undefined // undefinded
typeof null // object
typeof 11 // number
// also
typeof(11) // number
typeof new Number(2) // object
typeof '11' // string
typeof true // boolean
typeof {} // object
typeof [] // object
typeof (() => {}) // function
typeof Symbol() // symbol
```

> 除了`null`与`function`外，其他都跟其类型相同

如果想要获得一个正确的类型，还可以使用`Object.prototype.toString.call()`来判断

```javascript
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(1) // "[object Number]"
Object.prototype.toString.call('1') // "[object String]"
Object.prototype.toString.call({}) // "[object Object]"
Object.prototype.toString.call(false) // "[object Boolean]"
Object.prototype.toString.call(Symbol()) // "[object Symbol]"
Object.prototype.toString.call(NaN) // "[object Number]"
Object.prototype.toString.call(undefined) // "[object Undefined]"

Object.prototype.toString.call([]) // "[object Array]"
// 另外
[].toString() // ''
[2,3].toString() // '2,3'

Object.prototype.toString.call(() => {}) // "[object Function]"
```

另外，在let、const以及class作用域中，如果在声明之前使用该变量，则会因为`temporal dead zone`而出现ReferenceError
对于没声明的变量则会返回`'undefined'`

**13.2.1** has an (informal?) note:[Ref: Why `typeof` is no longer “safe”](http://es-discourse.com/t/why-typeof-is-no-longer-safe/15)
> let and const declarations define variables that are scoped to the running execution context’s LexicalEnvironment. The variables are created when their containing Lexical Environment is instantiated but **may not be accessed** in any way until the variable’s LexicalBinding is evaluated. A variable defined by a LexicalBinding with an Initializer **is assigned the value of its Initializer’s AssignmentExpression when the LexicalBinding is evaluated, not when the variable is created**. If a LexicalBinding in a let declaration does not have an Initializer the variable is assigned the value undefined when the LexicalBinding is evaluated.

## instanceof 操作符 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)

> instanceof 操作符 检测一个构造器的`prototype`是否存在于一个object的`原型链`中，即 instanceof 操作符左边是一个普通对象，右边是一个构造器（must be callable，or will get a TypeError）

```javascript
let simpleString = 'string'
let stringObj = new String('string object')

simpleString instanceof Object // false
stringObj instanceof Object // true

let nonObj = Object.create(null)
nonObj instanceof Object // false
```

instanceof 操作符可以通过 `Symbol.hasInstance` 来改变行为

```javascript
class MyArray {
    static [Symbol.hasInstance](instance) {
           return Array.isArray(instance)
    }
}

[] instanceof MyArray // true
```

## 类型转换

类型转换一般有以下方法：

- 通过`Boolean()`、`Number()`、`String()`、`parseInt()`、`parseFloat()`等转型函数来进行转换
- 通过`四则运算符操作符`和`==操作符`来进行转换

### Boolean()

| 类型      | 转化成false的值 |
| :-------- | :-------------- |
| Boolean   | false           |
| String    | ''              |
| Number    | NaN 、 0        |
| Object    | null            |
| Undefined | undefined       |
> 其他都转换成true
> 在if语句中会自动执行Boolean进行类型转换

### Number()

| 输入      | 输出                                                                                                         |
| :-------- | :----------------------------------------------------------------------------------------------------------- |
| Boolean   | true => 1, false => 0                                                                                        |
| Number    | number => number                                                                                             |
| Null      | null => 0                                                                                                    |
| Undefined | undefined => NaN                                                                                             |
| String    | \`${number}\` => number(包含浮点，其中十六进制转化为等值的十进制，忽略八进制等前导零), '' => 0, other => NaN |
| Object    | 先调用valueOf()，按照前面规则，若得到NaN，再调用toString()，按照上述规则                                     |

> 一元操作符 `+`与`Number()`作用相同
> 在对象转基本类型的时候，可以使用`Symbol.toPrimitive`来控制其行为

```javascript
class obj {
  static [Symbol.toPrimitive]() {
    return 233
  }
}

obj + 1  // 234
```

### parseInt()、parseFloat()

与Number不同：

1. 忽略字符串前面空格，如果第一个非空格字符不是数字或负号，则返回`NaN`
2. 如果第一个非空格字符是数字，则解析至最后或者遇到非数字字符
3. parseInt能够很好识别十进制、十六进制（ES5不具有解析八进制能力），但是parseFloat只能解析十进制，遇到十六进制会返回0
4. parseInt可以提供第二参数来指定基数
5. 如果输入是`null`时，返回`NaN`
6. 如果输入是`''`时，返回`0`

### String()

1. 如果有`toString()`方法，则调用toString方法（没有参数）
2. 如果值是`null`或者`undefined`，则返回`'null'`或`'undefined'`

> 一般`null`和`undefined`没有`toString()`方法

### 操作符

- 对于加法操作符`+`，如果有一个操作数为字符串，则将另一个转换为字符串，然后拼接字符串
- 其他运算如果有一个操作数是字符串、布尔值、null或者undefined，先使用Number()转化为数值
- 对于`=`相等操作符与`!=`不相等操作符有
  1. 如果有一个操作符是布尔值，则比较前转化为数值
  2. 如果一个为字符串一个为数值，则先转化为数值
  3. 如果一个是对象一个不是，则先调用valueOf
  4. 如果两个都是对象，则比较他们是不是同一对象
  5. null == undefined
  6. 比较相等性之前，不能将`null`和`undefined`转化为其他值



> ES6 part

# 块状作用域
1. 变量提升机制，一般函数优先度 > 变量。`let`与`const`变量不提升
2. 使用块状作用域中的变量所在的代码块中（即块状作用域），在声明前变量语句执行之前，变量会处于临时死区。
3. 禁止重声明
4. 在临时死区中，即使是`typeof`操作符也会触发引用错误（ReferenceError）
5. 在`for-in`循环中，使用`const`声明变量不会报错，每次循环创建一个新的绑定
6. `let`与`const`定义的变量作用域全局作用域上的时候，会遮蔽全局变量而不会覆盖

# 字符集扩展
1. code point
2. 对于32bit的字符，`length` `charCodeAt` `/^.$/`出现错误
3. `String.fromCodePoint()`,`.codePointAt`,`.normalize()`
4. 正则修饰符`u`，使用了两个编码单元处理的字符可以当成一个字符处理。单元操作模式 => 字符模式
5. 可以使用正则来获得字符串的长度
6. 增加以下方法：
   1. includes()
   2. startsWith()
   3. endsWith() 都可以通过设置偏移量
   4. repeat()

# 正则

flag：

- g 全局模式
- i 不分大小写
- m 多行
- u unicode支持
- y sticky属性，表示是否可以设置index

属性：

- flags
- source
- lastIndex

方法：

- exec() 专门为捕获组设置的，接受一个参数，返回一个匹配项数组：第一个是整个模式匹配的字符串，其他是捕获组。同时还有index和input额外属性
- test() 返回布尔值

> 对于exec来说，如果设置了g标志，每次也只会返回一个匹配项。

# 模板字面量

## 标签模板

```js
let message = tag`Hello${' '}World` // tag 可以是一个函数
function tag(literals, ...substitution) {
  // literals 为一个数组，它表示被${}分隔的各个字符串
  // substitution是每一个${}求值后的value
  // 可以使用literals.raw[i] 获取相应的原生值，同String.raw
}
```

# 函数

函数的参数也位于临时死区，即前面一个参数默认值不能引用后面一个参数
**在setter中，不定参数只有一个**

```js
let object = {
  set name(...value) { // syntax error

  }
}
```

函数内部有两个方法`[[Call]]`和`[[Construt]]`
当使用`new`来调用的时候，使用`[[Construt]]`，否则通过`[[Call]]`

```js
function Person(name){
  if (this instanceof Person) {
    // 通过关键字 new 调用
  }
}
```

当时通过上述方法判断是否new调用会出现以下后果：

```js
let person = new Person()
Person.call(person) 
```

所以采用`new.target`来判断是否new调用，如果是new调用，target内容为操作符的目标，即Person

块状作用域中声明函数，处于临时死区

### 箭头函数

- 没有this、super、argument和new.target的绑定
- 不能通过new调用
- 没有原型
- 不能改变this的指向
- 没有argument的绑定，始终访问外围函数的argument对象

## 尾调用优化

```js
function doSomething() {
  return doSomething()
}
```

触发条件：

1. 尾调用不访问当前栈帧的变量
2. 在函数内部，尾调用处于最后一条语句
3. 尾调用的结果作为函数返回

# Object

## Object.is()

如果两个参数具有相同的类型且具有相同的值，则返回true

```js
Object.is(+0, -0) //false
Object.is(NaN, NaN) // true
```

## Object.assign()

mixin 混合

由于`Object.assign`使用了赋值操作，所以不能够将访问器属性复制到对象，最终会变成数据属性

`const descriptor = Object.getOwnPropertyDescriptor(object, key)`

## 自由属性枚举顺序

1. 数字键升序
2. 字符串按照加入顺序
3. symbol按照加入顺序

`Object.getOwnPropertyNames(obj)`

## 原型

`Object.getPropertyOf(obj)` 和 `setPropertyOf(obj)`

## super

super相当于对象原型的指针`Object.getPropertyOf(this)`
**如果在对象外的地方定义函数，使用super关键字会抛出 syntax error**
使用super的时候会调用函数的`[[HomeObject]]`属性获取原型，函数的`[[HomeObject]]`在定义的时候就确定了，所以就导致了下面的事情发生：

```js
const obj1 = {
  say() {
    super.say()
  }
}

Object.setPrototypeOf(obj1, {
  say() {
    console.log('obj1\'s prototype')
  }
})

const obj2 = {}
Object.setPrototypeOf(obj2, {
  say() {
    console.log('obj2\' prototype')
  }
})

obj2.say = obj1.say

const say = obj1.say

obj2.say() // obj1's prototype

say() // obj1's prototype
```

## 解构

非同名局部变量赋值

```js
const node = {
  name: 'foo',
  age: 2
}

const { name:localName, age:localAge } = node

console.log(localName, localAge) // foo 2
```

嵌套对象解构

```js
const node = {
  loc: {
    start: 2
  }
}

const { loc: {start}} = node
```

数组结构

```js
let colors = ['red', 'green', 'blue']

let [, , thirdColor] = colors
```

交换变量

```js
[a, b] = [b, a]
```

函数参数解构

```js
function test(name ,value, { secure, path }) {}
```

# Symbol

Symbol是一个原始值，所以不能使用new语法`new Symbol`(Type Error)，需要直接调用`const firstName = Symbol()`

创建Symbol的时候可以可选添加一段文本描述，这个文本描述存储在内部的`[[Description]]`中，只有使用`toString()`才能访问到

Symbol可以使用在：

1. 对象字面量属性名
2. `Object.defineProperty()`
3. `Object.defineProperties()`

**使用`Object.defineProperty()`和`Object.defineProperties()`创建新的属性时候，默认为false**

## Symbol 共享体系

`Symbol.for()`接受一个字符串参数，这个方法首先会在全局Symbol注册表中搜索键为参数的Symbol，如果存在，则返回已有Symbol，如果不存在，则创建一个新的Symbol

> symbol 不能转化为数字和字符串，所以在数字操作符中会报错，但是可以用在逻辑操作符中，其布尔等价值为true， 在 </>比较中，会将symbol转化为number，所以也不能使用

## 属性检索

一般可以通过下面的方法检索属性值

- Object.keys() 返回可枚举型
- Object.getOwnPropertyNames() 不考虑枚举一律返回
- Object.getOwnPropertySymbols() 检索对象中的symbol属性

## Well-konwn Symbol

- Symbol.hasInstance 执行instanceof时调用的内部方法，其为不可写不可配置不可枚举，需要用`Object.defineProperty`
- Symbol.isConcatSpreadable 一个布尔值，表示使用`concat`是否将集合规整到同一层级
- Symbol.iterator 返回迭代器
- Symbol.match 调用`String.prototype.match`时候调用方法，用于比较字符串
- Symbol.replace
- Symbol.search
- Symbol.species 创建派生类的构造函数
- Symbol.split 用于分割字符串
- Symbol.toPrimitive 返回对象原始值，传入一个hint
- Symbol.toStringTag 调用`toString`时候的方法
- Symbol.unscopables 定义一些不可被with语句引用的对象属性名称集合

```js
let hasLengthOf10 = {
  [Symbol.search]: function(vaue) {
    return value.legnth === 10 ? 0 : -1
  }
}

let message1 = 'hello world'
message1.search(hasLengthOf10)
```

# Set 与 Map

`in`操作符除了会检索对象中的属性，还会检索原型。

## Set

```js
let set = new Set()
```

在set中，不存在类型转换，（引擎内部采用Object.is来检测两个值是否一致）
**Set 可以接受所有可迭代对象作为参数，数组、Set集合、Map集合等都是可迭代的**

方法：

- add()
- has()
- delete()
- clear()
- forEach() 同数组方法，回调函数前两个参数相同，接受第二个参数（this的值）
```js
dataSet.forEach(function(){}, this)
```
- size

> 展开运算符可以将想Set集合的可迭代对象转换为数组

创建无重复元素新数组

```js
function eliminateDuplicates(items) {
  return [...new Set(items)]
}
```

## WeakSet

WeakSet 只存储对象的弱引用，并且不可以存储原始值。集合中的弱引用如果是对象唯一的引用，则会被回收并释放相应内存。

> 如果 Weak Set 中包含任何原始值，就会抛出错误Type Error

- WeakSet 不可迭代，所以没有for-of循环，forEach方法，keys和values方法，也没有clear方法
- 不支持size属性

## Map

Map的键名和对应的值支持所有的数据类型，键名的等价性是通过`Object.is()`方法进行判断的。

方法：

- set()
- get() 如果不存在则返回 undefined
- has(key)
- delete(key)
- clear()
- forEach() 同数组方法
- size

**Map同Set，可以通过传数组来初始化，其中每一个键值对都是一个数组**

## WeakMap

WeakMap是弱引用的Map集合，在WeakMap的键名必须是一个对象，如果使用非对象也会报错。如果在弱引用之外不存在其他强引用，GC会回收这个对象，同时会移除WeakMap中的键值对。
WeakMap键名对应的value是强引用，value可以是任何类型

- WeakMap也不支迭代，所以不支持 clear、forEach
- WeakMap可以用来创建私有数据


# 迭代器iterator和生成器generator

## generator

生成器是一种返回迭代器的函数，通过 function 关键字后的星号*来表示，函数还会用到新的关键字 yield

```js
function *generator() {
  const a = yield 1;
  console.log('a:',a) // 如果在外部不显式向 next 函数传入参数，则 yield 返回值永远为 undefined
  const b = yield 2;
  console.log('b:', b)
  const c = yield 3;
  console.log('c:',c)
}
```

每遇到一个`yield`语句都会停止，调用next方法的时候才会继续运行

**yield关键字只能在generator内部运行，与return关键字一样，不能穿透函数边界，所以即使写在函数内部定义的函数里面也会报错 sytax error**

> 不能使用箭头函数创建 生成器

### 可迭代对象

可迭代对象具有 `Symbol.iterator`属性，其可以通过指定函数返回一个作用于附属对象的迭代器。其可以影响`for-of`循环
> 如果将`for-of`循环用于不可迭代对象，null或undefined，会抛出错误 TypeError,而`for-in`就不会

一般自己创建的对象都是不可迭代的，需要添加`Symbol.iterator`来使其变成可迭代对象
```js
let collections = {
  *[Symbol.iterator]() {
    //code
  }
}
```

### 内建迭代器

对于三种可迭代对象：数组、Set集合、Map集合，有：

- entries() 返回一个迭代器，其值为多个键值对，Map的默认迭代器
- values() 返回一个迭代器，其值为集合的值，数组和Set的默认迭代器
- keys() 返回要给迭代器，其值为所有键名

```js
const colors  = ['red', 'yellow', 'blue']

for(let color of colors.values()) {
  console.log(color)
}
```

> 对于数组，`for-of`循环返回的是其数字类型的索引，`for-in`循环返回的是数组属性的索引（即如果给数组添加属性a，也会在for-in循环中遍历）

可以用解构语法在`for-of`循环中。

> 字符串也有迭代器，通过使用`for-of`循环可以输出支持unicode的字符

### Nodelist 迭代器

Nodelist也内置了迭代器，其行为与数组一致

### 高级迭代器功能

第一次调用`next()`方法的时候无论传进什么参数都会被丢弃。由于传给`next()`方法的参数会代替上一个yield的返回值，而第一次调用next的时候前不会执行任何的yield语句，所以第一次调用next方法的时候传递参数是毫无意义的

#### 在迭代器中抛出错误
`iterator.throw(new Error())`，这个函数可以返回类似next返回的值（但是如果内部error没有处理，就会导致代码停止执行）

#### 返回语句
在生成器中定义函数的返回语句，会使迭代器提早进入done状态，并且当状态为done的时候，value为return的返回值（只会出现一次，之后会重置为undefined）

> 展开运算符和`for-of`循环会直接忽略return语句的返回值，只要done状态变成true就会退出循环

#### 委托生成器
将两个迭代器合二为一
```js
function *colorGenerator() {
  yield 'red'
  yield 'blue'
  return 2 // 这个值不会输出
}

function *numGenerator(count) {
  for(let i = 0; i < count; i++) yield i
}

function *generator() {
  let count = yield *colorGenerator() // 其中 count 的值为 colorGenerator中的return值
  yield *numGenerator(count)
}

const iterator = generator()

// result
iterator.next()
// {value: "red", done: false}
iterator.next()
// {value: "blue", done: false}
iterator.next()
// {value: 0, done: false}
iterator.next()
// {value: 1, done: false}
iterator.next()
// {value: undefined, done: true}
```

> 也可以直接用于字符串，使用其默认迭代器 `yield *'Hello World'`

# class
属性只能在constructor上构建（React可以直接在class块内）
`typeof`返回`function`
1. 函数声明会提升，但是类声明和let、const一样不能被提升
2. 在类中，所有方法都是不可枚举的
3. 每一类都有一个名为`[[Construct]]`内部方法，而方法中不含有`[[Construct]]`，用new调用这些方法会导致报错（在对象中也是一样）
4. 使用除关键字`new`以外的语法会抛出错误TypeError
5. 在类中修改类名会导致报错，在一般函数上则不会报错。类名在类中为常量（类似与const声明）。
6. 类中可以使用`extends`语法
7. 在类中，`new.target`永远不为undefined，指向构造函数（extends中，在基类的构造函数和派生构造函数是一样的）

表达式声明与声明式声明区别：函数的name不同

命名类表达式（跟function 一样）：
```js
let personClass = class personClass2 {}

typeof personClass // function
typeof personClass2 // undefined，只能在class内部使用
```

另一种声明方式
```js
let person = new class {
  constructor(name) {
    this.name = name
  }

  say() {
    console.log('Hi ', this.name)
  }
}('foo')


```

## 访问器属性
```js
class {
  constructor(name) {
    this.name = name
  }

  get age() {
    return 12
  }

}
```

## 生成器方法
```js
class {
  *generator() {}
}
```

## super
1. 只能在派生的构造函数中使用super()，即使用的`extends`语法创建的类，否则会报错
2. 构造函数在访问this之前一定要使用super，它负责初始化this，否则会报错
3. 如果不想使用this只能让constructor返回一个对象，但是此时该对象不会继承prototype

**如果基类有静态成员，那么这个静态成员在派生类中也可使用**

ES5中传统继承内建对象：先由派生类型创建this，然后调用基类型的构造函数（Array.apply(this)）。这意味着this的值开始是指向派生类型的，但随后会被来自（Array）的其他属性修饰
ES6中的继承：先由基类创建this值，访问基类所有内建功能，然后再正确地接收所有与之相关的功能。

## Symbol.species
用于定义返回函数的静态访问器属性
以下内建类型均已定义：
- Array
- ArrayBuffer
- Map
- Set
- Promise
- RegExp
- Typed arrays

类似这样
```js
class MyClass {
  get [Symbol.species]() {
    return this
  }
}
```

> 一般来说，只想要在类中调用`this.constrctor`，就应该会使用`Symbol.species`属性

# 数组

- Array.of
- Array.from
- Array.prototype.find()
- Array.prototype.findIndex()

## Array.of
这个函数是为了解决ES5中 `new Array()`中的参数问题：如果输入的是一个数字，则变成数组的length，否则变成数组的元素
在`Array.of()`中，无论输入什么都会变成数组的元素
> Array.of 不通过 Symbol.species的值确定返回值类型，它使用当前构造函数的this值来确定正确的返回数据类型

## Array.from()
类数组 => 数组
接收一个**可迭代**对象或类数组对象作为第一个参数，最终返回一个数组，可用展开符来代替
接收第二个参数表示映射，即类似 value => value + 1
接收第三个参数表示映射函数的this值

## find() 和 findIndex()
===--> 与 indexOf 和 lastIndexOf
二者都接收两个参数，一个为回调函数，另一个为回调函数的this值。回调函数的参数值与map一致
如果符合查找的值，返回true。find会返回查找到的值，findIndex会返回查找的Index

## fill()
接收三个参数，填充的值，开始索引（包含），结束索引（不包含），如果为负数则加上数组长度

## copyWithin()
接收三个参数，第一个是开始填充值的索引位置，第二个是开始复制值的索引位置，第三个为指定停止复制值的位置
> 如果只指定两个，就会从复制值索引开始直到没有更多可复制的值为止。

## 定型数组 typed array
这是一种用于处理数值类型数据的专用数组，将任何数字转换为一个包含数字比特的数组

定型数组支持存储和操作以下8中数据类型

- int8
- uint8
- int16
- uint16
- int32
- uint32
- bigInt64
- bigUInt64
- float32
- float64

### 数组缓冲区 ArrayBuffer
```js
let buffer = new ArrayBuffer(10) // 分配 10Byte
buffer.byteLength //10
let buffer2 = buffer.slice(3,4)
buffer2.byteLength // 1
buffer.byteLength // 10
```
> 数组缓冲区包含的实际字节在创建时就已经确定，可以修改缓冲区数据，但是不能改变缓冲区的尺寸大小

### 视图 DataView
视图是用来操作内存的接口，视图可以操作数组缓冲区或者缓冲区字节的子集，并按照其中一种数据类型来读取和写入数据。
支持上述8种数据类型
```js
let view = new DataView(buffer, 0, 8)
```
DataView接收三个参数：buffer，开始索引，数量
view属性
- buffer
- bufferOffset
- byteLength

#### 读取和写入数据
get 方法接收两个参数：读取数据时的偏移量，可选布尔值，表示是否按照小序端进行读取。
set 方法接收三个参数：写入数据偏移量，写入的值，可选布尔值

- getInt8()
- setInt8()
- getUint8()
- setUint8()
- ...
- getFloat32()
- getFloat64()

#### 定型数组即视图
构造器
- Int8Array
- Uint8Array
- ...

# Promise

## 异步编程
事件模型
```js
element.onclick = function() {}
```
回调模型
```js
// nodejs
readFile('file.txt', function(err, data) {
  if (err) throw err
  console.log(data)
})
```

问题：回调地狱、实现并行执行两个操作，同时完成的时候通知或者优先完成的通知

## Promise的生命周期
1. pending
2. Fulfilled / Rejected

内部属性`[[PromiseStatus]]`被用来表示Promise的三种状态`pending, fulfilled, rejected`

方法：
- then() 第一个为处理fulfilled状态的，第二个为处理rejected状态的
- catch() 发生错误使触发状态的
- finally() 无论是fulfilled还是rejected都会触发
> 如果一个Promise处于已处理状态，在这之后添加到任务队列中的处理程序仍将执行，会将其添加到任务队列中。

- Promise.resolve()
- Promise.reject()
> 如果向上面两个函数传进去一个Promise，则会把这个promise直接返回
> 如果是非Promise的thenable对象（拥有then方法并且接收resolve和reject这两个参数的普通对象），
> 那么这些方法会创建一个新的Promise，并在then函数中被调用
```js
let thenable = {
  then(resolve, reject) {
    reject(23)
  }
}

// let p0 = Promise.resolve(2)

let p = Promise.resolve(thenable)
// p status:rejected value:23
```

## 错误处理
对于一些没有拒绝处理程序的Promise，JavaScript没有强制报错(浏览器在最新版本报错)
在nodejs中，处理Promise拒绝时会触发process对象上两个事件
- unhandledRejection 在一个事件循环中
- rejectionHandled 在一个事件循环后
function(reason, promise){}

在浏览器中，触发window上的两个事件：
- unhandledrejection
- rejectionhandled
function(type, promise, reason)

## 多个Promise
- Promise.all()，接收一个可迭代对象，如数组，then返回的value是一个数组，如果一个被拒绝，那么整个promise就会立即进入拒绝状态
- Promise.race()，参数同上，如果有一个位于完成状态就会触发fulfilled或者rejected状态


# Proxy and Reflection

调用`new Proxy()`可创建代替其他目标（target）对象的代理，它虚拟化了目标，所以二者看起来功能一致。
代理可以拦截JavaScript引擎内部目标的底层对象操作，这些底层操作被拦截后会触发相应特定操作的陷阱函数。
每一个代理陷阱对应着一个命名和参数都相同的Reflect方法。

代理陷阱（traps）
1. get  read
2. set  write
3. has  in operator
4. deleteProperty delete operator
5. getPrototypeOf Object.getPrototypeOf
6. setPrototypeOf Object.setPrototypeOf
7. isExtensible Object.isExtensible
8. preventExtensions  Object.preventExtensions
9. getOwnPropertyDescriptor Object.getOwnPropertyDescriptor
10. defineProperty  Object.defineProperty
11. ownKeys Object.keys()/Object.getOwnPropertyNames()/Object.getOwnPropertySymbols()
12. apply 调用一个函数
13. construct 用new调用一个函数

> 不适用陷阱的处理程序等价于简单的转发处理

## set trap
接收4个参数
- trapTarget 代理的目标对象
- key
- value
- receiver 操作发生的对象（通常是代理）

```js
const target = {
  name: 'foo'
}

const proxy = new Proxy(target, {
  set(trapTarget, key, value, receiver) {
    // only change to own property
    if (!trapTarget.hasOwnProperty(key)) {
      if (typeof value !== 'number' || isNaN(value)) {
        throw TypeError('must be number')
      }
    }

    return Reflect.set(trapTarget, key, value, receiver)
  }
})

// you can change the property exited in target wharever you want
proxy.name = 'mike'

// when you assign a string to a property that do not exited in target
// you will get a TypeError
proxy.count = 'foo' // error

```

Reflect是set陷阱对应的反射方法和默认特性，它和set代理陷阱一样接受相同的4个参数。
如果属性已设置陷阱应该返回true，如果未设置返回false

## get trap

- trapTarget
- key
- receiver

## has trap

- trapTarget
- key

## deleteProperty trap
如果成功返回true，如果失败返回false
- trapTarget
- key

## 原型代理
### setPrototypeOf
- trapTarget
- proto
> 如果操作失败返回一定是false，此时Object.setPrototypeOf()会报错
### getPrototypeOf
- trapTarget
> getPrototypeOf必须返回对象或者null
> 返回值检查可以确保Object.getPrototypeOf()返回的总是预期的值

> Object.getPrototypeOf如果传进一个非对象值，会强制转化成对象
> 但是Reflect.getPrototypeOf传进一个非对象值，会报错

## 对象可扩展性陷阱
### preventExtensions & isExtensiable
二者都接收一个参数，如果成功返回true，如果失败返回false
- trapTarget

## 属性描述符陷阱
### defineProperty
- target
- key
- descriptor

> 无论什么对象传进去defineProperty，都只有属性：configurable,enumerable,value,writable,set,get,多余的将会设置为undefined
**返回值为false或者true**，其中false时候会抛出错误
Object.defineProperty 返回第一个参数，即target
### getOwnPropertyDescriptor
- trapTarget
- key

> 返回一个对象，null或者undefined，对象中（descriptor）不允许出现除了上述属性外的属性，否则报错
> 若调用 `Reflect.getOwnPropertyDescriptor`传入原始值，会抛出抛出一个错误
> 但是调用`Object.getOwnPropertyDescriptor`传入原始值，会强制转化成对象

```js
let descriptor = Object.getOwnPropertyDescriptor(2, 'name') // undefined

let descriptor = Reflect.getOwnPropertyDescriptor(2, 'name') // throw Error
```

## ownKeys trap
