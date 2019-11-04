# 批量写入数据.insertAll

::: tip Testing Is Documentation
[tests/Database/Create/InsertAllTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Create/InsertAllTest.php)
:::
    
**Uses**

 * use Tests\Database\DatabaseTestCase as TestCase;

## insertAll 基本用法

写入成功后，返回 `lastInsertId`。

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:name,:value),(:name_1,:value_1),(:name_2,:value_2),(:name_3,:value_3)",
            {
                "name": [
                    "小鸭子1",
                    2
                ],
                "value": [
                    "呱呱呱1",
                    2
                ],
                "name_1": [
                    "小鸭子2",
                    2
                ],
                "value_1": [
                    "呱呱呱2",
                    2
                ],
                "name_2": [
                    "小鸭子3",
                    2
                ],
                "value_2": [
                    "呱呱呱3",
                    2
                ],
                "name_3": [
                    "小鸭子4",
                    2
                ],
                "value_3": [
                    "呱呱呱4",
                    2
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
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:name,:value),(:name_1,:questionmark_0_1),(:name_2,:value_2),(:name_3,:questionmark_1_3)",
            {
                "name": [
                    "小鸭子1",
                    2
                ],
                "value": [
                    "呱呱呱1",
                    2
                ],
                "name_1": [
                    "小鸭子2",
                    2
                ],
                "questionmark_0_1": [
                    "吃肉1",
                    2
                ],
                "name_2": [
                    "小鸭子3",
                    2
                ],
                "value_2": [
                    "呱呱呱3",
                    2
                ],
                "name_3": [
                    "小鸭子4",
                    2
                ],
                "questionmark_1_3": [
                    "吃肉2",
                    2
                ]
            }
        ]
        eot;

    $data = [
        ['name' => '小鸭子1', 'value' => '呱呱呱1'],
        ['name' => '小鸭子2', 'value' => '[?]'],
        ['name' => '小鸭子3', 'value' => '呱呱呱3'],
        ['name' => '小鸭子4', 'value' => '[?]'],
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
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:name,:value),(:name_1,:hello),(:name_2,:value_2),(:name_3,:world)",
            {
                "name": [
                    "小鸭子1",
                    2
                ],
                "value": [
                    "呱呱呱1",
                    2
                ],
                "name_1": [
                    "小鸭子2",
                    2
                ],
                "name_2": [
                    "小鸭子3",
                    2
                ],
                "value_2": [
                    "呱呱呱3",
                    2
                ],
                "name_3": [
                    "小鸭子4",
                    2
                ],
                "hello": "hello 吃肉",
                "world": "world 喝汤"
            }
        ]
        eot;

    $data = [
        ['name' => '小鸭子1', 'value' => '呱呱呱1'],
        ['name' => '小鸭子2', 'value' => '[:hello]'],
        ['name' => '小鸭子3', 'value' => '呱呱呱3'],
        ['name' => '小鸭子4', 'value' => '[:world]'],
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
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:name,:value),(:name_1,:questionmark_0_1),(:name_2,:value_2),(:name_3,:questionmark_1_3)",
            {
                "name": [
                    "小鸭子1",
                    2
                ],
                "value": [
                    "呱呱呱1",
                    2
                ],
                "name_1": [
                    "小鸭子2",
                    2
                ],
                "questionmark_0_1": [
                    "吃鱼",
                    2
                ],
                "name_2": [
                    "小鸭子3",
                    2
                ],
                "value_2": [
                    "呱呱呱3",
                    2
                ],
                "name_3": [
                    "小鸭子4",
                    2
                ],
                "questionmark_1_3": [
                    "吃肉",
                    2
                ]
            }
        ]
        eot;

    $data = [
        ['name' => '小鸭子1', 'value' => '呱呱呱1'],
        ['name' => '小鸭子2', 'value' => '[?]'],
        ['name' => '小鸭子3', 'value' => '呱呱呱3'],
        ['name' => '小鸭子4', 'value' => '[?]'],
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
            "REPLACE INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:name,:value),(:name_1,:questionmark_0_1),(:name_2,:value_2),(:name_3,:questionmark_1_3)",
            {
                "name": [
                    "小鸭子1",
                    2
                ],
                "value": [
                    "呱呱呱1",
                    2
                ],
                "name_1": [
                    "小鸭子2",
                    2
                ],
                "questionmark_0_1": [
                    "吃鱼",
                    2
                ],
                "name_2": [
                    "小鸭子3",
                    2
                ],
                "value_2": [
                    "呱呱呱3",
                    2
                ],
                "name_3": [
                    "小鸭子4",
                    2
                ],
                "questionmark_1_3": [
                    "吃肉",
                    2
                ]
            }
        ]
        eot;

    $data = [
        ['name' => '小鸭子1', 'value' => '呱呱呱1'],
        ['name' => '小鸭子2', 'value' => '[?]'],
        ['name' => '小鸭子3', 'value' => '呱呱呱3'],
        ['name' => '小鸭子4', 'value' => '[?]'],
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