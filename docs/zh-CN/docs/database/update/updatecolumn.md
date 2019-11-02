# 更新字段.updateColumn

::: tip 单元测试即文档
[基于原始文档 tests/Database/Update/UpdateColumnTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Update/UpdateColumnTest.php)
:::
    
**引入相关类**

 * use Tests\Database\DatabaseTestCase as TestCase;

## updateColumn 基本用法

更新成功后，返回影响行数，`updateColumn` 实际上调用的是 `update` 方法。

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "UPDATE `test_query` SET `test_query`.`name` = :name WHERE `test_query`.`id` = 503",
            {
                "name": [
                    "小小小鸟，怎么也飞不高。",
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
                ->updateColumn('name', '小小小鸟，怎么也飞不高。')
        )
    );
}
```
    
## updateColumn 支持表达式

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
                ->updateColumn('name', '{concat([value],[name])}')
        )
    );
}
```