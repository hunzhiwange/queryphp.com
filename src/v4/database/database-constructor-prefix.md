---
title: 数据库构造器.prefix
type: v4
order: 128
---

# 函数原型
~~~
public function prefix($mixPrefix);
~~~

# 用法如下
~~~
# SELECT SQL_CALC_FOUND_ROWS `test`.* FROM `test` WHERE `test`.`id` = 5
database::table ( 'test' )
    ->prefix('SQL_CALC_FOUND_ROWS')
    ->where('id','=',5)
    ->get ();
    
# SELECT SQL_NO_CACHE `test`.* FROM `test` WHERE `test`.`id` = 5
database::table ( 'test' )
    ->prefix('SQL_NO_CACHE')
    ->where('id','=',5)
    ->get ();
~~~