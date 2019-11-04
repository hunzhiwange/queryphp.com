# 查询语言.forUpdate

::: tip Testing Is Documentation
[tests/Database/Query/ForUpdateTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/ForUpdateTest.php)
:::
    
**Uses**

 * use Tests\Database\DatabaseTestCase as TestCase;

## 数据库悲观锁

对数据库悲观锁的支持。

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` FOR UPDATE",
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
                ->forUpdate()
                ->forUpdate(false)
                ->findAll(true),
            1
        )
    );
}
```