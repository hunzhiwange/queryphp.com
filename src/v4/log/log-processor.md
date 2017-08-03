---
title: 日志处理器
type: v4
order: 205
---

为了方便大家更好地自主处理日志，QueryPHP 允许为日志自定义一个处理器，你可以在项目功能入口文件 <project>/com/bootstrap.php 中定义。
~~~
\Q\log\log::registerProcessor ( function ($strMessage, $strLevel) {
    var_dump ( $strMessage );
    var_dump ( $strLevel );
} );
~~~

比如可以将日志保存到数据库或者第三方日志存储服务中。

