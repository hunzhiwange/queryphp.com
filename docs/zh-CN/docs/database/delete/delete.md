# 删除数据.delete

::: tip 单元测试即文档
[基于原始文档 tests/Database/Delete/DeleteTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Delete/DeleteTest.php)
:::
    
**引入相关类**

 * use Tests\Database\DatabaseTestCase as TestCase;

## delete 基本用法

删除成功后，返回影响行数。

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "DELETE FROM `test_query` WHERE `test_query`.`id` = 1 ORDER BY `test_query`.`id` DESC LIMIT 1",
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->where('id', 1)
                ->limit(1)
                ->orderBy('id desc')
                ->delete()
        )
    );
}
```
    
## delete.join 连表删除

``` php
public function testJoin(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "DELETE t FROM `test_query` `t` INNER JOIN `test_query_subsql` `h` ON `h`.`name` = `t`.`name` WHERE `t`.`id` = 1",
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query as t')
                ->innerJoin(['h' => 'test_query_subsql'], [], 'name', '=', '{[t.name]}')
                ->where('id', 1)
                ->limit(1)
                ->orderBy('id desc')
                ->delete()
        )
    );
}
```