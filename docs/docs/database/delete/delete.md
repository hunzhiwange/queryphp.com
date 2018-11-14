# 删除数据.delete

## 函数原型

删除成功后，返回影响行数，没有修改记录返回 0。

``` php
public function delete($mixData = null, $arrBind = [], $bFlag = false);
```

## 用法如下

``` php
# DELETE FROM `test` WHERE `test`.`id` = 1 ORDER BY `test`.`id` DESC LIMIT 1
/*
(
)
*/
Db::table('test')->

where('id', 1)->

limit(1)->

orderBy('id desc')->

delete();
```

## 支持 join 方式删除数据

``` php
# DELETE t FROM `test` `t` INNER JOIN `hello` `h` ON `h`.`name` = '小牛' WHERE `t`.`id` = 1 
/*
(
)
*/
Db::table('test as t')->

innerJoin(['h' => 'hello'], [], 'name', '=', '小牛')->

where('id', 1)->

limit(1)->

orderBy('id desc')->

delete();
```

## 支持 using 方式删除数据

``` php
# DELETE FROM t1 USING `t2`,`t3`,`test` `t1` WHERE `t1`.`id` = `t2`.`id` AND `t2`.`id` = `t3`.`id` 
/*
(
)
*/
Db::table('test as t1')->

where('t1.id', '{[t2.id]}')->

where('t2.id', '{[t3.id]}')->

using('t2,t3')->

limit(1)->

orderBy('id desc')->

delete();
```
