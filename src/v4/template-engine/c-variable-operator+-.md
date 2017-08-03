---
title: C变量运算符.+-
type: v4
order: 88
---

我们有的时候需要进行一些字符串的操作，以及变量之间的运算，当然直接使用 PHP 可以进行这样子的操作。这里，我们给出的是另一种简单的语法规则。

# 1：变量之间的加减法运算
我们可以在模板中写下如下的代码：
~~~
{$nValue+$nValue2}
{$nValue-$nValue2}
~~~

模板编译后的结果：
~~~
<?php echo $nValue+$nValue2; ?>
<?php echo $nValue-$nValue2; ?>
~~~

# 2：变量之间的乘除余数
我们可以在模板中写下如下的代码：
~~~
{$nValue + 9 +10}
{$nValue * $nValue2 * 10}
{$nValue / $nValue2} 
{$sValue3+$arrList['key']}
{$sValue3%$arrList['key']}
~~~

模板编译后的结果：
~~~
<?php echo $nValue + 9 +10; ?>
<?php echo $nValue * $nValue2 * 10; ?>
<?php echo $nValue / $nValue2; ?> 
<?php echo $sValue3+$arrList['key']; ?>
<?php echo $sValue3%$arrList['key']; ?>
~~~

# 3：变量之间的连接字符
我们可以在模板中写下如下的代码：
~~~
{$sValue3.'start - '.$nValue.$nValue2.'- end'} 
~~~

模板编译后的结果：
~~~
<?php echo $sValue3.'start - '.$nValue.$nValue2.'- end'; ?>
~~~

# 总结一句
可以随心所欲自由地编写运算符，编译程序会原封不动地返回回来。