# 查询语言.union

## 函数原型

```
public function union($mixSelect = [], $sType = 'UNION');
```

 > 说明：参数支持字符串、子查询器以及它们构成的一维数组。

## 用法如下

```
/*
SELECT `test`.`tid` AS `id`,`test`.`tname` AS `value`  FROM `test` 
 UNION SELECT `yyyyy`.`yid` AS `id`,`yyyyy`.`name` AS `value`  FROM `yyyyy`  WHERE `yyyyy`.`first_name` = '222' 
 UNION SELECT id,value FROM test2
 UNION SELECT `yyyyy`.`yid` AS `id`,`yyyyy`.`name` AS `value`  FROM `yyyyy`  WHERE `yyyyy`.`first_name` = '222' 
*/
$union1 = Db::table('yyyyy', 'yid as id,name as value')->where('first_name', '=', '222');
$union2 = 'SELECT id,value FROM test2';

Db::table('test', 'tid as id,tname as value')->

union($union1)->

union($union2)->

union($union1)->

getAll();
```

等价数组写法

```
Db::table('test', 'tid as id,tname as value')->

union([$union1, $union2, $union1])->

getAll();
```

## 也支持 unionAll

去掉前面两个参数，后面的全部都是条件参数。

```
/*
SELECT `test`.`tid` AS `id`,`test`.`tname` AS `value`  FROM `test` 
 UNION ALL SELECT id,value FROM test2
*/

$union1 = 'SELECT id,value FROM test2';

Db::table('test', 'tid as id,tname as value')->

unionAll($union1)->

getAll();
```
