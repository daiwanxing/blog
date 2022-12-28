# declare keyword

在 typescript 中，可以用`declare`关键字声明局部/全局的变量类型定义，这样就可以在其他文件直接使用定义好的变量而不会被 linter 识别报错，而且通过`declare`声明的变量也会在编译的时候进行擦除.

```ts
declare var foo: string; // 定义了foo是一个string类型的全局变量
```

一般会约束将这种变量类型定义的文件存放在以 `*.d.ts`结尾的文件中.

```ts
// global.d.ts
declare var foo: string;
declare var bar: () => void;
declare var baz: number;
```

`declare`除了可以搭配`var`进行变量的类型定义 还有以下几种语法:

-   `declare function` 声明全局方法
-   `declare class` 声明全局类
-   `declare enum` 声明全局枚举类型
-   `declare module` 声明全局的模块.
-   `declare namespace` 声明（含有子属性的）全局对象
-   `declare global` 在声明文件中扩展全局变量的类型

:::tip 提示
以上的全局声明，仅只是定义相关的参数类型，不做具体的实现.

例如对一个`class SugarBox`进行全局类型定义:

```ts
declare class SugarBox {
    public counts: number;
    clear(): void;
    add(): void;
    take(): void;
}
```

:::

为了防止随着项目的后续开发，会导定义越来越多的全局变量，导致冲突。通常都会使用`namespace`对不同的模块进行命名空间划分.

```ts
// global.d.ts
namespace BMapGL {
    interface Overlay {

    }
}

const bmapOverlay: BMapGL.Overlay;

namespace AMap [
    interface Overlay {

    }
]

const amapOverlay: AMap.Overlay;
```

::: info 信息
typescript 会自动扫描项目中的所有的`*.ts`文件和`*.d.ts`文件, 如果在 `*.d.ts`文件中出现了 `export` 或者 `import`关键字，则该文件内的`declare *`将会被视作为局部变量。

例如，在 wkt.d.ts 文件中定义一个`WktModule`的`namespace`.

```ts
// wkt.d.ts
import type { OtherType } from "@/xxx";

namespace WktModule {
    interface WktStatic {
        new (obj?: any): Wkt;
        beginsWith(str: string, sub: string): boolean;
        endsWith(str: string, sub: string): boolean;
        delimiter: string;
        isArray(obj: any): boolean;
        trim(str: string, sub: string): string;
        Wkt: Wkt;
        extends: OtherType;
    }
}
```

因为使用到了`import` 关键字，这个 namespace 会被视作为一个局部的 namespace。无法在其他的 ts 文件中直接被访问.

```ts
// baz.ts

const baz: WktModule.Wkit; // [!code error]
```

:::

为此有两种办法可以解决

-   使用三斜线指令引入其他包的类型定义
-   使用 `declare global`

第一种办法会在下个章节展开来讲，第二个办法就是直接使用`declare global`将 我们想要提升到全局变量下的类型进行提升

```ts
// wkt.d.ts
import type { OtherType } from "@/xxx";

declare global {
    namespace WktModule {
        interface WktStatic {
            new (obj?: any): Wkt;
            beginsWith(str: string, sub: string): boolean;
            endsWith(str: string, sub: string): boolean;
            delimiter: string;
            isArray(obj: any): boolean;
            trim(str: string, sub: string): string;
            Wkt: Wkt;
            extends: OtherType;
        }
    }
}
```
