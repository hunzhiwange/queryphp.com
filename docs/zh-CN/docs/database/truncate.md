# 清空数据.truncate

::: tip 单元测试即文档
[基于原始文档 tests/Database/TruncateTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Database/TruncateTest.php)
:::
    
**引入相关类**

 * use Tests\Database\DatabaseTestCase as TestCase;

## truncate 基本用法

清理没有返回值。

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "TRUNCATE TABLE `test`",
            []
        ]
        eot;

    $this->assertSame(
        $sql,
        $this->varJson(
            $connect
                ->sql()
                ->table('test')
                ->truncate()
        )
    );
}
```