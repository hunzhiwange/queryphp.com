# 查询语言.reset

## 函数原型

``` php
public function reset($sOption = null);
```

## 用法如下

``` php
# SELECT `newtable`.*  FROM `newtable`  WHERE `newtable`.`new` = 'world'
Db::table('test')->

where('id', '=', 5)->

where('name', 'like', 'me')->

reset()->

table('newtable')->

where('new', '=', 'world')->

getAll();
    
# SELECT `test`.*  FROM `test`  WHERE `test`.`new` LIKE 'new'
Db::table('test')->

where('id', '=', 5)->

where('name', 'like', 'me')->

setColumns('name,id')->

reset('where')->

where('new', 'like', 'new')->

getAll();
```