# Validator.timezone

::: tip Testing Is Documentation
[tests/Validate/Validator/TimezoneTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/TimezoneTest.php)
:::
    
**Uses**

``` php
<?php

use Leevel\Validate\Validator;
```

## 验证通过的数据

以下是通过的校验数据示例。

``` php
# Tests\Validate\Validator\TimezoneTest::baseUseProvider
public function baseUseProvider(): array
{
    return [
        ['-0400'],
        ['EDT'],
        ['Asia/Shanghai'], // 上海
        ['Asia/Hong_Kong'], // 香港
        ['Asia/Chongqing'], // 重庆
        ['Asia/Urumqi'], // 乌鲁木齐
        ['Asia/Macao'], // 澳门
        ['Asia/Taipei'], // 台北
        ['Asia/Singapore'], //  新加坡
        ['PRC'], // 设置中国时区
        ['Etc/GMT'], // 格林威治标准时间
        ['Etc/GMT+8'], // 比林威治标准时间慢 8 小时
        ['Etc/GMT-8'], // 比林威治标准时间快 8 小时
    ];
}
```

上面的数据是测试的数据提供者。


``` php
public function testBaseUse($value): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name'     => 'timezone',
        ]
    );

    $this->assertTrue($validate->success());
}
```
    
## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\TimezoneTest::badProvider
public function badProvider(): array
{
    return [
        ['Asia/foo'],
        ['Asia/bar'],
        ['foo'],
        ['bar'],
        ['2018'],
        ['2018-44-22'],
        ['2018-12-42'],
        [''],
        [[1, 2]],
    ];
}
```

上面的数据是测试的数据提供者。


``` php
public function testBad($value): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name'     => 'timezone',
        ]
    );

    $this->assertFalse($validate->success());
}
```