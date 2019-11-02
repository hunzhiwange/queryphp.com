# 查询单条数据.findOne

::: tip 单元测试即文档
[基于原始文档 tests/Database/Read/FindOneTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Read/FindOneTest.php)
:::
    
**引入相关类**

 * use Tests\Database\DatabaseTestCase as TestCase;

## findOne 查询单条数据

``` php
public function testBaseUse(): void
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
                ->sql()
                ->table('test')
                ->findOne()
        )
    );
}
```
    
## one.find 查询单条数据

``` php
public function testOneFind(): void
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
                ->sql()
                ->table('test')
                ->one()
                ->find()
        )
    );
}
```