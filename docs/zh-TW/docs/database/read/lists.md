# 查询一列数据.lists

## 函数原型

返回一列数据，如果不存在则返回空的 array。

``` php
public function lists($mixFieldValue, $strFieldKey = null, $bFlag = false);
```

## 用法如下

``` php
# SELECT `test`.`name` FROM `test`
Db::table('test')->

lists('name');

# SELECT `test`.`name`,`test`.`id` FROM `test`
Db::table('test')->

lists('name,id');

# SELECT `test`.`name`,`test`.`id` FROM `test`
Db::table('test')->

lists('name', 'id');

# SELECT `test`.`name`,`test`.`id` FROM `test`
Db::table('test')->

lists(['name', 'id']);
```
