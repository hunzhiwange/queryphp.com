---
title: 数据库构造器.limit
type: v4
order: 140
---

# limit 限制条数
~~~
# 函数原型
public function limit($nOffset = 0, $nCount = 30)

# SELECT `test`.*  FROM `test`  LIMIT 5,10 
database::table ( 'test' )
    ->limit(5,10)
    ->get ();
~~~

# 指示仅查询第一个符合条件的记录
~~~
# 函数原型
public function one()

# SELECT `test`.*  FROM `test`  LIMIT 1 
database::table ( 'test' )
    ->one()
    ->get ();
~~~

# 指示查询所有符合条件的记录
~~~
# 函数原型
public function all()

# SELECT `test`.*  FROM `test` 
database::table ( 'test' )
    ->all()
    ->get ();
~~~

# 查询几条记录
~~~
# 函数原型
public function top($nCount = 30)

# SELECT `test`.*  FROM `test`  LIMIT 0,15
database::table ( 'test' )
    ->top(15)
    ->get ();
~~~