# Summary

::: tip Testing Is Documentation
[tests/View/SummaryDoc.php](https://github.com/hunzhiwange/framework/blob/master/tests/View/SummaryDoc.php)
:::
    
QueryPHP 内置二种方式的模板引擎，一种是类似于 Smart 模板的 Code 语法，一种是 HTML 标签式的 Node 语法。

 * code 语法，侧重简单实用，输出变量、注释等
 * Node 语法，严谨务实，输出循环、流程控制等

例外，二种语法随心嵌套，随意使用，QueryPHP 模板引擎底层分析器和编译器非常健壮，完美运行 10 年。

QueryPHP 模板引擎技术来自于 Jecat,一款无与伦比的技术大餐，有幸在 2010 接触到这个框架，通过这个框架学到了很多。


## Code 语法

侧重简单实用。

``` html
{{ $name }}
```
    
## Node 语法

严谨务实。

``` html
{% if cond="'You' == $name" %}
    欢迎进入 QueryPHP 开发者世界！
{% :if %}
```
    
## 拒绝交叉

下面这种写法就是错误的，模板引擎将无法正确解析。

``` html
{% $name %}

{{ if cond="'You' == $name" }}
    欢迎进入 QueryPHP 开发者世界！
{{ :if }}
```
    
## PHP 方式

如果你不习惯使用使用内置的模板引擎，你也可以完全使用 PHP 自生来写。

``` php
<?php if ('You' == $name): ?>
    欢迎进入 QueryPHP 开发者世界！
<?php endif; ?>
```
    
## 扩展支持

为了减少学习成本，系统还支持 PHP 自身作为 UI 模板。