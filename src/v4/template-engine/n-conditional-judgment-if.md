---
title: N条件判断.if
type: v4
order: 99
---

If 条件是最基本流程控制语句，这个在任何地方都是相当的实用。

# 1：语法如下
我们在模板中写下如下的代码：
~~~
<if condition="($nId eq 1) OR ($nId gt 100)">one
    <elseif condition="$nId eq 2" />two?      
    <else />other?   
</if>
~~~ 

模板编译后的结果：
~~~
<?php if( ($nId==1) OR ($nId>100)  ) : ?>one
    <?php elseif( $nId==2 ) : ?>two?      
    <?php else : ?>other?   
<?php endif; ?>
~~~

# 2：特殊符号替换解析
我们在模板中写下如下的代码：
~~~
<if condition="$a:name == 1">
    one
</if>

<if condition="hello+run() == 1">
    two
</if>
~~~ 

模板编译后的结果：
~~~
<?php if( $a->name == 1 ) : ?>
    one
<?php endif; ?>
<?php if( hello::run() == 1 ) : ?>
    two
<?php endif; ?>
~~~

> 注意：elseif 也适用本规则，非常方便。