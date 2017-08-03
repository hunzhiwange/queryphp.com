---
title: 数据库查询数据.get
type: v4
order: 145
---

# 函数原型
~~~
public function get($nNum = null, $bFlag = false)
~~~

# 用法如下：
~~~
# SELECT `test`.* FROM `test
database::table ( 'test' )
    ->get();
    
# SELECT `test`.* FROM `test` LIMIT 0,5
database::table ( 'test' )
    ->get(5);
~~~