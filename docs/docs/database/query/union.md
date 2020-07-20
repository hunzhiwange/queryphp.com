# Query lang.union

::: tip Testing Is Documentation
[tests/Database/Query/UnionTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/UnionTest.php)
:::
    
**Uses**

``` php
<?php

use Tests\Database\DatabaseTestCase as TestCase;
```

## union 联合查询基本用法

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`tid` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` \nUNION SELECT `test_query`.`tid` AS `id`,`test_query`.`name` AS `value` FROM `test_query` WHERE `test_query`.`first_name` = :test_query_first_name\nUNION SELECT id,value FROM test_query WHERE id > 3\nUNION SELECT `test_query`.`tid` AS `id`,`test_query`.`name` AS `value` FROM `test_query` WHERE `test_query`.`first_name` = :test_query_first_name_1",
            {
                "test_query_first_name": [
                    "222"
                ],
                "test_query_first_name_1": [
                    "222"
                ]
            },
            false
        ]
        eot;

    $union1 = $connect
        ->table('test_query', 'tid as id,name as value')
        ->where('first_name', '=', '222');
    $union2 = 'SELECT id,value FROM test_query WHERE id > 3';

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query', 'tid AS id,tname as value')
                ->union($union1)
                ->union($union2)
                ->union($union1)
                ->findAll(true)
        )
    );

    $sql2 = <<<'eot'
        [
            "SELECT `test_query`.`tid` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` \nUNION SELECT `test_query`.`tid` AS `id`,`test_query`.`name` AS `value` FROM `test_query` WHERE `test_query`.`first_name` = :test_query_first_name_2\nUNION SELECT id,value FROM test_query WHERE id > 3\nUNION SELECT `test_query`.`tid` AS `id`,`test_query`.`name` AS `value` FROM `test_query` WHERE `test_query`.`first_name` = :test_query_first_name_3",
            {
                "test_query_first_name_2": [
                    "222"
                ],
                "test_query_first_name_3": [
                    "222"
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql2,
        $this->varJson(
            $connect
                ->table('test_query', 'tid as id,tname as value')
                ->union([$union1, $union2, $union1])
                ->findAll(true)
        )
    );
}
```
    
::: tip
参数支持字符串、子查询器以及它们构成的一维数组。
:::
    
## union 联合查询支持条件构造器自身为子查询

``` php
public function testConditionSelfAsExpression(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`tid` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` \nUNION SELECT `test_query`.`tid` AS `id`,`test_query`.`name` AS `value` FROM `test_query` WHERE `test_query`.`first_name` = :test_query_first_name",
            {
                "test_query_first_name": [
                    "222"
                ]
            },
            false
        ]
        eot;

    $union1 = $connect
        ->table('test_query', 'tid as id,name as value')
        ->where('first_name', '=', '222')
        ->databaseCondition();

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query', 'tid AS id,tname as value')
                ->union($union1)
                ->findAll(true)
        )
    );

    $sql2 = <<<'eot'
        [
            "SELECT `test_query`.`tid` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` \nUNION SELECT `test_query`.`tid` AS `id`,`test_query`.`name` AS `value` FROM `test_query` WHERE `test_query`.`first_name` = :test_query_first_name_1\nUNION SELECT `test_query`.`tid` AS `id`,`test_query`.`name` AS `value` FROM `test_query` WHERE `test_query`.`first_name` = :test_query_first_name_2",
            {
                "test_query_first_name_1": [
                    "222"
                ],
                "test_query_first_name_2": [
                    "222"
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql2,
        $this->varJson(
            $connect
                ->table('test_query', 'tid as id,tname as value')
                ->union([$union1, $union1])
                ->findAll(true),
            2
        )
    );
}
```
    
## unionAll 联合查询不去重

``` php
public function testUnionAll(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`tid` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` \nUNION ALL SELECT id,value FROM test_query WHERE id > 1",
            [],
            false
        ]
        eot;

    $union1 = 'SELECT id,value FROM test_query WHERE id > 1';

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query', 'tid as id,tname as value')
                ->unionAll($union1)
                ->findAll(true)
        )
    );
}
```