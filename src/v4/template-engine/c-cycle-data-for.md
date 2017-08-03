---
title: C循环数据.for
type: v4
order: 96
---

如果我们需要在模板中使用 for 循环，那么通过 for 标签可以很方便地输出。

我们在模板中写下如下的代码：
~~~
{for $i=1;$i<10;$i++}
    QueryPHP - 代码版本for <br>
{/for}
~~~ 

模板编译后的结果：
~~~
<?php for( $i=1;$i<10;$i++ ) : ?>
    QueryPHP - 代码版本for <br>
<?php endfor; ?>
~~~