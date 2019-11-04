# 查询一列数据.list

::: tip Testing Is Documentation
[tests/Database/Read/ListTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Read/ListTest.php)
:::
    
**Uses**

 * use Tests\Database\DatabaseTestCase as TestCase;

## list 查询基础用法

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test`.`name` FROM `test`",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test')
                ->list('name')
        )
    );
}
```
    
## list 查询字段逗号分隔

``` php
public function testStringByCommaSeparation(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test`.`name`,`test`.`id` FROM `test`",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test')
                ->list('name,id'),
            1
        )
    );
}
```
    
## list 查询字段多个字符串

``` php
public function testMoreString(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test`.`name`,`test`.`id` FROM `test`",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test')
                ->list('name', 'id'),
            2
        )
    );
}
```
    
## list 查询字段数组

``` php
public function testArray(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test`.`name`,`test`.`id` FROM `test`",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test')
                ->list(['name', 'id']),
            3
        )
    );
}
```
    
## list 查询字段数组和字符串混合

``` php
public function testArrayAndString(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test`.`name`,`test`.`id` FROM `test`",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test')
                ->list(['name'], 'id'),
            4
        )
    );
}
```