# 初始化遍历服务提供者注册服务

::: tip Testing Is Documentation
[tests/Kernel/Bootstrap/TraverseProviderTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Kernel/Bootstrap/TraverseProviderTest.php)
:::
    
QueryPHP 在内核执行过程中会执行初始化，分为 4 个步骤，载入配置、载入语言包、注册异常运行时和遍历服务提供者注册服务。

内核初始化，包括 `\Leevel\Kernel\IKernel::bootstrap` 和 `\Leevel\Kernel\IKernelConsole::bootstrap` 均会执行上述 4 个步骤。


**Uses**

``` php
<?php

use Leevel\Di\Container;
use Leevel\Di\IContainer;
use Leevel\Di\Provider;
use Leevel\Kernel\App as Apps;
use Leevel\Kernel\Bootstrap\TraverseProvider;
use Leevel\Kernel\IApp;
```

## 基本使用方法

**fixture 定义**

**Tests\Kernel\Bootstrap\OptionTest**

``` php
namespace Tests\Kernel\Bootstrap;

class OptionTest
{
    public function get(string $name)
    {
        if ('_deferred_providers' === $name) {
            return [
                [
                    'foo' => ProviderDeferTest1::class,
                ],
                [
                    ProviderDeferTest1::class => [
                        'foo' => [
                            ProviderDeferTest1::class,
                        ],
                    ],
                ],
            ];
        }

        if ('_composer.providers' === $name) {
            return [ProviderTest3::class];
        }
    }
}
```

**Tests\Kernel\Bootstrap\ProviderDeferTest1**

``` php
namespace Tests\Kernel\Bootstrap;

class ProviderDeferTest1 extends Provider
{
    public function register(): void
    {
        $_SERVER['providerDeferTest1'] = 1;

        $this->container->singleton('foo', function (IContainer $container) {
            return 'bar';
        });
    }

    public static function providers(): array
    {
        return [
            'foo' => [
                self::class,
            ],
        ];
    }

    public static function isDeferred(): bool
    {
        return true;
    }
}
```

**Tests\Kernel\Bootstrap\ProviderTest3**

``` php
namespace Tests\Kernel\Bootstrap;

class ProviderTest3 extends Provider
{
    public function __construct(IContainer $container)
    {
    }

    public function bootstrap(): void
    {
        $_SERVER['testRegisterProvidersBootstrap'] = 1;
    }

    public function register(): void
    {
        $_SERVER['testRegisterProvidersRegister'] = 1;
    }
}
```


``` php
public function testBaseUse(): void
{
    $bootstrap = new TraverseProvider();

    $container = Container::singletons();
    $app = new App2($container, $appPath = __DIR__.'/app');

    $this->assertInstanceof(IContainer::class, $container);
    $this->assertInstanceof(Container::class, $container);
    $this->assertInstanceof(IApp::class, $app);
    $this->assertInstanceof(Apps::class, $app);

    $option = new OptionTest();

    $container->singleton('option', function () use ($option) {
        return $option;
    });

    $this->assertNull($bootstrap->handle($app));

    // for deferredAlias
    $this->assertArrayNotHasKey('providerDeferTest1', $_SERVER);
    $container->alias(ProviderDeferTest1::providers());
    $this->assertSame('bar', $container->make('foo'));
    $this->assertSame('bar', $container->make(ProviderDeferTest1::class));
    $this->assertSame(1, $_SERVER['providerDeferTest1']);

    // for providers
    $this->assertSame(1, $_SERVER['testRegisterProvidersRegister']);
    $this->assertSame(1, $_SERVER['testRegisterProvidersBootstrap']);
    $this->assertTrue($container->isBootstrap());

    unset(
        $_SERVER['providerDeferTest1'],
        $_SERVER['testRegisterProvidersRegister'],
        $_SERVER['testRegisterProvidersBootstrap']
    );
}
```