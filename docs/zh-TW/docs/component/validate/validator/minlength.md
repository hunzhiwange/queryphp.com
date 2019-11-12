# 验证器.验证数据最小长度

::: tip Testing Is Documentation
[tests/Validate/Validator/MinLengthTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/MinLengthTest.php)
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
        [2, 1],
        ['中国', 2],
        ['中国', 1],
        ['成都', 2],
        ['hello', 5],
        ['hello', 4],
        ['foo', 3],
        ['world', 5],
        ['中国no1', 5],
        [true, 1],
        [false, 0],
    ];
}
```

上面的数据是测试的数据提供者。


``` php
public function testBaseUse($value, $param): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name'     => 'min_length:'.$param,
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
        [2, 2],
        ['中国', 3],
        ['成都', 3],
        ['hello', 6],
        ['foo', 4],
        ['world', 6],
        ['中国no1', 6],
        [new stdClass(), 0],
        [['foo', 'bar'], 0],
        [[1, 2], 0],
        [1, 2],
        [[[], []], 0],
        [true, 2],
        [false, 1],
    ];
}
```

上面的数据是测试的数据提供者。


``` php
public function testBad($value, $param): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name'     => 'min_length:'.$param,
        ]
    );

    $this->assertFalse($validate->success());
}
```