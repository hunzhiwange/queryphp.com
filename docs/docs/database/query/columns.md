# 查询语言.columns

## 添加字段 columns

字段条件 $mixCols 用法和 table 中的 $mixCols 一致。

``` php
# 函数原型
public function columns($mixCols = '*', $strTable = null);

# SELECT `test`.*,`test`.`id`,`test`.`name`,`test`.`value` FROM `test`
Db::table('test')->

columns('id')->

columns('name,value')->

getAll();
```

## 设置字段 setColumns

清空原有字段，然后添加新的字段。

``` php
# 函数原型
public function setColumns($mixCols = '*', $strTable = null);

# SELECT `test`.`remark` FROM `test`
Db::table('test')->

columns('id')->

columns('name,value')->

setColumns('remark')->

getAll();
```
