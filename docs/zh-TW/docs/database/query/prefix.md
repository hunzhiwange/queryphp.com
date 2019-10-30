# 查询语言.prefix

::: tip 单元测试即文档
[基于原始文档 tests/Database/Query/PrefixTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/PrefixTest.php)
:::
    
**引入相关类**

 * use Tests\Database\DatabaseTestCase as TestCase;

## prefix 基础用法

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT SQL_CALC_FOUND_ROWS `test_query`.* FROM `test_query` WHERE `test_query`.`id` = 5",
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
            "SELECT SQL_NO_CACHE `test_query`.* FROM `test_query` WHERE `test_query`.`id` = 5",
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
                ->prefix('SQL_NO_CACHE')
                ->where('id', '=', 5)
                ->findAll(true),
            1
        )
    );
}
```