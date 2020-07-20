# Validator.in

::: tip Testing Is Documentation
[tests/Validate/Validator/InTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/InTest.php)
:::
    
**Uses**

``` php
<?php

use Leevel\Validate\Validator;
```

## 验证通过的数据

以下是通过的校验数据示例。

``` php
# Tests\Validate\Validator\InTest::baseUseProvider
public function baseUseProvider(): array
{
    return [
        [1, '1,5'],
        [2, '1,2,5'],
        [3, '1,3,5'],
        [4, '1,4,5'],
        [4.5, '1,4.5,5'],
        ['b', 'a,b,z'],
        ['c', 'a,c,z'],
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
            'name'     => 'in:'.$param,
        ]
    );

    $this->assertTrue($validate->success());
}
```
    
## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\InTest::badProvider
public function badProvider(): array
{
    return [
        ['0.1', '1,5'],
        ['5.5', '1,5'],
        ['8', '1,5'],
        ['c', 'h,t'],
        ['w', 'h,t'],
        ['c', 'foo,bar'],
        ['w', 'h,hello,world,t'],
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
            'name'     => 'in:'.$param,
        ]
    );

    $this->assertFalse($validate->success());
}
```
    
## in 参数缺失

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
            'name'     => 'in',
        ]
    );

    $validate->success();
}
```