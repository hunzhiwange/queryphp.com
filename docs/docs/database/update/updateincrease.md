# 更新字段递增.updateIncrease

# 函数原型

更新成功后，返回影响行数，没有修改记录返回 0，updateIncrease 实际上调用的是 update 方法。

``` php
public function updateIncrease($strColumn, $intStep = 1, $arrBind = [], $bFlag = false);
```

# 用法如下

``` php
# UPDATE `test` SET `test`.`num` = `test`.`num`+3 WHERE `test`.`id` = 503 
/*
Array
(
)
*/
Db::table('test')->

where('id', 503)->

updateIncrease('num', 3);
```

# 支持表达式

``` php
# UPDATE `test` SET `test`.`num` = `test`.`num`+3 WHERE `test`.`id` = ? 
/*
Array
(
    [0] => 503
)
*/
Db::table('test')->

where('id', '[?]')->

updateIncrease('num', 3, [503]);
```
