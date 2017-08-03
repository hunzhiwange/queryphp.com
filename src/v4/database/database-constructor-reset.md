---
title: 数据库构造器.reset
type: v4
order: 143
---

# 函数原型
~~~
public function reset($sOption = null);
~~~

# 用法如下
~~~
# SELECT `newtable`.*  FROM `newtable`  WHERE `newtable`.`new` = 'world'
database::table ( 'test' )
    ->where('id','=',5)
    ->where('name','like','me')
    ->reset()
    ->table('newtable')
    ->where('new','=','world')
    ->get ();
    
# SELECT `test`.*  FROM `test`  WHERE `test`.`new` LIKE 'new'
database::table ( 'test' )
    ->where('id','=',5)
    ->where('name','like','me')
    ->reset('where')
    ->where('new','like','new')
    ->get ();
~~~