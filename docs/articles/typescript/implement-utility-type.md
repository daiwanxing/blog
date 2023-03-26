# TS 内置的功能类型

## Partial\<T\>

```ts
type DPartial<T extends object> = {
    [k in keyof T]?: T[k]
}
```

## Exclude\<T, U\>

```ts
type DExclude<T, U> = T extends U ? never : T;
```


## Omit\<T, U\>

```ts
type DOmit<T, U> = DPick<T, DExclude<keyof T, U>>
```

## Pick\<T, U\>

```ts
type DPick<T, U extends keyof T> = {
    [P in U]: T[P] 
}
```

## Readonly\<T\>

```ts
type DReadonly<T> = {
    readonly [P in keyof T]: T[P]
}
```

## Required\<T\>

```ts
type DRequired<T> = {
    [P in keyof T]-?: T[P]
}
```

## NonNullalbe\<T\>

```ts
type DNonNullalbe<T> = T extends null | undefined ? never : T
```

## Extract\<T\>

```ts
type DExtract<T, U> = T extends U ? never : T;
```

## InstanceType\<T\>

```ts
type DInstanceType<T> = T extends ? 
```

## ReturnType\<T\>

```ts
type DReturnType<T> = T extends (...args: any[]) => infer P ? P : never;
```

## Parameters\<T\>

```ts
type DParameters<T> = T extends (...args: infer P) => any ? P : never;
```