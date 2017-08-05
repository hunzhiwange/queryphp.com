---
title: 模板引擎
type: v4
order: 81
---

QueryPHP 内置两种方式的模板引擎，一种是类似于 `smart` 模板的 Code 语法，侧重简单实用，另外一种是 HTML 标签式的 Node 语法，严谨务实。

例外，为了方便前端分离开发，这里还提供了一种供 Javascript 使用的模板引擎语法。

## Code 语法
``` html
{$sName}

{if $sName == 'You'}
	欢迎进入 QueryPHP 开发者世界！
{/if}
```

## Node 语法
``` html
<if condition="$sName eq 'You'">
	欢迎进入 QueryPHP 开发者世界！
</if>
```

## Js 语法
``` html
{{i + 1}}
```

## 拒绝交叉
下面这种写法就是错误的，模板引擎将无法正确解析。
~~~
<$sName>

{if condition="$sName eq 'You'"}
	欢迎进入 QueryPHP 开发者世界！
{/if}
~~~

## PHP 方式
如果你不习惯使用使用内置的模板引擎，你也可以完全使用 PHP 自生来写。
~~~
<?php if($sName == 'You'):?>
	欢迎进入 QueryPHP 开发者世界！
<?php endif;?>
~~~

## 注释式标签
在配置文件中，开启注释式标签符，标签在某些编辑器下面呈现出绿颜色，非常方便区分出来。
~~~
'theme_tag_note'  => true
~~~
那么，这个时候模板引擎就可以这样写了。
~~~
<!--{$sName}-->

<!--<if condition="$sName eq 'You'">-->
	欢迎进入 QueryPHP 开发者世界！
<!--</if>-->
~~~

## 编译压缩
系统在生成编译文件的时候会去掉编译文件的 **html** 里面的空格、换行、制表符和注释，默认为开启，可以通过配置关闭。
~~~
'theme_strip_space'  => false
~~~

<p class="tip">
> 注意：html 页面中的 js 注释只能是这种格式，“**//**” 将会导致 javascript 报错。
</p>

~~~
/* 我是注释 */
~~~

使用 QueryPHP 内置的模板引擎，可以很舒适地编写页面，同时也方便美工制作页面。介于当前开发流行使用 Javascript 进行页面渲染，PHP 后台提供接口 JSON 的方式开发，不过模板引擎依然适用。
