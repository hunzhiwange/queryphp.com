# 查询语言.where

## 函数原型

``` php
public function where($mixCond /* args */);
```

## 字段 （表达式） 值

``` php
## SELECT `test`.* FROM `test` WHERE `test`.`id` = 1
Db::table('test')->

where('id', '=', 1)->

getAll();

## SELECT `test`.* FROM `test` WHERE `test`.`id` = 2 
Db::table('test')->

where('id', 2)->

getAll();

## SELECT `test`.* FROM `test` WHERE `test`.`id` = 2 AND `test`.`name` > '狗蛋' AND `test`.`value` LIKE '小鸭子'
Db::table('test')->

where('id', 2)->

where('name', '>', '狗蛋')->

where('value', 'like', '小鸭子')->

getAll();
```

## 以数组直接传入

``` php
## SELECT `test`.* FROM `test` WHERE `test`.`name` LIKE '技术'
Db::table('test')->

where(['name','like', '技术'])->

getAll();

## SELECT `test`.* FROM `test` WHERE `test`.`name` LIKE '技术' AND `test`.`value` <> '结局' 
Db::table('test')->

where ([
  ['name','like', '技术'],
  ['value','<>', '结局']
])->

getAll();
```

## OrWhere 语法

``` php
## SELECT `test`.* FROM `test` WHERE `test`.`name` LIKE '技术'
Db::table('test')->

where('name','like', '技术')->

orWhere('value','<>', '结局')->

getAll();
```

## whereBetween 语法

``` php
## SELECT `test`.* FROM `test` WHERE `test`.`id` BETWEEN 1 AND 100
Db::table('test')->

whereBetween('id', [1, 100])->

getAll();

## SELECT `test`.* FROM `test` WHERE `test`.`id` BETWEEN 1 AND 10
Db::table('test')->

where('id','between', [1, 10])->

getAll();
```

## whereBetween 二维数组语法支持

后面的语法均支持这样的写法，后面不再继续示例了。

``` php
## SELECT `test`.* FROM `test` WHERE `test`.`id` BETWEEN 1 AND 100 AND `test`.`name` BETWEEN 5 AND 22
Db::table('test')->

whereBetween([
  ['id', [1, 100]],
  ['name', [5, 22]]
])->

getAll();
```

## whereNotBetween 语法

``` php
## SELECT `test`.*  FROM `test` WHERE `test`.`id` NOT BETWEEN 1 AND 10
Db::table('test')->

whereNotBetween('id', [1, 10])->

getAll();

## SELECT `test`.* FROM `test` WHERE `test`.`id` NOT BETWEEN 1 AND 10
Db::table('test')->

where('id','not between', [1, 10])->

getAll();
```

## whereIn 语法

``` php
## SELECT `test`.* FROM `test` WHERE `test`.`id` IN (2, 50)
Db::table('test')->

whereIn('id', [2, 50])->

getAll();

## SELECT `test`.* FROM `test` WHERE `test`.`id` IN ('1','10')
Db::table('test')->

where('id', 'in', '1,10')

->getAll();

## SELECT `test`.* FROM `test` WHERE `test`.`id` IN (2,50)
Db::table('test')->

where('id', 'in', [2, 50])

->getAll();
```

## whereNotIn 语法

``` php
## SELECT `test`.* FROM `test` WHERE `test`.`id` NOT IN (2,50)
Db::table('test')->

whereNotIn('id', [2, 50])->

getAll();

## SELECT `test`.* FROM `test` WHERE `test`.`id` NOT IN ('1','10')
Db::table('test')->

where('id','not in', '1,10')->

getAll();
```

## whereNull 语法

``` php
## SELECT `test`.* FROM `test` WHERE `test`.`id` IS NULL
Db::table('test')->

whereNull('id')->

getAll();

## SELECT `test`.* FROM `test` WHERE `test`.`id` IS NULL
Db::table('test')->

where('id','null')->

getAll();
```

## whereNotNull 语法

``` php
## SELECT `test`.* FROM `test` WHERE `test`.`id` IS NOT NULL
Db::table('test')->

whereNotNull('id')->

getAll();

## SELECT `test`.* FROM `test` WHERE `test`.`id` IS NOT NULL
Db::table('test')->

where('id','not null')->

getAll();
```

## whereLike 语法

``` php
## SELECT `test`.* FROM `test` WHERE `test`.`id` LIKE '5'
Db::table('test')->

whereLike('id','5')->

getAll();

## SELECT `test`.* FROM `test` WHERE `test`.`id` LIKE '5'
Db::table('test')->

where('id','like', '5')->

getAll();
```

## whereNotLike 语法

``` php
## SELECT `test`.* FROM `test` WHERE `test`.`id` NOT LIKE '5'
Db::table('test')->

whereNotLike('id','5')->

getAll();

## SELECT `test`.* FROM `test` WHERE `test`.`id` NOT LIKE '5'
Db::table('test')->

where('id','not like', '5')->

getAll();
```

## whereExists 语法

