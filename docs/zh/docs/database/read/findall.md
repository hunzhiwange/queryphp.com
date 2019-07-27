# 查询多条数据.getAll

## 函数原型

``` php
public function getAll($bFlag = false);
```

## 用法如下

``` php
# SELECT `test`.* FROM `test` 
Db::table('test')->

getAll();

# SELECT `test`.* FROM `test`
Db::table('test')->

all()->

get();
```
