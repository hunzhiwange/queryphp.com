# 验证器.验证在给定日期之前

::: tip Testing Is Documentation
[tests/Validate/Validator/BeforeTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/BeforeTest.php)
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
        ['2018-08-11', '2018-08-14'],
        ['2018-08-09', 'name2'],
        ['2018-08-13', '2018-08-14|date_format:Y-m-d'],
    ];
}
```

上面的数据是测试的数据提供者。


``` php
public function testBaseUse($value, string $param): void
{
    $validate = new Validator(
        [
            'name'  => $value,
            'name2' => '2018-08-10',
        ],
        [
            'name'     => 'before:'.$param,
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
        ['2018-08-17', '2018-08-17'],
        ['2018-08-17', '2018-08-15'],
        ['2018-08-15', 'name2'],
        ['2018-08-15', '2018-08-14|date_format:Y-m'],
        [new stdClass(), '1.1'],
        [[], '2018-08-15'],
        [true, '2018-08-15'],
        [false, '2018-08-15'],
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
            'name'     => 'before:'.$param,
        ]
    );

    $this->assertFalse($validate->success());
}
```
    
## 日期格式化不一致无法通过验证

``` php
public function testMakeDateTimeFormatWithNewDateTimeExceptionError(): void
{
    $validate = new Validator(
        [
            'name'  => '2018-08-10',
        ],
        [
            'name'     => 'before:foobar|date_format:y',
        ]
    );

    $this->assertFalse($validate->success());
}
```
    
## before 参数缺失

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
            'name'     => 'before',
        ]
    );

    $validate->success();
}
```