---
title: C变量支持函数和方法.$sName.trim
type: v4
order: 83
---

仅仅是输出变量并不能满足模板输出的需要，内置模板引擎支持对模板变量使用调节器和格式化功能，其实也就是提供函数支持，并支持多个函数同时使用。用于模板标签的函数可以是PHP 内置函数或者是用户自定义函数，和 smarty 不同的是用于模板的函数不需要特别的定义。

# 函数调用格式
~~~
{$varName|function1|function2=arg1,arg2,** }  
~~~

**说明：**
*  “{ ”和“$”符号之间不能有空格 ，后面参数的空格就没有问题
*  ** 表示模板变量本身的参数位置
*  支持多个函数，函数之间支持空格
*  支持函数屏蔽功能，在配置文件中可以配置禁止使用的函数列表

模板编译后的结果：
~~~
<?php echo function2 ( arg1,arg2,function1 ( $varName ) ); ?>
~~~

模板中如果不加**的格式为：
~~~
{$varName|function1|function2=arg1,arg2}   
~~~

模板编译后的结果：
~~~
<?php echo function2 ( function1 ( $varName ),arg1,arg2 ); ?>
~~~

# 使用例子
首先，我们向模板传递值：
~~~
// 赋值
$sContent = 'Welcome to user QueryPHP,thank u !';   
$this->assign( 'sContent', $sContent );   

// 模板
{$sContent|strtoupper|substr=0,3} 
~~~

模板编译后的结果：
~~~
<?php echo substr ( strtoupper ( $sContent ),0,3 ); ?>
~~~

程序最后运行结果为： 
~~~
WEL
~~~

> 注意：函数的定义和使用顺序的对应关系，通常来说函数的第一个参数就是前面的变量或者前一个函数使用的结果，如果你的变量并不是函数的第一个参数，需要使用定位符号“**”，例如：

首先，我们向模板传递一个时间值：
~~~
// 赋值
$nDate = time();   
$this->assign( 'nDate',$nDate );  

// 模板
{$nDate|date="Y-m-d",**}  
~~~

模板编译后的结果：
~~~
<?php echo date ( "Y-m-d",$nDate ); ?>
~~~

函数的使用没有个数限制，但是可以允许配置 **theme_notallows_func** 定义禁用函数列表，系统默认禁用了 exit、die 和 return 函数，以防止破坏模板输出，我们也可以增加额外的定义，多个函数之间使用半角逗号分隔即可。

# 快捷方法
并且还提供了在模板文件中直接调用函数的快捷方法，无需通过模板变量，包括两种方式：

### 1、执行方法并输出返回值：
~~~
{:function(…)}
~~~

### 2、使用静态函数来格式化参数
我们在模板中写下如下的代码：
~~~
{~$nCurrentTime=time()}   
{$nCurrentTime|Q+smartDate}   
~~~
模板编译后的结果：
~~~
<?php $nCurrentTime=time(); ?>   
<?php echo Q::smartDate ( $nCurrentTime ); ?> 
~~~  

程序运行结果如下：
0 秒前

## 3、执行方法但不输出：
~~~
{~function(…)}
~~~
接下来，我们在模板写下如下的代码：
~~~
{~echo('Hello world!')}
~~~
模板编译后的结果：
~~~
<?php echo('Hello world!'); ?>
~~~
程序最后运行结果为：
~~~
Hello world!
~~~