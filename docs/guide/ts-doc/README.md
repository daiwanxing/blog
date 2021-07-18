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

## 联合类型（union）

```ts
let midType = string | number; // 指定midType可以是string也可以是number
```

## 类型断言：手动指定一个值的类型

可以通过`as`关键字断言一个值的类型

## 类和接口

ts 中对类定义进行了增强 （public, private, protected）

## implements 实现接口

interface将一些共性的东西抽取到接口中，通过类的implements 实现该接口

```ts
class Car {
    videoName: string
    constructor (name: string) {
        this.videoName = name;
    }
    playVideo () {
        console.log('play video: ', this.videoName);
    }
    pauseVideo () {
        console.log('pause video: ', this.videoName);
    }
}

class CellPhone {
    videoName: string;
    constructor (name: string) {
        this.videoName = name
    }
    playVideo () {
        console.log('play video: ', this.videoName);
    }
    pauseVideo () {
        console.log('pause video: ', this.videoName);
    }
}
```

Car和CellPhone两个类都具有播放video和暂停video的方法，应该将公共的功能提取出来，方便维护扩展，但是Car和CellPhone并没有相关联的联系，
也无法将播放video和暂停video的方法提取到一个彼此的父类中。我们可以通过将其定义到interface来实现复用。

```ts {8,21}
interface Video {
    videoName: string,
    playVideo(): void,
    pauseVideo(): void
}


class Car implements Video {
    videoName: string
    constructor (name: string) {
        this.videoName = name;
    }
    playVideo () {
        console.log('play video: ', this.videoName);
    }
    pauseVideo () {
        console.log('pause video: ', this.videoName);
    }
}

class CellPhone implements Video {
    videoName: string;
    constructor (name: string) {
        this.videoName = name
    }
    playVideo () {
        console.log('play video: ', this.videoName);
    }
    pauseVideo () {
        console.log('pause video: ', this.videoName);
    }
}
```

implements 可以实现多个接口

```ts {5}
    interface Battery {
        chargeBattery (chargeVal: number):number
    }

    class CellPhone implements Video, Battery {
    videoName: string;
    constructor (name: string) {
        this.videoName = name
    }
    playVideo () {
        console.log('play video: ', this.videoName);
    }
    pauseVideo () {
        console.log('pause video: ', this.videoName);
    }
    chargeBattery (val: number) {
        return val;
    }
}
```

## 接口继承

在typescript中，接口也能实现继承

```ts
interface Ball {
    shape: String
}

interface Light extends Ball {
    color: string
}

```

## 枚举

```ts
enum Direction {
    Top,
    Left,
    Right.
    Down
}
```

使用枚举可以限定值的访问范围，在Direction枚举中只能访问Top,Left,Right以及Down，初始值默认是从0开始依次递增1

```ts
Direction.Top; // 0

Direction[0]; // Top
```

枚举的值有两种类型，一种是常量值，一种是计算值，常量枚举要比普通枚举性能更高（直接拿到对应的 值，不需要通过立即执行函数包裹）

## 泛型

泛型可以根据传入类型，推断返回的数据类型，也就是说用户输入的类型是什么，那么可以动态推断返回的类型

函数泛型
```ts
function eat<T, U> (food: T, who: U, taste: string): [U, T, string] {
    return [who, food, taste]
}

let result = eat("面条", "小明", "不好吃");
```

泛型约束，约定一个泛型T具有某些属性
```ts
interface Length {
    length: number,
    replace: Function
}

function checkPoint<T extends Length>(name: T): void {
    // T是一个任意类型， name不一定是一个string类型，那么也就不一定具有有length属性
    name.replace("v", "");
}

checkPoint("hello");
checkPoint(123); // ERROR
```

类中同样也能使用泛型，泛型类

```ts
class Computer<T> {
    print (text: T) {
        return text;
    }
}
let notebook = new Computer<string>(); // Computer的类型是string
let Cres = notebook.print("lorem");
```

接口泛型

在下面的KeyPair接口中，我们无法事先确定key 和 value的类型，可以通过泛型，通过传入的参数动态确定key和value的类型
```ts
interface KeyPair<T, U> {
    key: T,
    value: U
}

// 指定key为string类型， value为number类型
let json: KeyPair<string, number> = {
    key: 'name',
    value: 9587
}
```