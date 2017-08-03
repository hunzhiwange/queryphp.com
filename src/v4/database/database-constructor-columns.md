---
title: 数据库构造器.columns
type: v4
order: 142
---

# 添加字段 columns
字段条件 $mixCols 用法和 table 中的 $mixCols 一致。
~~~
# 函数原型
public function columns($mixCols = '*', $strTable = null)

# SELECT `test`.*,`test`.`id`,`test`.`name`,`test`.`value`  FROM `test`
database::table ( 'test' )
    ->columns('id')
    ->columns('name,value')
    ->get ();
~~~

# 设置字段 setColumns
清空原有字段，然后添加新的字段。
~~~
# 函数原型
public function setColumns($mixCols = '*', $strTable = null)

# SELECT `test`.`remark`  FROM `test`
database::table ( 'test' )
    ->columns('id')
    ->columns('name,value')
    ->setColumns('remark')
    ->get ();
~~~

# 字段映射 columnsMapping
第一个参数可以为字符串或者数组，第一个参数为字符串的，第二个参数为 null，则删除对应的隐射。
~~~
# 函数原型
public function columnsMapping($mixName, $sMappingTo = NULL)

# SELECT `test`.*  FROM `test`  WHERE `test`.`really_id` = 5
database::table ( 'test' )
    ->columnsMapping('id','really_id')
    ->where('id','=',5)
    ->get ();
~~~