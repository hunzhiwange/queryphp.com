---
title: while
type: v4
order: 50000009
---

QueryPHP 支持  while 语法标签，通过这种方式可以很好地将 PHP 的 while 语法布局出来。

## code

我们在模板中写下如下的代码：

``` html
{~$i = 10}
{while $i>0}   
    {$i}Hello QueryPHP !<br>   
    {~$i--}   
{/while} 
```

模板编译后的结果：

``` php
<?php $i = 10; ?>
<?php while( $i>0 ) : ?>   
    <?php echo $i; ?>Hello QueryPHP !<br>   
    <?php $i--; ?>   
<?php endwhile; ?>
```

## node

我们在模板中写下如下的代码：

``` html
{~$i = 10}
<while condition="$i gt 0">   
    {$i}Hello QueryPHP !<br>   
    {~$i--}   
</while>
```

模板编译后的结果：

``` php
<?php $i = 10; ?>
<?php while( $i>0 ) : ?>   
    <?php echo $i; ?>Hello QueryPHP !<br>   
    <?php $i--; ?>   
<?php endwhile; ?>
```
