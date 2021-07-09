```js
let activeEffect = null;

function effect (eff) {
    activeEffect = eff;
    activeEffect();
    activeEffect = null;
}

const targetDepMap = new WeakMap(); // 存储了每个响应式对象的依赖

// track负责将effect添加依赖到dep，每一个属性都有一个自己的dep,当对某个属性呢行set操作时，触发该属性对应的effect
function track(target, key) {
    if (activeEffect) {
        let depsMap = targetDepMap.get(target); // 取出targetDepMap中的depsMap
        if (!depsMap) {
            // 不存在depsMap    
            depsMap = new Map();
            targetDepMap.set(target, depsMap);
        }
        let dep = depsMap.get(key); // 每一个属性都应该拥有一个自己的dep，dep的键名为属性名，一个属性可以有多个dep
        if (!dep) {
            // 构建一个目标依赖图，如果不存在dep，新建一个set，存放的是各个effect
            dep = new Set();
            depsMap.set(key, dep);
        }
        dep.add(activeEffect);
    }
}

// trigget 触发依赖， 首先检查对象 ”拥有dep ”
function trigger(target, key) {
    let depsMap = targetDepMap.get(target); // 值是一个map
    let dep = depsMap.get(key); //  得到一个set
    if (dep) {
        dep.forEach(effect => effect());
    }
}

function reactive(object) {
    let handler = {
        // track 负责收集dep
        get(target, key) {
            track(target, key);
            return Reflect.get(target, key);
        },
        // trigger
        set(target, key, val, receiver) {
            // 我们都知道set触发dep， 如果olaVal和newVal一致，就无需触发
            let oldVal = target[key];
            Reflect.set(target, key, val, receiver);
            if (oldVal !== val) {
                trigger(target, key);
            }
        }
    }
    return new Proxy(object, handler);
}


let total = 0;
let salePrice = 0;

var product = reactive({price: 5, quantity: 2});

effect(() => {
    console.log(product.price, product.quantity);
    total = product.price * product.quantity
});

effect(() => {
    salePrice = product.price * 0.9;
});
```