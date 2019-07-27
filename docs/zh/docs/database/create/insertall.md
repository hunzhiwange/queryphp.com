# 批量写入数据.insertAll

## 函数原型

插入成功后，返回 lastInsertId 。

```
public function insertAll($data, $arrBind = [], $booReplace = false, $bFlag = false);
```

## 用法如下：

``` php
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
$data = [
    ['name' => '小鸭子1', 'value' => '呱呱呱1'],
    ['name' => '小鸭子2', 'value' => '呱呱呱2'],
    ['name' => '小鸭子3', 'value' => '呱呱呱3'],
    ['name' => '小鸭子4', 'value' => '呱呱呱4'],
];

Db::table('test')->

insertAll($data);
```

## 绑定参数

``` php
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
$data = [
    ['name' => '小鸭子1', 'value' => '呱呱呱1'],
    ['name' => '小鸭子2', 'value' => '[?]'],
    ['name' => '小鸭子3', 'value' => '呱呱呱3'],
    ['name' => '小鸭子4', 'value' => '[?]'],
];

Db::table('test')->

insertAll($data, ['吃肉1', '吃肉2']);

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
$data = [
    ['name' => '小鸭子1', 'value' => '呱呱呱1'],
    ['name' => '小鸭子2', 'value' => '[:hello]'],
    ['name' => '小鸭子3', 'value' => '呱呱呱3'],
    ['name' => '小鸭子4', 'value' => '[:world]'],
];

Db::table('test')->

insertAll($data, ['hello' => 'hello 吃肉', 'world' => 'world 喝汤']);
```

## 使用 bind 绑定参数

``` php
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
$data = [
    ['name' => '小鸭子1', 'value' => '呱呱呱1'],
    ['name' => '小鸭子2', 'value' => '[?]'],
    ['name' => '小鸭子3', 'value' => '呱呱呱3'],
    ['name' => '小鸭子4', 'value' => '[?]'],
];

Db::table('test')->

bind(['吃鱼', '吃肉'])->

insertAll($data);
```

## replace 支持

``` php
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
$data = [
    ['name' => '小鸭子1', 'value' => '呱呱呱1'],
    ['name' => '小鸭子2', 'value' => '[?]'],
    ['name' => '小鸭子3', 'value' => '呱呱呱3'],
    ['name' => '小鸭子4', 'value' => '[?]'],
];

Db::table('test')->

bind(['吃鱼', '吃肉'])->

insertAll($data, [], true);
```
