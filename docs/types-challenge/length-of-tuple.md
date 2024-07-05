---
sidebar_position: 6
---

# Length of Tuple

创建一个 Length 泛型，这个泛型接受一个只读的元组，返回这个元组的长度。

```ts
type tesla = ["tesla", "model 3", "model X", "model Y"];
type spaceX = [
  "FALCON 9",
  "FALCON HEAVY",
  "DRAGON",
  "STARSHIP",
  "HUMAN SPACEFLIGHT"
];

type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5
```

## 答案

<details>
```ts
type Length<T extends any[]> = T['length'] 
```

</details>
