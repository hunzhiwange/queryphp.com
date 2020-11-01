# 事件

::: tip Testing Is Documentation
[tests/Event/DispatchTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Event/DispatchTest.php)
:::
    
QueryPHP 提供了一个事件组件 `\Leevel\Event\Dispatch` 对象。

事件适合一些业务后续处理的扩展，比如提交订单的后续通知消息接入，不但提高了可扩展性，而且还降低了系统的耦合性。


**Uses**

``` php
<?php

use Leevel\Di\Container;
use Leevel\Event\Dispatch;
use Leevel\Event\Observer;
```

## 事件基本使用

事件系统使用 `register` 注册监听器，`handle` 会执行一个事件。

**register 函数原型**

``` php
# Leevel\Event\Dispatch::register
/**
 * 注册监听器.
 *
 * @param array|object|string $event
 * @param mixed               $listener
 */
public function register($event, $listener, int $priority = 500): void;
```

**handle 函数原型**

``` php
# Leevel\Event\Dispatch::handle
/**
 * 执行一个事件.
 *
 * @param object|string $event
 * @param array         ...$params
 */
public function handle($event, ...$params): void;
```

**fixture 定义**

**Tests\Event\Listener1**

``` php
namespace Tests\Event;

class Listener1 extends Listener
{
    public function handle($event)
    {
        $_SERVER['event_name'] = $event;
        $_SERVER['test'] = 'hello';
    }
}
```

一般来说监听器需要继承至 `\Leevel\Event\Observer`，本质上事件使用的是观察者设计模式，而监听器是观察者角色。

**Tests\Event\Listener**

``` php
namespace Tests\Event;

abstract class Listener extends Observer
{
}
```


``` php
public function testBaseUse(): void
{
    if (isset($_SERVER['test'])) {
        unset($_SERVER['test']);
    }

    if (isset($_SERVER['event_name'])) {
        unset($_SERVER['event_name']);
    }

    $dispatch = new Dispatch(new Container());
    $dispatch->register('event1', Listener1::class);
    $dispatch->handle('event1');

    $this->assertSame($_SERVER['test'], 'hello');
    $this->assertSame($_SERVER['event_name'], 'event1');

    unset($_SERVER['test'], $_SERVER['event_name']);
}
```
    
## register 注册监听器支持监听器对象实例

第二个参数 `$listener` 支持传递对象实例。

**fixture 定义**

**Tests\Event\Listener2**

``` php
namespace Tests\Event;

class Listener2 extends Listener
{
    public $arg1;

    public function __construct($arg1)
    {
        $this->arg1 = $arg1;
    }

    public function handle()
    {
        $_SERVER['test'] = $this->arg1;
    }
}
```


``` php
public function testListenerInstance(): void
{
    if (isset($_SERVER['test'])) {
        unset($_SERVER['test']);
    }

    $dispatch = new Dispatch(new Container());
    $dispatch->register('event1', new Listener2('arg_foo'));
    $dispatch->handle('event1');

    $this->assertSame($_SERVER['test'], 'arg_foo');

    unset($_SERVER['test']);
}
```
    
## register 注册监听器支持事件对象实例

第一个参数 `$event` 支持传递对象实例。

**fixture 定义**

**Tests\Event\Event1**

``` php
namespace Tests\Event;

class Event1
{
    public $arg1;

    public function __construct($arg1)
    {
        $this->arg1 = $arg1;
    }
}
```

**Tests\Event\Listener3**

``` php
namespace Tests\Event;

class Listener3 extends Listener
{
    public function handle($event)
    {
        $_SERVER['test'] = $event->arg1;
    }
}
```


``` php
public function testEventInstance(): void
{
    if (isset($_SERVER['test'])) {
        unset($_SERVER['test']);
    }

    $dispatch = new Dispatch(new Container());
    $dispatch->register($event = new Event1('event_arg_foo'), Listener3::class);
    $dispatch->handle($event);

    $this->assertSame($_SERVER['test'], 'event_arg_foo');

    unset($_SERVER['test']);
}
```
    
## register 注册监听器支持同时为多个事件绑定监听器

``` php
public function testEventAsArray(): void
{
    $dispatch = new Dispatch(new Container());
    $event = new Event1('event_arg_foo');
    $dispatch->register([$event], Listener3::class);
    $dispatch->handle($event);

    $this->assertSame($_SERVER['test'], 'event_arg_foo');

    unset($_SERVER['test']);
}
```
    
## register 注册监听器支持优先级

第三个参数 `$priority` 表示注册的监听器的优先级，越小越靠前执行，默认为 500。

**fixture 定义**

**Tests\Event\Listener4**

``` php
namespace Tests\Event;

class Listener4 extends Listener
{
    public function handle($event)
    {
        $_SERVER['test'] = 'l4';
    }
}
```

**Tests\Event\Listener5**

``` php
namespace Tests\Event;

class Listener5 extends Listener
{
    public function handle($event)
    {
        $_SERVER['test'] = 'l5';
    }
}
```


``` php
public function testPriority(): void
{
    $dispatch = new Dispatch(new Container());
    $dispatch->register('foo', Listener4::class);
    $dispatch->register('foo', Listener5::class);
    $dispatch->handle('foo');

    $this->assertSame($_SERVER['test'], 'l5');

    $dispatch = new Dispatch(new Container());

    // 第三个参数标识优先级，越小越靠前执行，默认为 500
    $dispatch->register('foo', Listener4::class, 5);
    $dispatch->register('foo', Listener5::class, 4);
    $dispatch->handle('foo');

    $this->assertSame($_SERVER['test'], 'l4');
    unset($_SERVER['test']);
}
```
    
