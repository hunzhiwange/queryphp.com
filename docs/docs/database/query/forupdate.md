# 查询语言.forUpdate

## 函数原型

``` php
public function forUpdate($bFlag = true);
```

## 用法如下

``` php
# SELECT `test`.*  FROM `test` FOR UPDATE
Db::table('test')->

forUpdate()->

getAll();
```

Or

``` php
# SELECT `test`.*  FROM `test`
Db::table('test')->

forUpdate()->

forUpdate(false)->

getAll();
```