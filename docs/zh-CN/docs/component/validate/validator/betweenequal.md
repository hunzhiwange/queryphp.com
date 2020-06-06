# 验证器.处于 betweenEqual 范围，包含全等

::: tip Testing Is Documentation
[tests/Validate/Validator/BetweenEqualTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/BetweenEqualTest.php)
:::
    
**Uses**

``` php
<?php

use Leevel\Validate\Validator;
```

## 验证通过的数据

以下是通过的校验数据示例。

``` php
# Tests\Validate\Validator\BetweenEqualTest::baseUseProvider
public function baseUseProvider(): array
{
    return [
        [1.1, '1,5'],
        [2, '1,5'],
        [3, '1,5'],
        [4, '1,5'],
        [4.5, '1,5'],
        ['b', 'a,z'],
        ['c', 'a,z'],
        [1, '1,5'],
        [5, '1,5'],
        ['a', 'a,z'],
        ['z', 'a,z'],
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
            'name'     => 'between_equal:'.$param,
        ]
    );

    $this->assertTrue($validate->success());
}
```
    
## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\BetweenEqualTest::badProvider
public function badProvider(): array
{
    return [
        ['0.1', '1,5'],
        ['5.5', '1,5'],
        ['8', '1,5'],
        ['c', 'h,t'],
        ['w', 'h,t'],
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
            'name'     => 'between_equal:'.$param,
        ]
    );

    $this->assertFalse($validate->success());
}
```
    
## between_equal 参数缺失

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
            'name'     => 'between_equal',
        ]
    );

    $validate->success();
}
```