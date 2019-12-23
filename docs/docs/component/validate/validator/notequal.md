# Validator.not_equal

::: tip Testing Is Documentation
[tests/Validate/Validator/NotEqualTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/NotEqualTest.php)
:::
    
全等匹配，为了严禁。

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
        [2, 3],
        ['1.1', '1.5'],
        ['1.5', '2'],
        ['1.5', '3'],
        ['1.5', '4'],
        ['1.5', '4.5'],
        ['a', 'b'],
        ['a', 'c'],
        ['bar', 'foo'],
        ['1', '1'],
        ['23', '23'],
        [(string) (3), 3],
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
            'name'     => 'not_equal:'.$param,
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
        [3, 3],
        [1.5, '1.5'],
        [1, true],
        ['', false],
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
            'name'     => 'not_equal:'.$param,
        ]
    );

    $this->assertFalse($validate->success());
}
```
    
## not_equal 参数缺失

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
            'name'     => 'not_equal',
        ]
    );

    $validate->success();
}
```