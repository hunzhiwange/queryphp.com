# 数组

::: tip 单元测试即文档
[基于原始文档 tests/Support/ArrTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Support/ArrTest.php)
:::
    
这里为系统提供的数组使用的功能文档说明。

**引入相关类**

 * use Leevel\Support\Arr;

## 基础格式化


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
    

## 格式化字符串


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
    

## 格式化分隔字符串


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
    

## 格式化数组


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
    

## 格式化数组过滤空格


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
    

## 格式化数组不过滤空格


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
    

## 格式化数据即不是数组也不是字符串


``` php
public function testNormalizeNotArrAndNotString(): void
{
    $result = Arr::normalize(false);

    $this->assertFalse($result);
}
```
    

## 允许特定 Key 通过

相当于白名单。

``` php
public function testOnly(): void
{
    $result = Arr::only(['input' => 'test', 'foo' => 'bar', 'hello' => 'world'], ['input', 'hello', 'notfound']);

    $json = <<<'eot'
        {
            "input": "test",
            "hello": "world",
            "notfound": null
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
    

## 排除特定 Key 通过

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
    

## 数据过滤

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
    

## 数据过滤待规则


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
    

## 数据过滤待规则必须是数组


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
    

## 数据过滤待规则不是一个回调


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