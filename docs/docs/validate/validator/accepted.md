# 验证器.是否可接受的

::: tip Testing Is Documentation
[tests/Validate/Validator/AcceptedTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/AcceptedTest.php)
:::
    
**Uses**

``` php
<?php

use Leevel\Validate\Validator;
```

## 验证通过的数据

以下是通过的校验数据示例。

``` php
# Tests\Validate\Validator\AcceptedTest::baseUseProvider
public function baseUseProvider(): array
{
    return [
        ['yes'],
        ['on'],
        ['1'],
        [1],
        ['true'],
        ['t'],
        [true],
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
            'name'     => 'accepted',
        ]
    );

    $this->assertTrue($validate->success());
}
```
    
## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\AcceptedTest::badProvider
public function badProvider(): array
{
    return [
        ['foo'],
        ['bar'],
        [[1, 2]],
        [''],
        [' '],
        ['    '],
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
            'name'     => 'accepted',
        ]
    );

    $this->assertFalse($validate->success());
}
```