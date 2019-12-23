# Validator.not_between_equal

::: tip Testing Is Documentation
[tests/Validate/Validator/NotBetweenEqualTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/NotBetweenEqualTest.php)
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
        ['0.1', '1,5'],
        ['5.5', '1,5'],
        ['8', '1,5'],
        ['c', 'h,t'],
        ['w', 'h,t'],
        ['a', 'a,z'],
        ['z', 'a,z'],
        ['1', '1,5'],
        ['5', '1,5'],
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
            'name'     => 'not_between_equal:'.$param,
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
        ['1.1', '1,5'],
        ['2', '1,5'],
        ['3', '1,5'],
        ['4', '1,5'],
        ['4.5', '1,5'],
        ['b', 'a,z'],
        ['c', 'a,z'],
    ];
}
```

上面的数据是测试的数据提供者。


``` php
public function testBad($value, string $param): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name'     => 'not_between_equal:'.$param,
        ]
    );

    $this->assertFalse($validate->success());
}
```
    
## not_between_equal 参数缺失

``` php
public function testMissParam(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Missing the first or second element of param.'
    );

    $validate = new Validator(
        [
            'name' => '',
        ],
        [
            'name'     => 'not_between_equal',
        ]
    );

    $validate->success();
}
```