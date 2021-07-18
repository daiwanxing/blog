## typescript 学堂

1. typescript 是 javascript的superset，ts并不是一门的新的语言，它在js的基础上为js带来了只有静态语言拥有的相关特性，例如：泛型、类型检查、类型推断、接口以及多态、重载等等。

2. typescript 需要通过ts compiler 将其编译成js文件，在webpack中我们需要借助ts-loader将其编译成js文件.

3. 使用ts进行项目开发可以得到严格的类型检查，确保在开发的过程中能够及时发现数据类型不一致,访问属性undefined的bug


## typescript 类型注解

```ts
interface People {
    name: string
}

let numberScore: Array<number>;

let a:number = 123; // 声明变量a的值必须是一个number类型
let b:string = 'harmony'; // 声明变量b的值必须是一个string类型
let c:People = {
    // 要求变量c的值必须是一个people类型，而且要定义people类型下的属性
    name: "dwx"
}
// 定义变量d的值必须是一个函数，而且该函数需要返回一个string类型的值
let d: () => string = function () {
    return 'foo'
}
```

数组的两种声明

```ts
// 下面两种写法都是声明一个数组，并且数组每一项的值必须是number类型

let scoreNum: number [];

let scoreNum: Array<number>; // 泛型写法
```

```ts
interface Score {
    maxScore: number,
    minScore: number,
    midScore: number
}

// 数组的每一项都是一个score对象
let scoreNum: Array<Score>; 
```

## tuple

数组是将同一类型的数据聚合到了一起，而tuple定义了数组中不同类型的数据

```ts
const tuple: [number, string]; // 定义了tuple数组只能接收number和string两种类型的数据
```

## interface

接口类似于‘鸭子类型’或者‘结构化类型’，给定一个变量声明其属于某个interface，需要实现interface中定义的相关属性

```ts
interface Duck {
    readonly duckType: 'gray' | 'white', // 定义duckType为只读属性，而且类型只能是gray或者white
    age: number,
    gender?: string, // 可以不指定gender
    quack: (x: number, y:number, z?: number) => number // 定义 一个quack方法，返回的是一个number类型
}
``` 


## 类型推论

在typescript 中，如果没有明确指定值的类型，那么ts会自动推断出该值的类型

```ts

let name = 'foo' // string 自动将name推断成sstring类型，如果尝试赋值其他类型的值会编译失败

name = 1; // error 
```

## 联合类型

```ts
let midType = string | number; // 指定midType可以是string也可以是number
```

## 类型断言：手动指定一个值的类型

可以通过`as`关键字断言一个值的类型

## 