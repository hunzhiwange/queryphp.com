---
title: 数据库更新数据.updateDecrease
type: v4
order: 159
---

# 函数原型
更新成功后，返回影响行数，没有修改记录返回 0，updateDecrease 实际上调用的是 update 方法。
~~~
public function updateIncrease($strColumn, $intStep = 1, $arrBind = [], $bFlag = false)
~~~

# 用法如下：
~~~
# UPDATE `test` SET `test`.`num` = `test`.`num`-3 WHERE `test`.`id` = 503 
/*
Array
(
)
*/
var_dump ( database::table ( 'test' )->where ( 'id', 503 )->updateDecrease ( 'num', 3 ) );
~~~

# 支持 update 所具有的参数
~~~
# UPDATE `test` SET `test`.`num` = `test`.`num`-3 WHERE `test`.`id` = ? 
/*
Array
(
    [0] => 503
)
*/
var_dump ( database::table ( 'test' )->where ( 'id', '[?]' )->updateDecrease ( 'num', 3, [ 
        503 
] ) );
~~~