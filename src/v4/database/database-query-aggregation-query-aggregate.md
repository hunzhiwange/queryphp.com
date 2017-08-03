---
title: 数据库查询聚合查询.aggregate
type: v4
order: 151
---

# 记录数量 count
~~~
# 函数原型
public function getCount($strField = '*', $sAlias = 'row_count', $bFlag = false)

# SELECT COUNT(*) AS row_count FROM `zt_action` LIMIT 1 
# int(45)
database::table ( 'test' )
    ->getCount ()
    
# SELECT COUNT(*) AS row_count FROM `test` LIMIT 1
database::table ( 'zt_action' )
    ->count ()
    ->get()
    ->row_count;
~~~

# 平均值 avg
~~~
# 函数原型
public function getAvg($strField, $sAlias = 'avg_value', $bFlag = false)

# SELECT AVG(`test`.`num`) AS avg_value FROM `test` LIMIT 1
database::table ( 'test' )
    ->getAvg ('num');
    
# SELECT AVG(`test`.`id`) AS avg_value FROM `test` LIMIT 1
database::table ( 'zt_action' )
    ->avg ('id')
    ->get()
    ->avg_value;
~~~

# 最大值 max
~~~
# 函数原型
public function getMax($strField, $sAlias = 'max_value', $bFlag = false)

# SELECT MAX(`test`.`num`) AS max_value FROM `test` LIMIT 1
database::table ( 'test' )
    ->getMax ('num');
    
# SELECT MAX(`test`.`id`) AS max_value FROM `test` LIMIT 1
database::table ( 'zt_action' )
    ->max ('id')
    ->get()
    ->max_value;
~~~

# 最小值 min
~~~
# 函数原型
public function getMin($strField, $sAlias = 'min_value', $bFlag = false)

# SELECT MIN(`test`.`num`) AS min_value FROM `test` LIMIT 1
database::table ( 'test' )
    ->getMin ('num');
    
# SELECT MIN(`test`.`id`) AS min_value FROM `test` LIMIT 1
database::table ( 'zt_action' )
    ->min ('id')
    ->get()
    ->min_value;
~~~

# 合计 sum
~~~
# 函数原型
public function getSum($strField, $sAlias = 'sum_value', $bFlag = false)

# SELECT SUM(`test`.`num`) AS sum_value FROM `test` LIMIT 1
database::table ( 'test' )
    ->getSum ('num');
    
# SELECT SUM(`test`.`id`) AS sum_value FROM `test` LIMIT 1
database::table ( 'zt_action' )
    ->sum ('id')
    ->get()
    ->sum_value;
~~~