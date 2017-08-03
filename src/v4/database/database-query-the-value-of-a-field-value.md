---
title: 数据库查询一个字段的值.value
type: v4
order: 149
---

# 函数原型
返回一条数据的字段值，如果不存在则返回 null。
~~~
public function value($strField, $bFlag = false)
~~~

# 用法如下
~~~
# SELECT `test`.`id` FROM `test` LIMIT 1
var_dump(
 database::table ( 'test')
    ->value('id')
); 
~~~
