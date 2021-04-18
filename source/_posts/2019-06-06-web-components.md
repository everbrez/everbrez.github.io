---
layout: post
title: web components
date:   2019-06-06
categories: frontend
tags: frontend
---

Web Component 包含了以下三个技术：

1. Custom Element: 可以定义自定义的元素，如 `<my-button></my-button>`，特点是包含一个中划线`-`
2. ShadowDOM: 封装html和css
3. HTML Templates: 使用`<template>`标签来定义一个html fragment，但是他们不立即渲染，只有用到他们的时候才会渲染。
4. （未实现）HTML Modules

<!--more-->

> 需要注意的是，上面的技术都是独立的，就是可以单独使用其中一种技术，也可以结合起来使用，还可以结合现在类似React、Vue等库来使用。

# Reference

1. [an-introduction-to-web-components](https://css-tricks.com/an-introduction-to-web-components/)

# Custom Element

我们可以通过浏览器提供的API来定义自定义的html标签，实现类似原生`<section>`、`<video>`等功能。
与原生html标签不同的是，自定义的标签具有中划线`-`，如：`<my-slider>`。（可以参考youtube的html源码，里面多处用到Custom Element）

Custom-Element可以定义他们自己的语义、标志、行为，并且可以跨浏览器和框架运行。

```js
class myButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <button>
        custom-button:
        ${this.innerHTML}
      </button>
    `
  }
}

customElements.define('my-button', myButton)
```

# Shadow DOM

Shadow DOM 可以用来封装 DOM，可以让用户更好地与其他html分离html fragment（类似组件化）

一个Shadow DOM 可以包含html代码、css样式等。

对比与 Light DOM: 
1. Shadow DOM 不能使用`document.querySelector`或者`element.querySelector`来获取，需要使用`shadowRoot.querySelector`来获取里面的元素
2. shadowRoot 是一段html fragment

```js

const myButtonShadowRoot = document.querySelector('#my-button').attachShadow({mode: 'open'})
// mode: open means that you can refer shadowRoot with `element.shadowRoot` property
// if set mode to closed, then use `element.shadowRoot` will return null

myButtonShadowRoot.innerHTML = `
  <style>
    button {
      border: none;
      background: none;
      background: tomato;
      color: white;
      border-radius: 5px;
      padding: .5em 2em;
      box-shadow: none;
    }
  </style>
  <button>
    <slot></slot>
  </button>
`
```

# HTML Template

使用`<template>`可以定义 HTML Template，在`<template>`中的代码不会马上渲染，而是在后面使用，可以提高代码的复用性

```html
<template id="book-template">
  <li>
    <a class="link"></a>
  </li>
</template>

<ul class="book-container"></ul>
```

```js
const books = [{
    title: 'book1',
    link: 'link to book1'
  },
  {
    title: 'book2',
    link: 'link to book1'
  },
  {
    title: 'book3',
    link: 'link to book1'
  }
]

const fragment = document.querySelector('#book-template')
const container = document.querySelector('.book-container')

books.forEach(book => {
  const instance = document.importNode(fragment.content, true)
  instance.querySelector('.link').innerText = book.title
  instance.querySelector('.link').href = book.link
  container.append(instance)
})
```