# 插入单条数据.insert

::: tip Testing Is Documentation
[tests/Database/Create/InsertTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Create/InsertTest.php)
:::
    
**Uses**

``` php
<?php

use Leevel\Database\Condition;
use Tests\Database\DatabaseTestCase as TestCase;
```

## insert 基本用法

写入成功后，返回 `lastInsertId`。

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:pdonamedparameter_name,:pdonamedparameter_value)",
            {
                "pdonamedparameter_name": [
                    "小鸭子"
                ],
                "pdonamedparameter_value": [
                    "吃饭饭"
                ]
            },
            false
        ]
        eot;

    $data = ['name' => '小鸭子', 'value' => '吃饭饭'];

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->insert($data)
        )
    );
}
```
    
## insert 绑定参数

``` php
public function testBind(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:pdonamedparameter_name,:pdopositional2namedparameter_0)",
            {
                "pdonamedparameter_name": [
                    "小鸭子"
                ],
                "pdopositional2namedparameter_0": [
                    "吃肉"
                ]
            },
            false
        ]
        eot;

    $data = ['name' => '小鸭子', 'value' => Condition::raw('?')];

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->insert($data, ['吃肉'])
        )
    );

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:pdonamedparameter_name,:value)",
            {
                "pdonamedparameter_name": [
                    "小鸭子"
                ],
                "value": "呱呱呱"
            },
            false
        ]
        eot;

    $data = ['name' => '小鸭子', 'value' => Condition::raw(':value')];

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->insert($data, ['value' => '呱呱呱']),
            1
        )
    );
}
```
    
::: tip
位置占位符会自动转为命名占位符，以增强灵活性。
:::
    
## bind.insert 绑定参数写入数据

``` php
public function testWithBindFunction(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:pdonamedparameter_name,:pdopositional2namedparameter_0)",
            {
                "pdonamedparameter_name": [
                    "小鸭子"
                ],
                "pdopositional2namedparameter_0": [
                    "吃鱼"
                ]
            },
            false
        ]
        eot;

    $data = ['name' => '小鸭子', 'value' => Condition::raw('?')];

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->bind(['吃鱼'])
                ->insert($data)
        )
    );
}
```
    
## insert 支持 replace 用法

``` php
public function testReplace(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "REPLACE INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:pdonamedparameter_name,:value)",
            {
                "pdonamedparameter_name": [
                    "小鸭子"
                ],
                "value": "呱呱呱"
            },
            false
        ]
        eot;

    $data = ['name' => '小鸭子', 'value' => Condition::raw(':value')];

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->insert($data, ['value' => '呱呱呱'], true)
        )
    );
}
```
    
## insert 支持字段指定表名

``` php
public function testInsertSupportTable(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "REPLACE INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:pdonamedparameter_name,:value)",
            {
                "pdonamedparameter_name": [
                    "小鸭子"
                ],
                "value": "呱呱呱"
            },
            false
        ]
        eot;

    $data = ['name' => '小鸭子', 'test_query.value' => Condition::raw(':value')];

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->insert($data, ['value' => '呱呱呱'], true)
        )
    );
}
```
    
## insert 空数据写入示例

``` php
public function testInsertWithEmptyData(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` () VALUES ()",
            [],
            false
        ]
        eot;

    $data = [];

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->insert($data)
        )
    );
}
```
    
## insert.replace 空数据写入示例

``` php
public function testReplaceWithEmptyData(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "REPLACE INTO `test_query` () VALUES ()",
            [],
            false
        ]
        eot;

    $data = [];

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->insert($data, [], true)
        )
    );
}
```