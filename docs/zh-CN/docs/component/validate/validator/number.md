# 验证器.是否为数字

::: tip Testing Is Documentation
[tests/Validate/Validator/NumberTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/NumberTest.php)
:::
    
**Uses**

 * use Leevel\Validate\Validator;
 * use stdClass;

## 验证通过的数据

以下是通过的校验数据示例。

``` php
public function baseUseProvider(): array
{
    return [
        ['42'],
        [1337],
        [0x539],
        [02471],
        [0b10100111001],
        [1337e0],
        [9.1],
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
            'name'     => 'number',
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
        ['not numeric'],
        [[]],
        [new stdClass()],
        [['foo', 'bar']],
        [[1, 2]],
        ['this is a string'],
        ['foo'],
        ['bar'],
        ['hello'],
        ['world'],
        [null],
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
            'name'     => 'number',
        ]
    );

    $this->assertFalse($validate->success());
}
```