---
title: 数据库查询多条数据.getAll
type: v4
order: 146
---

# 函数原型
~~~
public function getAll($bFlag = false)
~~~

# 用法如下：
~~~
# SELECT `test`.* FROM `test` 
database::table ( 'test' )
    ->getAll ();
    
# SELECT `test`.* FROM `test`
database::table ( 'test' )
    ->all()
    ->get ();
~~~