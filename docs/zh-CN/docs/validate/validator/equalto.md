# 验证器.两个字段是否相同

::: tip Testing Is Documentation
[tests/Validate/Validator/EqualToTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/EqualToTest.php)
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
# Tests\Validate\Validator\EqualToTest::baseUseProvider
public function baseUseProvider(): array
{
    return [
        ['foo', 'foo', 'name2'],
        ['bar', 'bar', 'name2'],
        ['test', '', 'name3'],
    ];
}
```

上面的数据是测试的数据提供者。


``` php
public function testBaseUse($value, $valueCompare, string $param): void
{
    $validate = new Validator(
        [
            'name'  => $value,
            'name2' => $valueCompare,
            'name3' => 'test',
        ],
        [
            'name'     => 'equal_to:'.$param,
        ]
    );

    $this->assertTrue($validate->success());
}
```
    
## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\EqualToTest::badProvider
public function badProvider(): array
{
    return [
        ['foo', 'foo2', 'name2'],
        ['bar', 'bar2', 'name2'],
        [new stdClass(), new stdClass(), 'name2'], // 非全等
        [new stdClass(), '', 'name3'], // 非全等
        [['foo', 'bar'], '', 'name3'],
    ];
}
```

上面的数据是测试的数据提供者。


``` php
public function testBad($value, $valueCompare, string $param): void
{
    $validate = new Validator(
        [
            'name'  => $value,
            'name2' => $valueCompare,
            'name3' => new stdClass(),
        ],
        [
            'name'     => 'equal_to:'.$param,
        ]
    );

    $this->assertFalse($validate->success());
}
```
    
## equal_to 参数缺失

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
            'name'     => 'equal_to',
        ]
    );

    $validate->success();
}
```