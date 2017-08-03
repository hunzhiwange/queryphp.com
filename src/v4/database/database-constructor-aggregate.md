---
title: 数据库构造器.aggregate
type: v4
order: 139
---

# 记录数量 count
~~~
# 函数原型
public function count($strField = '*', $sAlias = 'row_count')

# SELECT COUNT(`test`.*) AS row_count FROM `test`
database::table ( 'test' )
    ->count()
    ->getAll ();
~~~

# 平均值 avg
~~~
# 函数原型
public function avg($strField, $sAlias = 'avg_value')

# SELECT AVG(`test`.`id`) AS avg_value FROM `test`
database::table ( 'test' )
    ->avg('id')
    ->getAll ();
    
# SELECT AVG(`test`.`num1`*`test`.`num2`) AS avg_value FROM `test` 
database::table ( 'test' )
    ->avg('{[num1]*[num2]}')
    ->getAll ();
~~~

# 最大值 max
~~~
# 函数原型
public function max($strField, $sAlias = 'max_value')

# SELECT MAX(`test`.`num`) AS max_value FROM `test`
database::table ( 'test' )
    ->max('num')
    ->getAll ();
~~~

# 最小值 min
~~~
# 函数原型
public function min($strField, $sAlias = 'min_value')

# SELECT MIN(`test`.`num`) AS min_value FROM `test`
database::table ( 'test' )
    ->min('num')
    ->getAll ();
~~~

# 合计 sum
~~~
# 函数原型
public function sum($strField, $sAlias = 'sum_value')

# SELECT SUM(`test`.`num`) AS sum_value FROM `test`
database::table ( 'test' )
    ->sum('num')
    ->getAll ();
~~~