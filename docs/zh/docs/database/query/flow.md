# 查询语言.flow

## 函数原型

QueryPHP 数据构造器支持条件运算符，可以根据不同条件做不同的事情，支持所有的构造器函数，即返回 `$this`。

``` php
public function ifs($value = false);
public function elseIfs($value = false);
public function elses();
public function endIfs();
```

## 用法如下

``` php
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

$id = 2;

Db::table('test')->

ifs($id == 1)->where('id', 1)->

elseIfs($id == 2)->where('id', 2)->orderBy('name DESC')->

elseIfs($id == 3)->where('id', 3)->where('id', 1111)->

elseIfs($id == 4)->where('id', 4)->

endIfs()->

getOne(true)
```


## elses 浅记忆

elses 仅仅能记忆上一次 ifs,elseIfs 的结果，上一次的反向结果就是 elses 的条件值，我们建议不要在 SQL 链式中使用过度的条件判断。

``` php
/*
array (
  0 => 'SELECT `test`.* FROM `test` WHERE `test`.`id` = 2 AND `test`.`id` = 4 ORDER BY `test`.`name` DESC LIMIT 1',
  1 => 
  array (
  ),
  2 => false,
  3 => NULL,
  4 => NULL,
  5 => 
  array (
  ),
)
*/

$id = 2;

Db::table('test')->

ifs($id == 1)->where('id', 1)->

elseIfs($id == 2)->where('id', 2)->orderBy('name DESC')->

elseIfs($id == 3)->where('id', 3)->where('id', 1111)->

// elses 仅仅能记忆上一次 ifs,elseIfs 的结果，上一次的反向结果就是 elses 的条件值
// 其等价于 elseIfs($id != 3)
elses()->where('id', 4)->

endIfs()->

getOne()
```

 > 这里跟常用的 if elseif else 有区别，主要是受限于技术，其次是为保持简洁。
