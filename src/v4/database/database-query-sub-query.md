---
title: 数据库查询子查询
type: v4
order: 153
---

QueryPHP 提供强大的子查询 SQL，支持多种方式构造子查询。

# 通过 makeSql 方法生成 SQL
~~~
# (SELECT `test`.* FROM `test` )
# SELECT `a`.* FROM (SELECT `test`.* FROM `test` ) a
var_dump($strSubSql = database::table('test')->makeSql(true));
var_dump(database::table($strSubSql.' as a')->all()->makeSql());
~~~

# 支持 Q\database\select
~~~
# SELECT `a`.* FROM (SELECT `test`.* FROM `test` ) a 
# SELECT `bb`.* FROM (SELECT `test`.* FROM `test` ) bb
$objSubSql = database::table('test');
var_dump(database::table($objSubSql)->all()->makeSql());
var_dump(database::table(['bb' => $objSubSql])->all()->makeSql());
~~~

# 支持回调方式
~~~
# SELECT `a`.* FROM (SELECT `test`.* FROM `test` ) a 
var_dump(database::table(['b'=>function($objSelect){
	$objSelect->table('world');
}])->all()->makeSql());

# SELECT `a`.* FROM (SELECT `world`.* FROM `world` ) a
var_dump(database::table(function($objSelect){
    $objSelect->table('world');
})->all()->makeSql());

# SELECT `a`.`remark`,`hello`.`name`,`hello`.`value` FROM (SELECT `world`.* FROM `world` ) a  INNER JOIN `hello` ON `hello`.`name` = '小牛'
var_dump(database::table ( function($objSelect){
	$objSelect->table('world');
},'remark')->join('hello','name,value', 'name','=','小牛' )->getAll ());

# SELECT `hello`.* FROM `hello` WHERE `hello`.`id` IN (SELECT `world`.* FROM `world` )
var_dump(database::table('hello')->where('id','in',function($objSelect){
   $objSelect->table('world');
})->makeSql());
~~~

# 查询条件 in
~~~
# SELECT `hello`.* FROM `hello` WHERE `hello`.`id` IN (SELECT `test`.* FROM `test` ) 
# SELECT `hello`.* FROM `hello` WHERE `hello`.`id` IN (SELECT `test2`.* FROM `test2` )
$strSubSql = database::table('test')->makeSql(true);
$objSubSql = database::table('test2');
var_dump(database::table('hello')->where('id','in',$strSubSql)->makeSql());
var_dump(database::table('hello')->where('id','in',$objSubSql)->makeSql());

# SELECT `hello`.* FROM `hello` WHERE `hello`.`id` IN ((SELECT `test`.`name` FROM `test` WHERE `test`.`id` = 1 LIMIT 1 ),'2',3)
var_dump(database::table('hello')->where('id','in',[function($objSelect){
    $objSelect->table('test')->where('id',1)->value('name');
},'2',3])->makeSql());
~~~

# 查询条件 =
还有类似于这些都可以这样子写，系统全部支持。
~~~
# SELECT `hello`.* FROM `hello` WHERE `hello`.`id` = (SELECT `test`.`name` FROM `test` WHERE `test`.`id` = 1 LIMIT 1 )
var_dump(database::table('hello')->where('id','=',function($objSelect){
	$objSelect->table('test')->where('id',1)->value('name');
})->makeSql());
~~~

# 回调均支持返回值
~~~
# SELECT `hello`.* FROM `hello` WHERE `hello`.`id` IN (1,'2',3)
var_dump(database::table('hello')->where('id','in',[function($objSelect){
  return 1;
},'2',3])->makeSql());
~~~

# [not] exists 支持
功能详情请阅读《数据库构造器 where》一节中的 whereExists 部分。

 

