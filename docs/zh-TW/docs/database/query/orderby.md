# 查询语言.orderBy

::: tip 单元测试即文档
[基于原始文档 tests/Database/Query/OrderByTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/OrderByTest.php)
:::
    
**引入相关类**

 * use Tests\Database\DatabaseTestCase as TestCase;

## 排序基础用法

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.`tid` AS `id`,`test`.`tname` AS `value` FROM `test` ORDER BY `test`.`id` DESC,`test`.`name` ASC",
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
                ->table('test', 'tid as id,tname as value')
                ->orderBy('id DESC')
                ->orderBy('name')
                ->findAll(true)
        )
    );
}
```
    
## 指定表排序

``` php
public function testWithTable(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.`tid` AS `id`,`test`.`tname` AS `value` FROM `test` ORDER BY `test`.`id` DESC",
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
                ->table('test', 'tid as id,tname as value')
                ->orderBy('test.id DESC')
                ->findAll(true),
            1
        )
    );
}
```
    
## 表达式排序

``` php
public function testWithExpression(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.`tid` AS `id`,`test`.`tname` AS `value` FROM `test` ORDER BY SUM(`test`.`num`) ASC",
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
                ->table('test', 'tid as id,tname as value')
                ->orderBy('{SUM([num]) ASC}')
                ->findAll(true),
            2
        )
    );
}
```
    
## 表达式和普通排序混合

``` php
public function testWithExpressionAndNormal(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.`tid` AS `id`,`test`.`tname` AS `value` FROM `test` ORDER BY `test`.`title` ASC,`test`.`id` ASC,concat('1234',`test`.`id`,'ttt') DESC",
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
                ->table('test', 'tid as id,tname as value')
                ->orderBy("title,id,{concat('1234',[id],'ttt') desc}")
                ->findAll(true),
            4
        )
    );
}
```
    
## 排序支持数组

``` php
public function testWithArray(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.`tid` AS `id`,`test`.`tname` AS `value` FROM `test` ORDER BY `test`.`title` ASC,`test`.`id` ASC,`test`.`ttt` ASC,`test`.`value` DESC",
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
                ->table('test', 'tid as id,tname as value')
                ->orderBy(['title,id,ttt', 'value desc'])
                ->findAll(true),
            5
        )
    );
}
```
    
## 排序数组支持自定义升降

``` php
public function testWithArrayAndSetType(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.`tid` AS `id`,`test`.`tname` AS `value` FROM `test` ORDER BY `test`.`title` DESC,`test`.`id` DESC,`test`.`ttt` ASC,`test`.`value` DESC",
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
                ->table('test', 'tid as id,tname as value')
                ->orderBy(['title,id,ttt asc', 'value'], 'desc')
                ->findAll(true),
            6
        )
    );
}
```
    
## 快捷降序

``` php
public function testLatest(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` ORDER BY `test`.`create_at` DESC",
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
                ->latest()
                ->findAll(true)
        )
    );
}
```
    
## 快捷降序支持自定义字段

``` php
public function testLatestWithCustomField(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` ORDER BY `test`.`foo` DESC",
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
                ->latest('foo')
                ->findAll(true),
            1
        )
    );
}
```
    
## 快捷升序

``` php
public function testOldest(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` ORDER BY `test`.`create_at` ASC",
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
                ->oldest()
                ->findAll(true),
            2
        )
    );
}
```
    
## 快捷升序支持自定义字段

``` php
public function testOldestWithCustomField(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` ORDER BY `test`.`bar` ASC",
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
                ->oldest('bar')
                ->findAll(true),
            3
        )
    );
}
```
    
## 表达式排序默认为升序

``` php
public function testOrderByExpressionNotSetWithDefaultAsc(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` ORDER BY foo ASC",
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
                ->orderBy('{foo}')
                ->findAll(true)
        )
    );
}
```