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