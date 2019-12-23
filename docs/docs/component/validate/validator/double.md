# Validator.double

::: tip Testing Is Documentation
[tests/Validate/Validator/DoubleTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/DoubleTest.php)
:::
    
**Uses**

``` php
<?php

use Leevel\Validate\Validator;
```

## 验证通过的数据

以下是通过的校验数据示例。

``` php
public function baseUseProvider(): array
{
    return [
        ['0.1'],
        ['-90.55'],
        ['1.0'],
        ['42'],
        ['1820'],
        [-42],
        [42],
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
            'name'     => 'double',
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
        ['--1820'],
        ['wsl!12'],
        ['2018-12-42'],
        [''],
        [[1, 2]],
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
            'name'     => 'double',
        ]
    );

    $this->assertFalse($validate->success());
}
```