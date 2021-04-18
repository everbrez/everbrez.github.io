---
layout: post
title: TypeScript
date:   2019-12-13
categories: JavaScript
tags: JavaScript
---

# 变量类型

- number
- string
- object
- boolean
- null
- undefined
- void
- never
- any
- string[] or Array<string>
- [string, number]
- enum

断言：
```ts
(variable as string).length
```

# interface
## 描述对象或函数

```ts
interface LabelValue {
  label: string;
  color?: number; // 可选属性，表示在某一些情况下存在，某一些情况下不存在
  readonly x: number; // 只读属性，与const区别：变量用const，属性用readonly
  arr: readonlyArray<T>; // 只读数组（将所有可变方法去掉）
  [propName: string]: any; // 字符串索引签名，定义其他额外属性
  reset(): void; // 函数成员
}

interface SearchFun {
  (source: string, substring: string): boolean;
}

interface StringArray {
  [index: number]: string;
  [otherProps: string]: string; // 二者可以同时存在，但是数字索引的返回值必须是字符串索引返回值类型的子集（包括extends等）
}
```

## 类 类型

```ts
interface ClockInterface {
  currentTime: Date; // 接口描述类的公共部分，不会检查私有成员; 同时此处是实例的成员，不检查类的静态成员
}

class Clock implements ClockInterface {
  currentTime: Date;
  constructor(h: number, m: number){}
}
```

## 继承接口

```ts
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

class Control {
  private state: any;
}

interface SelecableControl extends Control { // 接口可以继承类，包括其私有成员
  select(): void;
}
```

# 类

## 共有、私有与受保护的修饰符
- public
- private // 它不能在它的类外部访问；另外只有两个类的private来自同一处声明，才认为是兼容的，即可以相互赋值
- protected // 它在派生成员中还可以访问
- readonly

## 抽象类
abstract 一般用来定义抽象类以及抽象类内部的抽象方法，其本身不允许调用。

```ts
abstract class Animal {
  abstract makeSound(): void
  move(): void {
    console.log('move')
  }
}
```

当声明类的时候，实际上也声明了类的实例类型
```ts
class Point {
  x: number
  y: number
}

let point: Point = new Point();
```

# 函数

```ts
let add = function(x: number, y: number): number {return x + y}
// or
let add: (x: number, y: number) => number = function(x, y) {return x + y}
```

# this
可以为对象的函数成员的参数列表最前面提供一个this

```ts
interface Deck {
  createCardPicker(this: Deck): () => Card
}
```

## 重载

# 泛型

```ts
function identity<T>(arg: T): T {
  return arg
}

let output = identity<string>('hello') // 尖括号内容为显式告诉T为string

// 泛型类
class God<T> {
  value: T
}

// 泛型约束
interface Lengthwise {
  length: number
}

function identity<T extends Lengthwise>(arg: T): T {
  return arg.length
}
```

# enum

```ts
enum Direction {
  Up: 1,
  Down,
  Left,
  Right
}

// 字符串枚举：每一个成员都必须使用字符串字面量
enum Direction {
  Up: 'up',
  Down: 'down',
  Left: 'left',
  Right: 'right'
}
```




