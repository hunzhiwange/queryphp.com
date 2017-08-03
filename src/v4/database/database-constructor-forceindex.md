---
title: 数据库构造器.forceIndex
type: v4
order: 130
---

# 函数原型
~~~
public function forceIndex($mixIndex, $sType = 'FORCE');
public function ignoreIndex($mixIndex);
~~~

# 用法如下
~~~
# SELECT `test`.* FROM `test` FORCE INDEX ( nameindex,statusindex ) IGNORE INDEX ( testindex ) WHERE `test`.`id` = 5
database::table ( 'test' )
    ->forceIndex('nameindex,statusindex')
    ->ignoreIndex('testindex')
    ->where('id','=',5)
    ->get ();
~~~