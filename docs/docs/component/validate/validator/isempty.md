# Validator.is_empty

::: tip Testing Is Documentation
[tests/Validate/Validator/IsEmptyTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/IsEmptyTest.php)
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
    $val = null;

    return [
        [''],
        [0],
        [0.0],
        ['0'],
        [null],
        [false],
        [[]],
        [$val],
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
            'name'     => 'is_empty',
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
        ['foo'],
        ['bar'],
        ['hello'],
        ['world'],
        [true],
        [1],
        [[[], []]],
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
            'name'     => 'is_empty',
        ]
    );

    $this->assertFalse($validate->success());
}
```