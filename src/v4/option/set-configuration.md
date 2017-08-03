---
title: 设置配置
type: v4
order: 186
---

QueryPHP 允许用户在项目开发过程中更改配置，这是除了配置文件定义外的方法。

# 设置配置
配置项存在则会覆盖，没有则为新建一个配置项。
~~~
# 一维数组
\Q::option ( 'goods_name', 'Your goods name' );

# 多为数组
\Q::option ( 'hitest.hello.world', 'world' );
~~~