# 验证器.验证是否为正常的 JSON 数据

::: tip Testing Is Documentation
[tests/Validate/Validator/JsonTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/JsonTest.php)
:::
    
**Uses**

``` php
<?php

use Leevel\Validate\Validator;
use stdClass;
```

## 验证通过的数据

以下是通过的校验数据示例。

``` php
# Tests\Validate\Validator\JsonTest::baseUseProvider
public function baseUseProvider(): array
{
    return [
        ['"abc"'],
        ['{"foo":"bar"}'],
        [new TestJson()],
    ];
}
```

`\Tests\Validate\Validator\TestJson` 声明如下

``` php
namespace Tests\Validate\Validator;

class TestJson
{
    public function __toString()
    {
        return '{"hello":"world"}';
    }
}
```

上面的数据是测试的数据提供者。



``` php
public function testBaseUse($value): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name'     => 'json',
        ]
    );

    $this->assertTrue($validate->success());
}
```
    
## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\JsonTest::badProvider
public function badProvider(): array
{
    return [
        ['not numeric'],
        [[]],
        [new stdClass()],
        [['foo', 'bar']],
        [[1, 2]],
        ['Foo'],
        ['hEllo'],
        [null],
    ];
}
```

上面的数据是测试的数据提供者。


``` php
public function testBad($value): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name'     => 'json',
        ]
    );

    $this->assertFalse($validate->success());
}
```