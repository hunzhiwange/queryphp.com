# 更新字段递减.updateDecrease

::: tip Testing Is Documentation
[tests/Database/Update/UpdateDecreaseTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Update/UpdateDecreaseTest.php)
:::
    
**Uses**

``` php
<?php

use Leevel\Database\Condition;
use Tests\Database\DatabaseTestCase as TestCase;
```

## updateDecrease 基本用法

更新成功后，返回影响行数，`updateDecrease` 实际上调用的是 `updateColumn` 方法。

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "UPDATE `test_query` SET `test_query`.`num` = `test_query`.`num`-3 WHERE `test_query`.`id` = :test_query_id",
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
                ->updateDecrease('num', 3)
        )
    );
}
```
    
## updateDecrease 支持参数绑定

``` php
public function testBind(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "UPDATE `test_query` SET `test_query`.`num` = `test_query`.`num`-3 WHERE `test_query`.`id` = ?",
            [
                503
            ],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->where('id', Condition::raw('?'))
                ->updateDecrease('num', 3, [503])
        )
    );
}
```