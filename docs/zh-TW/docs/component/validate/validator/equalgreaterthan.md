# 验证器.大于或者全等

::: tip Testing Is Documentation
[tests/Validate/Validator/EqualGreaterThanTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/EqualGreaterThanTest.php)
:::
    
**Uses**

 * use Leevel\Validate\Validator;

## 验证通过的数据

以下是通过的校验数据示例。

``` php
public function baseUseProvider(): array
{
    return [
        [3, 2],
        [1.5, '1.1'],
        [2, '1.5'],
        [3, '1.5'],
        [4, '1.5'],
        [4.5, '1.5'],
        ['b', 'a'],
        ['c', 'a'],
        ['foo', 'bar'],
        [1.1, '1.1'],
        [0, '0'],
        [0, 0],
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
            'name'     => 'equal_greater_than:'.$param,
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
        [2, 3],
        [1.1, '1.5'],
        [1.5, '2'],
        [1.5, '3'],
        [1.5, '4'],
        [1.5, '4.5'],
        ['a', 'b'],
        ['a', 'c'],
        ['bar', 'foo'],
        ['0', '0'],
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
            'name'     => 'equal_greater_than:'.$param,
        ]
    );

    $this->assertFalse($validate->success());
}
```
    
## 特殊例子的数据校验

特别注意字符串和数字的严格区分。

``` php
public function testSpecial(): void
{
    $validate = new Validator();
    $this->assertTrue($validate->equalGreaterThan('0', '0'));
    $this->assertFalse($validate->equalGreaterThan(0, '0'));
    $this->assertFalse($validate->equalGreaterThan('0', 0));
}
```
    
## equal_greater_than 参数缺失

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
            'name'     => 'equal_greater_than',
        ]
    );

    $validate->success();
}
```