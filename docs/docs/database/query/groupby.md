# Query lang.groupBy

::: tip Testing Is Documentation
[tests/Database/Query/GroupByTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/GroupByTest.php)
:::
    
## groupBy 函数原型

``` php
public function groupBy($expression);
```

 - 参数支持字符串以及它们构成的一维数组，用法和 《查询语言.orderBy》 非常相似。


**Uses**

``` php
<?php

use Leevel\Database\Condition;
use Tests\Database\DatabaseTestCase as TestCase;
```

## groupBy 基础用法

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`tid` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` GROUP BY `test_query`.`id`,`test_query`.`name`",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query', 'tid as id,tname as value')
                ->groupBy('id')
                ->groupBy('name')
                ->findAll(true)
        )
    );
}
```
    
## groupBy 字段指定表名

``` php
public function testWithTable(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`tid` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` GROUP BY `test_query`.`id`",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query', 'tid as id,tname as value')
                ->groupBy('test_query.id')
                ->findAll(true),
            1
        )
    );
}
```
    
## groupBy 字段表达式

``` php
public function testWithExpression(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`tid` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` GROUP BY `test_query`.`num` HAVING SUM(`test_query`.`num`) > :SUM_test_query_num",
            {
                "SUM_test_query_num": [
                    9
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query', 'tid as id,tname as value')
                ->groupBy(Condition::raw('[num]'))
                ->having(Condition::raw('SUM([num])'), '>', 9)
                ->findAll(true),
            2
        )
    );
}
```
    
## groupBy 复合型

``` php
public function testWithComposite(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`tid` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` GROUP BY `test_query`.`title`,`test_query`.`id`,concat('1234',`test_query`.`id`,'ttt')",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query', 'tid as id,tname as value')
                ->groupBy('title,id,'.Condition::raw("concat('1234',[id],'ttt')"))
                ->findAll(true),
            3
        )
    );
}
```
    
## groupBy 字段数组支持

``` php
public function testWithArray(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`tid` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` GROUP BY `test_query`.`title`,`test_query`.`id`,`test_query`.`ttt`,`test_query`.`value`",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query', 'tid as id,tname as value')
                ->groupBy(['title,id,ttt', 'value'])
                ->findAll(true),
            4
        )
    );
}
```