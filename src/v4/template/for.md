---
title: for
type: v4
order: 50000006
---

如果我们需要在模板中使用 for 循环，那么通过 for 标签可以很方便地输出。

## code

我们在模板中写下如下的代码：

``` html
{for $i=1;$i<10;$i++}
    QueryPHP - 代码版本for <br>
{/for}
```

模板编译后的结果：

``` php
<?php for( $i=1;$i<10;$i++ ) : ?>
    QueryPHP - 代码版本for <br>
<?php endfor; ?>
```

## node 简单版

我们在模板中写下如下的代码：

``` html
<for start='1'>
    QueryPHP - node - for <br>   
</for>
```

模板编译后的结果：

``` php
<?php for( $var = 1; $var <= 0; $var += 1 ) : ?>
    QueryPHP - node - for <br>   
<?php endfor; ?>
```

## node 完整版

我们在模板中写下如下的代码：

``` html
<for start='1' end='10' var='myValue' step='3'>   
    QueryPHP for <br>   
</for>
```

模板编译后的结果：

``` php
<?php for( $myValue = 1; $myValue <= 10; $myValue += 3 ) : ?>   
    QueryPHP for <br>   
<?php endfor; ?>
```