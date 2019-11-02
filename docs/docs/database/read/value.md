# 查询一个字段的值.value

::: tip 单元测试即文档
[基于原始文档 tests/Database/Read/ValueTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Read/ValueTest.php)
:::
    
**引入相关类**

 * use Tests\Database\DatabaseTestCase as TestCase;

## value 查询基础用法

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test`.`id` FROM `test` LIMIT 1",
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
                ->value('id')
        )
    );
}
```