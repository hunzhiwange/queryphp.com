---
title: N循环数据.while
type: v4
order: 95
---

QueryPHP 支持  while 语法标签，通过这种方式可以很好地将 PHP 的 while 语法布局出来。

我们在模板中写下如下的代码：
~~~
{~$i = 10}
<while condition="$i gt 0">   
    {$i}Hello QueryPHP !<br>   
    {~$i--}   
</while>
~~~ 

模板编译后的结果：
~~~
<?php $i = 10; ?>
<?php while( $i>0 ) : ?>   
    <?php echo $i; ?>Hello QueryPHP !<br>   
    <?php $i--; ?>   
<?php endwhile; ?>
~~~
