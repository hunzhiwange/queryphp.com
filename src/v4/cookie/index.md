---
title: COOKIE
type: v4
order: 241
---

QueryPHP 封装了 cookie,将允许用户将一些需要客户端保持状态的数据存储起来，值得注意的是重要的数据请加密后保持比较安全。

# 函数原型如下：
~~~
\Q::cookie($sName, $mixValue = '', array $in = []);
~~~

> 说明：设置、获取和删除 cookie 都在同一个方法里面，cookie 将统一通过这个入口进行操作。

# 设置 cookie
cookie 简单使用如下，cookie 名字加上 cookie 值即可。
~~~
# 普通应用
\Q::cookie('user_name','我是一个只小小鸟，怎么飞也飞不高！');

# 指定 cookie 时间
\Q::cookie ( 'user_name', '我是一个只小小鸟，怎么飞也飞不高！', [ 
    'life' => 86400 * 30 
] );
~~~

# 读取 cookie
读取 cookie 更加简单，直接写入名字即可。
~~~
var_dump ( \Q::cookie ( 'user_name' ) );
~~~
注意：获取 cookie 返回 null 表示 cookie 不存在或者已经过期。

# 删除 cookie
第二个参数为 null 即可删除对应的 cookie 数据。
~~~
\Q::cookie ( 'user_name', null );
~~~