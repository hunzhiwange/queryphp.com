# 初始化载入配置

::: tip Testing Is Documentation
[tests/Kernel/Bootstrap/LoadOptionTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Kernel/Bootstrap/LoadOptionTest.php)
:::
    
QueryPHP 在内核执行过程中会执行初始化，分为 4 个步骤，载入配置、载入语言包、注册异常运行时和遍历服务提供者注册服务。

内核初始化，包括 `\Leevel\Kernel\IKernel::bootstrap` 和 `\Leevel\Kernel\IKernelConsole::bootstrap` 均会执行上述 4 个步骤。


**Uses**

``` php
<?php

use Leevel\Di\Container;
use Leevel\Di\IContainer;
use Leevel\Filesystem\Helper;
use Leevel\Kernel\App as Apps;
use Leevel\Kernel\Bootstrap\LoadOption;
use Leevel\Kernel\IApp;
use Leevel\Option\Option;
```

## 基本使用方法

**fixture 定义**

**环境变量 tests/Kernel/Bootstrap/app/.env**

``` php
# Environment production、testing and development
ENVIRONMENT = development

# Debug
DEBUG = true

# Encryption key
AUTH_KEY = 7becb888f518b20224a988906df51e05
```

**配置文件 tests/Kernel/Bootstrap/app/option/app.php**

``` php
<?php

declare(strict_types=1);

return [
    'environment' => getenv('ENVIRONMENT'),
    'debug'       => false,
];

```

**配置文件 tests/Kernel/Bootstrap/app/option/demo.php**

``` php
<?php

declare(strict_types=1);

return [
    'foo' => 'bar',
];

```


``` php
public function testBaseUse(): void
{
    $bootstrap = new LoadOption1();

    $container = Container::singletons();
    $app = new App3($container, $appPath = __DIR__.'/app');

    $this->assertInstanceof(IContainer::class, $container);
    $this->assertInstanceof(Container::class, $container);
    $this->assertInstanceof(IApp::class, $app);
    $this->assertInstanceof(Apps::class, $app);

    $this->assertSame($appPath.'/storage/bootstrap/option.php', $app->optionCachedPath());
    $this->assertFalse($app->isCachedOption());
    $this->assertSame($appPath.'/option', $app->optionPath());

    $this->assertNull($bootstrap->handle($app));

    $option = $container->make('option');

    $this->assertSame('development', $option->get('environment'));
    $this->assertSame('bar', $option->get('demo\\foo'));
}
```
    
## RUNTIME_ENVIRONMENT 载入自定义环境变量文件

设置 `RUNTIME_ENVIRONMENT` 环境变量可以载入自定义环境变量文件。

**fixture 定义**

**环境变量 tests/Kernel/Bootstrap/app/.fooenv**

``` php
# Environment production、testing and development
ENVIRONMENT = testing

# Debug
DEBUG = true

# Encryption key
AUTH_KEY = 7becb888f518b20224a988906df51e05

```


``` php
public function testWithRuntimeEnv(): void
{
    putenv('RUNTIME_ENVIRONMENT=fooenv');

    $bootstrap = new LoadOption1();

    $container = Container::singletons();
    $app = new App3($container, $appPath = __DIR__.'/app');

    $this->assertInstanceof(IContainer::class, $container);
    $this->assertInstanceof(Container::class, $container);
    $this->assertInstanceof(IApp::class, $app);
    $this->assertInstanceof(Apps::class, $app);

    $this->assertSame($appPath.'/storage/bootstrap/fooenv.php', $app->optionCachedPath());
    $this->assertFalse($app->isCachedOption());
    $this->assertSame($appPath.'/option', $app->optionPath());

    $this->assertNull($bootstrap->handle($app));

    $option = $container->make('option');

    $this->assertSame('testing', $option->get('environment'));
    $this->assertSame('bar', $option->get('demo\\foo'));
}
```
    
## 配置支持缓存

配置文件支持缓存，通过缓存可以降低开销提高性能，适合生产环境。

**fixture 定义**

**配置缓存文件 tests/Kernel/Bootstrap/app/assert/option.php**

``` php
<?php

declare(strict_types=1);

return [
    'app' => [
        'environment' => 'development',
        'debug'       => false,
        ':env'        => [
            'environment'  => 'development',
            'debug'        => true,
            'app_auth_key' => '7becb888f518b20224a988906df51e05',
            'foo'          => null,
        ],
        ':deferred_providers' => [
            0 => [
            ],
            1 => [
            ],
        ],
        ':composer' => [
            'providers' => [
            ],
            'ignores' => [
            ],
            'commands' => [
            ],
            'options' => [
            ],
            'i18ns' => [
            ],
            'metas' => [
            ],
        ],
    ],
    'demo' => [
        'foo' => 'bar',
    ],
];

```


``` php
public function testLoadCached(): void
{
    $bootstrap = new LoadOption1();

    $container = Container::singletons();
    $app = new App3($container, $appPath = __DIR__.'/app');

    $this->assertInstanceof(IContainer::class, $container);
    $this->assertInstanceof(Container::class, $container);
    $this->assertInstanceof(IApp::class, $app);
    $this->assertInstanceof(Apps::class, $app);

    $this->assertSame($appPath.'/storage/bootstrap/option.php', $app->optionCachedPath());
    $this->assertFalse($app->isCachedOption());
    $this->assertSame($appPath.'/option', $app->optionPath());

    mkdir($appPath.'/storage/bootstrap', 0777, true);
    file_put_contents($appPath.'/storage/bootstrap/option.php', file_get_contents($appPath.'/assert/option.php'));

    $this->assertTrue($app->isCachedOption());

    $this->assertNull($bootstrap->handle($app));

    $option = $container->make('option');

    $this->assertSame('development', $option->get('environment'));
    $this->assertSame('bar', $option->get('demo\\foo'));
    $this->assertNull($option->get(':env.foo'));
    $this->assertTrue($option->get(':env.debug'));
}
```