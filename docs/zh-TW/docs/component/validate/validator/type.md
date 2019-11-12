# 验证器.数据类型验证

::: tip Testing Is Documentation
[tests/Validate/Validator/TypeTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/TypeTest.php)
:::
    
**Uses**

 * use Leevel\Validate\Validator;
 * use stdClass;

## 验证通过的数据

以下是通过的校验数据示例。

``` php
public function baseUseProvider(): array
{
    $testFile = __DIR__.'/test.txt';
    file_put_contents($testFile, 'foo');
    $resource = fopen($testFile, 'r');

    // http://www.php.net/manual/zh/function.gettype.php
    return [
        [true, 'boolean'],
        [false, 'boolean'],
        [1.5, 'double'],
        [6.00, 'double'],
        ['中国', 'string'],
        ['成都no1', 'string'],
        [['foo', 'bar'], 'array'],
        [['hello', 'world'], 'array'],
        [new stdClass(), 'object'],
        [new Type1(), 'object'],
        [$resource, 'resource'],
        [null, 'NULL'],
    ];
}
```

上面的数据是测试的数据提供者。


``` php
public function testBaseUse($value, string $type): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name'     => 'type:'.$type,
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
        ['not numeric', 'errorType'],
        [[], 'errorType'],
        [new stdClass(), 'errorType'],
        [['foo', 'bar'], 'errorType'],
        [[1, 2], 'errorType'],
        ['tel:+1-816-555-1212', 'errorType'],
        ['foo', 'errorType'],
        ['bar', 'errorType'],
        ['urn:oasis:names:specification:docbook:dtd:xml:4.1.2', 'errorType'],
        ['world', 'errorType'],
        [null, 'errorType'],
    ];
}
```

上面的数据是测试的数据提供者。


``` php
public function testBad($value, string $type): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name'     => 'type:'.$type,
        ]
    );

    $this->assertFalse($validate->success());
}
```
    
## type 参数缺失

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
            'name'     => 'type',
        ]
    );

    $validate->success();
}
```