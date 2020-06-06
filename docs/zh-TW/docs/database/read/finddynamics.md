# 动态查询.find.findStart.findBy.findAllBy

::: tip Testing Is Documentation
[tests/Database/Read/FindDynamicsTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Read/FindDynamicsTest.php)
:::
    
**Uses**

``` php
<?php

use Tests\Database\DatabaseTestCase as TestCase;
```

## find[0-9] 查询指定条数数据

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` LIMIT 0,10",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->find10()
        )
    );
}
```
    
## find[0-9]start[0-9] 查询指定开始位置指定条数数据

``` php
public function testFindStart(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` LIMIT 3,10",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->find10start3(),
            1
        )
    );
}
```
    
## findBy 字段条件查询单条数据

方法遵循驼峰法，相应的字段为下划线。

``` php
public function testFindByField(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`user_name` = :test_query_user_name LIMIT 1",
            {
                "test_query_user_name": [
                    "1111"
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->findByUserName('1111'),
            2
        )
    );
}
```
    
## findBy 字段条件查询单条数据，字段保持原样

方法遵循驼峰法，尾巴加一个下划线 `_`，相应的字段保持原样。

``` php
public function testFindByFieldWithoutCamelize(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`UserName` = :test_query_UserName LIMIT 1",
            {
                "test_query_UserName": [
                    "1111"
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->findByUserName_('1111'),
            3
        )
    );
}
```
    
## findAllBy 字段条件查询多条数据，字段保持原样

方法遵循驼峰法，相应的字段为下划线。

``` php
public function testTestfindAllByField(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`user_name` = :test_query_user_name AND `test_query`.`sex` = :test_query_sex",
            {
                "test_query_user_name": [
                    "1111"
                ],
                "test_query_sex": [
                    "222"
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->findAllByUserNameAndSex('1111', '222'),
            4
        )
    );
}
```
    
## findAllBy 字段条件查询多条数据，字段保持原样

方法遵循驼峰法，尾巴加一个下划线 `_`，相应的字段保持原样。

``` php
public function testTestfindAllByFieldWithoutCamelize(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`UserName` = :test_query_UserName AND `test_query`.`Sex` = :test_query_Sex",
            {
                "test_query_UserName": [
                    "1111"
                ],
                "test_query_Sex": [
                    "222"
                ]
            },
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->findAllByUserNameAndSex_('1111', '222'),
            5
        )
    );
}
```