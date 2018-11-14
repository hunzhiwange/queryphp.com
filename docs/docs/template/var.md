# 变量

变量是最基本的用法，这里模板引擎做了大量的工作支持更好。

## 最简单一个普通变量

php

``` php
// 赋值
$this->assign('name', '欢迎使用 QueryPHP !');
```

模板

``` html
// 模板
{$name}
```

模板编译后的结果：

``` php
<?php echo $name; ?>
```

<p class="tip">模板标签的 “{” 和 “$” 之间不能有任何的空格，否则标签无效。</p>

## JS 风格变量

模板

```
{{ value }}
```

模板编译后的结果：

``` php
<?php echo $name; ?>
```

> 注意：“{{“ 与内容之间可以有空格,也可以没有，结果一样。

## 输出一个数组

php

``` php
// 赋值
$value = [
    'name' => 'QueryPHP',
    'description' => 'It is not a dream!' 
]; 
```

html

``` html
// 模板
我的梦想是写好”{$value['name']}“，我相信”{$value['description']}“。 
```

模板编译后的结果就是：

``` php
我的梦想是写好”<?php echo $value['name']; ?>“，我相信”<?php echo $value['description']; ?>“。
```

## JS 风格输出一个数组

html 

```
{{ value['test'] }}
```

模板编译后的结果就是：

``` php
<?php echo $value['test']; ?>
```

## 输出一个对象

我们编写这样子一个简单对象，然后再赋值：

php

``` php
// 赋值
class demo
{
    public $name = 'QueryPHP';
    public $description = 'It is not a dream!';
}

$demo = new demo();
$this->assign('demo', $demo);
```

html

``` html
// 模板
我的梦想是写好”{$demo->name}“，我相信”{$demo->description}“。  
```

模板编译后的结果：

``` php
我的梦想是写好”<?php echo $demo->name; ?>“，我相信”<?php echo $demo->description; ?>“。 
```

## JS 风格输出一个对象

其中 `.` 是一个非常特殊的语法，如果中间没有空格将被解析为对象连接符，否则就是字符串连接符。

html

``` html
{{ a.b }}
{{ a . b }}
{{ a->b }}
```

模板编译后的结果：

``` php
<?php echo $a->b; ?>
<?php echo $a . $b; ?>
<?php echo $a->b; ?>
```

## 无限级支持

``` html
我的梦想是写好”{$demo->name->child->child->child}“，我相信”{$demo->description}“。
```

模板编译后的结果：

``` php
我的梦想是写好”<?php echo $demo->name->child->child->child; ?>“，我相信”<?php echo $demo->description; ?>“。
```

## 对象点语法支持

为了方便模板定义，对象还可以支持点语法，例如，上面的模板中：

``` html
我的梦想是写好”{$demo.name}“，我相信”{$demo.description}“。
```

模板编译后的结果：

``` php
我的梦想是写好”<?php echo $demo->name; ?>“，我相信”<?php echo $demo->description; ?>“。
```

<p class="tip">值得注意的是点语法不支持数组，这个需要明确。</p>

## 支持无限级对象属性

``` html
我的梦想是写好”{$demo.name.one.two.three.four}“，我相信”{$demo.description.one.two.three.four}“。
```

模板编译后的结果：

``` php
我的梦想是写好”<?php echo $demo->name->one->two->three->four; ?>“，我相信”<?php echo $demo->description->one->two->three->four; ?>“。
```

## 运算符

我们有的时候需要进行一些字符串的操作，以及变量之间的运算，当然直接使用 PHP 可以进行这样子的操作。这里，我们给出的是另一种简单的语法规则。

### 变量之间的加减法运算

我们可以在模板中写下如下的代码：

``` html
{$value+$value2}
{$value-$value2}
```

模板编译后的结果：

``` php
<?php echo $value+$value2; ?>
<?php echo $value-$value2; ?>
```

### 变量之间的乘除余数

我们可以在模板中写下如下的代码：

``` html
{$value + 9 +10}
{$value * $value2 * 10}
{$value / $value2} 
{$value3+$list['key']}
{$value3%$list['key']}
```

模板编译后的结果：

``` php
<?php echo $value + 9 +10; ?>
<?php echo $value * $value2 * 10; ?>
<?php echo $value / $value2; ?>
<?php echo $value3+$list['key']; ?>
<?php echo $value3%$list['key']; ?>
```

### 变量之间的连接字符

我们可以在模板中写下如下的代码：

``` html
{$value3.'start - '.$value.$value2.'- end'} 
```

模板编译后的结果：

``` php
<?php echo $value3.'start - '.$value.$value2.'- end'; ?>
```

## JS 风格运算符

JS 风格的运算符也遵循这一个规则，需要注意的 `.` 语法有一定特殊性，周围是否有空格会影响到解析为 `->` 作为对象或者 `.` 作为连接符。

例 1：

```
{{ value+value2 }}
{{ value-value2 }}
```

模板编译后的结果：

``` php
<?php echo $value+$value2; ?>
<?php echo $value-$value2; ?>
```

例 2：

```
{{ value + 9 +10 }}
{{ value * value2 * 10 }}
{{ value / value2 }}
{{ value3+list['key'] }}
{{ value3%list['key'] }}
```

模板编译后的结果：

``` php
<?php echo $value + 9 +10; ?>
<?php echo $value * $value2 * 10; ?>
<?php echo $value / $value2; ?>
<?php echo $value3+$list['key']; ?>
<?php echo $value3%$list['key']; ?>
```

例 3：

```
{{ value3.'start - '. value. value2.'end' }}
```

模板编译后的结果：

``` php
<?php echo $value3.'start - '. $value. $value2.'end'; ?>
```

## 函数支持

仅仅是输出变量并不能满足模板输出的需要，内置模板引擎支持对模板变量使用调节器和格式化功能，其实也就是提供函数支持，并支持多个函数同时使用。用于模板标签的函数可以是PHP 内置函数或者是用户自定义函数，和 smarty 不同的是用于模板的函数不需要特别的定义。

### 函数调用格式

``` html
{$varName|function1|function2=arg1,arg2,**}  
```

**说明：**

*  “{ ”和“$”符号之间不能有空格 ，后面参数的空格就没有问题
*  ** 表示模板变量本身的参数位置
*  支持多个函数，函数之间支持空格

模板编译后的结果：

``` php
<?php echo function2(arg1,arg2,function1($varName)); ?>
```

模板中如果不加 ** 的格式为：

``` html
{$varName|function1|function2=arg1,arg2}   
```

模板编译后的结果：

``` php
<?php echo function2(function1($varName), arg1,arg2); ?>
```

### 基本用法

首先，我们向模板传递值：

php

``` php
// 赋值
$content = 'Welcome to user QueryPHP,thank u !';   
$this->assign('content', $content);   
```

html

``` html
// 模板
{$content|strtoupper|substr=0,3} 
```

模板编译后的结果：

``` php
<?php echo substr(strtoupper($content), 0,3); ?>
```

程序最后运行结果为： 

```
WEL
```

<p class="tip">函数的定义和使用顺序的对应关系，通常来说函数的第一个参数就是前面的变量或者前一个函数使用的结果，如果你的变量并不是函数的第一个参数，需要使用定位符号“**”。</p>

首先，我们向模板传递一个时间值：

php

```php
// 赋值
$date = time();   
$this->assign('date', $date);  
```

html

```
// 模板
{$date|date="Y-m-d",**}  
```

模板编译后的结果：

``` php
<?php echo date("Y-m-d",$date); ?>
```

函数的使用没有个数限制，可以随意使用。

### 快捷方法

并且还提供了在模板文件中直接调用函数的快捷方法，无需通过模板变量，包括两种方式：

#### 执行方法并输出返回值：

``` html
{:function1($var)}
```

模板编译后的结果：

``` php
<?php echo function1($var); ?>
```

#### 使用静态函数来格式化参数

我们在模板中写下如下的代码：

``` html
{~$currentTime=time()}
{$currentTime|\Leevel\Support\Str::smartDate} 
```

模板编译后的结果：

``` php
<?php $currentTime=time(); ?>
<?php echo \Leevel\Support\Str::smartDate($currentTime); ?>
```

程序运行结果如下：

``` html
0 seconds ago
```

#### 执行方法但不输出：

``` html
{~function1($var)}
```

模板编译后的结果：

``` php
<?php function1($var); ?>
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

## JS 风格函数支持

JS 风格函数和上面的函数支持得差不多。

### 例 1：

```
{{ var|escape }}
{{ var|e }}
```

模板编译后的结果：

``` php
<?php echo escape($var); ?>
<?php echo e($var); ?>
```

### 例 2：

```
{{ list|join=',' }}
```

模板编译后的结果：

``` php
<?php echo join($list, ','); ?>
```

### 例 3：

```
{{ data|convert_encoding='iso-2022-jp', 'UTF-8') }}
```

模板编译后的结果：

``` php
<?php echo convert_encoding($data, 'iso-2022-jp', 'UTF-8')); ?>
```

### 例 4：

```
{{ data|convert_encoding='iso-2022-jp', **, 'UTF-8') }}
```

模板编译后的结果：

``` php
<?php echo convert_encoding('iso-2022-jp', $data, 'UTF-8')); ?>
```

## 对象方法

如果我们需要在模板中使用对象的方法，那么通过代码版本的变量语法可以很方便地输出。

我们在模板中写下如下的代码：

``` html
{$demo->test()}
```

模板编译后的结果：

``` php
<?php echo $demo->test(); ?>
```

<p class="tip">程序编译后默认是输出值，所以最好在类的方法中最好不要直接输出值，直接返回，这样可以交给模版来做数据处理。</p>

## 三元运算符

如果输出的模板变量没有值，但是我们需要在显示的时候赋予一个默认值的话，可以使用 default 语法，格式：  

``` html
{$变量|default="默认值"}  
```

这里的 default 不是函数，而是系统的一个语法规则，例如，我们在模板中写下如下的代码：

``` html
{~$name=''}   
{$name|default="Hello，我最爱的雪碧！"}

{~$name='肯德基更配！'}
{$name|default="Hello，我最爱的雪碧！"}
```

模板编译后的结果：

``` php
<?php $name=''; ?>
<?php echo $name ?: "Hello，我最爱的雪碧！"; ?>

<?php $name='肯德基更配！'; ?>
<?php echo $name ?: "Hello，我最爱的雪碧！"; ?>
```

程序运行结果如下：

``` html
Hello，我最爱的雪碧！ 肯德基更配！
```

<p class="tip">“default=”之间不能有空格，否则无法识别。</p>
