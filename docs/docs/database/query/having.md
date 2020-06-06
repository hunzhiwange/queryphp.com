# Query lang.having

::: tip Testing Is Documentation
[tests/Database/Query/HavingTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/HavingTest.php)
:::
    
having 和 where 用法几乎一致。

**Uses**

``` php
<?php

use Leevel\Database\Condition;
use Tests\Database\DatabaseTestCase as TestCase;
```

## having 查询条件

最基本的用法为字段 （表达式） 值。

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    // 字段 （表达式） 值
    $sql = <<<'eot'
        [
            "SELECT `test_query`.`tid` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` GROUP BY `test_query`.`tid` HAVING `test_query`.`tid` > :test_query_tid",
            {
                "test_query_tid": [
                    5
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
                ->groupBy('tid')
                ->having('tid', '>', 5)
                ->findAll(true)
        )
    );
}
```
    
## having 查询条件支持数组方式

``` php
public function testArray(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`name` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` GROUP BY `test_query`.`name` HAVING `test_query`.`name` LIKE :test_query_name",
            {
                "test_query_name": [
                    "技术"
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query', 'name as id,tname as value')
                ->groupBy('name')
                ->having(['name', 'like', '技术'])
                ->findAll(true)
        )
    );
}
```
    
## orHaving 查询条件

``` php
public function testOrHaving(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`name` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` GROUP BY `test_query`.`name` HAVING `test_query`.`name` LIKE :test_query_name OR `test_query`.`tname` LIKE :test_query_tname",
            {
                "test_query_name": [
                    "技术"
                ],
                "test_query_tname": [
                    "技术"
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query', 'name as id,tname as value')
                ->groupBy('name')
                ->having(['name', 'like', '技术'])
                ->orHaving(['tname', 'like', '技术'])
                ->findAll(true)
        )
    );
}
```
    
## havingBetween 查询条件

``` php
public function testHavingBetween(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`name` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` GROUP BY `test_query`.`name` HAVING `test_query`.`name` BETWEEN :test_query_name_between0 AND :test_query_name_between1 AND `test_query`.`name` BETWEEN :test_query_name_1_between0 AND :test_query_name_1_between1",
            {
                "test_query_name_between0": [
                    1
                ],
                "test_query_name_between1": [
                    10
                ],
                "test_query_name_1_between0": [
                    1
                ],
                "test_query_name_1_between1": [
                    100
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query', 'name as id,tname as value')
                ->groupBy('name')
                ->having('name', 'between', [1, 10])
                ->havingBetween('name', [1, 100])
                ->findAll(true)
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`name` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` GROUP BY `test_query`.`name` HAVING `test_query`.`name` BETWEEN :test_query_name_between0 AND :test_query_name_between1 AND `test_query`.`tname` BETWEEN :test_query_tname_between0 AND :test_query_tname_between1",
            {
                "test_query_name_between0": [
                    1
                ],
                "test_query_name_between1": [
                    100
                ],
                "test_query_tname_between0": [
                    5
                ],
                "test_query_tname_between1": [
                    22
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query', 'name as id,tname as value')
                ->groupBy('name')
                ->havingBetween([
                    ['name', [1, 100]],
                    ['tname', [5, 22]],
                ])
                ->findAll(true),
            1
        )
    );
}
```
    
## havingNotBetween 查询条件

``` php
public function testHavingNotBetween(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`name` HAVING `test_query`.`id` NOT BETWEEN :test_query_id_notbetween0 AND :test_query_id_notbetween1 AND `test_query`.`id` NOT BETWEEN :test_query_id_1_notbetween0 AND :test_query_id_1_notbetween1",
            {
                "test_query_id_notbetween0": [
                    1
                ],
                "test_query_id_notbetween1": [
                    10
                ],
                "test_query_id_1_notbetween0": [
                    1
                ],
                "test_query_id_1_notbetween1": [
                    100
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('name')
                ->having('id', 'not between', [1, 10])
                ->havingNotBetween('id', [1, 100])
                ->findAll(true)
        )
    );
}
```
    
## havingIn 查询条件

``` php
public function testHavingIn(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`name` HAVING `test_query`.`id` IN (:test_query_id_in0,:test_query_id_in1) AND `test_query`.`num` IN (:test_query_num_in0,:test_query_num_in1)",
            {
                "test_query_id_in0": [
                    2
                ],
                "test_query_id_in1": [
                    50
                ],
                "test_query_num_in0": [
                    2
                ],
                "test_query_num_in1": [
                    50
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('name')
                ->having('id', 'in', [2, 50])
                ->havingIn('num', [2, 50])
                ->findAll(true)
        )
    );
}
```
    
## havingNotIn 查询条件

``` php
public function testHavingNotIn(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`name` HAVING `test_query`.`id` NOT IN (:test_query_id_in0,:test_query_id_in1) AND `test_query`.`num` NOT IN (:test_query_num_in0,:test_query_num_in1)",
            {
                "test_query_id_in0": [
                    2
                ],
                "test_query_id_in1": [
                    50
                ],
                "test_query_num_in0": [
                    2
                ],
                "test_query_num_in1": [
                    50
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('name')
                ->having('id', 'not in', [2, 50])
                ->havingNotIn('num', [2, 50])
                ->findAll(true)
        )
    );
}
```
    
## havingNull 查询条件

``` php
public function testHavingNull(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`name` HAVING `test_query`.`id` IS NULL AND `test_query`.`num` IS NULL",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('name')
                ->having('id', 'null')
                ->havingNull('num')
                ->findAll(true)
        )
    );
}
```
    
## havingNotNull 查询条件

``` php
public function testHavingNotNull(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`name` HAVING `test_query`.`id` IS NOT NULL AND `test_query`.`num` IS NOT NULL",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('name')
                ->having('id', 'not null')
                ->havingNotNull('num')
                ->findAll(true)
        )
    );
}
```
    
## having 查询条件未指定值默认为 null

``` php
public function testHavingDefaultNull(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`name` HAVING `test_query`.`id` IS NULL",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('name')
                ->having('id')
                ->findAll(true)
        )
    );
}
```
    
## having 查询条件指定值为 null

``` php
public function testHavingEqualNull(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`name` HAVING `test_query`.`id` IS NULL",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('name')
                ->having('id', '=', null)
                ->findAll(true)
        )
    );
}
```
    
## havingLike 查询条件

``` php
public function testHavingLike(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`name` HAVING `test_query`.`id` LIKE :test_query_id AND `test_query`.`num` LIKE :test_query_num",
            {
                "test_query_id": [
                    "123"
                ],
                "test_query_num": [
                    "55"
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('name')
                ->having('id', 'like', '123')
                ->havingLike('num', '55')
                ->findAll(true)
        )
    );
}
```
    
## havingNotLike 查询条件

``` php
public function testHavingNotLike(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`name` HAVING `test_query`.`id` NOT LIKE :test_query_id AND `test_query`.`num` NOT LIKE :test_query_num",
            {
                "test_query_id": [
                    "123"
                ],
                "test_query_num": [
                    "55"
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('name')
                ->having('id', 'not like', '123')
                ->havingNotLike('num', '55')
                ->findAll(true)
        )
    );
}
```
    
## having 查询条件支持分组

``` php
public function testHavingGroup(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`id` HAVING `test_query`.`id` = :test_query_id OR (`test_query`.`votes` > :test_query_votes AND `test_query`.`title` <> :test_query_title)",
            {
                "test_query_votes": [
                    100
                ],
                "test_query_title": [
                    "Admin"
                ],
                "test_query_id": [
                    5
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('id')
                ->having('id', 5)
                ->orHaving(function ($select) {
                    $select
                        ->having('votes', '>', 100)
                        ->having('title', '<>', 'Admin');
                })
                ->findAll(true)
        )
    );
}
```
    
## having 查询条件支持表达式

``` php
public function testConditionalExpression(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`posts`,`test_query`.`value`,concat(\"tt_\",`test_query`.`id`) FROM `test_query` GROUP BY `test_query`.`id` HAVING concat(\"hello_\",`test_query`.`posts`) = `test_query`.`id`",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query', 'posts,value,'.Condition::raw('concat("tt_",[id])'))
                ->groupBy('id')
                ->having(Condition::raw('concat("hello_",[posts])'), '=', Condition::raw('[id]'))
                ->findAll(true)
        )
    );
}
```
    
## having 查询条件支持二维数组的键值为字段

``` php
public function testArrayKeyAsField(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`id` HAVING `test_query`.`id` = :test_query_id AND `test_query`.`name` IN (:test_query_name_in0,:test_query_name_in1,:test_query_name_in2) AND `test_query`.`weidao` BETWEEN :test_query_weidao_between0 AND :test_query_weidao_between1 AND `test_query`.`value` IS NULL AND `test_query`.`remark` IS NOT NULL AND `test_query`.`goods` = :test_query_goods AND `test_query`.`hello` = :test_query_hello",
            {
                "test_query_id": [
                    "故事"
                ],
                "test_query_name_in0": [
                    1
                ],
                "test_query_name_in1": [
                    2
                ],
                "test_query_name_in2": [
                    3
                ],
                "test_query_weidao_between0": [
                    "40"
                ],
                "test_query_weidao_between1": [
                    "100"
                ],
                "test_query_goods": [
                    "东亚商品"
                ],
                "test_query_hello": [
                    "world"
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('id')
                ->having([
                    'id'     => ['=', '故事'],
                    'name'   => ['in', [1, 2, 3]],
                    'weidao' => ['between', '40,100'],
                    'value'  => 'null',
                    'remark' => ['not null'],
                    'goods'  => '东亚商品',
                    'hello'  => ['world'],
                ])
                ->findAll(true)
        )
    );
}
```
    
## having 查询条件支持字符串语法 `:string`

``` php
public function testSupportString(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`id` HAVING `test_query`.`name` = 11 and `test_query`.`value` = 22 and concat(\"tt_\",`test_query`.`id`)",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('id')
                ->having([':string' => Condition::raw('[name] = 11 and [test_query.value] = 22 and concat("tt_",[id])')])
                ->findAll(true)
        )
    );
}
```
    
## having 查询条件支持分组语法 `:subor` 和 `suband` 

``` php
public function testSupportSubandSubor(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`id` HAVING `test_query`.`hello` = :test_query_hello OR (`test_query`.`id` LIKE :test_query_subor_test_query_id)",
            {
                "test_query_subor_test_query_id": [
                    "你好"
                ],
                "test_query_hello": [
                    "world"
                ]
            },
            false
        ]
        eot;
    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('id')
                ->having(
                    [
                        'hello'   => 'world',
                        ':subor'  => ['id', 'like', '你好'],
                    ]
                )
                ->findAll(true)
        )
    );
}
```
    
## having 查询条件支持分组语法 `:subor` 和 `suband` 任意嵌套

``` php
public function testSupportSubandSuborMore(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`id` HAVING `test_query`.`hello` = :test_query_hello OR (`test_query`.`id` LIKE :test_query_subor_test_query_id AND `test_query`.`value` = :test_query_subor_test_query_value) AND (`test_query`.`id` LIKE :test_query_suband_test_query_id OR `test_query`.`value` = :test_query_suband_test_query_value OR (`test_query`.`child_one` > :test_query_subor_test_query_child_one AND `test_query`.`child_two` LIKE :test_query_subor_test_query_child_two))",
            {
                "test_query_subor_test_query_child_one": [
                    "123"
                ],
                "test_query_subor_test_query_child_two": [
                    "123"
                ],
                "test_query_suband_test_query_id": [
                    "你好"
                ],
                "test_query_suband_test_query_value": [
                    "helloworld"
                ],
                "test_query_subor_test_query_id": [
                    "你好"
                ],
                "test_query_subor_test_query_value": [
                    "helloworld"
                ],
                "test_query_hello": [
                    "111"
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('id')
                ->having(
                    [
                        'hello'   => '111',
                        ':subor'  => [
                            ['id', 'like', '你好'],
                            ['value', '=', 'helloworld'],
                        ],
                        ':suband' => [
                            ':logic' => 'or',
                            ['id', 'like', '你好'],
                            ['value', '=', 'helloworld'],
                            ':subor' => [
                                ['child_one', '>', '123'],
                                ['child_two', 'like', '123'],
                            ],
                        ],
                    ]
                )
                ->findAll(true),
            1
        )
    );
}
```
    
## having 查询条件字段可以指定表

字段条件用法和 table 中的字段用法一致，详情可以查看《查询语言.table》。

``` php
public function testHavingFieldWithTable(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`name` HAVING `test_query`.`name` = :test_query_name",
            {
                "test_query_name": [
                    1
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('name')
                ->having('test_query.name', '=', 1)
                ->findAll(true)
        )
    );
}
```
    
## having 查询条件支持复杂的子查询

``` php
public function testHavingInArrayItemIsClosure(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` GROUP BY `test_query`.`name` HAVING `test_query`.`id` IN ((SELECT `test_query_subsql`.`id` FROM `test_query_subsql` WHERE `test_query_subsql`.`id` = :test_query_id_test_query_subsql_id),:test_query_id_in1)",
            {
                "test_query_id_test_query_subsql_id": [
                    1
                ],
                "test_query_id_in1": [
                    100
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->groupBy('name')
                ->havingIn('id', [function ($select) {
                    $select
                        ->table('test_query_subsql', 'id')
                        ->where('id', 1);
                }, 100])
                ->findAll(true)
        )
    );
}
```
    
## havingRaw 查询条件

``` php
public function testHavingRaw(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`name` AS `id`,`test_query`.`tname` AS `value`,`test_query`.`id` FROM `test_query` GROUP BY `test_query`.`name` HAVING FIND_IN_SET(1, `test_query`.`id`)",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query', 'name as id,tname as value,id')
                ->groupBy('name')
                ->havingRaw('FIND_IN_SET(1, `test_query`.`id`)')
                ->findAll(true)
        )
    );
}
```
    
## orHavingRaw 查询条件

``` php
public function testOrHavingRaw(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`name` AS `id`,`test_query`.`tname` AS `value`,`test_query`.`id`,`test_query`.`value` FROM `test_query` GROUP BY `test_query`.`name` HAVING FIND_IN_SET(1, `test_query`.`id`) OR FIND_IN_SET(1, `test_query`.`value`)",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query', 'name as id,tname as value,id,value')
                ->groupBy('name')
                ->havingRaw('FIND_IN_SET(1, `test_query`.`id`)')
                ->orHavingRaw('FIND_IN_SET(1, `test_query`.`value`)')
                ->findAll(true)
        )
    );
}
```