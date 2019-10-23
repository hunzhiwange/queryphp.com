# 更新字段.updateColumn

## 函数原型

更新成功后，返回影响行数，没有修改记录返回 0，updateColumn 实际上调用的是 update 方法。

``` php
public function updateColumn($strColumn, $mixValue, $arrBind = [], $bFlag = false);
```

## 用法如下

``` php
# UPDATE `test` SET `test`.`name` = :name WHERE `test`.`id` = 503 
/*
Array
(
    [name] => Array
        (
            [0] => 小小小鸟，怎么也飞不高。
            [1] => 2
        )
)
*/
Db::table('test')->

where('id', 503)->

updateColumn('name', '小小小鸟，怎么也飞不高。');
```

## 支持表达式

``` php
# UPDATE `test` SET `test`.`name` = concat(`test`.`value`,`test`.`name`) WHERE `test`.`id` = 503
/*
Array
(
)
*/
Db::table('test')->

where('id', 503)->

updateColumn('name', '{concat([value],[name])}');
```
