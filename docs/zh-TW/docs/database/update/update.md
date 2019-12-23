# 更新数据.update

::: tip Testing Is Documentation
[tests/Database/Update/UpdateTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Update/UpdateTest.php)
:::
    
**Uses**

``` php
<?php

use Tests\Database\DatabaseTestCase as TestCase;
```

## update 基本用法

更新成功后，返回影响行数。

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "UPDATE `test_query` SET `test_query`.`name` = :name WHERE `test_query`.`id` = 503",
            {
                "name": [
                    "小猪",
                    2
                ]
            }
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->where('id', 503)
                ->update(['name' => '小猪'])
        )
    );
}
```
    
## update 更新指定条数

``` php
public function testWithLimit(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "UPDATE `test_query` SET `test_query`.`name` = :name WHERE `test_query`.`id` = 503 LIMIT 5",
            {
                "name": [
                    "小猪",
                    2
                ]
            }
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->where('id', 503)
                ->limit(5)
                ->update(['name' => '小猪'])
        )
    );
}
```
    
## update 更新排序

``` php
public function testWithOrderBy(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "UPDATE `test_query` SET `test_query`.`name` = :name WHERE `test_query`.`id` = 503 ORDER BY `test_query`.`id` DESC",
            {
                "name": [
                    "小猪",
                    2
                ]
            }
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->where('id', 503)
                ->orderBy('id desc')
                ->update(['name' => '小猪'])
        )
    );
}
```
    
## update 更新排序和指定条数

``` php
public function testWithOrderAndLimit(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "UPDATE `test_query` SET `test_query`.`name` = :name WHERE `test_query`.`id` = 503 ORDER BY `test_query`.`id` DESC LIMIT 2",
            {
                "name": [
                    "小猪",
                    2
                ]
            }
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->where('id', 503)
                ->orderBy('id desc')
                ->limit(2)
                ->update(['name' => '小猪'])
        )
    );
}
```
    
## update 连表更新

``` php
public function testWithJoin(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "UPDATE `test_query` `t` INNER JOIN `test_query_subsql` `h` ON `t`.`id` = `h`.`value` SET `t`.`name` = :name WHERE `t`.`id` = 503",
            {
                "name": [
                    "小猪",
                    2
                ]
            }
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query as t')
                ->join('test_query_subsql as h', '', 't.id', '=', '{[value]}')
                ->where('id', 503)
                ->update(['name' => '小猪'])
        )
    );
}
```
    
## update 更新参数绑定

``` php
public function testBind(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "UPDATE `test_query` SET `test_query`.`name` = :hello,`test_query`.`value` = :questionmark_0 WHERE `test_query`.`id` = 503",
            {
                "questionmark_0": [
                    "小牛逼",
                    2
                ],
                "hello": "hello world!"
            }
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->where('id', 503)
                ->bind(['小牛逼'])
                ->update(
                    [
                        'name'  => '[:hello]',
                        'value' => '[?]',
                    ],
                    [
                        'hello' => 'hello world!',
                    ]
                )
        )
    );
}
```
    
## update 更新支持表达式

``` php
public function testExpression(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "UPDATE `test_query` SET `test_query`.`name` = concat(`test_query`.`value`,`test_query`.`name`) WHERE `test_query`.`id` = 503",
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->where('id', 503)
                ->update([
                    'name' => '{concat([value],[name])}',
                ])
        )
    );
}
```