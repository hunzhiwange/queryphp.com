---
title: C默认值.eq.三元运算符
type: v4
order: 86
---

如果输出的模板变量没有值，但是我们需要在显示的时候赋予一个默认值的话，可以使用 default 语法，格式：  
~~~
{$变量|default="默认值"}  
~~~

这里的 default 不是函数，而是系统的一个语法规则，例如，我们在模板中写下如下的代码：
~~~
{~$sName=''}   
{$sName|default="Hello，我最爱的雪碧！"}   

{~$sName='肯德基更配！'}   
{$sName|default="Hello，我最爱的雪碧！"}  
~~~

模板编译后的结果：
~~~
<?php $sName=''; ?>   
<?php echo ( $sName ) ? ( $sName ) : "Hello，我最爱的雪碧！"; ?>   
<?php $sName='肯德基更配！'; ?>   
<?php echo ( $sName ) ? ( $sName ) : "Hello，我最爱的雪碧！"; ?>
~~~

程序运行结果如下：
~~~
Hello，我最爱的雪碧！ 肯德基更配！
~~~

> 注意：“default=”之间不能有空格，否则无法识别。