# reflect 的作用

ES5中的Object对象有一个defineProperty属性，为JS语言提供了’元编程‘的功能，但Object这个对象太重了，有二十多个属性，而且’元编程‘操作不应该是一个Object对象应该做的事情，所以ES6单独设计出了proxy和reflect两个方法。Reflect主要是可以对对象进行’元编程‘，可以根据操作的结果返回一个布尔值判断是否操作成功；

::: warning 警告
Reflect和Proxy 都是由Object原型构造的，两者都不能派生（new）新的实例，它们都是一个全局的对象；
:::