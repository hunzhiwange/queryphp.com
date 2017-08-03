---
title: 数据库写入数据.insertAll
type: v4
order: 155
---

# 函数原型
插入成功后，返回 lastInsertId 。
~~~
public function insertAll($arrData, $arrBind = [], $booReplace = false, $bFlag = false)
~~~

# 用法如下：
~~~
# INSERT INTO `test` (`test`.`name`,`test`.`value`) VALUES (:name,:value),(:name_1,:value_1),(:name_2,:value_2),(:name_3,:value_3)
/*
Array
(
    [name] => Array
        (
            [0] => 小鸭子1
            [1] => 2
        )
        
    [value] => Array
        (
            [0] => 呱呱呱1
            [1] => 2
        )
        
    [name_1] => Array
        (
            [0] => 小鸭子2
            [1] => 2
        )
        
    [value_1] => Array
        (
            [0] => 呱呱呱2
            [1] => 2
        )
        
    [name_2] => Array
        (
            [0] => 小鸭子3
            [1] => 2
        )
        
    [value_2] => Array
        (
            [0] => 呱呱呱3
            [1] => 2
        )
        
    [name_3] => Array
        (
            [0] => 小鸭子4
            [1] => 2
        )
        
    [value_3] => Array
        (
            [0] => 呱呱呱4
            [1] => 2
        )
)
*/
$arrData = [
    ['name' => '小鸭子1', 'value' => '呱呱呱1'],
    ['name' => '小鸭子2', 'value' => '呱呱呱2'],
    ['name' => '小鸭子3', 'value' => '呱呱呱3'],
    ['name' => '小鸭子4', 'value' => '呱呱呱4']
];
var_dump(database::table('test')->insertAll($arrData));
~~~

# 绑定参数
~~~
# INSERT INTO `test` (`test`.`name`,`test`.`value`) VALUES (:name,:value),(:name_1,:questionmark_0_1),(:name_2,:value_2),(:name_3,:questionmark_1_3)
/*
Array
(
    [name] => Array
        (
            [0] => 小鸭子1
            [1] => 2
        )

    [value] => Array
        (
            [0] => 呱呱呱1
            [1] => 2
        )

    [name_1] => Array
        (
            [0] => 小鸭子2
            [1] => 2
        )

    [questionmark_0_1] => Array
        (
            [0] => 吃肉1
            [1] => 2
        )

    [name_2] => Array
        (
            [0] => 小鸭子3
            [1] => 2
        )

    [value_2] => Array
        (
            [0] => 呱呱呱3
            [1] => 2
        )

    [name_3] => Array
        (
            [0] => 小鸭子4
            [1] => 2
        )

    [questionmark_1_3] => Array
        (
            [0] => 吃肉2
            [1] => 2
        )
)
*/
$arrData = [
    ['name' => '小鸭子1', 'value' => '呱呱呱1'],
    ['name' => '小鸭子2', 'value' => '[?]'],
    ['name' => '小鸭子3', 'value' => '呱呱呱3'],
    ['name' => '小鸭子4', 'value' => '[?]']
];
var_dump(database::table('test')->insertAll($arrData,['吃肉1','吃肉2']));

# INSERT INTO `test` (`test`.`name`,`test`.`value`) VALUES (:name,:value),(:name_1,:hello),(:name_2,:value_2),(:name_3,:world)
/*
Array
(
    [name] => Array
        (
            [0] => 小鸭子1
            [1] => 2
        )

    [value] => Array
        (
            [0] => 呱呱呱1
            [1] => 2
        )

    [name_1] => Array
        (
            [0] => 小鸭子2
            [1] => 2
        )

    [name_2] => Array
        (
            [0] => 小鸭子3
            [1] => 2
        )

    [value_2] => Array
        (
            [0] => 呱呱呱3
            [1] => 2
        )

    [name_3] => Array
        (
            [0] => 小鸭子4
            [1] => 2
        )

    [hello] => hello 吃肉
    [world] => world 喝汤
)
*/
$arrData = [
    ['name' => '小鸭子1', 'value' => '呱呱呱1'],
    ['name' => '小鸭子2', 'value' => '[:hello]'],
    ['name' => '小鸭子3', 'value' => '呱呱呱3'],
    ['name' => '小鸭子4', 'value' => '[:world]']
];
var_dump(database::table('test')->insertAll($arrData,['hello'=>'hello 吃肉','world'=>'world 喝汤']));
~~~

# 使用 bind 绑定参数
~~~
# INSERT INTO `test` (`test`.`name`,`test`.`value`) VALUES (:name,:value),(:name_1,:questionmark_0_1),(:name_2,:value_2),(:name_3,:questionmark_1_3)
/*
Array
(
    [name] => Array
        (
            [0] => 小鸭子1
            [1] => 2
        )

    [value] => Array
        (
            [0] => 呱呱呱1
            [1] => 2
        )

    [name_1] => Array
        (
            [0] => 小鸭子2
            [1] => 2
        )

    [questionmark_0_1] => Array
        (
            [0] => 吃鱼
            [1] => 2
        )

    [name_2] => Array
        (
            [0] => 小鸭子3
            [1] => 2
        )

    [value_2] => Array
        (
            [0] => 呱呱呱3
            [1] => 2
        )

    [name_3] => Array
        (
            [0] => 小鸭子4
            [1] => 2
        )

    [questionmark_1_3] => Array
        (
            [0] => 吃肉
            [1] => 2
        )
)
*/
$arrData = [
    ['name' => '小鸭子1', 'value' => '呱呱呱1'],
    ['name' => '小鸭子2', 'value' => '[?]'],
    ['name' => '小鸭子3', 'value' => '呱呱呱3'],
    ['name' => '小鸭子4', 'value' => '[?]']
];
var_dump(database::table('test')->bind(['吃鱼','吃肉'])->insertAll($arrData));
~~~

# replace 支持
~~~
# REPLACE INTO `test` (`test`.`name`,`test`.`value`) VALUES (:name,:value),(:name_1,:questionmark_0_1),(:name_2,:value_2),(:name_3,:questionmark_1_3)
/*
Array
(
    [name] => Array
        (
            [0] => 小鸭子1
            [1] => 2
        )

    [value] => Array
        (
            [0] => 呱呱呱1
            [1] => 2
        )

    [name_1] => Array
        (
            [0] => 小鸭子2
            [1] => 2
        )

    [questionmark_0_1] => Array
        (
            [0] => 吃鱼
            [1] => 2
        )

    [name_2] => Array
        (
            [0] => 小鸭子3
            [1] => 2
        )

    [value_2] => Array
        (
            [0] => 呱呱呱3
            [1] => 2
        )

    [name_3] => Array
        (
            [0] => 小鸭子4
            [1] => 2
        )

    [questionmark_1_3] => Array
        (
            [0] => 吃肉
            [1] => 2
        )
)
*/
$arrData = [
    ['name' => '小鸭子1', 'value' => '呱呱呱1'],
    ['name' => '小鸭子2', 'value' => '[?]'],
    ['name' => '小鸭子3', 'value' => '呱呱呱3'],
    ['name' => '小鸭子4', 'value' => '[?]']
];
var_dump(database::table('test')->bind(['吃鱼','吃肉'])->insertAll($arrData, [], true));
~~~