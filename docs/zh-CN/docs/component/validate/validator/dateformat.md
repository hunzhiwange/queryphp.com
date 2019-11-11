# 验证器.是否为时间

::: tip Testing Is Documentation
[tests/Validate/Validator/DateFormatTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/DateFormatTest.php)
:::
    
**Uses**

 * use Leevel\Validate\Validator;

## 验证通过的数据

以下是通过的校验数据示例。

``` php
public function baseUseProvider(): array
{
    return [
        ['6.1.2018 13:00+01:00', 'j.n.Y H:iP'],
        ['15-Mar-2018', 'j-M-Y'],
    ];
}
```

上面的数据是测试的数据提供者。


``` php
public function testBaseUse($value, string $format): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name'     => 'date_format:'.$format,
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
        ['2018.6.1 13:00+01:00', 'j.n.Y H:iP'],
        ['29/Feb/23:2018:59:31', 'd/M/Y:H:i:s'],
    ];
}
```

上面的数据是测试的数据提供者。


``` php
public function testBad($value, string $format): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name'     => 'date_format:'.$format,
        ]
    );

    $this->assertFalse($validate->success());
}
```
    
## date_format 参数缺失

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
            'name'     => 'date_format',
        ]
    );

    $validate->success();
}
```