# 查询语言.groupBy

## 函数原型

``` php
public function order($mixExpr);
```

 > 说明：参数支持字符串以及它们构成的一维数组，用法和 orderBy 非常相似。

## 用法如下

``` php
# SELECT `test`.`tid` AS `id`,`test`.`tname` AS `value`  FROM `test`  GROUP BY `test`.`id`,`test`.`name`
Db::table('test', 'tid as id,tname as value')->

groupBy('id')->

groupBy('name')->

getAll();
    
# SELECT `test`.`tid` AS `id`,`test`.`tname` AS `value`  FROM `test`  GROUP BY `post`.`id`
Db::table('test', 'tid as id,tname as value')->

groupBy('post.id')->

getAll();

# SELECT `test`.`tid` AS `id`,`test`.`tname` AS `value`  FROM `test`  GROUP BY SUM(`test`.`num`) 
Db::table('test', 'tid as id,tname as value')->

groupBy('{SUM([num])}')->

getAll();
   
# SELECT `test`.`tid` AS `id`,`test`.`tname` AS `value`  FROM `test`  GROUP BY `test`.`title`,`test`.`id`,concat('1234',`test`.`id`,'ttt')
Db::table('test', 'tid as id,tname as value')->

groupBy("title,id,{concat('1234',[id],'ttt')}")->

getAll();
    
# SELECT `test`.`tid` AS `id`,`test`.`tname` AS `value`  FROM `test`  GROUP BY `test`.`title`,`test`.`id`,`test`.`ttt`,`test`.`value`
Db::table('test', 'tid as id,tname as value')->

groupBy(['title,id,ttt', 'value'])->

getAll();
```