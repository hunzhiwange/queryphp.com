---
title: 数据库构造器.having
type: v4
order: 137
---

# 函数原型
~~~
public function having($mixCond /* args */);
~~~
having 和 where 用法一致，只是没有 where exists 这种写法。

# 字段 （表达式） 值
~~~
# SELECT `test`.`tid` AS `id`,`test`.`tname` AS `value`  FROM `test`  GROUP BY `test`.`tid`  HAVING `test`.`tid` > 5
database::table ( 'test', 'tid as id,tname as value' )
	->groupBy('tid')
	->having('tid','>',5)
	->getAll ();
~~~

# 以数组直接传入
~~~
# SELECT `test`.`name` AS `id`,`test`.`tname` AS `value`  FROM `test`  GROUP BY `test`.`name`  HAVING `test`.`name` LIKE '技术'
database::table ( 'test', 'name as id,tname as value' )
	->groupBy('name')
	->having(['name','like', '技术'] )
	->getAll ();
~~~

# OrHaving 语法
~~~
# SELECT `test`.`name` AS `id`,`test`.`tname` AS `value`  FROM `test`  GROUP BY `test`.`name`  HAVING `test`.`name` LIKE '技术' OR `test`.`tname` LIKE '技术'
database::table ( 'test', 'name as id,tname as value' )
	->groupBy('name')
	->having(['name','like', '技术'] )
	->orHaving(['tname','like', '技术'])
	->getAll ();
~~~

# havingBetween 语法
~~~
# SELECT `test`.`name` AS `id`,`test`.`tname` AS `value`  FROM `test`  GROUP BY `test`.`name`  HAVING `test`.`id` BETWEEN 1 AND 10 AND `test`.`id` BETWEEN 1 AND 100
database::table ( 'test', 'name as id,tname as value' )
	->groupBy('name')
	->having('id','between', [1,10])
	->havingBetween('id', [1, 100])
	->getAll ();
~~~

# havingBetween 二维数组语法支持
后面的语法均支持这样的写法，后面不再继续示例了。
~~~
# SELECT `test`.`name` AS `id`,`test`.`tname` AS `value`  FROM `test`  GROUP BY `test`.`name`  HAVING `test`.`name` BETWEEN 1 AND 100 AND `test`.`tname` BETWEEN 5 AND 22
database::table ( 'test', 'name as id,tname as value' )
	->groupBy('name')
	->havingBetween( [ ['name', [1, 100]], ['tname', [5, 22]] ])
	->getAll ();
~~~

# havingNotBetween 语法
~~~
# SELECT `test`.*  FROM `test`  GROUP BY `test`.`name`  HAVING `test`.`id` NOT BETWEEN 1 AND 10 AND `test`.`id` NOT BETWEEN 1 AND 100
database::table ( 'test')
	->groupBy('name')
	->having('id','not between', [1,10])
	->havingNotBetween('id', [1, 100])
	->getAll ();
~~~

# havingIn 语法
~~~
# SELECT `test`.*  FROM `test`  GROUP BY `test`.`name`  HAVING `test`.`id` IN (2,50) AND `test`.`num` IN (2,50) 
database::table ( 'test')
	->groupBy('name')
	->having('id','in', [2,50])
	->havingIn('num', [2,50])
	->getAll ();
~~~

# havingNotIn 语法
~~~
# SELECT `test`.*  FROM `test`  GROUP BY `test`.`name`  HAVING `test`.`id` NOT IN (2,50) AND `test`.`num` NOT IN (2,50)
database::table ( 'test')
	->groupBy('name')
	->having('id','not in', [2,50])
	->havingNotIn('num', [2,50])
	->getAll ();
~~~

# havingNull 语法
~~~
# SELECT `test`.*  FROM `test`  GROUP BY `test`.`name`  HAVING `test`.`id` IS NULL AND `test`.`num` IS NULL
database::table ( 'test')
	->groupBy('name')
	->having('id','null')
	->havingNull('num')
	->getAll ();
~~~

# havingNotNull 语法
~~~
# SELECT `test`.*  FROM `test`  GROUP BY `test`.`name`  HAVING `test`.`id` IS NOT NULL AND `test`.`num` IS NOT NULL
database::table ( 'test')
	->groupBy('name')
	->having('id','not null')
	->havingNotNull('num')
	->getAll ();
~~~

# havingLike 语法
~~~
# SELECT `test`.* FROM `test` GROUP BY `test`.`name` HAVING `test`.`id` LIKE '123' AND `test`.`num` LIKE '55'
database::table ( 'test')
    ->groupBy('name')
    ->having('id','like','123')
    ->havingLike('num','55')
    ->getAll ();
~~~

