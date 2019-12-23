# 验证器.检测字符串中的字符是否都是数字，负数和小数会检测不通过

::: tip Testing Is Documentation
[tests/Validate/Validator/DigitTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/DigitTest.php)
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
        ['01'],
        ['0'],
        ['10002'],
        ['42'],
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
            'name'     => 'digit',
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
        ['1820.20'],
        ['wsl!12'],
        [-42],
        [42],
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
            'name'     => 'digit',
        ]
    );

    $this->assertFalse($validate->success());
}
```