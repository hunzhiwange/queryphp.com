# 查询语言.forUpdate

::: tip 单元测试即文档
[基于原始文档 tests/Database/Query/ForUpdateTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/ForUpdateTest.php)
:::
    
**引入相关类**

 * use Tests\Database\DatabaseTestCase as TestCase;

## 数据库悲观锁

对数据库悲观锁的支持。

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` FOR UPDATE",
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
                ->forUpdate()
                ->findAll(true)
        )
    );
}
```
    
## 取消数据库悲观锁

``` php
public function testCancelUpdate(): void
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
                ->forUpdate()
                ->forUpdate(false)
                ->findAll(true),
            1
        )
    );
}
```