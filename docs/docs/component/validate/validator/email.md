# Validator.email

::: tip Testing Is Documentation
[tests/Validate/Validator/EmailTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/EmailTest.php)
:::
    
**Uses**

``` php
<?php

use Leevel\Validate\Validator;
```

## 验证通过的数据

以下是通过的校验数据示例。

``` php
# Tests\Validate\Validator\EmailTest::baseUseProvider
public function baseUseProvider(): array
{
    return [
        ['635750556@qq.com'],
        ['helloworld@gmail.com'],
        ['foobar@example.com'],
        ['foo+bar/hello-world@example.com'],
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
            'name'     => 'email',
        ]
    );

    $this->assertTrue($validate->success());
}
```
    
## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\EmailTest::badProvider
public function badProvider(): array
{
    return [
        ['hello "@email.com'],
        ['foo bar @test.com'],
        ['foo bar@test.com'],
        ['foobar\t@test.com'],
        [['foo' => 'bar']],
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
            'name'     => 'email',
        ]
    );

    $this->assertFalse($validate->success());
}
```