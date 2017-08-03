---
title: 数据库构造器条件运算符.if.elseIf.else.endIf
type: v4
order: 125
---

# 函数原型
QueryPHP 数据构造器支持条件运算符，可以根据不同条件做不同的事情，支持所有的构造器函数，即返回 $this。
~~~
public function if($booFlowConditionIsTrue)
public function elseIf($booFlowConditionIsTrue)
public function else()
public function endIf()
~~~

# 用法如下
~~~
/*
Array
(
    [0] => SELECT `test`.* FROM `test` WHERE `test`.`id` = 2 ORDER BY `test`.`name` DESC LIMIT 1 
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
$intId = 2;      
print_r ( 
   database::table ( 'test' )
      ->if ( $intId == 1 )
          ->where ( 'id', 1 )
      ->elseIf ( $intId == 2 )
          ->where ( 'id', 2 )
          ->orderBy('name DESC')
      ->else ( $intId == 3 )
          ->where ( 'id', 3 )
          ->where ( 'id', 1111 )
      ->endIf ()
          ->getOne ( true )
);
~~~