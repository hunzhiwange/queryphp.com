# 查询语言.prefix

## 函数原型

``` php
public function prefix($mixPrefix);
```

## 用法如下

``` php
# SELECT SQL_CALC_FOUND_ROWS `test`.* FROM `test` WHERE `test`.`id` = 5
Db::table('test')->

prefix('SQL_CALC_FOUND_ROWS')->

where('id', '=', 5)->

getAll();
    
# SELECT SQL_NO_CACHE `test`.* FROM `test` WHERE `test`.`id` = 5
Db::table('test')->

prefix('SQL_NO_CACHE')->

where('id', '=', 5)->

getAll();
```