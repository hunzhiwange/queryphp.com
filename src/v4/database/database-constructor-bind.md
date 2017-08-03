---
title: 数据库构造器.bind
type: v4
order: 132
---

# 函数原型
~~~
public function table($mixTable, $mixCols = '*');
~~~

# 参数绑定 :id
~~~
# SELECT `test`.* FROM `test` WHERE `test`.`id` = :id AND `test`.`hello` LIKE :name
/*
Array
(
    [id] => Array
        (
            [0] => 1
            [1] => 1
        )

    [name] => Array
        (
            [0] => 小鸭子
            [1] => 2
        )
)
*/
database::table ( 'test' )
    ->bind(['id'=>[1,\PDO::PARAM_INT],'name'=>'小鸭子'])
    ->where('id','=','[:id]')
    ->where('hello','like','[:name]')
    ->get ();
~~~

# 参数绑定 ?
~~~
# SELECT `test`.* FROM `test` WHERE `test`.`id` = ? AND `test`.`hello` LIKE ? 
/*
Array
(
    [0] => Array
        (
            [0] => 5
            [1] => 2
        )

    [1] => Array
        (
            [0] => 小鸭子
            [1] => 2
        )

)
*/
~~~