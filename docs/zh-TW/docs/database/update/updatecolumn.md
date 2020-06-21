# 更新字段.updateColumn

::: tip Testing Is Documentation
[tests/Database/Update/UpdateColumnTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Update/UpdateColumnTest.php)
:::
    
**Uses**

``` php
<?php

use Leevel\Database\Condition;
use Tests\Database\DatabaseTestCase as TestCase;
```

## updateColumn 基本用法

更新成功后，返回影响行数，`updateColumn` 实际上调用的是 `update` 方法。

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "UPDATE `test_query` SET `test_query`.`name` = :pdonamedparameter_name WHERE `test_query`.`id` = :test_query_id",
            {
                "pdonamedparameter_name": [
                    "小小小鸟，怎么也飞不高。"
                ],
                "test_query_id": [
                    503
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->where('id', 503)
                ->updateColumn('name', '小小小鸟，怎么也飞不高。')
        )
    );
}
```
    
## updateColumn 支持表达式

``` php
public function testExpression(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "UPDATE `test_query` SET `test_query`.`name` = concat(`test_query`.`value`,`test_query`.`name`) WHERE `test_query`.`id` = :test_query_id",
            {
                "test_query_id": [
                    503
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->where('id', 503)
                ->updateColumn('name', Condition::raw('concat([value],[name])'))
        )
    );
}
```