``` php
## SELECT `test`.* FROM `test` WHERE EXISTS (SELECT `subsql`.* FROM `subsql` WHERE `subsql`.`id` = 1)
Db::table('test')->

whereExists(
    function($select) {
        $select->table('subsql')->where('id', 1);
    }
)->

getAll();

## SELECT `test`.* FROM `test` WHERE EXISTS (SELECT `subsql`.* FROM `subsql`)
$subSelect = Db::table('subsql');

Db::table('test')->

where(
   [
      'exists__' => $subSelect
   ]
)->

getAll();

## SELECT `test`.* FROM `test` WHERE EXISTS (select *from d_sub)
Db::table('test')->

where(
   [
      'exists__' => 'select *from d_sub'
   ]
)->

getAll();

## SELECT `test`.* FROM `test` WHERE EXISTS (SELECT `subsql`.* FROM `subsql` WHERE `subsql`.`id` = 1)
Db::table('test')->

where(
   [
      'exists__' => function($select) {
          $select->table('subsql')->where('id', 1);
      }
   ]
)->

getAll();
```

## whereNotExists 语法

``` php
## SELECT `test`.* FROM `test` WHERE NOT EXISTS ( SELECT `subsql`.* FROM `subsql` WHERE `subsql`.`id` = 1  )
Db::table('test')->

whereNotExists(
    function($select){
        $select->table('subsql')->where('id', 1);
    }
)->

getAll();
```

## whereDate、whereMonth、whereDay、whereYear 语法

本功能比较独立，剔除来了见《数据库构造器时间运算符 time endTime》

## 分组查询

``` php
## SELECT `test`.* FROM `test` WHERE `test`.`id` = '5' OR (`test`.`votes` > 100 AND `test`.`title` <> 'Admin')
Db::table('test')->

where('id', 5)->

orWhere(function ($select) {
        $select->where('votes', '>', 100)->where('title', '<>', 'Admin');
})->

getAll();

## SELECT `test`.* FROM `test` WHERE `test`.`id` = '5' OR `test`.`name` = '小牛' AND (`test`.`votes` > 100 OR `test`.`title` <> 'Admin')
Db::table('test')->

where('id', 5)->

orWhere('name', '小牛')->

where(function ($select) {
    $select->where('votes', '>', 100)->orWhere('title', '<>', 'Admin');
})->

getAll();
```

## 条件表达式支持

条件表达式由 `“{}”` 包起来表示支持条件表达式，`“[]”` 表示支持字段格式化。

``` php
## SELECT `test`.`post`,`test`.`value`,concat("tt_",`test`.`id`) FROM `test` WHERE concat("hello_",`test`.`posts`) = `test`.`id` 
Db::table('test', 'post,value,{concat("tt_",[id])}')->

where('{concat("hello_",[posts])}', '=', '{[id]}')->

getAll();
```

## 字段作为键值

``` php
## SELECT `test`.* FROM `test` WHERE `test`.`id` = '故事' AND `test`.`name` IN (1,2,3) AND `test`.`weidao` BETWEEN '40' AND '100' AND `test`.`value` IS NULL AND `test`.`remark` IS NOT NULL AND `test`.`goods` = '东亚商品' AND `test`.`hello` = 'world'
Db::table('test')->

where([ 
    'id' => ['=', '故事'],
    'name' => ['in', [1,2,3]],
    'weidao' => ['between', '40,100'],
    'value' => 'null',
    'remark' => ['not null'],
    'goods' => '东亚商品',
    'hello' => ['world'] 
])->

getAll();
```

## string__ 支持（支持字段）

``` php
## SELECT `test`.* FROM `test` WHERE `test`.`name` = 11 and `post`.`value` = 22 and concat("tt_",`test`.`id`)
Db::table('test')->

where (
    ['string__' => '{[name] = 11 and [post.value] = 22 and concat("tt_",[id])}']
)->

getAll();
```

## subor__ 和 suband__ 支持

``` php
## SELECT `test`.* FROM `test` WHERE `test`.`hello` = 'world' OR (`test`.`id` LIKE '你好')
Db::table('test')->

where (
    [
        'hello' => 'world',
        'subor__' => ['id', 'like', '你好']
    ]
)->

getAll();

## SELECT `test`.* FROM `test` WHERE `test`.`hello` = '111' OR (`test`.`id` LIKE '你好' AND `test`.`value` = 'helloworld') AND (`test`.`id` LIKE '你好' OR `test`.`value` = 'helloworld' OR (`test`.`child_one` > '123' AND `test`.`child_two` LIKE '123')) 
Db::table('test')->

where (
   [
        'hello' => '111',
        'subor__' => [
            ['id', 'like', '你好'],
            ['value', '=', 'helloworld']
        ],
        'suband__' => [
            'logic__' => 'or',
            ['id2', 'like', '你好2'],
            ['value2', '=', 'helloworld2'],
            'subor__' => [
                ['child_one', '>', '123'],
                ['child_two', 'like', '123'],
            ]
        ]
   ]
)->

getAll();
```