---
title: 数据库构造器.join
type: v4
order: 133
---

# 函数原型
~~~
public function join($mixTable, $mixCols = '*', $mixCond /* args */); 
~~~

# $mixTable 和 $mixCols 与 table 方法中的用法一致
~~~
# SELECT `test`.*,`hello`.`name`,`hello`.`value` FROM `test` INNER JOIN `hello` ON `test`.`name` = '小牛'
database::table ( 'test')->join('hello','name,value', 'name','=','小牛' )->getAll ();

# SELECT `test`.*,`t`.`name` AS `nikename`,`t`.`value` AS `tt` FROM `test` INNER JOIN `hello`  `t` ON `test`.`name` = '小牛' 
database::table ( 'test')->join(['t' => 'hello'],['name as nikename','tt' => 'value'], 'name','=','小牛' )->getAll ();
~~~

# $mixCond 与 where 方法中的用法一致
去掉前面两个参数，后面的全部都是条件参数。
~~~
# SELECT `test`.*,`hello`.`name`,`hello`.`value` FROM `test` INNER JOIN `hello` ON `test`.`hello` = 'world' AND `test`.`test` > `test`.`name`
database::table ( 'test')->join('hello','name,value', ['hello' => 'world',['test','>','{[name]}']] )->getAll ();

# SELECT `test`.*,`hello`.`name`,`hello`.`value` FROM `test` INNER JOIN `hello` ON (`hello`.`id` < 5 AND `hello`.`name` LIKE 'hello')
database::table ( 'test')->join('hello','name,value', function($objSelect){
    $objSelect->where('id','<',5)->where('name','like','hello');
} )->getAll ();
~~~

# innerJoin 与 join 一致
~~~
# SELECT `test`.*,`t`.`name` AS `nikename`,`t`.`value` AS `tt` FROM `test` INNER JOIN `hello`  `t` ON `t`.`name` = '小牛'
database::table ( 'test')->innerJoin(['t' => 'hello'],['name as nikename','tt' => 'value'], 'name','=','小牛' )->getAll ();
~~~

# leftJoin
~~~
# SELECT `test`.*,`t`.`name` AS `nikename`,`t`.`value` AS `tt` FROM `test` LEFT JOIN `hello`  `t` ON `t`.`name` = '小牛'
database::table ( 'test')->innerJoin(['t' => 'hello'],['name as nikename','tt' => 'value'], 'name','=','小牛' )->getAll ();
~~~

# rightJoin
~~~
# SELECT `test`.*,`t`.`name` AS `nikename`,`t`.`value` AS `tt` FROM `test` RIGHT JOIN `hello`  `t` ON `t`.`name` = '小牛'
database::table ( 'test')->rightJoin(['t' => 'hello'],['name as nikename','tt' => 'value'], 'name','=','小牛' )->getAll ();
~~~

# fullJoin
~~~
# SELECT `test`.*,`t`.`name` AS `nikename`,`t`.`value` AS `tt` FROM `test` FULL JOIN `hello`  `t` ON `t`.`name` = '小牛'
database::table ( 'test')->fullJoin(['t' => 'hello'],['name as nikename','tt' => 'value'], 'name','=','小牛' )->getAll ();
~~~

# crossJoin
交叉连接不用设置 on 条件。
~~~
# SELECT `test`.*,`t`.`name` AS `nikename`,`t`.`value` AS `tt` FROM `test` CROSS JOIN `hello`  `t`
database::table ( 'test')->crossJoin(['t' => 'hello'],['name as nikename','tt' => 'value'] )->getAll ();
~~~

# naturalJoin
自然连接不用设置 on 条件。
~~~
# SELECT `test`.*,`t`.`name` AS `nikename`,`t`.`value` AS `tt` FROM `test` NATURAL JOIN `hello`  `t`
database::table ( 'test')->naturalJoin(['t' => 'hello'],['name as nikename','tt' => 'value'] )->getAll ();
~~~