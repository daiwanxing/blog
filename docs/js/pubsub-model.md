# 发布订阅模式实现

```js
class EventMitter {
    constructor() {
        this.events = new Map();
    }
    on(name, handler) {
        let targetSet;
        if (!this.events.has(name)) {
            this.events.set(name, new Set());
        }
        targetSet = this.events.get(name);
        targetSet.add(handler);
    }
    emit(...args) {
        let name = args[0];
        let targetSet = this.events.get(name);
        if (targetSet) {
            targetSet.forEach(handler => handler.apply(this, args.splice(1)));
        }
    }
    off(events, handler) {
        // 没有任何参数，取消该实例的所有的监听
        let eventMap = this.events;
        if (!arguments.length) {
            eventMap.forEach(setList => setList.clear());
            eventMap.clear();
            return;
        }
        if (Array.isArray(events)) {
            for (let index = 0; index < events.length; index++) {
                this.off(events[index], handler);
                eventMap.delete(events[index]);  
            }
            return;
        }
        let eventSet = eventMap.get(events);
        if (handler) {
            eventSet.delete(handler);
        } else {
            eventSet.clear();
        }
    }
}
```