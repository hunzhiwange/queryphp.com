# 查询单条数据.getOne

## 函数原型

``` php
public function getOne($bFlag = false);
```

## 用法如下

``` php
# SELECT `test`.* FROM `test` LIMIT 1
Db::table('test')->

getOne();

# SELECT `test`.* FROM `test` LIMIT 1
Db::table('test')->

one()->

get();
```
