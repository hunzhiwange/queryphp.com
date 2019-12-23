# 查询语言.forceIndex

::: tip Testing Is Documentation
[tests/Database/Query/ForceIndexTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/ForceIndexTest.php)
:::
    
**Uses**

``` php
<?php

use Tests\Database\DatabaseTestCase as TestCase;
```

## forceIndex,ignoreIndex 基础用法

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` FORCE INDEX(nameindex,statusindex) IGNORE INDEX(testindex) WHERE `test_query`.`id` = 5",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->forceIndex('nameindex,statusindex')
                ->ignoreIndex('testindex')
                ->where('id', '=', 5)
                ->findAll(true)
        )
    );
}
```
    
## forceIndex 数组支持

``` php
public function testForceIndexWithArray(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` FORCE INDEX(nameindex,statusindex) WHERE `test_query`.`id` = 2",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->forceIndex(['nameindex', 'statusindex'])
                ->where('id', '=', 2)
                ->findAll(true)
        )
    );
}
```
    
## ignoreIndex 数组支持

``` php
public function testIgnoreIndexWithArray(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` IGNORE INDEX(nameindex,statusindex) WHERE `test_query`.`id` = 6",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->ignoreIndex(['nameindex', 'statusindex'])
                ->where('id', '=', 6)
                ->findAll(true)
        )
    );
}
```