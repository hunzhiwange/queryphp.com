# 查询语言.reset

::: tip 单元测试即文档
[基于原始文档 tests/Database/Query/ResetTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/ResetTest.php)
:::
    
**引入相关类**

 * use Tests\Database\DatabaseTestCase as TestCase;

## 重置所有

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query_subsql`.* FROM `test_query_subsql` WHERE `test_query_subsql`.`new` = 'world'",
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
                ->where('id', '=', 5)
                ->where('name', 'like', 'me')
                ->reset()
                ->table('test_query_subsql')
                ->where('new', '=', 'world')
                ->findAll(true)
        )
    );
}
```
    
## 重置某一项

``` php
public function testResetItem(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`name`,`test_query`.`id` FROM `test_query` WHERE `test_query`.`new` LIKE 'new'",
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
                ->where('id', '=', 5)
                ->where('name', 'like', 'me')
                ->setColumns('name,id')
                ->reset('where')
                ->where('new', 'like', 'new')
                ->findAll(true),
            1
        )
    );
}
```