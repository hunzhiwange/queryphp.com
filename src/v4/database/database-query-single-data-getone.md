---
title: 数据库查询单条数据.getOne
type: v4
order: 147
---

# 函数原型
~~~
public function getOne($bFlag = false)
~~~

# 用法如下：
~~~
# SELECT `test`.* FROM `test` LIMIT 1  
database::table ( 'test' )
    ->getOne ();
    
# SELECT `test`.* FROM `test` LIMIT 1  
database::table ( 'test' )
    ->one()
    ->get ();
~~~