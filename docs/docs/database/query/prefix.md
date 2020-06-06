# Query lang.prefix

::: tip Testing Is Documentation
[tests/Database/Query/PrefixTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/PrefixTest.php)
:::
    
**Uses**

``` php
<?php

use Tests\Database\DatabaseTestCase as TestCase;
```

## prefix 基础用法

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT SQL_CALC_FOUND_ROWS `test_query`.* FROM `test_query` WHERE `test_query`.`id` = :test_query_id",
            {
                "test_query_id": [
                    5
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->prefix('SQL_CALC_FOUND_ROWS')
                ->where('id', '=', 5)
                ->findAll(true)
        )
    );
}
```
    
## prefix 示例用法

``` php
public function testSqlNoCache(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT SQL_NO_CACHE `test_query`.* FROM `test_query` WHERE `test_query`.`id` = :test_query_id",
            {
                "test_query_id": [
                    5
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->prefix('SQL_NO_CACHE')
                ->where('id', '=', 5)
                ->findAll(true),
            1
        )
    );
}
```