# 发布订阅模型

我对发布订阅模型最早的接触是在大学的一门课程，应该是叫 **软件开发方法**？

具体的名字忘了，当时接触这个概念的时候老师是以报社出版报刊，读者订阅报纸作为例子举例。

报刊订阅服务。报纸出版社发布报纸，而订阅者则订阅了该报纸。出版社每次出版新的报纸时，会将新的报纸发送给订阅者，而订阅者会在收到新报纸后进行阅读。

在这个例子中，出版社是发布者，而订阅者则是订阅者。发布者负责发布新的报纸，而订阅者则订阅报纸并接收新的报纸。发布者和订阅者之间是一种松散的耦合关系，即出版社不需要知道订阅者的数量和身份，而订阅者也不需要知道出版社发布新报纸的时间和频率。

> 发布订阅模型（Publish/Subscribe Model）是一种常见的消息传递模式，它基于事件驱动架构，并允许不同的组件之间进行松耦合通信。该模型中，组件分为两类，发布者（Publishers）和订阅者（Subscribers），它们之间的关系通常由一个调度器或者事件总线进行管理。当发布者发布一个事件时，订阅者会接收到该事件，然后根据需要对该事件做出响应。

在从事前端开发的时候，我们也会遇到需要发布订阅模型的场景，例如典型的跨多个组件通信。或者跨多个微应用通信都需要用到发布订阅模型。

那么，根据上面的定义，我们来用 js 实现一个发布订阅模型。

## 实现一个发布订阅

```ts
class Dispatcher<T extends string = string> {
   DISPOSE_ANY = "*";
   // 维护订阅者的集合
   subscribers = new Map<T, Set<(payload: unknown) => unknown>>();
   // 订阅事件
   subscribe(name: T, handler: (payload?: unknown) => unknown) {
      let events = this.subscribers.get(name);
      if (!events) {
         this.subscribers.set(name, (events = new Set()));
      }
      if (!events.has(handler)) events.add(handler);
   }
   // 当被订阅一次后，立即移除
   subscribeOnce(name: T, handler: (payload?: unknown) => unknown) {
      this.subscribe(name, (payload: unknown) => {
         handler(payload);
         this.unsubscribe(name);
      });
   }
   // 取消事件的订阅
   unsubscribe(name: T, handler?: (payload?: unknown) => void) {
      if (name === DISPOSE_ANY) {
         if (handler)
            console.warn(
               "If you want dispose all subscribers, you should avoid pass handler params"
            );
         this.subscribers.clear();
      } else {
         const eventHandlers = this.subscribers.get(name);
         if (typeof handler === "function") {
            eventHandlers?.delete(handler);
         } else {
            eventHandlers?.clear();
            this.subscribers.delete(name);
         }
      }
   }
   // 发布事件
   publish(event: T, payload?: unknown): boolean {
      const eventHandlers = this.subscribers.get(event);
      eventHandlers?.forEach((handle) => handle(payload));
      return !!eventHandlers;
   }
}
```

在上面的代码中，我们实现了一个基本能覆盖全部场景的发布订阅模型 - `Dispatcher`，该类具有订阅消息，发布消息以及取消订阅功能，另外还增加了一个只订阅一次消息的方法。这个方法的灵感来自于 Vue 2 中的 `this.$once`。

我们可以通过实例化一个 `Dispatcher`。

```ts
const dispatcher = new Dispatcher();
```

订阅消息

```ts
dispatcher.subscribe("redlight", function (payload) {
   const type = payload.lightType;
   switch (type) {
      case "red":
         console.log("红灯亮");
         break;
      case "green":
         console.log("绿灯亮");
         break;
      case "yellow":
         console.log("黄灯亮");
         break;
      default:
         break;
   }
});
```

发布消息

```ts
dispatcher.publish("signalLight", { lightType: "red" });
```

取消该消息的全部订阅者

```ts
dispatcher.unsubscribe("signalLight");
```

注意，这里的发布订阅模型中，一个消息可以收到多个订阅者。如果想取消某个指定的订阅者, 可以传入第二个参数：

```ts
dispatcher.unsubscribe("getTick", handler);
```

我们还可以通过传入一个特殊的字符，取消全部订阅

```ts
dispatcher.unsubscribe("*");
```

## 总结

通过发布订阅模型的概念，我实现了一个较为简易的发布订阅模型案例，发布订阅模型的核心在于发布者与订阅者通过事件总线进行通信，这是一种很常见的消息传递模型。
