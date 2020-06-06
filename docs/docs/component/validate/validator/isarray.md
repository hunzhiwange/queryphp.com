# Validator.is_array

::: tip Testing Is Documentation
[tests/Validate/Validator/IsArrayTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/IsArrayTest.php)
:::
    
**Uses**

``` php
<?php

use Leevel\Validate\Validator;
```

## 验证通过的数据

以下是通过的校验数据示例。

``` php
# Tests\Validate\Validator\IsArrayTest::baseUseProvider
public function baseUseProvider(): array
{
    return [
        [['this', 'is', 'an array']],
        [['a' => 'aaa', 'b' => 1, 'c' => true]],
        [['im', 'an', 'array']],
        [['im' => 'not', 'going' => 'to be', 'an' => 'array']],
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
            'name'     => 'is_array',
        ]
    );

    $this->assertTrue($validate->success());
}
```
    
## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\IsArrayTest::badProvider
public function badProvider(): array
{
    return [
        ['this is a string'],
        [0.52148389816284],
        ['0.0'],
        ['-0.0'],
        ['foo'],
        ['bar'],
        ['hello'],
        ['world'],
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
            'name'     => 'is_array',
        ]
    );

    $this->assertFalse($validate->success());
}
```