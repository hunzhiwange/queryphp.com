# 验证器.验证 IP 许可

::: tip Testing Is Documentation
[tests/Validate/Validator/DenyIpTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/DenyIpTest.php)
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
        ['8.8.8.10', '8.8.8.8,127.0.0.1'],
        ['127.0.5.1', '8.8.8.8,127.0.0.1'],
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
            'name'     => 'deny_ip:'.$param,
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
        ['8.8.8.8', '8.8.8.8,127.0.0.1'],
        ['127.0.0.1', '8.8.8.8,127.0.0.1'],
        [new stdClass(), '8.8.8.8,127.0.0.1'],
        [[1, 2], '8.8.8.8,127.0.0.1'],
        [[[], []], '8.8.8.8,127.0.0.1'],
        [['foo', 'bar'], '8.8.8.8,127.0.0.1'],
        [true, '8.8.8.8,127.0.0.1'],
        [false, '8.8.8.8,127.0.0.1'],
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
            'name'     => 'deny_ip:'.$param,
        ]
        );

    $this->assertFalse($validate->success());
}
```
    
## deny_ip 参数缺失

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
            'name'     => 'deny_ip',
        ]
    );

    $validate->success();
}
```