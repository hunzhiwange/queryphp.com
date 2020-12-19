# 自动化测试

::: tip Testing Is Documentation
[tests/Docs/TestDoc.php](https://github.com/hunzhiwange/framework/blob/master/tests/Docs/TestDoc.php)
:::
    
QueryPHP 自身经过大量的单元测试用例验证过，取得了非常好的效果，对于业务层测试来说，我们也提供了基础的测试功能。


## 基本使用方法

**fixture 定义**

**tests/Example/ExampleTest.php**

``` php
<?php

declare(strict_types=1);

namespace Tests\Example;

use Tests\TestCase;

/**
 * 继承框架基础示例.
 */
class ExampleTest extends TestCase
{
    public function testBaseUse(): void
    {
        $this->assertSame('QueryPHP', 'QueryPHP');
    }
}

```