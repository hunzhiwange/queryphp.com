# 更新数据.update

## 函数原型

更新成功后，返回影响行数，没有修改记录返回 0。

``` php
public function update($mixData, $arrBind = [], $bFlag = false);
```

## 用法如下：

``` php
# UPDATE `test` SET `test`.`name`=:name WHERE `test`.`id` = 503
/*
(
    [name] => Array
        (
            [0] => 小猪
            [1] => 2
        )
)
*/
Db::table('test')->

where('id', 503)->

update(['name' => '小猪']);
```

## 支持 forUpdate

``` php
# UPDATE `test` SET `test`.`name`=:name WHERE `test`.`id` = 503 FOR UPDATE
/*
(
    [name] => Array
        (
            [0] => 小猪
            [1] => 2
        )
)
*/
Db::table('test')->

where('id', 503)->

forUpdate()->

update(['name' => '小猪']);
```

## 支持限制条件

``` php
# UPDATE `test` SET `zt_test`.`name`=:name WHERE `test`.`id` = 503  LIMIT 0,2
/*
(
    [name] => Array
        (
            [0] => 小猪
            [1] => 2
        )
)
*/
Db::table('test')->

where('id', 503)->

top(2)->

update(['name' => '小猪']);
```

## 支持 orderBy

``` php
# UPDATE `test` SET `test`.`name`=:name WHERE `test`.`id` = 503 ORDER BY `test`.`id` DESC
/*
(
    [name] => Array
        (
            [0] => 小猪
            [1] => 2
        )
)
*/
Db::table('test')->

where('id', 503)->

orderBy('id desc')->

update(['name' => '小猪']);
```

## 支持 join

``` php
# UPDATE `test`  `t`  INNER JOIN `hello`  `h` ON `t`.`id` = `h`.`size` SET `t`.`name`=:name WHERE `t`.`id` = 503
/*
(
    [name] => Array
        (
            [0] => 小猪
            [1] => 2
        )
)
*/
Db::table('test as t')->

join('hello as h', '', 't.id', '=', '{[size]}')->

where('id', 503)->

update(['name' => '小猪']);
```

## 绑定参数

``` php
# UPDATE `test` SET `test`.`name`=:hello,`test`.`value`=:questionmark_0 WHERE `test`.`id` = 503
/*
(
    [questionmark_0] => Array
        (
            [0] => 小牛逼
            [1] => 2
        )

    [hello] => hello world!
)
*/
Db::table('test')->

where('id', 503)->

bind('小牛逼')->

update(
    [
        'name' => '[:hello]',
        'value' => '[?]',
    ],
    [
        'hello' => 'hello world!',
    ]
);
```

## 表达式支持

``` php
# UPDATE `test` SET `zt_test`.`name` = concat(`test`.`value`,`test`.`name`) WHERE `test`.`id` = 503
/*
(
)
*/
Db::table('test')->

where('id', 503)->

update([ 
    'name' => '{concat([value],[name])}',
]);
```
