# 查询多条数据.findAll

::: tip Testing Is Documentation
[tests/Database/Read/FindAllTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Read/FindAllTest.php)
:::
    
**Uses**

``` php
<?php

use Tests\Database\DatabaseTestCase as TestCase;
```

## findAll 查询多条数据

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
                ->findAll()
        )
    );
}
```
    
## all.find 查询多条数据

``` php
public function testAllFind(): void
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
                ->all()
                ->find()
        )
    );
}
```