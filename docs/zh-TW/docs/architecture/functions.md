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
use Leevel\Kernel\App;
```

## Leevel 应用静态代理别名类调用应用

``` php
public function testLeevel(): void
{
    $this->createContainer();
    $this->assertSame('/runtime', Leevel::runtimePath());
}
```
    
## App 应用静态代理别名类调用应用

``` php
public function testApp(): void
{
    $this->createContainer();
    $this->assertSame('/runtime', Apps::runtimePath());
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