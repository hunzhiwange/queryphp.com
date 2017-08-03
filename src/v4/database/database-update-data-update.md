---
title: 数据库更新数据.update
type: v4
order: 156
---

# 函数原型
更新成功后，返回影响行数，没有修改记录返回 0。
~~~
public function update($mixData, $arrBind = [], $bFlag = false)
~~~

# 用法如下：
~~~
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
var_dump(
    database::table( 'test')
    ->where('id',503)
    ->update(['name' => '小猪'])
);
~~~

# 支持 columnsMapping
~~~
# UPDATE `test` SET `test`.`othername`=:name WHERE `test`.`id` = 503
/*
(
    [name] => Array
        (
            [0] => 小猪
            [1] => 2
        )
)
*/
var_dump(
    database::table( 'test')
    ->where('id',503)
    ->columnsMapping(['name' => 'othername'])
    ->update(['name' => '小猪'])
); 
~~~

# 支持 forUpdate
~~~
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
var_dump(
    database::table( 'test')
    ->where('id',503)
    ->forUpdate()
    ->update(['name' => '小猪'])
);
~~~

# 支持限制条件
~~~
# UPDATE `test` SET `zt_test`.`name`=:name WHERE `test`.`id` = 503  LIMIT 0,1
/*
(
    [name] => Array
        (
            [0] => 小猪
            [1] => 2
        )
)
*/
var_dump(
    database::table( 'test')
    ->where('id',503)
    ->top(1)
    ->update(['name' => '小猪'])
);
~~~

# 支持 orderBy
~~~
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
var_dump(
    database::table( 'test')
    ->where('id',503)
    ->orderBy('id desc')
    ->update(['name' => '小猪'])
);
~~~

# 支持 join
~~~
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
var_dump(
    database::table( 'test as t')
    ->join('hello as h','goods_name,remark', 't.id','=','{[size]}' )
    ->where('id',503)
    ->update(['name' => '小猪'])
);
~~~

# 绑定参数
~~~
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
var_dump(
    database::table( 'test')
    ->where('id',503)
    ->bind('小牛逼')
    ->update(['name' => '[:hello]','value' => '[?]'],['hello' => 'hello world!'])
);
~~~


# 表达式支持
~~~
# UPDATE `test` SET `zt_test`.`name` = concat(`test`.`value`,`test`.`name`) WHERE `test`.`id` = 503
/*
(
)
*/
var_dump ( 
    database::table ( 'test' )->where ( 'id', 503 )->update ( [ 
            'name' => '{concat([value],[name])}' 
    ] )
 );
~~~