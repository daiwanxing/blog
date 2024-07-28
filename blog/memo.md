---
slug: react-memo
title: "滥用 Memo 真的没有问题吗？"
authors: klein
---

`useMemo` 是 react 用于缓存计算结果提供的一个 `hook`，它有点类似于 Vuejs 的 [computed](https://vuejs.org/guide/essentials/computed.html) 属性。能对计算后的结果起到缓存作用，这样能避免不必要的计算开销。

但是我在公司见过部分的同事完全是在滥用 `Memo`。无论是什么场景，只要想到值变化后才计算的逻辑就无脑的使用 `useMemo`。仿佛多重新渲染一次组件会要了整个系统的命。

在使用 `useMemo` 之前我们应该思考，这个组件 re-render 的开销到底大不大。我们都知道 React 的更新是粗粒度的。

无论是父组件的 state 发生变更，还是自身的 state 发生变更，都会使得组件本身 re-render。

但是大部分场景下 jsx 函数执行是很快的。除非你需要在组件内做出大量的逻辑计算，而且这种计算的耗时会阻塞渲染线程渲染视图。

那才需要真正考虑使用 `useMemo` 作为最后的性能优化手段。

思考下面这段 jsx 代码

```jsx
const BestStudentsTable = (props) => {
  const list = useMemo(() => {
    return props.students
      .filter((stu) => stu.age > 18 && stu.score === 100)
      .map((item) => ({ ...item, badge: "excellent" }));
  }, [props.students]);

  return (
    <ul>
      {list.map((stu) => {
        return <li key={stu.id}>{stu.name}</li>;
      })}
    </ul>
  );
};
```

组件意图将父组件传递的 `list` 作为 prop，将数据按照业务要求格式化后在渲染。这里用到了 `useMemo` 将计算结果进行缓存，只有当依赖发生变化时才重新计算。

但是这样是多余的，首先这个函数内部的计算量不大。哪怕上万条数据, 也不会占多大的执行耗时。所以不用 `useMemo` 情况下，即便父组件其他的 state 产生了新的快照进而触发该组件的 re-render 也不会有什么大的开销。

毕竟执行完毕后，内存就被 GC 自行释放掉了。

```jsx
const BestStudentsTable = (props) => {
  const list = props.students
    .filter((stu) => stu.age > 18 && stu.score === 100)
    .map((item) => ({ ...item, badge: "excellent" }));

  return (
    <ul>
      {list.map((stu) => {
        return <li key={stu.id}>{stu.name}</li>;
      })}
    </ul>
  );
};
```

## `useMemo` 的优化代价：空间换时间

滥用 `useMemo` 反而得不偿失。`useMemo` 会将要记忆的值进行缓存，当 `deps` 发生改变时，才会重新计算新的结果再暂存。

因为每次组件 re-render，`useMemo` 会比较旧快照的 `deps` 和新快照的 `deps` 是否相同，这里就有了 `diff` 的开销。

如果一个组件充斥着大量的 `useMemo` 并承担着简易的计算工作，那么这是愚蠢的行为。
