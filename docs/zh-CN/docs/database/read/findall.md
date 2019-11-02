# 查询多条数据.findAll

::: tip 单元测试即文档
[基于原始文档 tests/Database/Read/FindAllTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Read/FindAllTest.php)
:::
    
**引入相关类**

 * use Tests\Database\DatabaseTestCase as TestCase;

## findAll 查询多条数据

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
                ->all()
                ->find()
        )
    );
}
```