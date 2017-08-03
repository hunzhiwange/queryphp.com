---
title: 数据库构造器.distinct
type: v4
order: 138
---

# 函数原型
~~~
public function distinct($bFlag = true);
~~~

# 用法如下
~~~
# SELECT DISTINCT `test`.*  FROM `test`
database::table ( 'test' )
    ->distinct()
    ->getAll ();
~~~