# 批量写入数据.insertAll

::: tip Testing Is Documentation
[tests/Database/Create/InsertAllTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Create/InsertAllTest.php)
:::
    
**Uses**

``` php
<?php

use Leevel\Database\Condition;
use Tests\Database\DatabaseTestCase as TestCase;
```

## insertAll 基本用法

写入成功后，返回 `lastInsertId`。

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:pdonamedparameter_name,:pdonamedparameter_value),(:pdonamedparameter_name_1,:pdonamedparameter_value_1),(:pdonamedparameter_name_2,:pdonamedparameter_value_2),(:pdonamedparameter_name_3,:pdonamedparameter_value_3)",
            {
                "pdonamedparameter_name": [
                    "小鸭子1"
                ],
                "pdonamedparameter_value": [
                    "呱呱呱1"
                ],
                "pdonamedparameter_name_1": [
                    "小鸭子2"
                ],
                "pdonamedparameter_value_1": [
                    "呱呱呱2"
                ],
                "pdonamedparameter_name_2": [
                    "小鸭子3"
                ],
                "pdonamedparameter_value_2": [
                    "呱呱呱3"
                ],
                "pdonamedparameter_name_3": [
                    "小鸭子4"
                ],
                "pdonamedparameter_value_3": [
                    "呱呱呱4"
                ]
            }
        ]
        eot;

    $data = [
        ['name' => '小鸭子1', 'value' => '呱呱呱1'],
        ['name' => '小鸭子2', 'value' => '呱呱呱2'],
        ['name' => '小鸭子3', 'value' => '呱呱呱3'],
        ['name' => '小鸭子4', 'value' => '呱呱呱4'],
    ];

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->insertAll($data)
        )
    );
}
```
    
## insertAll 绑定参数

``` php
public function testBind(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:pdonamedparameter_name,:pdonamedparameter_value),(:pdonamedparameter_name_1,:pdopositional2namedparameter_0_1),(:pdonamedparameter_name_2,:pdonamedparameter_value_2),(:pdonamedparameter_name_3,:pdopositional2namedparameter_1_3)",
            {
                "pdonamedparameter_name": [
                    "小鸭子1"
                ],
                "pdonamedparameter_value": [
                    "呱呱呱1"
                ],
                "pdonamedparameter_name_1": [
                    "小鸭子2"
                ],
                "pdopositional2namedparameter_0_1": [
                    "吃肉1"
                ],
                "pdonamedparameter_name_2": [
                    "小鸭子3"
                ],
                "pdonamedparameter_value_2": [
                    "呱呱呱3"
                ],
                "pdonamedparameter_name_3": [
                    "小鸭子4"
                ],
                "pdopositional2namedparameter_1_3": [
                    "吃肉2"
                ]
            }
        ]
        eot;

    $data = [
        ['name' => '小鸭子1', 'value' => '呱呱呱1'],
        ['name' => '小鸭子2', 'value' => Condition::raw('?')],
        ['name' => '小鸭子3', 'value' => '呱呱呱3'],
        ['name' => '小鸭子4', 'value' => Condition::raw('?')],
    ];

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->insertAll($data, ['吃肉1', '吃肉2'])
        )
    );

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:pdonamedparameter_name,:pdonamedparameter_value),(:pdonamedparameter_name_1,:hello),(:pdonamedparameter_name_2,:pdonamedparameter_value_2),(:pdonamedparameter_name_3,:world)",
            {
                "pdonamedparameter_name": [
                    "小鸭子1"
                ],
                "pdonamedparameter_value": [
                    "呱呱呱1"
                ],
                "pdonamedparameter_name_1": [
                    "小鸭子2"
                ],
                "pdonamedparameter_name_2": [
                    "小鸭子3"
                ],
                "pdonamedparameter_value_2": [
                    "呱呱呱3"
                ],
                "pdonamedparameter_name_3": [
                    "小鸭子4"
                ],
                "hello": "hello 吃肉",
                "world": "world 喝汤"
            }
        ]
        eot;

    $data = [
        ['name' => '小鸭子1', 'value' => '呱呱呱1'],
        ['name' => '小鸭子2', 'value' => Condition::raw(':hello')],
        ['name' => '小鸭子3', 'value' => '呱呱呱3'],
        ['name' => '小鸭子4', 'value' => Condition::raw(':world')],
    ];

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->insertAll($data, ['hello' => 'hello 吃肉', 'world' => 'world 喝汤']),
            1
        )
    );
}
```
    
## bind.insertAll 绑定参数批量写入数据

``` php
public function testWithBindFunction(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:pdonamedparameter_name,:pdonamedparameter_value),(:pdonamedparameter_name_1,:pdopositional2namedparameter_0_1),(:pdonamedparameter_name_2,:pdonamedparameter_value_2),(:pdonamedparameter_name_3,:pdopositional2namedparameter_1_3)",
            {
                "pdonamedparameter_name": [
                    "小鸭子1"
                ],
                "pdonamedparameter_value": [
                    "呱呱呱1"
                ],
                "pdonamedparameter_name_1": [
                    "小鸭子2"
                ],
                "pdopositional2namedparameter_0_1": [
                    "吃鱼"
                ],
                "pdonamedparameter_name_2": [
                    "小鸭子3"
                ],
                "pdonamedparameter_value_2": [
                    "呱呱呱3"
                ],
                "pdonamedparameter_name_3": [
                    "小鸭子4"
                ],
                "pdopositional2namedparameter_1_3": [
                    "吃肉"
                ]
            }
        ]
        eot;

    $data = [
        ['name' => '小鸭子1', 'value' => '呱呱呱1'],
        ['name' => '小鸭子2', 'value' => Condition::raw('?')],
        ['name' => '小鸭子3', 'value' => '呱呱呱3'],
        ['name' => '小鸭子4', 'value' => Condition::raw('?')],
    ];

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->bind(['吃鱼', '吃肉'])
                ->insertAll($data)
        )
    );
}
```
    
## insertAll 支持 replace 用法

``` php
public function testReplace(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "REPLACE INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:pdonamedparameter_name,:pdonamedparameter_value),(:pdonamedparameter_name_1,:pdopositional2namedparameter_0_1),(:pdonamedparameter_name_2,:pdonamedparameter_value_2),(:pdonamedparameter_name_3,:pdopositional2namedparameter_1_3)",
            {
                "pdonamedparameter_name": [
                    "小鸭子1"
                ],
                "pdonamedparameter_value": [
                    "呱呱呱1"
                ],
                "pdonamedparameter_name_1": [
                    "小鸭子2"
                ],
                "pdopositional2namedparameter_0_1": [
                    "吃鱼"
                ],
                "pdonamedparameter_name_2": [
                    "小鸭子3"
                ],
                "pdonamedparameter_value_2": [
                    "呱呱呱3"
                ],
                "pdonamedparameter_name_3": [
                    "小鸭子4"
                ],
                "pdopositional2namedparameter_1_3": [
                    "吃肉"
                ]
            }
        ]
        eot;

    $data = [
        ['name' => '小鸭子1', 'value' => '呱呱呱1'],
        ['name' => '小鸭子2', 'value' => Condition::raw('?')],
        ['name' => '小鸭子3', 'value' => '呱呱呱3'],
        ['name' => '小鸭子4', 'value' => Condition::raw('?')],
    ];

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->bind(['吃鱼', '吃肉'])
                ->insertAll($data, [], true)
        )
    );
}
```
    
## insertAll 空数据批量写入示例

``` php
public function testInsertWithEmptyData(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` () VALUES (),(),(),()",
            []
        ]
        eot;

    $data = [
        [],
        [],
        [],
        [],
    ];

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->insertAll($data)
        )
    );
}
```
    
## insertAll.replace 空数据写入示例

``` php
public function testReplaceWithEmptyData(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "REPLACE INTO `test_query` () VALUES (),(),(),()",
            []
        ]
        eot;

    $data = [
        [],
        [],
        [],
        [],
    ];

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->insertAll($data, [], true)
        )
    );
}
```