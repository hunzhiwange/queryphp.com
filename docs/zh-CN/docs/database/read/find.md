# 查询数据.find

::: tip 单元测试即文档
[基于原始文档 tests/Database/Read/FindTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Read/FindTest.php)
:::
    
**引入相关类**

 * use Tests\Database\DatabaseTestCase as TestCase;

## find 查询基础用法

``` php
public function testBaseUse(): void
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
                ->find(5),
            1
        )
    );
}
```