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
            "SELECT `test_query`.`tid` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` \nUNION SELECT `test_query`.`tid` AS `id`,`test_query`.`name` AS `value` FROM `test_query` WHERE `test_query`.`first_name` = '222'\nUNION SELECT id,value FROM test_query WHERE id > 3\nUNION SELECT `test_query`.`tid` AS `id`,`test_query`.`name` AS `value` FROM `test_query` WHERE `test_query`.`first_name` = '222'",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $union1 = $connect
        ->table('test_query', 'tid as id,name as value')
        ->where('first_name', '=', '222');
    $union2 = 'SELECT id,value FROM test_query WHERE id > 3';

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query', 'tid AS id,tname as value')
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
                ->table('test_query', 'tid as id,tname as value')
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
            "SELECT `test_query`.`tid` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` \nUNION ALL SELECT id,value FROM test_query WHERE id > 1",
            [],
            false,
            null,
            null,
            []
        ]
        eot;

    $union1 = 'SELECT id,value FROM test_query WHERE id > 1';

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->table('test_query', 'tid as id,tname as value')
                ->unionAll($union1)
                ->findAll(true)
        )
    );
}
```