# 查询数据.select

::: tip 单元测试即文档
[基于原始文档 tests/Database/Read/SelectTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Read/SelectTest.php)
:::
    
**引入相关类**

 * use Tests\Database\DatabaseTestCase as TestCase;

## select 查询指定 SQL

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "select *from test where id = ?",
            [
                1
            ]
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test')
                ->select('select *from test where id = ?', [1])
        )
    );
}
```
    
## select 直接查询

``` php
public function testSelect(): void
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
                ->select(),
            1
        )
    );
}
```
    
## select 查询支持闭包

``` php
public function testSelectClosure(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` WHERE `test`.`id` = 1",
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
                ->select(function ($select) {
                    $select->where('id', 1);
                }),
            2
        )
    );
}
```
    
## select 查询支持 \Leevel\Database\Select 对象

``` php
public function testSelectObject(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` WHERE `test`.`id` = 5",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $select = $connect
        ->table('test')
        ->where('id', 5);

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->select($select),
            3
        )
    );
}
```