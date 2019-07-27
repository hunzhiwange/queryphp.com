# 插入单条数据.insert

## 函数原型

插入成功后，返回 lastInsertId 。

``` php
public function insert($mixData, $arrBind = [], $booReplace = false, $bFlag = false);
```

## 用法如下：

``` php
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
$data = ['name' => '小鸭子', 'value' => '吃饭饭'];

Db::table('test')->

insert($data);
```

## 绑定参数

``` php
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
$data = ['name' => '小鸭子', 'value' => '[?]'];

Db::table('test')->

insert($data, ['吃肉']);

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
$data = ['name' => '小鸭子', 'value' => '[:value]'];

Db::table('test')->

insert($data, ['value' => '呱呱呱']);
```

## 使用 bind 绑定参数

``` php
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
$data = ['name' => '小鸭子', 'value' => '[?]'];

Db::table('test')->

bind(['吃鱼'])->

insert($data);
```

## replace 支持

``` php
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
$data = ['name' => '小鸭子', 'value' => '[:value]'];

Db::table('test')->

insert($data, ['value' => '呱呱呱'], true);
```

 > 说明：原生 sql 用法见【执行原生 sql】,方法中的第二个参数将会覆盖 bind 中的方法；
