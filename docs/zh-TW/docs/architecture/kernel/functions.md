# 内核助手函数

::: tip Testing Is Documentation
[tests/Kernel/FunctionsTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Kernel/FunctionsTest.php)
:::
    
QueryPHP 在内核助手函数中为代理应用 `\Leevel\Kernel\Proxy\App` 提供了两个别名类 `\App` 和 `\Leevel`，提供简洁的静态访问入口。

例外还提供了一个语言包函数 `__`，为应用提供国际化支持。


**Uses**

``` php
<?php

use App as Apps;
use Leevel;
use Leevel\Di\Container;
use Leevel\I18n\II18n;
use Leevel\Kernel\App;
```

## Leevel 应用静态代理别名类调用应用

``` php
public function testLeevel(): void
{
    $this->createContainer();
    $this->assertSame('/storage', Leevel::storagePath());
}
```
    
## App 应用静态代理别名类调用应用

``` php
public function testApp(): void
{
    $this->createContainer();
    $this->assertSame('/storage', Apps::storagePath());
}
```
    
## Leevel 应用静态代理别名类调用 IOC 容器

``` php
public function testLeevelWithContainerMethod(): void
{
    $this->createContainer();
    $this->assertSame('foo', Leevel::make('foo'));
}
```
    
## App 应用静态代理别名类调用 IOC 容器

``` php
public function testAppWithContainerMethod(): void
{
    $this->createContainer();
    $this->assertSame('foo', Apps::make('foo'));
}
```
    
## 全局语言函数 __()

``` php
public function testFunctionLang(): void
{
    $container = $this->createContainer();
    $this->assertSame('foo', Apps::make('foo'));

    $i18n = $this->createMock(II18n::class);
    $map = [
        ['hello', 'hello'],
        ['hello %s', 'foo', 'hello foo'],
        ['hello %d', 5, 'hello 5'],
    ];
    $i18n->method('gettext')->willReturnMap($map);
    $this->assertSame('hello', $i18n->gettext('hello'));
    $this->assertSame('hello foo', $i18n->gettext('hello %s', 'foo'));
    $this->assertSame('hello 5', $i18n->gettext('hello %d', 5));

    $container = $this->createContainer();
    $container->singleton('i18n', function () use ($i18n) {
        return $i18n;
    });

    $this->assertSame('hello', __('hello'));
    $this->assertSame('hello foo', __('hello %s', 'foo'));
    $this->assertSame('hello 5', __('hello %d', 5));
}
```