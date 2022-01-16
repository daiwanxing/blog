## 什么是vue-types? 

vue-types是一个定义多个props验证器集合，可以通过vue-types按需导出验证器模块，并支持链式调用，相比于用vue的props类型推荐写法而言更加的便捷。

这个库是最合适搭配typescript来开发基于vue3的web项目的。

下载方式 `npm i vue-types -D`

```ts
//  通过导入单个验证器，获得更加简洁的语法
import { number, string, integer } from 'vue-types';

export default defineComponent({
    props: {
        age: number().isRequired,
        name: string().def("dwx"),
    }
})
```


vue-types 内置了native validator 和 custom validator

### native-validator

具有validate方法，接收一个函数，期待返回的是一个boolean类型的值

## custom-validator

自定义验证器是一种特殊的工厂函数，可用于描述复杂的验证要求。自定义验证器没有validate方法


所有带有命名空间的navtive验证器通常都会有一个已经被定义好了的默认值, 如果我们需要禁用掉库给我们定义好的默认值，我们可以在命名空间上设置
`VueTypes.sensibleDefaults = false`。

当然我们也可以自定义命名空间验证器的默认值，for example:

```ts
VueTypes.sensibleDefaults = {
    string: "my name is dwx"
};


const props = {
    describe: VueTypes.string, // my name is dwx
}
```

使用VueType暴露的createType 方法可以创建一个新的命名空间的vueType实例， 接收一个选项式的参数

```ts
import { createType } from "vue-type"

const PropType = createType({
    string: undefined,
    number: undefined,
    boolean: undefined,
    func: undefined
})
```

使用VueTypes.Extends方法扩展命名空间中验证器，接受一个数组，数组的每一项是一个验证器对象