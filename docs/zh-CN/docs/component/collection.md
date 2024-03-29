# 集合 collection

::: tip Testing Is Documentation
[tests/Collection/CollectionTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Collection/CollectionTest.php)
:::
    
集合 `collection` 提供了一些实用方法，数据库查询的数据列表也会转换为集合数据类型。

**Uses**

``` php
<?php

use JsonSerializable;
use Leevel\Collection\Collection;
use Leevel\Support\IArray;
use Leevel\Support\IJson;
use stdClass;
```

## 基本使用

集合实现了 `\IteratorAggregate` 可以像普通数组一样遍历，也实现了 `\ArrayAccess` 接口，可以当做普通数组一样使用。

``` php
public function testBaseUse(): void
{
    $data = [
        'hello', 'world', 'foo', 'bar',
    ];

    $collection = new Collection($data);

    foreach ($collection as $key => $val) {
        switch ($key) {
            case 0:
                $this->assertSame($val, 'hello');

                break;
            case 1:
                $this->assertSame($val, 'world');

                break;
            case 2:
                $this->assertSame($val, 'foo');

                break;
            case 3:
                $this->assertSame($val, 'bar');

                break;
        }
    }

    $this->assertSame($collection[0], 'hello');
    $this->assertSame($collection[1], 'world');
    $this->assertSame($collection[2], 'foo');
    $this->assertSame($collection[3], 'bar');
    $this->assertTrue(isset($collection[0]));
    $this->assertTrue(isset($collection[1]));
    $this->assertTrue(isset($collection[2]));
    $this->assertTrue(isset($collection[3]));
    $this->assertFalse(isset($collection[4]));
}
```
    
## 静态方法 make 创建集合

可以使用 `make` 方法创建一个集合对象。

``` php
public function testMake(): void
{
    $data = [
        'hello', 'world', 'foo', 'bar',
    ];

    $collection = Collection::make($data);

    foreach ($collection as $key => $val) {
        switch ($key) {
            case 0:
                $this->assertSame($val, 'hello');

                break;
            case 1:
                $this->assertSame($val, 'world');

                break;
            case 2:
                $this->assertSame($val, 'foo');

                break;
            case 3:
                $this->assertSame($val, 'bar');

                break;
        }
    }

    $this->assertSame($collection[0], 'hello');
    $this->assertSame($collection[1], 'world');
    $this->assertSame($collection[2], 'foo');
    $this->assertSame($collection[3], 'bar');
    $this->assertTrue(isset($collection[0]));
    $this->assertTrue(isset($collection[1]));
    $this->assertTrue(isset($collection[2]));
    $this->assertTrue(isset($collection[3]));
    $this->assertFalse(isset($collection[4]));
}
```
    
## 集合支持迭代器

集合 `collection` 是一个标准的迭代器，支持迭代器的用法。

``` php
public function testIterator(): void
{
    $data = [
        'hello', 'world', 'foo', 'bar',
    ];

    $collection = new Collection($data);

    $this->assertSame('hello', $collection->current());
    $this->assertSame(0, $collection->key());

    $this->assertNull($collection->next());

    $this->assertSame('world', $collection->current());
    $this->assertSame(1, $collection->key());

    $this->assertNull($collection->next());
    $this->assertNull($collection->next());

    $this->assertSame('bar', $collection->current());
    $this->assertSame(3, $collection->key());

    $collection->next();

    $this->assertFalse($collection->current());
    $this->assertNull($collection->key());

    $collection->rewind();
    $this->assertSame(0, $collection->key());
    $this->assertSame('hello', $collection->current());
}
```
    
## 集合可统计

集合实现了 `\Countable` 可以像普通数组一样统计元素的个数。

``` php
public function testCountable(): void
{
    $data = [
        'hello', 'world', 'foo', 'bar',
    ];

    $collection = new Collection($data);

    $this->assertCount(4, $collection);
}
```
    
## 集合数据支持实现 \Leevel\Support\IArray 的对象

对象实现了 `\Leevel\Support\IArray` 可以转化为集合数据。

**例子**

