# 查询数据.select

## 函数原型

``` php
public function select($mixData = null, $arrBind = [], $bFlag = false);
```

## 原生 sql 查询

``` php
/*
Array
(
    [0] => select *from test where id = ?
    [1] => Array
        (
            [0] => 1
        )

)
*/
Db::table('test')->

select('select *from test where id = ?', [1]);
```

## 直接查询 get

``` php
/*
Array
(
    [0] => SELECT `test`.* FROM `test` 
    [1] => Array
        (
        )

    [2] => 
    [3] => 5
    [4] => 
    [5] => Array
        (
        )
)
*/
Db::table('test')->

select();
```

## 回调处理

``` php
/*
Array
(
    [0] => SELECT `test`.* FROM `test` WHERE `test`.`id` = 1 
    [1] => Array
        (
        )

    [2] => 
    [3] => 5
    [4] => 
    [5] => Array
        (
        )
)
*/
datas::table('test')->

select(function($select) {
    $select->where('id', 1);
});
```


## 参数为 Leevel\Database\Select

``` php
/*
Array
(
    [0] => SELECT `test`.* FROM `test` WHERE `test`.`id` = 5 
    [1] => Array
        (
        )

    [2] => 
    [3] => 5
    [4] => 
    [5] => Array
        (
        )
)
*/
$select = Db::table('test')->

where('id', 5);

Db::select($select);
```
