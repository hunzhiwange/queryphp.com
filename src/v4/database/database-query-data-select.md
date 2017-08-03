---
title: 数据库查询数据.select
type: v4
order: 144
---

# 函数原型
~~~
public function select($mixData = null, $arrBind = [], $bFlag = false)
~~~

# 原生 sql 查询
~~~
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
print_r(
    database::table('test')->select('select *from test where id = ?',[1])
);
~~~


# 直接查询 get
~~~
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
print_r(
    database::table('test')->select()
);
~~~

# 回调处理
~~~
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
print_r(
    database::table('test')->select(function($objSelect){
        $objSelect->where('id',1);
    })
);
~~~


# 参数为 Q\database\select
~~~
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
$objSelect = database::table('test')->where('id',5);
print_r(
    database::select($objSelect)
);
~~~