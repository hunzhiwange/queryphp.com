# Validator.strlen

::: tip Testing Is Documentation
[tests/Validate/Validator/StrlenTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/StrlenTest.php)
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
public function baseUseProvider(): array
{
    return [
        ['http://www.google.com', 21],
        ['http://queryphp.com', 19],
        ['foobar', 6],
        ['helloworld', 10],
        ['中国', 6],
        ['成都no1', 9],
    ];
}
```

上面的数据是测试的数据提供者。


``` php
public function testBaseUse($value, int $length): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name'     => 'strlen:'.$length,
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
        ['not numeric', 21],
        [[], 21],
        [new stdClass(), 21],
        [['foo', 'bar'], 21],
        [[1, 2], 21],
        ['tel:+1-816-555-1212', 21],
        ['foo', 21],
        ['bar', 21],
        ['urn:oasis:names:specification:docbook:dtd:xml:4.1.2', 21],
        ['world', 21],
        [null, 21],
    ];
}
```

上面的数据是测试的数据提供者。


``` php
public function testBad($value, int $length): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name'     => 'strlen:'.$length,
        ]
    );

    $this->assertFalse($validate->success());
}
```
    
## strlen 参数缺失

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
            'name'     => 'strlen',
        ]
    );

    $validate->success();
}
```