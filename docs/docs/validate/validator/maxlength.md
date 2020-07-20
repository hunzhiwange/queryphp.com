# Validator.max_length

::: tip Testing Is Documentation
[tests/Validate/Validator/MaxLengthTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/MaxLengthTest.php)
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
# Tests\Validate\Validator\MaxLengthTest::baseUseProvider
public function baseUseProvider(): array
{
    return [
        [2, 1],
        ['中国', 2],
        ['中国', 3],
        ['成都', 2],
        ['hello', 5],
        ['hello', 6],
        ['foo', 3],
        ['world', 5],
        ['中国no1', 5],
        [true, 1],
        [false, 0],
    ];
}
```

上面的数据是测试的数据提供者。


``` php
public function testBaseUse($value, $param): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name'     => 'max_length:'.$param,
        ]
    );

    $this->assertTrue($validate->success());
}
```
    
## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\MaxLengthTest::badProvider
public function badProvider(): array
{
    return [
        [2, 0],
        ['中国', 1],
        ['成都', 1],
        ['hello', 4],
        ['foo', 2],
        ['world', 4],
        ['中国no1', 4],
        [new stdClass(), 0],
        [['foo', 'bar'], 0],
        [[1, 2], 0],
        [1, 0],
        [[[], []], 0],
        [true, 0],
    ];
}
```

上面的数据是测试的数据提供者。


``` php
public function testBad($value, $param): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name'     => 'max_length:'.$param,
        ]
    );

    $this->assertFalse($validate->success());
}
```
    
## max_length 参数缺失

``` php
public function testMissParam(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Missing the first element of param.'
    );

    $validate = new Validator(
        [
            'name' => '',
        ],
        [
            'name'     => 'max_length',
        ]
    );

    $validate->success();
}
```