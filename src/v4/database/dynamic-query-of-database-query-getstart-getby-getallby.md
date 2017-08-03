---
title: 数据库查询动态查询.getStart.getBy.getAllBy
type: v4
order: 148
---

# 支持 get10start2
~~~
# SELECT `test`.* FROM `test` LIMIT 3,10 
database::table ( 'test')
    ->get10start3();
~~~

# 支持 getBy
~~~
# SELECT `test`.* FROM `test` WHERE `test`.`UserName` = '1111' LIMIT 1
database::table ( 'test')
    ->getByUserName('1111');
~~~

# 支持 getAllBy
~~~
# SELECT `test`.* FROM `test` WHERE `test`.`UserName` = '1111' AND `test`.`Sex` = '222'
database::table ( 'test')
    ->getAllByUserNameAndSex('1111','222');
~~~

