# 查询语言.distinct

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
            "SELECT DISTINCT `test`.* FROM `test`",
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
                ->distinct()
                ->distinct(false)
                ->findAll(true),
            1
        )
    );
}
```