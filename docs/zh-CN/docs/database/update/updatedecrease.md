# 更新字段递减.updateDecrease

::: tip 单元测试即文档
[基于原始文档 tests/Database/Update/UpdateDecreaseTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Update/UpdateDecreaseTest.php)
:::
    
**引入相关类**

 * use Tests\Database\DatabaseTestCase as TestCase;

## updateDecrease 基本用法

更新成功后，返回影响行数，`updateDecrease` 实际上调用的是 `updateColumn` 方法。

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "UPDATE `test_query` SET `test_query`.`num` = `test_query`.`num`-3 WHERE `test_query`.`id` = 503",
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
                ->updateDecrease('num', 3)
        )
    );
}
```
    
## updateDecrease 支持参数绑定

``` php
public function testBind(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "UPDATE `test_query` SET `test_query`.`num` = `test_query`.`num`-3 WHERE `test_query`.`id` = ?",
            [
                503
            ]
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test_query')
                ->where('id', '[?]')
                ->updateDecrease('num', 3, [503])
        )
    );
}
```