## register 注册监听器支持事件通配符

`*` 表示通配符事件，匹配的事件会执行对应的监听器。

**fixture 定义**

**Tests\Event\WildcardsListener**

``` php
namespace Tests\Event;

class WildcardsListener extends Listener
{
    public function handle($event)
    {
        $_SERVER['wildcard'] = 'wildcard';
    }
}
```


``` php
public function testWildcards(): void
{
    $dispatch = new Dispatch(new Container());
    $dispatch->register('wildcards*event', WildcardsListener::class);
    $dispatch->handle('wildcards123456event');

    $this->assertSame($_SERVER['wildcard'], 'wildcard');
    unset($_SERVER['wildcard']);

    $dispatch->handle('wildcards7896event');

    $this->assertSame($_SERVER['wildcard'], 'wildcard');
    unset($_SERVER['wildcard']);

    $dispatch->handle('wildcards_foobar_event');

    $this->assertSame($_SERVER['wildcard'], 'wildcard');
    unset($_SERVER['wildcard']);
}
```
    
## delete 删除事件所有监听器

**fixture 定义**

**Tests\Event\ForRemoveListener**

``` php
namespace Tests\Event;

class ForRemoveListener extends Listener
{
    public function handle($event)
    {
        $_SERVER['remove'] = 'remove';
    }
}
```


``` php
public function testDeleteListeners(): void
{
    $dispatch = new Dispatch(new Container());
    $dispatch->register('testevent', ForRemoveListener::class);
    $dispatch->handle('testevent');

    $this->assertSame($_SERVER['remove'], 'remove');
    unset($_SERVER['remove']);

    $dispatch->delete('testevent');
    $dispatch->handle('testevent');

    $this->assertFalse(isset($_SERVER['remove']));
}
```
    
## delete 删除通配符事件所有监听器

``` php
public function testDeleteWildcardListeners(): void
{
    $dispatch = new Dispatch(new Container());
    $dispatch->register('wildcards*event', WildcardsListener::class);
    $dispatch->handle('wildcards123456event');

    $this->assertSame($_SERVER['wildcard'], 'wildcard');
    unset($_SERVER['wildcard']);

    $dispatch->delete('wildcards*event');
    $dispatch->handle('wildcards7896event');

    $this->assertFalse(isset($_SERVER['wildcard']));
}
```
    
## has 判断事件监听器是否存在

``` php
public function testHas(): void
{
    $dispatch = new Dispatch(new Container());

    $this->assertSame([], $dispatch->get('testevent'));
    $this->assertFalse($dispatch->has('testevent'));

    $dispatch->register('testevent', Listener1::class);

    $this->assertSame([500 => [Listener1::class]], $dispatch->get('testevent'));
    $this->assertTrue($dispatch->has('testevent'));
}
```
    
## 独立类监听器必须包含 handle 方法

**fixture 定义**

**Tests\Event\ListenerWithoutRunOrHandleMethod**

``` php
namespace Tests\Event;

class ListenerWithoutRunOrHandleMethod extends Listener
{
    public function notFound($event)
    {
    }
}
```


``` php
public function testListenerWithoutRunOrHandleMethod(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Observer Tests\\Event\\ListenerWithoutRunOrHandleMethod must has handle method.'
    );

    $dispatch = new Dispatch(new Container());
    $dispatch->register('testevent', ListenerWithoutRunOrHandleMethod::class);
    $dispatch->handle('testevent');
}
```
    
## 独立类监听器自动转换为 \Leevel\Event\Observer

一般来说监听器需要继承至 `\Leevel\Event\Observer`，本质上事件使用的是观察者设计模式，而监听器是观察者角色。

如果是未继承的独立类，系统会自动转换成 `\Leevel\Event\Observer` 而成为一个观察者角色。

**fixture 定义**

**Tests\Event\ListenerNotExtends**

``` php
namespace Tests\Event;

class ListenerNotExtends
{
    public function handle()
    {
        $_SERVER['autochange'] = 'autochange';
    }
}
```


``` php
public function testListenerNotInstanceofSplObserverWillAutoChange(): void
{
    $dispatch = new Dispatch(new Container());
    $dispatch->register('testevent', ListenerNotExtends::class);
    $dispatch->handle('testevent');

    $this->assertSame($_SERVER['autochange'], 'autochange');
    unset($_SERVER['autochange']);
}
```
    
## 独立类监听器必须包含 handle 方法

**fixture 定义**

**Tests\Event\ListenerNotExtendsWithoutHandle**

``` php
namespace Tests\Event;

class ListenerNotExtendsWithoutHandle
{
}
```


``` php
public function testListenerNotInstanceofSplObserverWithoutHandle(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Observer `Tests\\Event\\ListenerNotExtendsWithoutHandle` is invalid.'
    );

    $dispatch = new Dispatch(new Container());
    $dispatch->register('testevent', ListenerNotExtendsWithoutHandle::class);
    $dispatch->handle('testevent');
}
```
    
## 监听器支持闭包

一般来说监听器需要继承至 `\Leevel\Event\Observer`，本质上事件使用的是观察者设计模式，而监听器是观察者角色。

如果是闭包，系统会自动转换成 `\Leevel\Event\Observer` 而成为一个观察者角色。


``` php
public function testListenerIsClosure(): void
{
    $dispatch = new Dispatch(new Container());
    $dispatch->register('testevent', function () {
        $_SERVER['isclosure'] = 'isclosure';
    });
    $dispatch->handle('testevent');

    $this->assertSame($_SERVER['isclosure'], 'isclosure');
    unset($_SERVER['isclosure']);
}
```