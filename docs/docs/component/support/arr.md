# 数组

::: tip Testing Is Documentation
[tests/Support/ArrTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Support/ArrTest.php)
:::
    
这里为系统提供的数组使用的功能文档说明。

**Uses**

``` php
<?php

use Exception;
use JsonSerializable;
use Leevel\Support\Arr;
use Leevel\Support\IArray;
use Leevel\Support\IJson;
```

## normalize 基础格式化

``` php
public function testBaseUse(): void
{
    $this->assertTrue(Arr::normalize(true));
    $this->assertSame(['a', 'b'], Arr::normalize('a,b'));
    $this->assertSame(['a', 'b'], Arr::normalize(['a', 'b']));
    $this->assertSame(['a'], Arr::normalize(['a', '']));
    $this->assertSame(['a'], Arr::normalize(['a', ''], ',', true));
    $this->assertSame(['a', ' 0 '], Arr::normalize(['a', ' 0 '], ',', true));
    $this->assertSame(['a', '0'], Arr::normalize(['a', ' 0 '], ','));
}
```
    
## normalize 格式化字符串

``` php
public function testNormalize(): void
{
    $result = Arr::normalize('hello');

    $json = <<<'eot'
        [
            "hello"
        ]
        eot;

    $this->assertSame(
        $json,
        $this->varJson(
            $result
        )
    );
}
```
    
## normalize 格式化分隔字符串

``` php
public function testNormalizeSplitString(): void
{
    $result = Arr::normalize('hello,world');

    $json = <<<'eot'
        [
            "hello",
            "world"
        ]
        eot;

    $this->assertSame(
        $json,
        $this->varJson(
            $result
        )
    );
}
```
    
## normalize 格式化数组

``` php
public function testNormalizeArr(): void
{
    $result = Arr::normalize(['hello', 'world']);

    $json = <<<'eot'
        [
            "hello",
            "world"
        ]
        eot;

    $this->assertSame(
        $json,
        $this->varJson(
            $result
        )
    );
}
```
    
## normalize 格式化数组过滤空格

``` php
public function testNormalizeArrFilterEmpty(): void
{
    $result = Arr::normalize(['hello', 'world', ' ', '0']);

    $json = <<<'eot'
        [
            "hello",
            "world"
        ]
        eot;

    $this->assertSame(
        $json,
        $this->varJson(
            $result
        )
    );
}
```
    
## normalize 格式化数组不过滤空格

``` php
public function testNormalizeArrNotFilterEmpty(): void
{
    $result = Arr::normalize(['hello', 'world', ' ', '0'], ',', true);

    $json = <<<'eot'
        [
            "hello",
            "world",
            " "
        ]
        eot;

    $this->assertSame(
        $json,
        $this->varJson(
            $result
        )
    );
}
```
    
## normalize 格式化数据即不是数组也不是字符串

``` php
public function testNormalizeNotArrAndNotString(): void
{
    $result = Arr::normalize(false);

    $this->assertFalse($result);
}
```
    
## only 允许特定 Key 通过

相当于白名单。

``` php
public function testOnly(): void
{
    $result = Arr::only(['input' => 'test', 'foo' => 'bar', 'hello' => 'world'], ['input', 'hello', 'notfound']);

    $json = <<<'eot'
        {
            "input": "test",
            "hello": "world"
        }
        eot;

    $this->assertSame(
        $json,
        $this->varJson(
            $result
        )
    );
}
```
    
## except 排除特定 Key 通过

相当于黑名单。

``` php
public function testExcept(): void
{
    $result = Arr::except(['input' => 'test', 'foo' => 'bar', 'hello' => 'world'], ['input', 'hello', 'notfound']);

    $json = <<<'eot'
        {
            "foo": "bar"
        }
        eot;

    $this->assertSame(
        $json,
        $this->varJson(
            $result
        )
    );
}
```
    
## filter 数据过滤

基本的字符串会执行一次清理工作。

``` php
public function testFilter(): void
{
    $sourceData = ['foo' => 'bar', 'hello' => 'world ', 'i' => '5'];
    $rule = [];

    $result = Arr::filter($sourceData, $rule);

    $json = <<<'eot'
        {
            "foo": "bar",
            "hello": "world",
            "i": "5"
        }
        eot;

    $this->assertSame(
        $json,
        $this->varJson(
            $result
        )
    );
}
```
    
## filter 数据过滤待规则

``` php
public function testFilterWithRule(): void
{
    $sourceData = ['foo' => 'bar', 'hello' => 'world ', 'i' => '5'];
    $rule = [
        'i'   => ['intval'],
        'foo' => ['md5'],
        'bar' => [function ($v) {
            return $v.' php';
        }],
    ];

    $result = Arr::filter($sourceData, $rule);

    $json = <<<'eot'
        {
            "foo": "37b51d194a7513e45b56f6524f2d51f2",
            "hello": "world",
            "i": 5
        }
        eot;

    $this->assertSame(
        $json,
        $this->varJson(
            $result
        )
    );
}
```
    
## filter 数据过滤待规则必须是数组

``` php
public function testFilterRuleIsNotArr(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Rule of `i` must be an array.'
    );

    $sourceData = ['foo' => 'bar', 'hello' => 'world ', 'i' => '5'];
    $rule = [
        'i' => 'intval',
    ];

    Arr::filter($sourceData, $rule);
}
```
    
