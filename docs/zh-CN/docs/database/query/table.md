# 查询语言.table

::: tip Testing Is Documentation
[tests/Database/Query/TableTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/TableTest.php)
:::
    
**Uses**

 * use stdClass;
 * use Tests\Database\DatabaseTestCase as TestCase;

## Table 查询数据库表

``` php
public function testBaseUse(): void
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
                ->findAll(true)
        )
    );
}
```
    
## Table 查询指定数据库的表

``` php
public function testWithDatabaseName(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test`.`test_query`",
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
                ->table('test.test_query')
                ->findAll(true),
            1
        )
    );
}
```
    
## Table 查询数据库表，表支持别名

``` php
public function testWithAlias(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `p`.* FROM `test`.`test_query` `p`",
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
                ->table(['p' => 'test.test_query'])
                ->findAll(true),
            2
        )
    );
}
```
    
## Table 查询数据库表指定字段

``` php
public function testField(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`title`,`test_query`.`body` FROM `test_query`",
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
                ->table('test_query', 'title,body')
                ->findAll(true)
        )
    );
}
```
    
## Table 查询数据库表指定字段，字段支持别名

``` php
public function testWithFieldAlias(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`title` AS `t`,`test_query`.`name`,`test_query`.`remark`,`test_query`.`value` FROM `test`.`test_query`",
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
                ->table('test.test_query', [
                    't' => 'title', 'name', 'remark,value',
                ])
                ->findAll(true),
            1
        )
    );
}
```
    
## Table 查询数据库表支持子查询

``` php
public function testSub(): void
{
    $connect = $this->createDatabaseConnectMock();
    $subSql = $connect->table('test_query')->makeSql(true);

    $sql = <<<'eot'
        [
            "SELECT `a`.* FROM (SELECT `test_query`.* FROM `test_query`) a",
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
                ->table($subSql.' as a')
                ->findAll(true)
        )
    );
}
```
    
## Table 查询数据库表支持子查询,子查询可以为数据库查询对象

``` php
public function testSubIsSelect(): void
{
    $connect = $this->createDatabaseConnectMock();
    $subSql = $connect->table('test_query');

    $sql = <<<'eot'
        [
            "SELECT `bb`.* FROM (SELECT `test_query`.* FROM `test_query`) bb",
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
                ->table(['bb' => $subSql])
                ->findAll(true)
        )
    );
}
```
    
## Table 查询数据库表支持子查询,子查询可以为数据库条件对象

``` php
public function testSubIsCondition(): void
{
    $connect = $this->createDatabaseConnectMock();
    $subSql = $connect->table('test_query')->databaseCondition();

    $sql = <<<'eot'
        [
            "SELECT `bb`.* FROM (SELECT `test_query`.* FROM `test_query`) bb",
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
                ->table(['bb' => $subSql])
                ->findAll(true)
        )
    );
}
```
    
## Table 查询数据库表支持子查询,子查询可以为闭包

``` php
public function testSubIsClosure(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `b`.* FROM (SELECT `test_query`.* FROM `test_query`) b",
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
                ->table(['b'=> function ($select) {
                    $select->table('test_query');
                }])
                ->findAll(true)
        )
    );
}
```
    
## Table 查询数据库表支持子查询,子查询可以为闭包,未指定别名默认为自身

``` php
public function testSubIsClosureWithItSeltAsAlias(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `guest_book`.* FROM (SELECT `guest_book`.* FROM `guest_book`) guest_book",
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
                ->table(function ($select) {
                    $select->table('guest_book');
                })
                ->findAll(true)
        )
    );
}
```
    
## Table 查询数据库表支持子查询,子查询可以为闭包,还可以进行 join 查询

``` php
public function testSubIsClosureWithJoin(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`remark`,`test_query_subsql`.`name`,`test_query_subsql`.`value` FROM (SELECT `test_query`.* FROM `test_query`) test_query INNER JOIN `test_query_subsql` ON `test_query_subsql`.`name` = `test_query`.`name`",
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
                ->table(function ($select) {
                    $select->table('test_query');
                }, 'remark')
                ->join('test_query_subsql', 'name,value', 'name', '=', '{[test_query.name]}')
                ->findAll(true)
        )
    );
}
```