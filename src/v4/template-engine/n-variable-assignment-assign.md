---
title: N变量赋值.assign
type: v4
order: 91
---

assign 标签也是用于页面快捷赋值，这个还是用起来比较方便。

# 1：例子
~~~
<assign name="helloWorld" value="say hello to the world" />
<assign name="objTest:hello" value="hello" />
~~~

模板编译后的结果：
~~~
<?php $helloWorld='say hello to the world'; ?>
<?php $objTest->hello='hello'; ?>
~~~