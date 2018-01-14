---
title: assign
type: v4
order: 50000003
---

assign 标签也是用于页面快捷赋值，这个还是用起来比较方便。

例子

``` html
<assign name="helloWorld" value="say hello to the world" />
<assign name="objTest:hello" value="hello" />
```

模板编译后的结果：

``` php
<?php $helloWorld='say hello to the world'; ?>
<?php $objTest->hello='hello'; ?>
```
