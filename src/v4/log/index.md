---
title: 日志
type: v4
order: 201
---

QueryPHP 内置日志处理类，可以方便大家在开发过程中记录下系统的错误，SQL 以及自定义日志。

# 函数原型如下：
~~~
\Q::log($strMessage, $strLevel = 'error', $intMessageType = 3, $strDestination = '', $strExtraHeaders = '');
~~~
> 说明：系统内置两个日志类型 error 和 sql,一个用于记录系统各种异常和致命错误，例外一个用户记录 sql 日志。

# 记录日志
记录日志非常简单，直接使用系统提供的方法即可。
~~~
\Q::log('测试调试日志','debug');
~~~

# 获取日志记录
获取日志记录，可以用于后期将日志数据进行处理，程序中断可能无法获取。
~~~
\Q\log\log::get( );
~~~

# 获取日志条数
~~~
\Q\log\log::count( );
~~~

# 清空日志记录
~~~
\Q\log\log::clear( );
~~~





