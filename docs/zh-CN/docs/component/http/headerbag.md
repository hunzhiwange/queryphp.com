# Header Bag

::: tip Testing Is Documentation
[tests/Http/HeaderBagTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Http/HeaderBagTest.php)
:::
    
QueryPHP 提供了一个 header 包装 `\Leevel\Http\HeaderBag` 对象。

**Uses**

``` php
<?php

use Leevel\Http\HeaderBag;
```

## 创建一个 header 包装

``` php
public function testConstructor(): void
{
    $bag = new HeaderBag(['foo' => 'bar']);
    $this->assertTrue($bag->has('foo'));
}
```
    
## 实现了 __toString 魔术方法

``` php
public function testToStringNotNull(): void
{
    $bag = new HeaderBag(['foo' => 'bar']);
    $this->assertSame("Foo: bar\r\n", $bag->__toString());
}
```
    
## keys 返回所有元素键值

``` php
public function testKeys(): void
{
    $bag = new HeaderBag(['foo' => 'bar']);
    $keys = $bag->keys();
    $this->assertSame('foo', $keys[0]);
}
```
    
## all 取回所有元素

``` php
public function testAll(): void
{
    $bag = new HeaderBag(['foo' => 'bar']);
    $this->assertSame(['foo' => 'bar'], $bag->all(), '->all() gets all the input');

    $bag = new HeaderBag(['FOO' => 'BAR']);
    $this->assertSame(['foo' => 'BAR'], $bag->all(), '->all() gets all the input key are lower case');
}
```
    
## replace 替换当前所有元素

``` php
public function testReplace(): void
{
    $bag = new HeaderBag(['foo' => 'bar']);
    $bag->replace(['NOPE' => 'BAR']);
    $this->assertSame(['nope' => 'BAR'], $bag->all(), '->replace() replaces the input with the argument');
    $this->assertFalse($bag->has('foo'), '->replace() overrides previously set the input');
}
```
    
## get 取回元素值

``` php
public function testGet(): void
{
    $bag = new HeaderBag(['foo' => 'bar', 'fuzz' => 'bizz']);
    $this->assertSame('bar', $bag->get('foo'), '->get return current value');
    $this->assertSame('bar', $bag->get('FoO'), '->get key in case insensitive');
    $this->assertSame('bar', $bag->get('foo', 'nope'), '->get return the value');

    // defaults
    $this->assertNull($bag->get('none'), '->get unknown values returns null');
    $this->assertSame('default', $bag->get('none', 'default'), '->get unknown values returns default');

    $bag->set('foo', 'bor');
    $this->assertSame('bor', $bag->get('foo'), '->get return a new value');
    $this->assertSame('bor', $bag->get('foo', 'nope'), '->get return');
}
```
    
## 实现 \IteratorAggregate::getIterator 迭代器接口

``` php
public function testGetIterator(): void
{
    $headers = ['foo' => 'bar', 'hello' => 'world', 'third' => 'charm'];
    $headerBag = new HeaderBag($headers);

    $i = 0;
    foreach ($headerBag as $key => $val) {
        $i++;
        $this->assertSame($headers[$key], $val);
    }

    $this->assertSame(count($headers), $i);
}
```
    
## 实现 \Countable::count 统计接口

``` php
public function testCount(): void
{
    $headers = ['foo' => 'bar', 'HELLO' => 'WORLD'];
    $headerBag = new HeaderBag($headers);
    $this->assertCount(count($headers), $headerBag);
}
```