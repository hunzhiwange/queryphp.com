# Query lang.distinct

::: tip 单元测试即文档
[基于原始文档 tests/Database/Query/DistinctTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/DistinctTest.php)
:::
    
**引入相关类**

 * use Tests\Database\DatabaseTestCase as TestCase;

## 查询去重

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT DISTINCT `test_query`.* FROM `test_query`",
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
                ->distinct()
                ->findAll(true)
        )
    );
}
```
    
## 取消查询去重

``` php
public function testCancelDistinct(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query`",
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
                ->distinct()
                ->distinct(false)
                ->findAll(true),
            1
        )
    );
}
```