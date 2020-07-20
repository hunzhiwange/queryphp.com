# Validator.upper

::: tip Testing Is Documentation
[tests/Validate/Validator/UpperTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/UpperTest.php)
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
# Tests\Validate\Validator\UpperTest::baseUseProvider
public function baseUseProvider(): array
{
    return [
        ['ABC'],
        ['CDE'],
        ['HELLO'],
        ['FOO'],
    ];
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
            'name'     => 'upper',
        ]
    );

    $this->assertTrue($validate->success());
}
```
    
## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\UpperTest::badProvider
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
            'name'     => 'upper',
        ]
    );

    $this->assertFalse($validate->success());
}
```