# 查询一个字段的值.value

::: tip Testing Is Documentation
[tests/Database/Read/ValueTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Read/ValueTest.php)
:::
    
**Uses**

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