## filter 数据过滤待规则不是一个回调

``` php
public function testFilterRuleItemIsNotACallback(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Rule item of `i` must be a callback type.'
    );

    $sourceData = ['foo' => 'bar', 'hello' => 'world ', 'i' => '5'];
    $rule = [
        'i' => ['notcallback'],
    ];

    Arr::filter($sourceData, $rule);
}
```
    
## filter 数据过滤默认不处理 NULL 值

``` php
public function testFilterWithoutMust(): void
{
    $sourceData = ['foo' => null];
    $rule = ['foo' => ['intval']];

    $result = Arr::filter($sourceData, $rule);

    $json = <<<'eot'
        {
            "foo": null
        }
        eot;

    $this->assertSame(
        $json,
        $this->varJson(
            $result
        )
    );
}
```
    
## filter 数据过滤强制处理 NULL 值

``` php
public function testFilterWithMust(): void
{
    $sourceData = ['foo' => null];
    $rule = ['foo' => ['intval', 'must']];

    $result = Arr::filter($sourceData, $rule);

    $json = <<<'eot'
        {
            "foo": 0
        }
        eot;

    $this->assertSame(
        $json,
        $this->varJson(
            $result
        )
    );
}
```
    
## shouldJson 数据过滤强制处理 NULL 值

测试实现了 `\Leevel\Support\IArray` 的对象

``` php
namespace Tests\Support;

class ArrMyArray implements IArray
{
    public function toArray(): array
    {
        return ['hello' => 'IArray'];
    }
}
```

测试实现了 `\Leevel\Support\IJson` 的对象

``` php
namespace Tests\Support;

class ArrMyJson implements IJson
{
    public function toJson(?int $option = null): string
    {
        if (null === $option) {
            $option = JSON_UNESCAPED_UNICODE;
        }

        return json_encode(['hello' => 'IJson'], $option);
    }
}
```

测试实现了 `\JsonSerializable` 的对象

``` php
namespace Tests\Support;

class ArrMyJsonSerializable implements JsonSerializable
{
    public function jsonSerialize(): mixed
    {
        return ['hello' => 'JsonSerializable'];
    }
}
```


``` php
public function testShouldJson(): void
{
    $this->assertTrue(Arr::shouldJson(['foo' => 'bar']));
    $this->assertTrue(Arr::shouldJson(new ArrMyArray()));
    $this->assertTrue(Arr::shouldJson(new ArrMyJson()));
    $this->assertTrue(Arr::shouldJson(new ArrMyJsonSerializable()));
}
```
    
## convertJson 转换 JSON 数据

``` php
public function testConvertJson(): void
{
    $this->assertSame('{"foo":"bar"}', Arr::convertJson(['foo' => 'bar']));
    $this->assertSame('{"foo":"bar"}', Arr::convertJson(['foo' => 'bar'], JSON_THROW_ON_ERROR));
    $this->assertSame('{"hello":"IArray"}', Arr::convertJson(new ArrMyArray()));
    $this->assertSame('{"hello":"IJson"}', Arr::convertJson(new ArrMyJson()));
    $this->assertSame('{"hello":"JsonSerializable"}', Arr::convertJson(new ArrMyJsonSerializable()));
    $this->assertSame('{"成":"都"}', Arr::convertJson(['成' => '都']));
    $this->assertSame('{"\u6210":"\u90fd"}', Arr::convertJson(['成' => '都'], 0));
}
```
    
## inCondition 数据库 IN 查询条件

``` php
public function testInCondition(): void
{
    $data = [
        ['id' => 5, 'name' => 'hello'],
        ['id' => 6, 'name' => 'world'],
    ];

    $dataDemo2 = [
        [10, 'hello'],
        [11, 'world'],
    ];

    $result = Arr::inCondition($data, 'id');
    $json = <<<'eot'
        [
            5,
            6
        ]
        eot;

    $this->assertSame(
        $json,
        $this->varJson($result)
    );

    $result = Arr::inCondition($data, 'name');
    $json = <<<'eot'
        [
            "hello",
            "world"
        ]
        eot;

    $this->assertSame(
        $json,
        $this->varJson($result)
    );

    $result = Arr::inCondition($dataDemo2, 0);
    $json = <<<'eot'
        [
            10,
            11
        ]
        eot;

    $this->assertSame(
        $json,
        $this->varJson($result)
    );
}
```
    
## inCondition 数据库 IN 查询条件支持过滤器

``` php
public function testInConditionWithFilter(): void
{
    $data = [
        ['id' => 5, 'name' => 5],
        ['id' => '9', 'name' => 'world'],
        ['id' => 'haha', 'name' => '0'],
    ];

    $result = Arr::inCondition($data, 'id', fn ($v): int => (int) $v);
    $json = <<<'eot'
        [
            5,
            9,
            0
        ]
        eot;

    $this->assertSame(
        $json,
        $this->varJson($result)
    );

    $result = Arr::inCondition($data, 'name', fn ($v): string => (string) $v);
    $json = <<<'eot'
        [
            "5",
            "world",
            "0"
        ]
        eot;

    $this->assertSame(
        $json,
        $this->varJson($result)
    );
}
```