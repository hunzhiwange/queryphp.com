# 查询语言.forceIndex

## 函数原型

``` php
public function forceIndex($mixIndex, $sType = 'FORCE');
public function ignoreIndex($mixIndex);
```

## 用法如下

``` php
# SELECT `test`.* FROM `test` FORCE INDEX (nameindex,statusindex) IGNORE INDEX (testindex) WHERE `test`.`id` = 5
Db::table('test')->

forceIndex('nameindex,statusindex')->

ignoreIndex('testindex')->

where('id', '=', 5)->

getAll();
```