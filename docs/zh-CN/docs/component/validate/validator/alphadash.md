# 验证器.符串是否为数字、下划线、短横线和字母

::: tip Testing Is Documentation
[tests/Validate/Validator/AlphaDashTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/AlphaDashTest.php)
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
public function baseUseProvider(): array
{
    return [
        ['abc'],
        ['ABC'],
        ['123abc'],
        ['4ABC'],
        ['A44bc'],
        ['ab1c'],
        ['AB2C'],
        ['Ab3c'],
        ['--abc'],
        ['A_BC'],
        ['123a_bc'],
        ['4A--BC'],
        ['A______---44bc'],
        ['ab1c'],
        ['A111B2C'],
        ['Ab--3c'],
        [123],
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
            'name'     => 'alpha_dash',
        ]
    );

    $this->assertTrue($validate->success());
}
```
    
## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
public function badProvider(): array
{
    return [
        [' '],
        ['not numeric'],
        [new stdClass()],
        [['foo', 'bar']],
        [[1, 2]],
        ['this is a string'],
        [true],
        [[[], []]],
        ['not/numeric'],
        ['not\ numeric'],
        ['not?numeric'],
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
            'name'     => 'alpha_dash',
        ]
    );

    $this->assertFalse($validate->success());
}
```