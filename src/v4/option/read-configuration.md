---
title: 读取配置
type: v4
order: 185
---

框架内部会使用这些配置，除了框架配置会使用这些配置外，我们项目也可以读取这些配置。
为了减轻 \Q::option 函数的频繁使用带来的性能问题，框架将缓存文件中的配置数据写入到全局变量中。

# 读取配置
~~~
# 一维数组
\Q::option ( 'cookie_prefix' );

# 多维数组
\Q::option ( 'hello.world' );
~~~

# 默认值
~~~
\Q::option ( 'goods_name', '', 'this is default' );
~~~

# 读取所有配置
~~~
\Q::option ()
~~~

# 全局变量访问
我们在项目中可以通过这个全局变量来访问配置，实质上框架内部全部采用这样的方法。
~~~
# 一维数组
$GLOBALS ['~@option'] ['start_gzip']

# 多位数组
if (isset ( $GLOBALS ['~@option'] ['hello'] ['world'] )) {
    $strHelloWorld = $GLOBALS ['~@option'] ['hello'] ['world'];
} else {
    $strHelloWorld = 'Hello world!';
}
~~~