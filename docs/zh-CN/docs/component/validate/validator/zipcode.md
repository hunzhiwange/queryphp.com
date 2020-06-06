# 验证器.是否为中国邮政编码

::: tip Testing Is Documentation
[tests/Validate/Validator/ZipCodeTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/ZipCodeTest.php)
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
# Tests\Validate\Validator\ZipCodeTest::baseUseProvider
public function baseUseProvider(): array
{
    return [
        ['610000'],
        ['610200'],
        ['611900'],
        ['611500'],
        [611900],
        [611500],
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
            'name'     => 'zip_code',
        ]
    );

    $this->assertTrue($validate->success());
}
```
    
## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\ZipCodeTest::badProvider
public function badProvider(): array
{
    return [
        ['9995031975011115028819'],
        [' '],
        ['not numeric'],
        [new stdClass()],
        [['foo', 'bar']],
        [[1, 2]],
        ['this is a string'],
        [true],
        [[[], []]],
        ['not/numeric'],
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
            'name'     => 'zip_code',
        ]
    );

    $this->assertFalse($validate->success());
}
```