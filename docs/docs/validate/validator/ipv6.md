# 验证器.是否为 ipv6

::: tip Testing Is Documentation
[tests/Validate/Validator/Ipv6Test.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/Ipv6Test.php)
:::
    
**Uses**

``` php
<?php

use Leevel\Validate\Validator;
```

## 验证通过的数据

以下是通过的校验数据示例。

``` php
# Tests\Validate\Validator\Ipv6Test::baseUseProvider
public function baseUseProvider(): array
{
    return [
        ['2001:3CA1:010F:001A:121B:0000:0000:0010'],
        ['2001:0000:0000:001A:0000:0000:0000:0010'],
        ['2001:4860:4860::8888'],
        ['2001:4860:4860::8844'],
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
            'name'     => 'ipv6',
        ]
    );

    $this->assertTrue($validate->success());
}
```
    
## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\Ipv6Test::badProvider
public function badProvider(): array
{
    return [
        ['2022222201:3CA1:010F:001A:121B:0000:0000:0010'],
        ['2001:000000:0000:001A:0000:0000:0000:0010'],
        ['8.8999.8.8'],
        ['8.2228.4.4'],
        [' 127.0.0.1 '],
        ['20222222201:4860:4860::8888'],
        ['9999999:4860:4860::8844'],
        [false],
        [1.1],
        ['0.0'],
        ['-0.0'],
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
            'name'     => 'ipv6',
        ]
    );

    $this->assertFalse($validate->success());
}
```