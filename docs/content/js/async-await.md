# async - await

async是Generator 函数的语法糖

```js
    // 声明一个生成器函数
    function* foo (x) {
        yield x + 1;
        yield x + 2;
        yield x + 3;
        return x + 4;
        yield x + 5;
    }

    let bar = foo(100); // 返回的是一个生成器函数的实例
    bar.next();
    // { value: 101, done: false } 每次调用实例的next方法就会返回一个对象，包含了yield的值和是否可继续调用next
    // 执行到return语句的时候，剩下的yield不再执行
```