---
title: 数据库构造器.forUpdate
type: v4
order: 141
---

# 函数原型
~~~
public function forUpdate($bFlag = true);
~~~

# 用法如下
~~~
# SELECT `test`.*  FROM `test`  FOR UPDATE
database::table ( 'test' )
    ->forUpdate()
    ->get ();
~~~