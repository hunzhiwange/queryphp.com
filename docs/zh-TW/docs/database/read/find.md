# 查询数据.find

::: tip Testing Is Documentation
[tests/Database/Read/FindTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Read/FindTest.php)
:::
    
**Uses**

``` php
<?php

use Tests\Database\DatabaseTestCase as TestCase;
```

## find 查询基础用法

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test`",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test')
                ->find()
        )
    );
}
```
    
## find 查询指定数量

``` php
public function testFindLimit(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` LIMIT 0,5",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test')
                ->find(5),
            1
        )
    );
}
```