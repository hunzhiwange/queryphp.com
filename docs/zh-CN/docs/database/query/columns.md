# 查询语言.columns

::: tip 单元测试即文档
[基于原始文档 tests/Database/Query/ColumnsTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/ColumnsTest.php)
:::
    
**引入相关类**

 * use Tests\Database\DatabaseTestCase as TestCase;

## Columns 添加字段

字段条件用法和 table 中的字段用法一致，详细可以查看《查询语言.table》。

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.*,`test`.`id`,`test`.`name`,`test`.`value` FROM `test`",
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
                ->columns('id')
                ->columns('name,value')
                ->findAll(true)
        )
    );
}
```
    
## SetColumns 设置字段

清空原有字段，然后添加新的字段。

``` php
public function testSetColumns(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.`remark` FROM `test`",
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
                ->columns('id')
                ->columns('name,value')
                ->setColumns('remark')
                ->findAll(true)
        )
    );
}
```
    
## Columns 字段支持表达式

``` php
public function testColumnsExpressionForSelectString(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            [
                "SELECT 'foo'",
                [],
                false,
                null,
                null,
                []
            ]
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            [
                $connect
                    ->columns("{'foo'}")
                    ->findAll(true),
            ]
        )
    );
}
```
    
## Columns 字段在连表中的查询

``` php
public function testSetColumnsWithTableName(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.`name`,`test`.`value`,`hello`.`name`,`hello`.`value` FROM `test` INNER JOIN `hello` ON `hello`.`name` = `test`.`name`",
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
                ->setColumns('test.name,test.value')
                ->join('hello', 'name,value', 'name', '=', '{[test.name]}')
                ->findAll(true)
        )
    );
}
```