# havingNotLike 语法
~~~
# SELECT `test`.* FROM `test` GROUP BY `test`.`name` HAVING `test`.`id` NOT LIKE '123' AND `test`.`num` NOT LIKE '55'
database::table ( 'test')
    ->groupBy('name')
    ->having('id','not like','123')
    ->havingNotLike('num','55')
    ->getAll ();
~~~

# havingDate、havingMonth、havingDay、havingYear 语法
本功能比较独立，剔除来了见《数据库构造器时间运算符 time endTime》

# 分组查询
~~~
# SELECT `test`.*  FROM `test`  GROUP BY `test`.`id`  HAVING `test`.`id` = 5 OR (`test`.`votes` > 100 AND `test`.`title` <> 'Admin')
database::table ( 'test' )
    ->groupBy('id')
    ->having ( 'id', 5 )
    ->orHaving ( function ($objSelect) {
    	$objSelect->having ( 'votes', '>', 100 )->having ( 'title', '<>', 'Admin' );
    } )
    ->getAll ();

# SELECT `test`.*  FROM `test`  GROUP BY `test`.`id`  HAVING `test`.`id` = 5 OR `test`.`name` = '小牛' AND (`test`.`votes` > 100 OR `test`.`title` <> 'Admin')
database::table ( 'test' )
    ->groupBy('id')
    ->having ( 'id', 5 )
    ->orHaving ( 'name', '小牛' )
    ->having ( function ($objSelect) {
        $objSelect->having ( 'votes', '>', 100 )->orHaving ( 'title', '<>', 'Admin' );
    } )
    ->getAll ();
~~~

# 条件表达式支持
条件表达式由“{}”包起来表示支持条件表达式，“[]”表示支持字段格式化。
~~~
# SELECT `test`.`post`,`test`.`value`,concat("tt_",`test`.`id`)  FROM `test`  GROUP BY `test`.`id`  HAVING concat("hello_",`test`.`posts`) = `test`.`id`
database::table ( 'test', 'post,value,{concat("tt_",[id])}' )
    ->groupBy('id')
    ->having ( '{concat("hello_",[posts])}', '=', '{[id]}' )
    ->getAll ();
~~~

# 字段作为键值
~~~
# SELECT `test`.*  FROM `test`  GROUP BY `test`.`id`  HAVING `test`.`id` = '故事' AND `test`.`name` IN (1,2,3) AND `test`.`weidao` BETWEEN '40' AND '100' AND `test`.`value` IS NULL AND `test`.`remark` IS NOT NULL AND `test`.`goods` = '东亚商品' AND `test`.`hello` = 'world'
database::table ( 'test' )
    ->groupBy('id')
    ->having ( [ 
        'id' => [ '=','故事' ],
        'name' => ['in',[1,2,3]],
        'weidao' => ['between','40,100'],
        'value' => 'null',
        'remark' => ['not null'],
        'goods' => '东亚商品',
        'hello' => ['world'] 
    ] )->getAll ();
~~~

# string__ 支持（支持字段）
~~~
# SELECT `test`.*  FROM `test`  GROUP BY `test`.`id`  HAVING `test`.`name` = 11 and `post`.`value` = 22 and concat("tt_",`test`.`id`)
database::table ( 'test')
    ->groupBy('id')
    ->having (
       ['string__' => '{[name] = 11 and [post.value] = 22 and concat("tt_",[id])}']
    )
    ->getAll ();
~~~

# subor__ 和 suband__ 支持
~~~
# SELECT `test`.*  FROM `test`  GROUP BY `test`.`id`  HAVING `test`.`hello` = 'world' OR (`test`.`id` LIKE '你好')
database::table ( 'test')
    ->groupBy('id')
    ->having (
       [
          'hello' => 'world',
          'subor__' => ['id','like','你好']
       ]
    )
    ->getAll ();

# SELECT `test`.*  FROM `test`  GROUP BY `test`.`id`  HAVING `test`.`hello` = '111' OR (`test`.`id` LIKE '你好' AND `test`.`value` = 'helloworld') AND (`test`.`id` LIKE '你好' OR `test`.`value` = 'helloworld' OR (`test`.`child_one` > '123' AND `test`.`child_two` LIKE '123'))
database::table ( 'test')
    ->groupBy('id')
    ->having (
       [
          'hello' => '111',
          'subor__' => [
             ['id','like','你好'],
             ['value','=','helloworld']
          ],
          'suband__' => [
                'logic__' => 'or',
                  ['id','like','你好'],
                  ['value','=','helloworld'],
                  'subor__' => [
                      ['child_one','>','123'],
                      ['child_two','like','123'],
                  ]
          ]
       ]
    )
    ->getAll ();
~~~