# 查询一个字段的值.value.pull

## 函数原型

返回一条数据的字段值，如果不存在则返回 null。

``` php
public function value($strField, $bFlag = false);
public function pull($strField, $bFlag = false); // 别名
```

## 用法如下

``` php
# SELECT `test`.`id` FROM `test` LIMIT 1
Db::table('test')->

value('id');

# SELECT `test`.`id` FROM `test` LIMIT 1
Db::table('test')->

pull('id');
```
