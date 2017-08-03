---
title: J变量.表达式
type: v4
order: 107
---

最终呈现的结果就是变量输出，以及其延伸的变量表达式。

# 1：完整无法如下
~~~
{{hello_world}}
{{count++}}
~~~

模板编译后的结果：
~~~
' + (hello_world) + '
' + (count++) + '
~~~