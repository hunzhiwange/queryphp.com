---
title: 数据库构造器.union
type: v4
order: 134
---

# 函数原型
~~~
public function union($mixSelect = [], $sType = 'UNION');
~~~
说明：参数支持字符串、子查询器以及它们构成的一维数组。

# 用法如下
~~~
/*
SELECT `test`.`tid` AS `id`,`test`.`tname` AS `value`  FROM `test` 
 UNION SELECT `yyyyy`.`yid` AS `id`,`yyyyy`.`name` AS `value`  FROM `yyyyy`  WHERE `yyyyy`.`first_name` = '222' 
 UNION SELECT id,value FROM test2222
 UNION SELECT `yyyyy`.`yid` AS `id`,`yyyyy`.`name` AS `value`  FROM `yyyyy`  WHERE `yyyyy`.`first_name` = '222' 
*/
$objUnion1 = database::table ( 'yyyyy', 'yid as id,name as value' )->where ( 'first_name', '=', '222' );
$objUnion2 = 'SELECT id,value FROM test2222';
database::table ( 'test', 'tid as id,tname as value' )
	->union ( $objUnion1 )
	->union ( $objUnion2 )
	->union ( $objUnion1 )
	->getAll ();
~~~

# 也支持 unionAll
去掉前面两个参数，后面的全部都是条件参数。
~~~
/*
SELECT `test`.`tid` AS `id`,`test`.`tname` AS `value`  FROM `test` 
 UNION ALL SELECT id,value FROM test2222
*/

$objUnion1 = 'SELECT id,value FROM test2222';
database::table ( 'test', 'tid as id,tname as value' )
	->unionAll ( $objUnion1 )
	->getAll ();
~~~