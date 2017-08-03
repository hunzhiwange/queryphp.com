---
title: 删除配置
type: v4
order: 187
---

QueryPHP 允许用户在项目开发过程中删除配置，这是除了配置文件定义外的方法。

# 删除配置
我们可以在开发过程中删除配置项，第二个参数传入 null 即可。
~~~
# 一维数组
\Q::option ( 'goods_name', null );

# 多为数组
\Q::option ( 'hitest.hello.world', null );
~~~