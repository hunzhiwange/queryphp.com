# Validator.chinese_alpha_num

::: tip Testing Is Documentation
[tests/Validate/Validator/ChineseAlphaNumTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/ChineseAlphaNumTest.php)
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
        ['abc'],
        ['ABC'],
        ['123abc'],
        ['4ABC'],
        ['A4中国4bc'],
        ['ab1c'],
        ['AB成都2C'],
        ['Ab3c'],
        [123],
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
            'name'     => 'chinese_alpha_num',
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
        [' '],
        ['not numeric'],
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
            'name'     => 'chinese_alpha_num',
        ]
    );

    $this->assertFalse($validate->success());
}
```