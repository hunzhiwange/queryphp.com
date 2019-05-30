# 如何成为 QueryPHP 开发者

QueryPHP 非常欢迎各位给我们共同的伟大的作品添砖加瓦，实现为 PHP 社区提供一个好框架的美好愿景。

* 文档开发.基于单元测试实现的自动化文档 [当前文档开发](https://github.com/hunzhiwange/framework/projects/2)
* 计划功能.开发 [当前计划功能](https://github.com/hunzhiwange/framework/projects/6)
* 技术债务.清偿 [当前技术债务](https://github.com/hunzhiwange/framework/projects/7)
* 单元测试.尽可能减少 Bug [当前单元测试](https://github.com/hunzhiwange/framework/projects/4)


本篇指南将带你搭建的 QueryPHP 开发框架的开发环境，使得你可以参与 QueryPHP 底层代码、单元测试和文档等开发工作。


## Code 语法

侧重简单实用。

``` html
{$name}

{if $name == 'You'}
    欢迎进入 QueryPHP 开发者世界！
{/if}
```
    

## Node 语法

严谨务实。

``` html
<if condition="$name eq 'You'">
    欢迎进入 QueryPHP 开发者世界！
</if>
```
    

## 现代化类 JS 语法

现代潮流。

``` html
{{ i + 1 }}
```
    

## 拒绝交叉

下面这种写法就是错误的，模板引擎将无法正确解析。

``` html
<$name>

{if condition="$name eq 'You'"}
    欢迎进入 QueryPHP 开发者世界！
{/if}
```
    

## PHP 方式

如果你不习惯使用使用内置的模板引擎，你也可以完全使用 PHP 自生来写。

``` php
<?php if ($name == 'You'): ?>
    欢迎进入 QueryPHP 开发者世界！
<?php endif; ?>
```
    

## 扩展支持

为了减少学习成本，系统还支持 PHP 自身作为 UI 模板。