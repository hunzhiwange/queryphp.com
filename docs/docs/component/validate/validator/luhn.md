# Validator.luhn

::: tip Testing Is Documentation
[tests/Validate/Validator/LuhnTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/LuhnTest.php)
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
        [6214830286655765],
        ['6214830286655765'],
        ['6214850285711047'],
        ['6225365271562822'],
        ['181222100003333'],
        ['143311222333444'],
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
            'name'     => 'luhn',
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
        ['130222000333311'],
        ['1533333333332222'],
        [' '],
        [new stdClass()],
        [['foo', 'bar']],
        [[1, 2]],
        [true],
        [[[], []]],
        ['173111223332444'],
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
            'name'     => 'luhn',
        ]
    );

    $this->assertFalse($validate->success());
}
```