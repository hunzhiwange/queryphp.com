---
title: var
type: v4
order: 50000002
---

变量是最基本的用法，这里模板引擎做了大量的工作支持更好。

## 最简单一个普通变量

php

``` php
// 赋值
$this->assign ( 'sName', '欢迎使用 QueryPHP !' );
```

模板

``` html
// 模板
{$sName}
```

模板编译后的结果：

``` php
<?php echo $sName; ?>
```

<p class="tip">模板标签的“{”和“$”之间不能有任何的空格，否则标签无效。</p>

## 输出一个数组

php

``` php
// 赋值
$arrValue = array (
    'name' => 'QueryPHP',
    'description' => 'It is not a dream!' 
); 
```

html

``` html
// 模板
我的梦想是写好”{$arrValue['name']}“，我相信”{$arrValue['description']}“。 
```

模板编译后的结果就是：

``` php
我的梦想是写好”<?php echo $arrValue['name']; ?>“，我相信”<?php echo $arrValue['description']; ?>“。
```

## 输出一个对象

我们编写这样子一个简单对象，然后再赋值：

php

``` php
// 赋值
class demo {
    public $_sName = 'QueryPHP';
    public $_sDescription = 'It is not a dream!';
}

$oDemo = new demo ();
$this->assign ( 'oDemo', $oDemo );
```

html

``` html
// 模板
我的梦想是写好”{$oDemo:_sName}“，我相信”{$oDemo:_sDescription}“。  
```

模板编译后的结果：

``` php
我的梦想是写好”<?php echo $oDemo->_sName; ?>“，我相信”<?php echo $oDemo->_sDescription; ?>“。
```

## 无限级支持

``` html
我的梦想是写好”{$oDemo:_sName:child:child:child}“，我相信”{$oDemo:_sDescription}“。  
```

模板编译后的结果：

``` php
我的梦想是写好”<?php echo $oDemo->_sName->child->child->child; ?>“，我相信”<?php echo $oDemo->_sDescription; ?>“。
```

## 对象数组点语法支持

为了方便模板定义，数组和对象还可以支持点语法，例如，上面的模板中：

``` html
我的梦想是写好”{$oDemo._sName}“，我相信”{$oDemo._sDescription}“。
```

模板编译后的结果：

``` php
我的梦想是写好”<?php echo is_array( $oDemo ) ? $oDemo['_sName'] : $oDemo->_sName; ?>“，我相信”<?php echo is_array( $oDemo ) ? $oDemo['_sDescription'] : $oDemo->_sDescription; ?>“。
```

<p class="tip">因为点语法默认是自动判断对象和数组，这个兼容性比较好。</p>

我们可以通过配置 **theme_var_identify** 参数来决定点语法的输出效果：

``` html
obj = 对象方式
array = 数组方式
```

## 支持无限级数组和无限级对象属性

``` html
我的梦想是写好”{$oDemo._sName.one.two.three.four}“，我相信”{$oDemo._sDescription.one.two.three.four}“。
```

模板编译后的结果：

``` php
我的梦想是写好”<?php echo is_array( $oDemo ) ? $oDemo['_sName']['one']['two']['three']['four'] : $oDemo->_sName->one->two->three->four; ?>“，我相信”<?php echo is_array( $oDemo ) ? $oDemo['_sDescription']['one']['two']['three']['four'] : $oDemo->_sDescription->one->two->three->four; ?>“。
```

<p class="tip">推荐使用“:”格式来输出对象，“[]”格式来输出数组，这种效率比较高。</p>

## 运算符

我们有的时候需要进行一些字符串的操作，以及变量之间的运算，当然直接使用 PHP 可以进行这样子的操作。这里，我们给出的是另一种简单的语法规则。

### 变量之间的加减法运算

我们可以在模板中写下如下的代码：

``` html
{$nValue+$nValue2}
{$nValue-$nValue2}
```

模板编译后的结果：

``` php
<?php echo $nValue+$nValue2; ?>
<?php echo $nValue-$nValue2; ?>
```

### 变量之间的乘除余数

我们可以在模板中写下如下的代码：

``` html
{$nValue + 9 +10}
{$nValue * $nValue2 * 10}
{$nValue / $nValue2} 
{$sValue3+$arrList['key']}
{$sValue3%$arrList['key']}
```

模板编译后的结果：

``` php
<?php echo $nValue + 9 +10; ?>
<?php echo $nValue * $nValue2 * 10; ?>
<?php echo $nValue / $nValue2; ?> 
<?php echo $sValue3+$arrList['key']; ?>
<?php echo $sValue3%$arrList['key']; ?>
```

### 变量之间的连接字符

我们可以在模板中写下如下的代码：

``` html
{$sValue3.'start - '.$nValue.$nValue2.'- end'} 
```

模板编译后的结果：

``` php
<?php echo $sValue3.'start - '.$nValue.$nValue2.'- end'; ?>
```

## 函数支持

仅仅是输出变量并不能满足模板输出的需要，内置模板引擎支持对模板变量使用调节器和格式化功能，其实也就是提供函数支持，并支持多个函数同时使用。用于模板标签的函数可以是PHP 内置函数或者是用户自定义函数，和 smarty 不同的是用于模板的函数不需要特别的定义。

### 函数调用格式

``` html
{$varName|function1|function2=arg1,arg2,** }  
```

**说明：**

*  “{ ”和“$”符号之间不能有空格 ，后面参数的空格就没有问题
*  ** 表示模板变量本身的参数位置
*  支持多个函数，函数之间支持空格
*  支持函数屏蔽功能，在配置文件中可以配置禁止使用的函数列表

模板编译后的结果：

``` php
<?php echo function2 ( arg1,arg2,function1 ( $varName ) ); ?>
```

模板中如果不加**的格式为：

``` html
{$varName|function1|function2=arg1,arg2}   
```

模板编译后的结果：

``` php
<?php echo function2 ( function1 ( $varName ),arg1,arg2 ); ?>
```

### 基本用法

首先，我们向模板传递值：

php

``` php
// 赋值
$sContent = 'Welcome to user QueryPHP,thank u !';   
$this->assign( 'sContent', $sContent );   
```

html

``` html
// 模板
{$sContent|strtoupper|substr=0,3} 
```

模板编译后的结果：

``` php
<?php echo substr ( strtoupper ( $sContent ),0,3 ); ?>
```

程序最后运行结果为： 

```
WEL
```

<p class="tip">函数的定义和使用顺序的对应关系，通常来说函数的第一个参数就是前面的变量或者前一个函数使用的结果，如果你的变量并不是函数的第一个参数，需要使用定位符号“**”。</p>

首先，我们向模板传递一个时间值：

php

``` php
// 赋值
$nDate = time();   
$this->assign( 'nDate',$nDate );  
```

html

```
// 模板
{$nDate|date="Y-m-d",**}  
```

模板编译后的结果：

``` php
<?php echo date ( "Y-m-d",$nDate ); ?>
```

函数的使用没有个数限制，但是可以允许配置 **theme_notallows_func** 定义禁用函数列表，系统默认禁用了 exit、die 和 return 函数，以防止破坏模板输出，我们也可以增加额外的定义，多个函数之间使用半角逗号分隔即可。

### 快捷方法

并且还提供了在模板文件中直接调用函数的快捷方法，无需通过模板变量，包括两种方式：

#### 执行方法并输出返回值：

``` html
{:function(…)}
```

#### 使用静态函数来格式化参数

我们在模板中写下如下的代码：

``` html
{~$nCurrentTime=time()}   
{$nCurrentTime|Q+smartDate}   
```

模板编译后的结果：

``` php
<?php $nCurrentTime=time(); ?>   
<?php echo \queryyetsimple\support\str::formatDate ( $nCurrentTime ); ?> 
```

程序运行结果如下：

``` html
0 seconds ago
```

#### 执行方法但不输出：

``` html
{~function(…)}
```

接下来，我们在模板写下如下的代码：

``` html
{~echo('Hello world!')}
```

模板编译后的结果：

``` php
<?php echo('Hello world!'); ?>
```

程序最后运行结果为：

```
Hello world!
```

## 对象方法

如果我们需要在模板中使用对象的方法，那么通过代码版本的变量语法可以很方便地输出。

我们在模板中写下如下的代码：

``` html
{$oDemo.test( )}  
{$oDemo:test2( )}  
```

模板编译后的结果：

``` php
<?php echo $oDemo->test( ); ?>  
<?php echo $oDemo->test2( ); ?>
```

<p class="tip">程序编译后默认是输出值，所以最好在类的方法中最好不要直接输出值，直接返回，这样可以交给模版来做数据处理。</p>

## 三元运算符

如果输出的模板变量没有值，但是我们需要在显示的时候赋予一个默认值的话，可以使用 default 语法，格式：  

``` html
{$变量|default="默认值"}  
```

这里的 default 不是函数，而是系统的一个语法规则，例如，我们在模板中写下如下的代码：

``` html
{~$sName=''}   
{$sName|default="Hello，我最爱的雪碧！"}   

{~$sName='肯德基更配！'}   
{$sName|default="Hello，我最爱的雪碧！"}  
```

模板编译后的结果：

``` php
<?php $sName=''; ?>   
<?php echo ( $sName ) ? ( $sName ) : "Hello，我最爱的雪碧！"; ?>   
<?php $sName='肯德基更配！'; ?>   
<?php echo ( $sName ) ? ( $sName ) : "Hello，我最爱的雪碧！"; ?>
```

程序运行结果如下：

``` html
Hello，我最爱的雪碧！ 肯德基更配！
```

<p class="tip">“default=”之间不能有空格，否则无法识别。</p>
