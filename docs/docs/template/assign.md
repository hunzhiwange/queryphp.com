# 变量赋值

## node 版本

assign 标签也是用于页面快捷赋值，这个还是用起来比较方便。

例子

``` html
<assign name="helloWorld" value="say hello to the world" />
<assign name="test.hello" value="hello" />
```

模板编译后的结果：

``` php
<?php $helloWorld = 'say hello to the world'; ?>
<?php $test->hello = 'hello'; ?>
```

## JS 风格版本

例子

``` html
{% let foo = 'foo' %}
{% let hello = hello . 'foo' %}
```

模板编译后的结果：

``` php
<?php $foo = 'foo'; ?>
<?php $hello = $hello . 'foo'; ?>
```
