# 查询语言.join

## 函数原型

``` php
public function join($mixTable, $mixCols = '*', $mixCond /* args */); 
```

## $mixTable 和 $mixCols 与 table 方法中的用法一致

``` php
# SELECT `test`.*,`hello`.`name`,`hello`.`value` FROM `test` INNER JOIN `hello` ON `test`.`name` = '小牛'
Db::table('test')->

join('hello', 'name,value', 'name', '=', '小牛')->

getAll();

# SELECT `test`.*,`t`.`name` AS `nikename`,`t`.`value` AS `tt` FROM `test` INNER JOIN `hello`  `t` ON `test`.`name` = '小牛' 
Db::table('test')->

join(['t' => 'hello'], ['name as nikename', 'tt' => 'value'], 'name', '=', '小牛')->

getAll();
```

## $mixCond 与 where 方法中的用法一致

去掉前面两个参数，后面的全部都是条件参数。

``` php
# SELECT `test`.*,`hello`.`name`,`hello`.`value` FROM `test` INNER JOIN `hello` ON `test`.`hello` = 'world' AND `test`.`test` > `test`.`name`
Db::table('test')->

join('hello', 'name,value', ['hello' => 'world', ['test', '>', '{[name]}']])->

getAll();

# SELECT `test`.*,`hello`.`name`,`hello`.`value` FROM `test` INNER JOIN `hello` ON (`hello`.`id` < 5 AND `hello`.`name` LIKE 'hello')
Db::table('test')->

join('hello', 'name,value', function ($select) {
    $select->where('id', '<', 5)->where('name', 'like', 'hello');
}s)->

getAll();
```

## innerJoin 与 join 一致

``` php
# SELECT `test`.*,`t`.`name` AS `nikename`,`t`.`value` AS `tt` FROM `test` INNER JOIN `hello`  `t` ON `t`.`name` = '小牛'
Db::table('test')->

innerJoin(['t' => 'hello'], ['name as nikename', 'tt' => 'value'], 'name', '=', '小牛')->

getAll();
```

## leftJoin

``` php
# SELECT `test`.*,`t`.`name` AS `nikename`,`t`.`value` AS `tt` FROM `test` LEFT JOIN `hello`  `t` ON `t`.`name` = '小牛'
Db::table('test')->

innerJoin(['t' => 'hello'], ['name as nikename', 'tt' => 'value'], 'name', '=', '小牛')->

getAll();
```

## rightJoin

``` php
# SELECT `test`.*,`t`.`name` AS `nikename`,`t`.`value` AS `tt` FROM `test` RIGHT JOIN `hello`  `t` ON `t`.`name` = '小牛'
Db::table('test')->

rightJoin(['t' => 'hello'], ['name as nikename', 'tt' => 'value'], 'name', '=', '小牛')->

getAll();
```

## fullJoin

``` php
# SELECT `test`.*,`t`.`name` AS `nikename`,`t`.`value` AS `tt` FROM `test` FULL JOIN `hello`  `t` ON `t`.`name` = '小牛'
Db::table('test')->

fullJoin(['t' => 'hello'], ['name as nikename', 'tt' => 'value'], 'name', '=', '小牛')->

getAll();
```

## crossJoin

交叉连接不用设置 on 条件。

``` php
# SELECT `test`.*,`t`.`name` AS `nikename`,`t`.`value` AS `tt` FROM `test` CROSS JOIN `hello`  `t`
Db::table('test')->

crossJoin(['t' => 'hello'], ['name as nikename', 'tt' => 'value'])->

getAll();
```

## naturalJoin

自然连接不用设置 on 条件。

``` php
# SELECT `test`.*,`t`.`name` AS `nikename`,`t`.`value` AS `tt` FROM `test` NATURAL JOIN `hello`  `t`
Db::table('test')->

naturalJoin(['t' => 'hello'], ['name as nikename', 'tt' => 'value'])->

getAll();
```