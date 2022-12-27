# JavaScript 原型链

在javaScript中每一个对象都有各自的prototype，借助原型，我们可以访问自身没有拥有但是原型链上拥有的方法和属性实现委托。每一个函数都有一个prototype属性，每一个对象都有__proto__属性（非标准，浏览器私有属性），__proto__指向的事创建该对象的构造函数的原型。

那么接下来讨论一个老生常谈的问题，当我们在new一个构造函数时，js引擎内部发生了什么？

1. new 关键字，意味着对一个函数进行’构造调用‘，首先会创建一个新的对象，新对象的prototype指向了这个构造函数的原型
2. 执行函数体，构造函数的this指向了新创建的对象
3. 执行完毕后，如果没有显示return，则return新创建的对象。

实现一个instanceof吧！

```js

 // 例子
 const obj = {};
 obj instanceof Object; // true

function isInstanceOf (origin, target) {
    let prototype = Object.getPrototypeOf(origin);
    let isTrue = false;
    while (prototype != null) {
       if  (prototype !== target.prototype) {
           prototype = Object.getPrototypeOf(prototype);
       } else {
           isTrue = true;
           prototype = null;
       }
    }
    return isTrue;
}
```

## js __proto__

__proto__的值必须是对象或者null， 否则会被忽略掉，(本质上__proto__就是一对getter和setter)
```js
const obj = {};

obj.__proto__ = 1; // 先检查obj自身或者原型链上是否存在同名的属性，此处可以访问到原型链上的__proto__
// 之前提到过__proto__本质上是accessor，对其执行setter，会验证值的类型，如果合法，允许赋值。
// 不会在obj对象自身创建同名的__proto__属性。（如果原型链上没有__proto__），则对象自身会创建一个同名的属性。
```

`__proto__`是浏览器的私有属性，过去没有一个方法可以获取到对象的原型，所有各大浏览器厂商在对象身上实现了`__proto__`获取对象的原型，
从ES6开始该属性已经被更好的`getPrototypeOf`取代，但是为了兼容性考虑浏览器必须实现`__proto__`，在非浏览器上该属性是可选的。

`__proto__`不是一个对象的属性，是`Object.prototype`的访问器属性。也就是`Object.protype`属性的getter / setter;
`__proto__`是一种访问`[[prototype]]`的方式，而不是`[[prototype]]`本身。

1. `Object.create` 创建一个空对象，该对象内部的`[[protoType]]`会链接到prototype