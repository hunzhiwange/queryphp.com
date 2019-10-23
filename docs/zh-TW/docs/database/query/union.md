# 查询语言.union

::: tip 单元测试即文档
[基于原始文档 tests/Database/Query/UnionTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/UnionTest.php)
:::
    
**引入相关类**

 * use Tests\Database\DatabaseTestCase as TestCase;

## Union 联合查询基本用法

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.`tid` AS `id`,`test`.`tname` AS `value` FROM `test` \nUNION SELECT `yyyyy`.`yid` AS `id`,`yyyyy`.`name` AS `value` FROM `yyyyy` WHERE `yyyyy`.`first_name` = '222'\nUNION SELECT id,value FROM test2\nUNION SELECT `yyyyy`.`yid` AS `id`,`yyyyy`.`name` AS `value` FROM `yyyyy` WHERE `yyyyy`.`first_name` = '222'",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $union1 = $connect
        ->table('yyyyy', 'yid as id,name as value')
        ->where('first_name', '=', '222');
    $union2 = 'SELECT id,value FROM test2';

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test', 'tid as id,tname as value')
                ->union($union1)
                ->union($union2)
                ->union($union1)
                ->findAll(true)
        )
    );

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test', 'tid as id,tname as value')
                ->union([$union1, $union2, $union1])
                ->findAll(true)
        )
    );
}
```
    
::: tip
参数支持字符串、子查询器以及它们构成的一维数组。
:::
    
## UnionAll 联合查询不去重

``` php
public function testUnionAll(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test`.`tid` AS `id`,`test`.`tname` AS `value` FROM `test` \nUNION ALL SELECT id,value FROM test2",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $union1 = 'SELECT id,value FROM test2';

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test', 'tid as id,tname as value')
                ->unionAll($union1)
                ->findAll(true)
        )
    );
}
```