``` php
namespace Tests\Collection;

class TestArray implements IArray
{
    public function toArray(): array
    {
        return [
            'hello',
            'world',
        ];
    }
}
```

> 实现了 `\Leevel\Support\IArray` 的对象的方法 `toArray` 返回集合的数据。


``` php
public function testGetArrayElements2(): void
{
    $data = [
        'hello',
        'world',
    ];

    $collection = new Collection(new TestArray());

    $this->assertSame($collection->toArray(), $data);
}
```
    
## 集合数据支持实现 \Leevel\Support\IJson 的对象

对象实现了 `\Leevel\Support\IJson` 可以转化为集合数据。

**例子**

``` php
namespace Tests\Collection;

class TestJson implements IJson
{
    public function toJson(?int $option = null): string
    {
        if (null === $option) {
            $option = JSON_UNESCAPED_UNICODE;
        }

        return json_encode([
            'hello',
            'world',
        ], $option);
    }
}
```

> 实现了 `\Leevel\Support\IJson` 的对象的方法 `toJson` 返回集合的数据。


``` php
public function testGetArrayElements3(): void
{
    $data = [
        'hello',
        'world',
    ];

    $collection = new Collection(new TestJson());

    $this->assertSame($collection->toArray(), $data);
}
```
    
## 集合数据支持实现 \JsonSerializable 的对象

对象实现了 `\JsonSerializable` 可以转化为集合数据。

**例子**

``` php
namespace Tests\Collection;

class TestJsonSerializable implements JsonSerializable
{
    public function jsonSerialize()
    {
        return [
            'hello',
            'world',
        ];
    }
}
```

> 实现了 `\JsonSerializable` 的对象的方法 `jsonSerialize` 返回集合的数据。


``` php
public function testGetArrayElements4(): void
{
    $data = [
        'hello',
        'world',
    ];

    $collection = new Collection(new TestJsonSerializable());

    $this->assertSame($collection->toArray(), $data);
}
```
    
## 集合数据支持普通数据转化为数组

``` php
public function testGetArrayElements5(): void
{
    $data = [
        'hello',
    ];

    $collection = new Collection('hello');

    $this->assertSame($collection->toArray(), $data);
}
```
    
## 集合数据支持 \stdClass 的对象

对象为 `\stdClass` 可以转化为集合数据。

> `\stdClass` 的对象返回转化为数组作为集合的数据。


``` php
public function testGetArrayElementsWithStdClass(): void
{
    $data = [
        'hello' => 'world',
        'foo'   => 'bar',
    ];

    $std = new stdClass();
    $std->hello = 'world';
    $std->foo = 'bar';

    $collection = new Collection($std);

    $this->assertSame($collection->toArray(), $data);
}
```
    
## getValueTypes 集合数据支持值类型验证

比如下面的数据类型为 `string`，只有字符串类型才能加入集合。


``` php
public function testGetValueTypesValidate(): void
{
    $data = [
        'hello',
        'world',
    ];

    $collection = new Collection($data, ['string']);
    $this->assertSame($collection->toArray(), $data);
    $this->assertSame(['string'], $collection->getValueTypes());
}
```
    
## getKeyTypes 集合数据支持键类型验证

``` php
public function testGetKeyTypesValidate(): void
{
    $data = [
        'hello' => 'world',
        'world' => 'hello',
    ];

    $collection = new Collection($data, ['string'], ['string']);
    $this->assertSame($collection->toArray(), $data);
    $this->assertSame(['string'], $collection->getKeyTypes());
}
```
    
## 集合数据支持类型验证不符合规则示例

比如下面的数据类型为 `int`，字符串类型就会抛出异常。

``` php
public function testTypeValidateException(): void
{
    $this->expectException(\UnexpectedValueException::class);
    $this->expectExceptionMessage(
        'The value of a collection value type requires the following types `int`.'
    );

    $data = [
        'hello',
        'world',
    ];

    new Collection($data, ['int']);
}
```
    
## each 集合数据遍历元素项

使用闭包进行遍历，闭包的第一个参数为元素值，第二为元素键。

