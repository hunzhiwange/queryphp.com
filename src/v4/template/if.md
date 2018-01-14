---
title: if
type: v4
order: 50000005
---

If 条件是最基本流程控制语句，这个在任何地方都是相当的实用。

## code

我们在模板中写下如下的代码：

``` html
{if $nId==1}   
    我的值为1，我为if下的内容。   
{elseif $nId==2}   
    我的值为2，我为elseif下的内容。   
{else}   
    我的值为{$nId}，我不是谁的谁！   
{/if}
```

模板编译后的结果：

``` php
<?php if($nId==1) : ?>   
    我的值为1，我为if下的内容。   
<?php elseif($nId==2) : ?>   
    我的值为2，我为elseif下的内容。   
<?php else: ?>   
    我的值为<?php echo $nId; ?>，我不是谁的谁！   
<?php endif; ?>
```

## code 特殊符号替换解析

我们在模板中写下如下的代码：

``` html
{if $a:name == 1}
    a
{/if}

{if hello+run() == 1}
    b
{/if}
```

模板编译后的结果：

``` php
<?php if ( $a->name == 1 )  : ?>
    a
<?php endif; ?>
<?php if ( hello::run() == 1 )  : ?>
    b
<?php endif; ?>
```

## node

我们在模板中写下如下的代码：

``` html
<if condition="($nId eq 1) OR ($nId gt 100)">one
    <elseif condition="$nId eq 2" />two?      
    <else />other?   
</if>
```

模板编译后的结果：

``` php
<?php if( ($nId==1) OR ($nId>100)  ) : ?>one
    <?php elseif( $nId==2 ) : ?>two?      
    <?php else : ?>other?   
<?php endif; ?>
```

## node 特殊符号替换解析

我们在模板中写下如下的代码：

``` html
<if condition="$a:name == 1">
    one
</if>

<if condition="hello+run() == 1">
    two
</if>
```

模板编译后的结果：

``` php
<?php if( $a->name == 1 ) : ?>
    one
<?php endif; ?>
<?php if( hello::run() == 1 ) : ?>
    two
<?php endif; ?>
```

<p class="tip">elseif 也适用本规则，非常方便。</p>
