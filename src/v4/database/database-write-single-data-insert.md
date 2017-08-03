---
title: 数据库写入单条数据.insert
type: v4
order: 154
---

# 函数原型
插入成功后，返回 lastInsertId 。
~~~
public function insert($mixData, $arrBind = [], $booReplace = false, $bFlag = false)
~~~

# 用法如下：
~~~
# INSERT INTO `test` (`test`.`name`,`test`.`value`) VALUES (:name,:value)
/*
Array
(
    [name] => Array
        (
            [0] => '小鸭子'
            [1] => 2
        )

    [value] => Array
        (
            [0] => '吃饭饭'
            [1] => 2
        )
)
*/
$arrData = ['name' => '小鸭子', 'value' => '吃饭饭'];
var_dump(database::table('test')->insert($arrData));
~~~

# 绑定参数
~~~
# INSERT INTO `test` (`test`.`name`,`test`.`value`) VALUES (:name,:questionmark_0)
/*
Array
(
    [name] => Array
        (
            [0] => 小鸭子
            [1] => 2
        )

    [questionmark_0] => Array
        (
            [0] => 吃肉
            [1] => 2
        )
)
*/
$arrData = ['name' => '小鸭子', 'value' => '[?]'];
var_dump(database::table('test')->insert($arrData,['吃肉']));

# INSERT INTO `test` (`test`.`name`,`test`.`value`) VALUES (:name,:value)
/*
Array
(
    [name] => Array
        (
            [0] => 小鸭子
            [1] => 2
        )
    [value] => 呱呱呱
)
*/
$arrData = ['name' => '小鸭子', 'value' => '[:value]'];
var_dump(database::table('test')->insert($arrData,['value' => '呱呱呱']));
~~~

# 使用 bind 绑定参数
~~~
# INSERT INTO `test` (`test`.`name`,`test`.`value`) VALUES (:name,:questionmark_0)
/*
Array
(
    [name] => Array
        (
            [0] => 小鸭子
            [1] => 2
        )

    [questionmark_0] => Array
        (
            [0] => 吃鱼
            [1] => 2
        )
)
*/
$arrData = ['name' => '小鸭子', 'value' => '[?]'];
var_dump(database::table('test')->bind(['吃鱼'])->insert($arrData));
~~~

# replace 支持
~~~
# REPLACE INTO `test` (`test`.`name`,`test`.`value`) VALUES (:name,:value)
/*
Array
(
    [name] => Array
        (
            [0] => 小鸭子
            [1] => 2
        )
    [value] => 呱呱呱
)
*/
$arrData = ['name' => '小鸭子', 'value' => '[:value]'];
var_dump(database::table('test')->insert($arrData,['value' => '呱呱呱'],true));
~~~

说明：原生 sql 用法见【执行原生 sql 语句】,第二个方法中的参数将会覆盖 bind 中的方法；
