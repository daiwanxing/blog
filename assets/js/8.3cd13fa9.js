(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{363:function(t,s,a){"use strict";a.r(s);var n=a(45),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"事件循环"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#事件循环"}},[t._v("#")]),t._v(" 事件循环")]),t._v(" "),a("h4",{attrs:{id:"什么是事件循环"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#什么是事件循环"}},[t._v("#")]),t._v(" 什么是事件循环?")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("引擎执行任务时，永远不会进行渲染（render），这里是指的是重新绘制DOM树，仅当任务完成之后才会重新绘制（浏览器每执行完一次宏任务之后就重新绘制DOM树）")])]),t._v(" "),a("li",[a("p",[t._v("一个宏任务队列里包含着若干个微任务，也就是说每个宏任务执行之后，就先执行当前这个宏任务包含的微任务队列。微任务队列执行完毕之后，会触发一个render。紧接着再接着执行其他宏任务。宏任务是一个个的执行的，微任务是一队列一队列的执行的。我的理解，微任务是发生在其他宏任务（渲染DOM，事件，ajax）之前会被执行 "),a("br")])])]),t._v(" "),a("p",[t._v("先来看一个例子")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"timeOut"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nPromise"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"promise"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"code"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("它们是如何执行的，或者说它们的执行顺序是什么？")]),t._v(" "),a("p",[t._v("首先，加载script，这是一个宏任务，紧接着执行宏任务中的同步代码"),a("code",[t._v('alert("code")')]),t._v(",接着执行then函数里的callback，这是一个微任务。\n前面我们提到过，微任务一定是在其他宏任务开始之前被执行，因为要确保microTask-queue中的每个micro-job的execute-enviroment是一致的。\n执行完所有的微任务队列并出队之后，紧接着执行下一个宏任务，这里就是"),a("code",[t._v("setTimeout(() => (alert('timeOut'))")]),t._v("。")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("提示")]),t._v(" "),a("p",[t._v("如果宏任务队列为空，则js引擎会进入“休眠”状态。直到出现了宏任务，又开始了新一轮的事件循环。\n如果需要执行一个耗时很长的计算任务，不应该阻塞事件循环，可以使用web-workers，这是在另一个并行的线程中去运行代码的方式。")])]),t._v(" "),a("h2",{attrs:{id:"web-worker"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#web-worker"}},[t._v("#")]),t._v(" Web Worker")]),t._v(" "),a("p",[t._v("上面提到了web worker，本篇说说web-worker是一个什么技术。")]),t._v(" "),a("p",[t._v("随着芯片的高速发展，现在的cpu动不动就是6核，8核甚至12核 以及 N * 2 个线程（N为核心数）。由于js是单线程，无法并行执行多个任务，根本发挥不出计算机的全部威力，而且有的计算任务特别耗时容易阻塞事件循环导致界面响应不及时，卡顿等。在这样的背景之下，web worker诞生了。")]),t._v(" "),a("p",[t._v("web-worker可以在后台执行计算任务同时又不妨碍到主线程的执行，web-worker会将计算的到的结果返回给主线程。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// index.js")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" worker "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("worker")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'worker.js'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 得到一个worker的实例， 初始化worker.js脚本文本，有一个self的全局对象或者称之为this")]),t._v("\n\n worker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("postmessage")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"some info"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 发送给worker脚本")]),t._v("\n\n worker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onmessage")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("e")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n     console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// a ha")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// worker.js")]),t._v("\n\n    self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"message"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("e")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// some info")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("postMessage")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"a ha"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("注意")]),t._v(" "),a("ol",[a("li",[t._v("web-worker是无法操作DOM的，BOM中只能操作navigator和location对象")]),t._v(" "),a("li",[t._v("web-worker受同源策略限制（分配给worker中运行的脚本资源必须与主线程同源）")]),t._v(" "),a("li",[t._v("web-worker不能使用confirm, alert, 可以使用ajax")]),t._v(" "),a("li",[t._v("web-worker一旦创建就会一直运行下去，除非手动释放")]),t._v(" "),a("li",[t._v("web-worker和主线程不在一个context，通过post-message进行通信")])])]),t._v(" "),a("h2",{attrs:{id:"async-await"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#async-await"}},[t._v("#")]),t._v(" async - await")]),t._v(" "),a("p",[t._v("async是Generator 函数的语法糖")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 声明一个生成器函数")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("x")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("yield")]),t._v(" x "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("yield")]),t._v(" x "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("yield")]),t._v(" x "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" x "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("yield")]),t._v(" x "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" bar "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 返回的是一个生成器函数的实例")]),t._v("\n    bar"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("next")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// { value: 101, done: false } 每次调用实例的next方法就会返回一个对象，包含了yield的值和是否可继续调用next")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 执行到return语句的时候，剩下的yield不再执行")]),t._v("\n")])])]),a("h2",{attrs:{id:"import-export"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#import-export"}},[t._v("#")]),t._v(" import & export")]),t._v(" "),a("p",[t._v("ES6 带来了ES Module的特性，模块的功能可以让我们更好的解耦代码功能逻辑，共用且不会与其他模块变量命名冲突")]),t._v(" "),a("ol",[a("li",[t._v("导入的几种方式")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入的是module的默认导出")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" moduleList "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./module.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入的是module脚本中的命名变量：moduleA")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" moduleA "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./module.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n\n     "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入的是module的默认导出与命名导出moduleA")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" moduleList"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" moduleA "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./module.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入的module脚本所有导出（包括默认导出）到 allModule变量中")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" allModule "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./module.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[t._v("导出的几种方式")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导出的是一个默认导出foo变量 ")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" foo "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导出的是一个命名导出bar变量")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" bar "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 重新导出命名导出，从module脚本文件导出moduleA再导出给其他模块")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" moduleA "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./module.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 重新导出默认导出,")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./module.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 重新将默认导出命名为命名导出")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" module "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./module.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 重新导出所有的命名导出")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./module.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"defer-和-async"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#defer-和-async"}},[t._v("#")]),t._v(" defer 和 async")]),t._v(" "),a("p",[t._v("script标签有一个defer和async属性，其兼容性在2021年已经非常不错了，IE本身就快淘汰了。")]),t._v(" "),a("img",{attrs:{src:t.$withBase("/defer.png"),alt:"defer兼容性"}}),t._v(" "),a("p",[t._v("总而言之，defer和async的出现的目的是为了防止js脚本阻塞DOM的解析，我们都知道渲染进程解析html文档生成DOM树时，如果遇到script标签，那么会停止解析。转而去加载js脚本并且等脚本加载完毕并且执行脚本完毕之后再去解析DOM，这样会徒增FP的渲染时间。一般通用的做法是将js脚本放到body最后面，这对于老旧浏览器是最优解，但是defer和async能够让我们有更多的优化。")]),t._v(" "),a("p",[t._v("defer 和 async 的加载都是异步的，不会阻塞DOM的解析，唯一的区别在于，async是下载完毕之后就会被执行，执行的顺序和书写的顺序不一定保持一致（根据网络带宽决定）。\n而带defer属性的脚本是在下载完毕之后，DOMCONTENTloaded事件触发之前会被执行。")]),t._v(" "),a("p",[t._v("都说一图胜千言，下面搬运外网图片比较三种脚本的加载方式的特点：")]),t._v(" "),a("p",[t._v("英语好的同学可以直接看外网链接"),a("a",{attrs:{href:"https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("async vs defer attributes"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("code",[t._v("各个不同色块的含义")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://www.growingwiththeweb.com/images/2014/02/26/legend.svg",alt:"legend"}})]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("script src"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"xxx.js"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 可以看到先是解析html，接着解析到script标签，暂停html的解析，去下载脚本")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 脚本下载完毕之后开始执行脚本，等到执行完毕之后。继续解析后面的HTML")]),t._v("\n")])])]),a("p",[a("img",{attrs:{src:"https://www.growingwiththeweb.com/images/2014/02/26/script.svg",alt:"script normal"}}),t._v(";")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("script src"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"xxx.js"')]),t._v(" defer"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 正常解析HTML，遇到script标签会异步下载")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 等到HTML解析完毕之后，DOMContentLoaded事件触发之前执行脚本 ")]),t._v("\n")])])]),a("p",[a("img",{attrs:{src:"https://www.growingwiththeweb.com/images/2014/02/26/script-defer.svg",alt:"script normal"}}),t._v(";")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("div",{staticClass:"highlight-lines"},[a("br"),a("br"),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("br")]),a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("script src"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"xxx.js"')]),t._v(" async"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 正常解析HTML，遇到script标签会异步下载")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 异步下载完毕之后会立即执行该脚本，执行脚本期间会阻塞HTML的解析")]),t._v("\n")])])]),a("p",[a("img",{attrs:{src:"https://www.growingwiththeweb.com/images/2014/02/26/script-async.svg",alt:"script normal"}}),t._v(";")]),t._v(" "),a("p",[t._v("我们应该根据不同的场景去使用对应的属性：")]),t._v(" "),a("ul",[a("li",[t._v("如果某些脚本需要依赖上一个脚本执行，推荐使用defer")]),t._v(" "),a("li",[t._v("如果某些脚本想在下载完毕之后立即去执行，同时也不需要操作DOM也不依赖其他脚本， 推荐使用async")]),t._v(" "),a("li",[t._v("如果脚本代码很小，推荐直接使用内联脚本放在body最后面")])])])}),[],!1,null,null,null);s.default=e.exports}}]);