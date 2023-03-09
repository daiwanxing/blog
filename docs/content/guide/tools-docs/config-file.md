## tsconfig.json - jsconfig.json

tsconfig.json 和 jsconfig.json文件都是一个配置文件放在项目的根目录，指定了项目中TS/JS的最高语法版本，语法检查、将别名映射到源文件自动提示文件路径，

如果你的项目是一个ts项目，只需要新建一个`tsconfig.json`配置相关项，如果ts项目还有少量的js文件，可以开启`allowJs: true`，将`tsconfig.json`的配置项应用到js文件里。

如果项目是一个纯js项目，只需要新建一个`jsconfig.json`进行少量配置，`jsconfig.json`配置文件的项少于`tsconfig.json`

```md
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["./src/*"]
        },
        "target": "ES6",
        "module": "commonjs",
        "allowSyntheticDefaultImports": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules"]
```