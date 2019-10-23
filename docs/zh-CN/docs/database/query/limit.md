# 查询语言.limit

::: tip 单元测试即文档
[基于原始文档 tests/Database/Query/LimitTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/LimitTest.php)
:::
    
**引入相关类**

 * use Tests\Database\DatabaseTestCase as TestCase;

## limit 限制条数

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` LIMIT 5,10",
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
                ->table('test')
                ->limit(5, 10)
                ->find(null, true)
        )
    );
}
```
    
## 指示仅查询第一个符合条件的记录

``` php
public function testOne(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` LIMIT 1",
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
                ->table('test')
                ->one()
                ->find(null, true),
            1
        )
    );
}
```
    
## 指示查询所有符合条件的记录

``` php
public function testAll(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test`",
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
                ->table('test')
                ->all()
                ->find(null, true),
            2
        )
    );
}
```
    
## 查询几条记录

``` php
public function testTop(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` LIMIT 0,15",
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
                ->table('test')
                ->top(15)
                ->find(null, true),
            3
        )
    );
}
```