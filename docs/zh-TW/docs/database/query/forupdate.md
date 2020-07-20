# 查询语言.forUpdate

::: tip Testing Is Documentation
[tests/Database/Query/ForUpdateTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/ForUpdateTest.php)
:::
    
对数据库悲观锁的支持，排它锁和共享锁。


**Uses**

``` php
<?php

use Tests\Database\DatabaseTestCase as TestCase;
```

## forUpdate 排它锁 FOR UPDATE 查询

**第一步事务中加入排它锁未提交**

在未提交前，表 test_query 的 `tid = 1` 行将会锁住，其它查询在这一行数据无法加上排它锁和共享锁，更不能更新改行数据，一直等待直到 commit 或者超时。

``` sql
BEGIN;
SELECT `test_query`.* FROM `test_query` WHERE `tid` = 1 FOR UPDATE;
-- COMMIT;
```

提交后 commit，其它会正常执行。

**排它锁失败**

``` sql
SELECT `test_query`.* FROM `test_query` WHERE `tid` = 1 FOR UPDATE;
```

**共享锁失败**

``` sql
SELECT `test_query`.* FROM `test_query` WHERE `tid` = 1 LOCK IN SHARE MODE;
```

**更改失败**

``` sql
UPDATE `test_query` SET `name` = 'hello' WHERE `tid` = 1;
```

**普通查询正常**

``` sql
SELECT `test_query`.* FROM `test_query` WHERE `tid` = 1;
```


``` php
public function testForUpdate(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` FOR UPDATE",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->forUpdate()
                ->findAll(true)
        )
    );
}
```
    
## forUpdate 取消排它锁 FOR UPDATE 查询

``` php
public function testCancelForUpdate(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query`",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->forUpdate()
                ->forUpdate(false)
                ->findAll(true),
            1
        )
    );
}
```
    
## lockShare 共享锁 LOCK SHARE 查询

**第一步事务中加入排它锁未提交**

在未提交前，表 test_query 的 `tid = 1` 行将会锁住，其它查询在这一行数据无法加上排它锁，更不能更新改行数据，但是共享锁是可以的，一直等待直到 commit 或者超时。

``` sql
BEGIN;
SELECT `test_query`.* FROM `test_query` WHERE `tid` = 1 LOCK IN SHARE MODE;
-- COMMIT;
```

提交后 commit，其它会正常执行。

**排它锁失败**

``` sql
SELECT `test_query`.* FROM `test_query` WHERE `tid` = 1 FOR UPDATE;
```

**共享锁成功**

``` sql
SELECT `test_query`.* FROM `test_query` WHERE `tid` = 1 LOCK IN SHARE MODE;
```

**更改失败**

``` sql
UPDATE `test_query` SET `name` = 'hello' WHERE `tid` = 1;
```

**普通查询正常**

``` sql
SELECT `test_query`.* FROM `test_query` WHERE `tid` = 1;
```


``` php
public function testLockShare(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` LOCK IN SHARE MODE",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->lockShare()
                ->findAll(true)
        )
    );
}
```
    
## lockShare 取消共享锁 LOCK SHARE 查询

``` php
public function testCancelLockShare(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query`",
            [],
            false
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query')
                ->lockShare()
                ->lockShare(false)
                ->findAll(true),
            1
        )
    );
}
```