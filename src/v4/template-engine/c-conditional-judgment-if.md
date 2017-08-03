---
title: C条件判断.if
type: v4
order: 98
---

If 条件是最基本流程控制语句，这个在任何地方都是相当的实用。

# 1：语法如下
我们在模板中写下如下的代码：
~~~
{if $nId==1}   
    我的值为1，我为if下的内容。   
{elseif $nId==2}   
    我的值为2，我为elseif下的内容。   
{else}   
    我的值为{$nId}，我不是谁的谁！   
{/if}
~~~ 

模板编译后的结果：
~~~
<?php if($nId==1) : ?>   
    我的值为1，我为if下的内容。   
<?php elseif($nId==2) : ?>   
    我的值为2，我为elseif下的内容。   
<?php else: ?>   
    我的值为<?php echo $nId; ?>，我不是谁的谁！   
<?php endif; ?>
~~~

# 2：特殊符号替换解析
我们在模板中写下如下的代码：
~~~
{if $a:name == 1}
    a
{/if}

{if hello+run() == 1}
    b
{/if}
~~~ 

模板编译后的结果：
~~~
<?php if ( $a->name == 1 )  : ?>
    a
<?php endif; ?>
<?php if ( hello::run() == 1 )  : ?>
    b
<?php endif; ?>
~~~

> 注意：elseif 也适用本规则，非常方便。
