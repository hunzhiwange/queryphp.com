---
title: N循环数据.for
type: v4
order: 97
---

如果我们需要在模板中使用 for 循环，那么通过 for 标签可以很方便地输出。

# 1：简单版
我们在模板中写下如下的代码：
~~~
<for start='1'>
    QueryPHP - node - for <br>   
</for>
~~~ 

模板编译后的结果：
~~~
<?php for( $var = 1; $var <= 0; $var += 1 ) : ?>
    QueryPHP - node - for <br>   
<?php endfor; ?>
~~~

# 2：完整版
我们在模板中写下如下的代码：
~~~
<for start='1' end='10' var='myValue' step='3'>   
    QueryPHP for <br>   
</for>
~~~ 

模板编译后的结果：
~~~
<?php for( $myValue = 1; $myValue <= 10; $myValue += 3 ) : ?>   
    QueryPHP for <br>   
<?php endfor; ?>
~~~