---
title: C快捷输出.~
type: v4
order: 84
---

为了使得模板定义更加简洁，系统还支持一些常用的变量输出快捷标签，包括：

# 1：输出一个注释
我们在模版中写下如下代码：
~~~
{# 我是一个注释 #}

{#
    我是两行注释
  Thank U!
#}
~~~

编译后的PHP 代码如下：
~~~
空白
~~~

> 注意：模板中的注释仅供模板制作人员查看，最终不会显示出来。

# 2：原样 PHP 脚本
我们在模版中写下如下代码：
~~~
{~$sValue = 'Make QueryPHP greater !'}   
{$sValue}  
~~~
模板编译后的结果：
~~~
<?php $sValue = 'Make QueryPHP greater !'; ?>   
<?php echo $sValue; ?>
~~~

运行结果如下：
~~~
Make QueryPHP greater ! 
~~~

# 3：Echo 快捷方式
我们在模版中写下如下代码：
~~~
{:'Hello QueryPHP!'}
~~~

模板编译后的结果：
~~~
<?php echo 'Hello QueryPHP!'; ?>
~~~

运行结果如下：
~~~
Hello QueryPHP!
~~~
