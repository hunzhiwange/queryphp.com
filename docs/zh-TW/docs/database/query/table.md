# 查询语言.table

::: tip 单元测试即文档
[基于原始文档 tests/Database/Query/TableTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/TableTest.php)
:::
    
**引入相关类**

 * use stdClass;
 * use Tests\Database\DatabaseTestCase as TestCase;

## Table 查询数据库表

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `posts`.* FROM `posts`",
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
                ->table('posts')
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
            "SELECT `posts`.* FROM `mydb`.`posts`",
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
                ->table('mydb.posts')
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
            "SELECT `p`.* FROM `mydb`.`posts` `p`",
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
                ->table(['p' => 'mydb.posts'])
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
            "SELECT `posts`.`title`,`posts`.`body` FROM `posts`",
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
                ->table('posts', 'title,body')
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
            "SELECT `posts`.`title` AS `t`,`posts`.`name`,`posts`.`remark`,`posts`.`value` FROM `mydb`.`posts`",
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
                ->table('mydb.posts', [
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
    $subSql = $connect->table('test')->makeSql(true);

    $sql = <<<'eot'
        [
            "SELECT `a`.* FROM (SELECT `test`.* FROM `test`) a",
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
    $subSql = $connect->table('test');

    $sql = <<<'eot'
        [
            "SELECT `bb`.* FROM (SELECT `test`.* FROM `test`) bb",
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
    $subSql = $connect->table('test')->databaseCondition();

    $sql = <<<'eot'
        [
            "SELECT `bb`.* FROM (SELECT `test`.* FROM `test`) bb",
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
            "SELECT `b`.* FROM (SELECT `world`.* FROM `world`) b",
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
                    $select->table('world');
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
            "SELECT `world`.`remark`,`hello`.`name`,`hello`.`value` FROM (SELECT `world`.* FROM `world`) world INNER JOIN `hello` ON `hello`.`name` = `world`.`name`",
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
                    $select->table('world');
                }, 'remark')
                ->join('hello', 'name,value', 'name', '=', '{[world.name]}')
                ->findAll(true)
        )
    );
}
```