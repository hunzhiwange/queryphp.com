# 查询语言.distinct

## 函数原型

``` php
public function distinct($bFlag = true);
```

## 用法如下

``` php
# SELECT DISTINCT `test`.*  FROM `test`
Db::table('test')->

distinct()->

getAll();
```

OR

``` php
# SELECT `test`.*  FROM `test`
Db::table('test')->

distinct()->

distinct(false)->

getAll();
```
