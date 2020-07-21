# 验证器.是否为中文

::: tip Testing Is Documentation
[tests/Validate/Validator/ChineseTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/ChineseTest.php)
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
# Tests\Validate\Validator\ChineseTest::baseUseProvider
public function baseUseProvider(): array
{
    return [
        ['中国'],
        ['成都'],
        ['小牛仔'],
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
            'name'     => 'chinese',
        ]
    );

    $this->assertTrue($validate->success());
}
```
    
## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\ChineseTest::badProvider
public function badProvider(): array
{
    return [
        [' '],
        ['not 版权'],
        [new stdClass()],
        [['foo', 'bar']],
        [[1, 2]],
        ['this is a string'],
        [true],
        [[[], []]],
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
            'name'     => 'chinese',
        ]
    );

    $this->assertFalse($validate->success());
}
```