---
title: 数据库更新数据.updateColumn
type: v4
order: 157
---

# 函数原型
更新成功后，返回影响行数，没有修改记录返回 0，updateColumn 实际上调用的是 update 方法。
~~~
public function updateColumn($strColumn, $mixValue, $arrBind = [], $bFlag = false)
~~~

# 用法如下：
~~~
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
var_dump ( database::table ( 'test' )->where ( 'id', 503 )->updateColumn ( 'name', '小小小鸟，怎么也飞不高。' ) );
~~~

# 支持 update 所具有的参数
~~~
# UPDATE `test` SET `test`.`name` = concat(`test`.`value`,`test`.`name`) WHERE `test`.`id` = 503
/*
Array
(
)
*/
var_dump ( database::table ( 'test' )->where ( 'id', 503 )->updateColumn ( 'name', '{concat([value],[name])}' ) );
~~~