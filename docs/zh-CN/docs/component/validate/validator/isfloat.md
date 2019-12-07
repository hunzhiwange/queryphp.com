# 验证器.验证是否为浮点数

::: tip Testing Is Documentation
[tests/Validate/Validator/IsFloatTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/IsFloatTest.php)
:::
    
**Uses**

 * use Leevel\Validate\Validator;

## 验证通过的数据

以下是通过的校验数据示例。

``` php
public function baseUseProvider(): array
{
    return [
        [0],
        ['12'],
        [' 0 '],
        ['0.0'],
        ['0'],
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
            'name'     => 'is_float',
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
        ['0,0'],
        [false],
        ['foo'],
        ['bar'],
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
            'name'     => 'is_float',
        ]
    );

    $this->assertFalse($validate->success());
}
```