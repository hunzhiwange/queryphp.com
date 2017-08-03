---
title: N使用.PHP.代码
type: v4
order: 102
---

PHP 代码可以和标签在模板文件中混合使用，可以在模板文件里面书写任意的 PHP 语句代码 ，包括下面两种方式：

# 1：第一种是使用 PHP 标签：
我们可以在模板中写下如下的代码：
~~~
<php>echo 'Hello,world!';</php>
~~~

模板编译后的结果：
~~~
<?php echo 'Hello,world!'; ?>
~~~

# 2：第二种就是直接使用原始的 PHP 代码：
~~~
<?php echo 'Hello,world!'; ?> 
~~~

模板编译后的结果：
~~~
<?php echo 'Hello,world!'; ?>
~~~

> 注意：不过这种方式来使用 PHP 脚本，这是我们大力推荐的写法，用最原始的 PHP 开发项目是我们共同的追求。

# 3：PHP 代码中不能在使用标签
php 标签 或者 php代码里面就不能再使用标签（包括 code 标签和 node 标签），因此下面的几种方式都是无效的：
~~~
<php>
	{if $hello == ''}
    	Yet !
    {/if}
</php>
~~~  

模板编译后的结果：
~~~
<?php 
    <?php if ( $hello == '' )  : ?>
        Yet !
    <?php endif; ?>
 ?>
~~~

> 注意：程序运行结果是抛出致命错误，这种写法是错误的。