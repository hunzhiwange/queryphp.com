# 服务提供者

::: tip Testing Is Documentation
[tests/Di/ProviderTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Di/ProviderTest.php)
:::
    
IOC 容器是整个框架最核心的部分，负责服务的管理和解耦。

服务提供者将服务注入到 IOC 容器中，通常来说服务会依赖一些配置和调用其它服务等完成组装，还有有一定复杂度。

我们可以为服务定义一组配套的服务提供者，可以免去配置服务的成本，开发起来很愉悦。


**Uses**

``` php
<?php

use Leevel\Di\Container;
use Leevel\Di\IContainer;
use Leevel\Di\Provider;
```

## 基本使用方法

服务提供者通过 `register` 完成服务注册。

**fixture 定义**

**Tests\Di\PrividerTest**

``` php
namespace Tests\Di;

class PrividerTest extends Provider
{
    public function register(): void
    {
        $this->container->singleton('foo', function ($container) {
            return new PrividerService1($container);
        });
    }

    public function bootstrap(): void
    {
        $_SERVER['test.privider'] = 'bootstrap';
    }

    public static function providers(): array
    {
        return [
            'foo' => [
                'bar',
                'hello',
            ],
        ];
    }
}
```

**Tests\Di\PrividerService1**

``` php
namespace Tests\Di;

class PrividerService1
{
    public function __construct(IContainer $container)
    {
    }

    public function hello()
    {
        return 'world';
    }
}
```


``` php
public function testBaseUse(): void
{
    $test = new PrividerTest($container = new Container());

    $this->assertInstanceof(IContainer::class, $test->container());
    $this->assertInstanceof(Container::class, $test->container());

    $test->register();

    $this->assertSame('world', $container->make('foo')->hello());
    $this->assertSame('world', $container->make('bar')->hello());
    $this->assertSame('world', $container->make('hello')->hello());

    $this->assertFalse($test->isDeferred());
}
```
    
## 延迟服务提供者

**fixture 定义**

**Tests\Di\PrividerTest2**

``` php
namespace Tests\Di;

class PrividerTest2 extends Provider
{
    public function register(): void
    {
        $this->container->singleton('world', function ($container) {
            return new PrividerService2();
        });
    }

    public static function providers(): array
    {
        return [
            'world' => 'hello',
        ];
    }

    public static function isDeferred(): bool
    {
        return true;
    }
}
```

**Tests\Di\PrividerService2**

``` php
namespace Tests\Di;

class PrividerService2
{
    public function foo()
    {
        return 'bar';
    }
}
```


``` php
public function testDeferred(): void
{
    $test = new PrividerTest2($container = new Container());

    $this->assertInstanceof(IContainer::class, $test->container());
    $this->assertInstanceof(Container::class, $test->container());

    $test->register();

    $this->assertSame('bar', $container->make('world')->foo());
    $this->assertSame('hello', $container->make('hello'));

    $container->alias($test->providers());

    $this->assertSame('bar', $container->make('hello')->foo());
    $this->assertTrue($test->isDeferred());
}
```
    
## bootstrap 服务注册后的引导程序

``` php
public function testBootstrap(): void
{
    $test = new PrividerTest($container = new Container());

    $this->assertInstanceof(IContainer::class, $test->container());
    $this->assertInstanceof(Container::class, $test->container());

    if (isset($_SERVER['test.privider'])) {
        unset($_SERVER['test.privider']);
    }

    $test->bootstrap();
    $this->assertSame('bootstrap', $_SERVER['test.privider']);

    if (isset($_SERVER['test.privider'])) {
        unset($_SERVER['test.privider']);
    }
}
```