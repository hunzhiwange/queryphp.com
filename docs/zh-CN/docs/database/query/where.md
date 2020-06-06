# 查询语言.where

::: tip Testing Is Documentation
[tests/Database/Query/WhereTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/WhereTest.php)
:::
    
**Uses**

``` php
<?php

use Leevel\Database\Condition;
use Tests\Database\DatabaseTestCase as TestCase;
```

## where 查询条件

最基本的用法为字段 （表达式） 值。

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    // 字段 （表达式） 值
    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` = :test_query_id",
            {
                "test_query_id": [
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
                ->where('id', '=', 1)
                ->findAll(true)
        )
    );
}
```
    
## where 查询条件默认为等于 `=`

``` php
public function testBaseUse2(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` = :test_query_id",
            {
                "test_query_id": [
                    2
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
                ->where('id', 2)
                ->findAll(true),
            1
        )
    );
}
```
    
## where 查询条件支持多次调用

``` php
public function testBaseUse3(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` = :test_query_id AND `test_query`.`name` > :test_query_name AND `test_query`.`value` LIKE :test_query_value",
            {
                "test_query_id": [
                    2
                ],
                "test_query_name": [
                    "狗蛋"
                ],
                "test_query_value": [
                    "小鸭子"
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
                ->where('id', 2)
                ->where('name', '>', '狗蛋')
                ->where('value', 'like', '小鸭子')
                ->findAll(true),
            2
        )
    );
}
```
    
## where 查询条件支持数组方式

``` php
public function testArray(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`name` LIKE :test_query_name",
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
                ->table('test_query')
                ->where(['name', 'like', '技术'])
                ->findAll(true)
        )
    );
}
```
    
## where 查询条件支持二维数组多个条件

``` php
public function testMultiDimensionalArray(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`name` LIKE :test_query_name AND `test_query`.`value` <> :test_query_value",
            {
                "test_query_name": [
                    "技术"
                ],
                "test_query_value": [
                    "结局"
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
                ->where([
                    ['name', 'like', '技术'],
                    ['value', '<>', '结局'],
                ])
                ->findAll(true),
            1
        )
    );
}
```
    
## orWhere 查询条件

``` php
public function testOrWhere(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`name` LIKE :test_query_name OR `test_query`.`value` <> :test_query_value",
            {
                "test_query_name": [
                    "技术"
                ],
                "test_query_value": [
                    "结局"
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
                ->where('name', 'like', '技术')
                ->orWhere('value', '<>', '结局')
                ->findAll(true)
        )
    );
}
```
    
## whereBetween 查询条件

``` php
public function testWhereBetween(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` BETWEEN :test_query_id_between0 AND :test_query_id_between1",
            {
                "test_query_id_between0": [
                    1
                ],
                "test_query_id_between1": [
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
                ->whereBetween('id', [1, 100])
                ->findAll(true)
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` BETWEEN :test_query_id_between0 AND :test_query_id_between1",
            {
                "test_query_id_between0": [
                    1
                ],
                "test_query_id_between1": [
                    10
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
                ->where('id', 'between', [1, 10])
                ->findAll(true),
            1
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` BETWEEN :test_query_id_between0 AND :test_query_id_between1 AND `test_query`.`name` BETWEEN :test_query_name_between0 AND :test_query_name_between1",
            {
                "test_query_id_between0": [
                    1
                ],
                "test_query_id_between1": [
                    100
                ],
                "test_query_name_between0": [
                    5
                ],
                "test_query_name_between1": [
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
                ->table('test_query')
                ->whereBetween([
                    ['id', [1, 100]],
                    ['name', [5, 22]],
                ])
                ->findAll(true),
            2
        )
    );
}
```
    
## whereNotBetween 查询条件

``` php
public function testWhereNotBetween(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` NOT BETWEEN :test_query_id_notbetween0 AND :test_query_id_notbetween1",
            {
                "test_query_id_notbetween0": [
                    1
                ],
                "test_query_id_notbetween1": [
                    10
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
                ->whereNotBetween('id', [1, 10])
                ->findAll(true)
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` NOT BETWEEN :test_query_id_notbetween0 AND :test_query_id_notbetween1",
            {
                "test_query_id_notbetween0": [
                    1
                ],
                "test_query_id_notbetween1": [
                    10
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
                ->where('id', 'not between', [1, 10])
                ->findAll(true),
            1
        )
    );
}
```
    
## whereIn 查询条件

``` php
public function testWhereIn(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` IN (:test_query_id_in0,:test_query_id_in1)",
            {
                "test_query_id_in0": [
                    2
                ],
                "test_query_id_in1": [
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
                ->whereIn('id', [2, 50])
                ->findAll(true)
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` IN (:test_query_id_in0,:test_query_id_in1)",
            {
                "test_query_id_in0": [
                    "1"
                ],
                "test_query_id_in1": [
                    "10"
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
                ->where('id', 'in', '1,10')
                ->findAll(true),
            1
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` IN (:test_query_id_in0,:test_query_id_in1)",
            {
                "test_query_id_in0": [
                    2
                ],
                "test_query_id_in1": [
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
                ->where('id', 'in', [2, 50])
                ->findAll(true),
            2
        )
    );
}
```
    
## whereNotIn 查询条件

``` php
public function testWhereNotIn(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` NOT IN (:test_query_id_in0,:test_query_id_in1)",
            {
                "test_query_id_in0": [
                    2
                ],
                "test_query_id_in1": [
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
                ->whereNotIn('id', [2, 50])
                ->findAll(true)
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` NOT IN (:test_query_id_in0,:test_query_id_in1)",
            {
                "test_query_id_in0": [
                    "1"
                ],
                "test_query_id_in1": [
                    "10"
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
                ->where('id', 'not in', '1,10')
                ->findAll(true),
            1
        )
    );
}
```
    
## whereNull 查询条件

``` php
public function testWhereNull(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` IS NULL",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->whereNull('id')
                ->findAll(true)
        )
    );

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->where('id', 'null')
                ->findAll(true),
            1
        )
    );
}
```
    
## whereNotNull 查询条件

``` php
public function testWhereNotNull(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` IS NOT NULL",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->whereNotNull('id')
                ->findAll(true)
        )
    );

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->where('id', 'not null')
                ->findAll(true),
            1
        )
    );
}
```
    
## where 查询条件未指定值默认为 null

``` php
public function testWhereDefaultNull(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` IS NULL",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->where('id')
                ->findAll(true)
        )
    );
}
```
    
## where 查询条件指定值为 null

``` php
public function testWhereEqualNull(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` IS NULL",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->where('id', '=', null)
                ->findAll(true)
        )
    );
}
```
    
## whereLike 查询条件

``` php
public function testWhereLike(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` LIKE :test_query_id",
            {
                "test_query_id": [
                    "5"
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
                ->whereLike('id', '5')
                ->findAll(true)
        )
    );

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->where('id', 'like', '5')
                ->findAll(true),
            1
        )
    );
}
```
    
## whereNotLike 查询条件

``` php
public function testWhereNotLike(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` NOT LIKE :test_query_id",
            {
                "test_query_id": [
                    "5"
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
                ->whereNotLike('id', '5')
                ->findAll(true)
        )
    );

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->where('id', 'not like', '5')
                ->findAll(true),
            1
        )
    );
}
```
    
## whereExists 查询条件

``` php
public function testWhereExists(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE EXISTS (SELECT `test_query_subsql`.* FROM `test_query_subsql` WHERE `test_query_subsql`.`id` = :test_query_exists_test_query_subsql_id)",
            {
                "test_query_exists_test_query_subsql_id": [
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
                ->whereExists(
                    function ($select) {
                        $select->table('test_query_subsql')->where('id', 1);
                    }
                )
                ->findAll(true)
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE EXISTS (SELECT `test_query_subsql`.* FROM `test_query_subsql`)",
            [],
            false
        ]
        eot;

    $subSelect = $connect->table('test_query_subsql');

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->where([':exists' => $subSelect])
                ->findAll(true),
            1
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE EXISTS (select *from test_query_subsql)",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->where([':exists' => 'select *from test_query_subsql'])
                ->findAll(true),
            2
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE EXISTS (SELECT `test_query_subsql`.* FROM `test_query_subsql` WHERE `test_query_subsql`.`id` = :test_query_exists_test_query_subsql_id)",
            {
                "test_query_exists_test_query_subsql_id": [
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
                ->where(
                    [
                        ':exists' => function ($select) {
                            $select
                                ->table('test_query_subsql')
                                ->where('id', 1);
                        },
                    ]
                )
                ->findAll(true),
            3
        )
    );
}
```
    
## whereNotExists 查询条件

``` php
public function testWhereNotExists(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE NOT EXISTS (SELECT `test_query_subsql`.* FROM `test_query_subsql` WHERE `test_query_subsql`.`id` = :test_query_notexists_test_query_subsql_id)",
            {
                "test_query_notexists_test_query_subsql_id": [
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
                ->whereNotExists(
                    function ($select) {
                        $select
                            ->table('test_query_subsql')
                            ->where('id', 1);
                    }
                )
                ->findAll(true)
        )
    );
}
```
    
## where 查询条件支持分组

``` php
public function testWhereGroup(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` = :test_query_id OR (`test_query`.`votes` > :test_query_votes AND `test_query`.`title` <> :test_query_title)",
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
                ->where('id', 5)
                ->orWhere(function ($select) {
                    $select
                        ->where('votes', '>', 100)
                        ->where('title', '<>', 'Admin');
                })
                ->findAll(true)
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` = :test_query_id OR `test_query`.`name` = :test_query_name AND (`test_query`.`votes` > :test_query_votes OR `test_query`.`title` <> :test_query_title)",
            {
                "test_query_votes": [
                    100
                ],
                "test_query_title": [
                    "Admin"
                ],
                "test_query_id": [
                    5
                ],
                "test_query_name": [
                    "小牛"
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
                ->where('id', 5)
                ->orWhere('name', '小牛')
                ->where(function ($select) {
                    $select
                        ->where('votes', '>', 100)
                        ->orWhere('title', '<>', 'Admin');
                })
                ->findAll(true),
            1
        )
    );
}
```
    
## where 查询条件支持表达式

``` php
public function testConditionalExpression(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`post`,`test_query`.`value`,concat(\"tt_\",`test_query`.`id`) FROM `test_query` WHERE concat(\"hello_\",`test_query`.`posts`) = `test_query`.`id`",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query', 'post,value,'.Condition::raw('concat("tt_",[id])'))
                ->where(Condition::raw('concat("hello_",[posts])'), '=', Condition::raw('[id]'))
                ->findAll(true)
        )
    );
}
```
    
## where 查询条件支持二维数组的键值为字段

``` php
public function testArrayKeyAsField(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` = :test_query_id AND `test_query`.`name` IN (:test_query_name_in0,:test_query_name_in1,:test_query_name_in2) AND `test_query`.`weidao` BETWEEN :test_query_weidao_between0 AND :test_query_weidao_between1 AND `test_query`.`value` IS NULL AND `test_query`.`remark` IS NOT NULL AND `test_query`.`goods` = :test_query_goods AND `test_query`.`hello` = :test_query_hello",
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
                ->where([
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
    
## where 查询条件支持字符串语法 `:string`

``` php
public function testSupportString(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`name` = 11 and `test_query`.`value` = 22 and concat(\"tt_\",`test_query`.`id`)",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->where([':string' => Condition::raw('[name] = 11 and [test_query.value] = 22 and concat("tt_",[id])')])
                ->findAll(true)
        )
    );
}
```
    
## where 查询条件支持分组语法 `:subor` 和 `suband` 

``` php
public function testSupportSubandSubor(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`hello` = :test_query_hello OR (`test_query`.`id` LIKE :test_query_subor_test_query_id)",
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
                ->where([
                    'hello'   => 'world',
                    ':subor'  => ['id', 'like', '你好'],
                ])
                ->findAll(true)
        )
    );
}
```
    
## where 查询条件支持分组语法 `:subor` 和 `suband` 任意嵌套

``` php
public function testSupportSubandSuborMore(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`hello` = :test_query_hello OR (`test_query`.`id` LIKE :test_query_subor_test_query_id AND `test_query`.`value` = :test_query_subor_test_query_value) AND (`test_query`.`id2` LIKE :test_query_suband_test_query_id2 OR `test_query`.`value2` = :test_query_suband_test_query_value2 OR (`test_query`.`child_one` > :test_query_subor_test_query_child_one AND `test_query`.`child_two` LIKE :test_query_subor_test_query_child_two))",
            {
                "test_query_subor_test_query_child_one": [
                    "123"
                ],
                "test_query_subor_test_query_child_two": [
                    "123"
                ],
                "test_query_suband_test_query_id2": [
                    "你好2"
                ],
                "test_query_suband_test_query_value2": [
                    "helloworld2"
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
                ->where([
                    'hello'   => '111',
                    ':subor'  => [
                        ['id', 'like', '你好'],
                        ['value', '=', 'helloworld'],
                    ],
                    ':suband' => [
                        ':logic' => 'or',
                        ['id2', 'like', '你好2'],
                        ['value2', '=', 'helloworld2'],
                        ':subor' => [
                            ['child_one', '>', '123'],
                            ['child_two', 'like', '123'],
                        ],
                    ],
                ])
                ->findAll(true),
            1
        )
    );
}
```
    
## where 查询条件字段可以指定表

字段条件用法和 table 中的字段用法一致，详情可以查看《查询语言.table》。

``` php
public function testWhereFieldWithTable(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`name` = :test_query_name",
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
                ->where('test_query.name', '=', 1)
                ->findAll(true)
        )
    );
}
```
    
## where 查询条件支持复杂的子查询

``` php
public function testWhereInArrayItemIsClosure(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` IN ((SELECT `test_query_subsql`.`id` FROM `test_query_subsql` WHERE `test_query_subsql`.`id` = :test_query_id_test_query_subsql_id),:test_query_id_in1)",
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
                ->whereIn('id', [function ($select) {
                    $select
                        ->table('test_query_subsql', 'id')
                        ->where('id', 1);
                }, 100])
                ->findAll(true)
        )
    );
}
```
    
## whereRaw 查询条件

``` php
public function testWhereRaw(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE FIND_IN_SET(1, id)",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->whereRaw('FIND_IN_SET(1, id)')
                ->findAll(true)
        )
    );
}
```
    
## orWhereRaw 查询条件

``` php
public function testOrWhereRaw(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE FIND_IN_SET(1, id) OR FIND_IN_SET(1, id)",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->whereRaw('FIND_IN_SET(1, id)')
                ->orWhereRaw('FIND_IN_SET(1, id)')
                ->findAll(true)
        )
    );
}
```