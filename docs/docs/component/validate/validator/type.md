# Validator.type

::: tip Testing Is Documentation
[tests/Validate/Validator/TypeTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/TypeTest.php)
:::
    
数据类型验证底层核心为函数 `Leevel\Support\Type\type`，相对于 PHP 提供的 `gettype` 更加强大。


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
    $testFile = __DIR__.'/../assert/test.txt';
    $resource = fopen($testFile, 'r');

    // 主要为 is_xxx 系列
    // https://www.php.net/manual/zh/function.is-array.php
    return [
        [true, 'bool'],
        [true, 'bool'],
        [1.5, 'double'],
        [6.00, 'double'],
        ['中国', 'string'],
        ['成都no1', 'string'],
        [['foo', 'bar'], 'array'],
        [['hello', 'world'], 'array'],
        [['hello', 'world'], 'array:string'],
        [['hello', 'world'], 'array:int:string'],
        [['hello' => 'world', 'world' => 'world'], 'array:string:string'],
        [new stdClass(), 'object'],
        [new Type1(), 'object'],
        [$resource, 'resource'],
        [null, 'NULL'],
    ];
}
```

上面的数据是测试的数据提供者。


``` php
public function testBaseUse($value, string $type): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name'     => 'type:'.$type,
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
        ['not numeric', 'errorType'],
        [[], 'errorType'],
        [new stdClass(), 'errorType'],
        [['foo', 'bar'], 'errorType'],
        [[1, 2], 'errorType'],
        ['tel:+1-816-555-1212', 'errorType'],
        ['foo', 'errorType'],
        ['bar', 'errorType'],
        ['urn:oasis:names:specification:docbook:dtd:xml:4.1.2', 'errorType'],
        ['world', 'errorType'],
        [null, 'errorType'],
        ['errorType', 1],
    ];
}
```

上面的数据是测试的数据提供者。


``` php
public function testBad($value, $type): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name'     => 'type:'.$type,
        ]
    );

    $this->assertFalse($validate->success());
}
```
    
## type 参数缺失

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
            'name'     => 'type',
        ]
    );

    $validate->success();
}
```