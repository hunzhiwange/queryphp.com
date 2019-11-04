# 集合 collection

::: tip Testing Is Documentation
[tests/Collection/CollectionTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Collection/CollectionTest.php)
:::
    
集合 `collection` 提供了一些实用方法，数据库查询的数据列表也会转换为集合数据类型。

**Uses**

 * use JsonSerializable;
 * use Leevel\Collection\Collection;
 * use Leevel\Support\IArray;
 * use Leevel\Support\IJson;
 * use stdClass;

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

use JsonSerializable;
use Leevel\Collection\Collection;
use Leevel\Support\IArray;
use Leevel\Support\IJson;
use stdClass;
use Tests\TestCase;

class TestIArray implements IArray
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

    $collection = new Collection(new TestIArray());

    $this->assertSame($collection->toArray(), $data);
}
```
    
## 集合数据支持实现 \Leevel\Support\IJson 的对象

对象实现了 `\Leevel\Support\IJson` 可以转化为集合数据。

**例子**

``` php
namespace Tests\Collection;

use JsonSerializable;
use Leevel\Collection\Collection;
use Leevel\Support\IArray;
use Leevel\Support\IJson;
use stdClass;
use Tests\TestCase;

class TestIJson implements IJson
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

    $collection = new Collection(new TestIJson());

    $this->assertSame($collection->toArray(), $data);
}
```
    
## 集合数据支持实现 \JsonSerializable 的对象

对象实现了 `\JsonSerializable` 可以转化为集合数据。

**例子**

``` php
namespace Tests\Collection;

use JsonSerializable;
use Leevel\Collection\Collection;
use Leevel\Support\IArray;
use Leevel\Support\IJson;
use stdClass;
use Tests\TestCase;

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