# Validator.regex

::: tip Testing Is Documentation
[tests/Validate/Validator/RegexTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/RegexTest.php)
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
# Tests\Validate\Validator\RegexTest::baseUseProvider
public function baseUseProvider(): array
{
    return [
        [2, '/^[0-9]+$/'],
        ['2', '/^[0-9]+$/'],
        ['zB99', '/^[A-Za-z0-9]+$/'],
        ['ABC', '/^[A-Z]+$/'],
        ['abc', '/^[a-z]+$/'],
        ['中国', '/^[\x{4e00}-\x{9fa5}]+$/u'],
    ];
}
```

上面的数据是测试的数据提供者。


``` php
public function testBaseUse($value, string $param): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name'     => 'regex:'.$param,
        ]
    );

    $this->assertTrue($validate->success());
}
```
    
## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\RegexTest::badProvider
public function badProvider(): array
{
    return [
        ['中国', '/^[0-9]+$/'],
        ['成都', '/^[0-9]+$/'],
        [new stdClass(), 0],
        [['foo', 'bar'], 0],
        [[1, 2], 0],
        [[[], []], 0],
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
            'name'     => 'regex:'.$param,
        ]
    );

    $this->assertFalse($validate->success());
}
```
    
## regex 参数缺失

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
            'name'     => 'regex',
        ]
    );

    $validate->success();
}
```