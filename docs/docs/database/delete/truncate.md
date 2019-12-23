# 清空数据.truncate

::: tip Testing Is Documentation
[tests/Database/Delete/TruncateTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Delete/TruncateTest.php)
:::
    
**Uses**

``` php
<?php

use Tests\Database\DatabaseTestCase as TestCase;
```

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