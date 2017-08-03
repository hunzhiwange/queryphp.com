---
title: 数据库查询一列数据.lists
type: v4
order: 150
---

# 函数原型
返回一列数据，如果不存在则返回空的 array。
~~~
public function lists($mixFieldValue, $strFieldKey = null, $bFlag = false)
~~~

# 用法如下
~~~
# SELECT `test`.`name` FROM `test`
var_dump(
 database::table ( 'test')
    ->lists('name')
);


# SELECT `test`.`name`,`test`.`id` FROM `test`
var_dump(
 database::table ( 'test')
    ->lists('name,id')
    ->lists('name','id') // 等效
    ->lists(['name','id'])// 等效
);
~~~
