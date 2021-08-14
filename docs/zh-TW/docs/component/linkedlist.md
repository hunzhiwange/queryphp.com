# 双向链表

::: tip Testing Is Documentation
[tests/Stack/LinkedListTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Stack/LinkedListTest.php)
:::
    
在 PHP 双向链表的基础上加上数据类型验证功能，不少业务场景中保证链表中数据一致性。

阻止链表返回空数据时抛出异常的默认行为。

底层基于 spldoublylinkedlist 开发，相关文档 <http://php.net/manual/zh/class.spldoublylinkedlist.php>。


**Uses**

``` php
<?php

use Leevel\Stack\LinkedList;
```

## 链表基本使用方法

``` php
public function testBaseUse(): void
{
    $linkedList = new LinkedList();

    $this->assertSame(0, $linkedList->count());
    $this->assertNull($linkedList->pop());
    $this->assertNull($linkedList->pop());
}
```
    
## push 链表尾部弹出元素

``` php
public function testPush(): void
{
    $linkedList = new LinkedList();
    $linkedList->push(5);
    $linkedList->push(6);

    $this->assertSame(2, $linkedList->count());
    $this->assertSame(6, $linkedList->pop());
    $this->assertSame(5, $linkedList->pop());
    $this->assertSame(0, $linkedList->count());
}
```
    
## unshift 链表头插入元素

``` php
public function testUnshift(): void
{
    $linkedList = new LinkedList();
    $linkedList->unshift(5);
    $linkedList->unshift(6);

    $this->assertSame(2, $linkedList->count());
    $this->assertSame(5, $linkedList->pop());
    $this->assertSame(6, $linkedList->pop());
    $this->assertSame(0, $linkedList->count());
}
```
    
## add 链表指定位置插入新值

``` php
public function testAdd(): void
{
    $linkedList = new LinkedList();
    $linkedList->add(0, 'hello');
    $linkedList->add(1, 'world');
    $linkedList->add(2, 'foo');
    $linkedList->add(3, 'bar');

    $this->assertSame('hello', $linkedList->offsetGet(0));
    $this->assertSame('world', $linkedList->offsetGet(1));
    $this->assertSame('foo', $linkedList->offsetGet(2));
    $this->assertSame('bar', $linkedList->offsetGet(3));
}
```
    
## offsetSet 更新链表指定位置链表的值

``` php
public function testOffsetSet(): void
{
    $linkedList = new LinkedList();
    $linkedList->add(0, 'hello');
    $linkedList->add(1, 'world');
    $linkedList->add(2, 'foo');
    $linkedList->add(3, 'bar');

    $linkedList->offsetSet(0, 'hello2');
    $linkedList->offsetSet(1, 'world2');
    $linkedList->offsetSet(2, 'foo2');
    $linkedList->offsetSet(3, 'bar2');

    $this->assertSame('hello2', $linkedList->offsetGet(0));
    $this->assertSame('world2', $linkedList->offsetGet(1));
    $this->assertSame('foo2', $linkedList->offsetGet(2));
    $this->assertSame('bar2', $linkedList->offsetGet(3));
}
```
    
## 链表支持元素类型限定

``` php
public function testValidateType(): void
{
    $this->expectException(\UnexpectedValueException::class);
    $this->expectExceptionMessage('The element type must be one of the following `string`.');

    $linkedList = new LinkedList(['string']);
    $linkedList->push(5);
}
```