``` php
public function testEach(): void
{
    $data = [
        'hello',
        'world',
    ];

    $collection = new Collection($data);

    $i = 0;
    $collection->each(function ($item, $key) use (&$i) {
        $this->assertSame($i, $key);

        if (0 === $i) {
            $this->assertSame($item, 'hello');
        } else {
            $this->assertSame($item, 'world');
        }

        $i++;
    });
}
```
    
## each 集合数据遍历元素项支持中断

遍历元素项的时候返回 `false` 将会中断后续遍历操作。

``` php
public function testEachAndBreak(): void
{
    $data = [
        'hello',
        'world',
    ];

    $collection = new Collection($data);

    $i = 0;

    $collection->each(function ($item, $key) use (&$i) {
        $this->assertSame($i, $key);

        if (0 === $i) {
            $this->assertSame($item, 'hello');

            return false;
        }

        $i++;
    });

    $this->assertSame($i, 0);
}
```
    
## toJson 集合数据支持 JSON 输出

集合实现了 `\Leevel\Support\IJson` 接口，可以通过方法 `toJson` 输出 JSON 字符串。

``` php
public function testToJson(): void
{
    $data = [
        'hello',
        'world',
    ];

    $collection = new Collection($data);

    $data = '["hello","world"]';

    $this->assertSame($data, $collection->toJson());
}
```
    
## toJson 集合数据支持 JSON 输出默认不要编码 Unicode

JSON_UNESCAPED_UNICODE 可以让有中文的 JSON 字符串更加友好地输出。

``` php
json_encode('中文', JSON_UNESCAPED_UNICODE);
```


``` php
public function testToJsonWithCn(): void
{
    $data = [
        '我',
        '成都',
    ];

    $collection = new Collection($data);

    $data = '["我","成都"]';

    $this->assertSame($data, $collection->toJson());
}
```
    
## toJson 集合数据支持 JSON 输出

集合实现了 `\JsonSerializable` 接口，可以通过方法 `toJson` 输出 JSON 字符串。

``` php
public function testJsonSerialize(): void
{
    $std = new stdClass();
    $std->hello = 'world';
    $std->foo = 'bar';

    $data = [
        new TestJsonSerializable(),
        new TestArray(),
        new TestJson(),
        $std,
        'foo',
        'bar',
    ];

    $collection = new Collection($data);

    $data = <<<'eot'
        [
            [
                "hello",
                "world"
            ],
            [
                "hello",
                "world"
            ],
            [
                "hello",
                "world"
            ],
            {
                "hello": "world",
                "foo": "bar"
            },
            "foo",
            "bar"
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $collection->jsonSerialize()
        )
    );
}
```
    
## __toString 集合数据可以转化为字符串

集合实现了 `__toString` 方法，可以强制转化为字符串。

``` php
public function testGetSetString(): void
{
    $data = [
        'hello' => 'world',
        'foo'   => 'bar',
    ];

    $collection = new Collection($data);

    $this->assertSame($collection->hello, 'world');
    $this->assertSame($collection->foo, 'bar');
    $collection->hello = 'new world';
    $collection->foo = 'new bar';
    $this->assertSame($collection->hello, 'new world');
    $this->assertSame($collection->foo, 'new bar');
    $this->assertSame((string) $collection, '{"hello":"new world","foo":"new bar"}');
}
```
    
## __get,__set,__isset,__unset 魔术方法支持

``` php
public function testMagicMethod(): void
{
    $data = [
        'hello' => 'world',
        'foo'   => 'bar',
    ];

    $collection = new Collection($data);

    $this->assertSame($collection->hello, 'world');
    $this->assertSame($collection->foo, 'bar');
    $collection->hello = 'new world';
    $collection->foo = 'new bar';
    $this->assertSame($collection->hello, 'new world');
    $this->assertSame($collection->foo, 'new bar');
    $this->assertTrue(isset($collection->hello)); 
    $this->assertFalse(isset($collection->hello2));
    unset($collection->hello);
    $this->assertFalse(isset($collection->hello));
}
```