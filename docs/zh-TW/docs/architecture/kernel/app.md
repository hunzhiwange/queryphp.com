# 应用

::: tip Testing Is Documentation
[tests/Kernel/AppTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Kernel/AppTest.php)
:::
    
应用是整个系统非常核心的一部分，定义了应用的骨架。

**Uses**

``` php
<?php

use Leevel\Di\Container;
use Leevel\Di\IContainer;
use Leevel\Di\Provider;
use Leevel\Filesystem\Helper;
use Leevel\Http\Request;
use Leevel\Kernel\App as Apps;
use Leevel\Kernel\IApp;
use Leevel\Option\IOption;
```

## 基本使用

``` php
public function testBaseUse(): void
{
    $appPath = __DIR__.'/app';
    $app = $this->createApp();
    $container = $app->container();

    $this->assertInstanceof(IContainer::class, $container);
    $this->assertInstanceof(Container::class, $container);
    $this->assertInstanceof(IApp::class, $app);
    $this->assertInstanceof(Apps::class, $app);

    $this->assertSame($appPath, $app->path());
    $this->assertSame($appPath.'/foobar', $app->path('foobar'));
}
```
    
## version 获取程序版本

``` php
public function testVersion(): void
{
    $app = $this->createApp();

    $this->assertSame(App::VERSION, $app->version());
}
```
    
## isConsole 是否为 PHP 运行模式命令行

``` php
public function testIsConsole(): void
{
    $app = $this->createApp();

    $this->assertTrue($app->isConsole());
}
```
    
## setPath 设置基础路径

``` php
public function testSetPath(): void
{
    $app = $this->createApp();

    $app->setPath(__DIR__.'/foo');

    $this->assertSame(__DIR__.'/foo', $app->path());
}
```
    
## appPath 获取应用路径

``` php
public function testAppPath(): void
{
    $appPath = __DIR__.'/app';
    $app = $this->createApp();
    $container = $app->container();

    $request = $this->createMock(Request::class);
    $container->singleton('request', function () use ($request) {
        return $request;
    });

    $container->instance('app_name', 'Blog');
    $this->assertEquals('Blog', $container->make('app_name'));

    $this->assertSame($appPath.'/application', $app->appPath());
    $this->assertSame($appPath.'/application', $app->appPath(false));
    $this->assertSame($appPath.'/application', $app->appPath(''));
    $this->assertSame($appPath.'/application/blog', $app->appPath(true));
    $this->assertSame($appPath.'/application/foo', $app->appPath('foo'));
    $this->assertSame($appPath.'/application/bar', $app->appPath('bar'));
    $this->assertSame($appPath.'/application/foo/bar', $app->appPath(false, 'foo/bar'));
    $this->assertSame($appPath.'/application/foo/bar', $app->appPath('', 'foo/bar'));
    $this->assertSame($appPath.'/application/blog/foo/bar', $app->appPath(true, 'foo/bar'));
    $this->assertSame($appPath.'/application/foo/foo/bar', $app->appPath('foo', 'foo/bar'));
    $this->assertSame($appPath.'/application/bar/foo/bar', $app->appPath('bar', 'foo/bar'));
}
```
    
## setAppPath 设置应用路径

``` php
public function testSetAppPath(): void
{
    $appPath = __DIR__.'/app';
    $app = $this->createApp();
    $container = $app->container();

    $request = $this->createMock(Request::class);
    $container->singleton('request', function () use ($request) {
        return $request;
    });

    $container->instance('app_name', 'Blog');
    $this->assertEquals('Blog', $container->make('app_name'));
    $this->assertSame($appPath.'/application/blog', $app->appPath(true));

    $app->setAppPath(__DIR__.'/app/foo');
    $this->assertSame($appPath.'/foo/blog', $app->appPath(true));
}
```
    
## themePath 获取应用主题目录

``` php
public function testPathTheme(): void
{
    $app = $this->createApp();
    $appPath = __DIR__.'/app';

    $this->assertSame($appPath.'/application/ui/theme', $app->themePath());
    $this->assertSame($appPath.'/application/blog/ui/theme', $app->themePath('blog'));
}
```
    
## commonPath 获取公共路径

``` php
public function testCommonPath(): void
{
    $app = $this->createApp();
    $appPath = __DIR__.'/app';

    $this->assertSame($appPath.'/common', $app->commonPath());
    $this->assertSame($appPath.'/common/foobar', $app->commonPath('foobar'));
}
```
    
## setCommonPath 设置公共路径

``` php
public function testSetCommonPath(): void
{
    $app = $this->createApp();
    $appPath = __DIR__.'/app';

    $this->assertSame($appPath.'/common', $app->commonPath());
    $this->assertSame($appPath.'/common/foobar', $app->commonPath('foobar'));

    $app->setCommonPath(__DIR__.'/app/commonFoo');

    $this->assertSame($appPath.'/commonFoo', $app->commonPath());
    $this->assertSame($appPath.'/commonFoo/foobar', $app->commonPath('foobar'));
}
```
    
## runtimePath 获取运行路径

``` php
public function testRuntimePath(): void
{
    $app = $this->createApp();
    $appPath = __DIR__.'/app';

    $this->assertSame($appPath.'/runtime', $app->runtimePath());
    $this->assertSame($appPath.'/runtime/foobar', $app->runtimePath('foobar'));
}
```
    
## setRuntimePath 设置运行时路径

``` php
public function testSetRuntimePath(): void
{
    $app = $this->createApp();
    $appPath = __DIR__.'/app';

    $this->assertSame($appPath.'/runtime', $app->runtimePath());
    $this->assertSame($appPath.'/runtime/foobar', $app->runtimePath('foobar'));

    $app->setRuntimePath(__DIR__.'/app/runtimeFoo');

    $this->assertSame($appPath.'/runtimeFoo', $app->runtimePath());
    $this->assertSame($appPath.'/runtimeFoo/foobar', $app->runtimePath('foobar'));
}
```
    
## version 获取附件存储路径

``` php
public function testStoragePath(): void
{
    $app = $this->createApp();
    $appPath = __DIR__.'/app';

    $this->assertSame($appPath.'/storage', $app->storagePath());
    $this->assertSame($appPath.'/storage/foobar', $app->storagePath('foobar'));
}
```
    
## setStoragePath 设置附件存储路径

``` php
public function testSetStoragePath(): void
{
    $app = $this->createApp();
    $appPath = __DIR__.'/app';

    $this->assertSame($appPath.'/storage', $app->storagePath());
    $this->assertSame($appPath.'/storage/foobar', $app->storagePath('foobar'));

    $app->setStoragePath(__DIR__.'/app/storageFoo');

    $this->assertSame($appPath.'/storageFoo', $app->storagePath());
    $this->assertSame($appPath.'/storageFoo/foobar', $app->storagePath('foobar'));
}
```
    
## optionPath 获取配置路径

``` php
public function testOptionPath(): void
{
    $app = $this->createApp();
    $appPath = __DIR__.'/app';

    $this->assertSame($appPath.'/option', $app->optionPath());
    $this->assertSame($appPath.'/option/foobar', $app->optionPath('foobar'));
}
```
    
## setOptionPath 设置配置路径

``` php
public function testSetOptionPath(): void
{
    $app = $this->createApp();
    $appPath = __DIR__.'/app';

    $this->assertSame($appPath.'/option', $app->optionPath());
    $this->assertSame($appPath.'/option/foobar', $app->optionPath('foobar'));

    $app->setOptionPath(__DIR__.'/app/optionFoo');

    $this->assertSame($appPath.'/optionFoo', $app->optionPath());
    $this->assertSame($appPath.'/optionFoo/foobar', $app->optionPath('foobar'));
}
```
    
## i18nPath 获取语言包路径

``` php
public function testI18nPath(): void
{
    $app = $this->createApp();
    $appPath = __DIR__.'/app';

    $this->assertSame($appPath.'/i18n', $app->i18nPath());
    $this->assertSame($appPath.'/i18n/foobar', $app->i18nPath('foobar'));
}
```
    
## setI18nPath 设置语言包路径

``` php
public function testSetI18nPath(): void
{
    $app = $this->createApp();
    $appPath = __DIR__.'/app';

    $this->assertSame($appPath.'/i18n', $app->i18nPath());
    $this->assertSame($appPath.'/i18n/foobar', $app->i18nPath('foobar'));

    $app->setI18nPath(__DIR__.'/app/i18nFoo');

    $this->assertSame($appPath.'/i18nFoo', $app->i18nPath());
    $this->assertSame($appPath.'/i18nFoo/foobar', $app->i18nPath('foobar'));
}
```
    
## envPath 获取环境变量路径

``` php
public function testEnvPath(): void
{
    $app = $this->createApp();
    $appPath = __DIR__.'/app';

    $this->assertSame($appPath, $app->envPath());
}
```
    
## setEnvPath 设置环境变量路径

``` php
public function testSetEnvPath(): void
{
    $app = $this->createApp();
    $appPath = __DIR__.'/app';

    $this->assertSame($appPath, $app->envPath());

    $app->setEnvPath(__DIR__.'/appFoo');

    $this->assertSame(__DIR__.'/appFoo', $app->envPath());
}
```
    
## envFile 获取环境变量文件

``` php
public function testEnvFile(): void
{
    $app = $this->createApp();

    $this->assertSame('.env', $app->envFile());
}
```
    
## setEnvFile 设置环境变量文件

``` php
public function testSetEnvFile(): void
{
    $app = $this->createApp();

    $this->assertSame('.env', $app->envFile());

    $app->setEnvFile('.envfoo');

    $this->assertSame('.envfoo', $app->envFile());
}
```
    
## fullEnvPath 获取环境变量完整路径

``` php
public function testFullEnvPath(): void
{
    $app = $this->createApp();
    $appPath = __DIR__.'/app';

    $this->assertSame($appPath.'/.env', $app->fullEnvPath());

    $app->setEnvPath(__DIR__.'/appFoo');

    $this->assertSame(__DIR__.'/appFoo/.env', $app->fullEnvPath());

    $app->setEnvFile('.envfoo');

    $this->assertSame(__DIR__.'/appFoo/.envfoo', $app->fullEnvPath());
}
```
    
## i18nCachedPath 获取语言包缓存路径

``` php
public function testSetI18nCachePath(): void
{
    $app = $this->createApp();
    $this->assertSame(__DIR__.'/app/bootstrap/i18n/zh-CN.php', $app->i18nCachedPath('zh-CN'));
    $app->setI18nCachedPath(__DIR__.'/hello');
    $this->assertSame(__DIR__.'/hello/zh-CN.php', $app->i18nCachedPath('zh-CN'));
}
```
    
## i18nCachedPath 获取语言包缓存路径

``` php
public function testI18nCachedPath(): void
{
    $app = $this->createApp();
    $appPath = __DIR__.'/app';

    $this->assertSame($appPath.'/bootstrap/i18n/zh-CN.php', $app->i18nCachedPath('zh-CN'));
    $this->assertSame($appPath.'/bootstrap/i18n/zh-TW.php', $app->i18nCachedPath('zh-TW'));
    $this->assertSame($appPath.'/bootstrap/i18n/en-US.php', $app->i18nCachedPath('en-US'));
}
```
    
## isCachedI18n 是否存在语言包缓存

``` php
public function testIsCachedI18n(): void
{
    $app = $this->createApp();
    $appPath = __DIR__.'/app';

    $this->assertFalse($app->isCachedI18n('zh-CN'));

    mkdir($appPath.'/bootstrap/i18n', 0777, true);

    file_put_contents($appPath.'/bootstrap/i18n/zh-CN.php', 'foo');

    $this->assertTrue($app->isCachedI18n('zh-CN'));

    Helper::deleteDirectory($appPath, true);
}
```
    
## setOptionCachedPath 设置配置缓存路径

``` php
public function testSetOptionCachePath(): void
{
    $app = $this->createApp();
    $this->assertSame(__DIR__.'/app/bootstrap/option.php', $app->optionCachedPath());
    $app->setOptionCachedPath(__DIR__.'/hello');
    $this->assertSame(__DIR__.'/hello/option.php', $app->optionCachedPath());
}
```
    
## optionCachedPath 获取配置缓存路径

``` php
public function testOptionCachedPath(): void
{
    $app = $this->createApp();
    $appPath = __DIR__.'/app';

    $this->assertSame($appPath.'/bootstrap/option.php', $app->optionCachedPath());
}
```
    
## isCachedOption 是否存在配置缓存

``` php
public function testIsCachedOption(): void
{
    $appPath = __DIR__.'/app';
    $app = $this->createApp();

    $this->assertFalse($app->isCachedOption());

    mkdir($appPath.'/bootstrap', 0777, true);

    file_put_contents($optionPath = $appPath.'/bootstrap/option.php', 'foo');

    $this->assertTrue($app->isCachedOption());

    Helper::deleteDirectory($appPath, true);
}
```
    
## routerCachedPath 获取路由缓存路径

``` php
public function testRouterCachedPath(): void
{
    $appPath = __DIR__.'/app';
    $app = $this->createApp();

    $this->assertSame($appPath.'/bootstrap/router.php', $app->routerCachedPath());
}
```
    
## isCachedRouter 是否存在路由缓存

``` php
public function testIsCachedRouter(): void
{
    $appPath = __DIR__.'/app';
    $app = $this->createApp();

    $this->assertFalse($app->isCachedRouter());

    mkdir($appPath.'/bootstrap', 0777, true);

    file_put_contents($routerPath = $appPath.'/bootstrap/router.php', 'foo');

    $this->assertTrue($app->isCachedRouter());

    Helper::deleteDirectory($appPath, true);
}
```
    
## isDebug 是否开启调试

``` php
public function testIsDebug(): void
{
    $appPath = __DIR__.'/app';
    $app = $this->createApp();
    $container = $app->container();

    $option = $this->createMock(IOption::class);

    $option
        ->method('get')
        ->willReturnCallback(function (string $k) {
            $map = [
                'debug'       => true,
                'environment' => 'development',
            ];

            return $map[$k];
        });

    $this->assertSame('development', $option->get('environment'));
    $this->assertTrue($option->get('debug'));

    $container->singleton('option', function () use ($option) {
        return $option;
    });

    $this->assertTrue($app->isDebug());
}
```
    
## isDevelopment 是否为开发环境

``` php
public function testIsDevelopment(): void
{
    $appPath = __DIR__.'/app';
    $app = $this->createApp();
    $container = $app->container();

    $option = $this->createMock(Request::class);

    $option->method('get')->willReturn('development');
    $this->assertEquals('development', $option->get('development'));

    $container->singleton('option', function () use ($option) {
        return $option;
    });

    $this->assertTrue($app->isDevelopment());
}
```
    
## environment 获取运行环境

``` php
public function testEnvironment(): void
{
    $appPath = __DIR__.'/app';
    $app = $this->createApp();
    $container = $app->container();

    $option = $this->createMock(Request::class);

    $option->method('get')->willReturn('foo');
    $this->assertEquals('foo', $option->get('development'));

    $container->singleton('option', function () use ($option) {
        return $option;
    });

    $this->assertSame('foo', $app->environment());
}
```
    
## bootstrap 初始化应用

**fixture 定义**

**Tests\Kernel\BootstrapTest1**

``` php
namespace Tests\Kernel;

class BootstrapTest1
{
    public function handle()
    {
        $_SERVER['bootstrapTest1'] = 1;
    }
}
```

**Tests\Kernel\BootstrapTest2**

``` php
namespace Tests\Kernel;

class BootstrapTest2
{
    public function handle()
    {
        $_SERVER['bootstrapTest2'] = 1;
    }
}
```

**Tests\Console\Load1\Test1**

``` php
namespace Tests\Console\Load1;

use Leevel\Console\Command;

class Test1 extends Command
{
    protected string $name = 'load1:test1';

    protected string $description = 'load1 test1 for command';

    public function handle()
    {
        $this->info('load1 test1');
    }
}
```


``` php
public function testBootstrap(): void
{
    $app = $this->createApp();

    $app->bootstrap([BootstrapTest1::class, BootstrapTest2::class]);

    $this->assertSame(1, $_SERVER['bootstrapTest1']);
    $this->assertSame(1, $_SERVER['bootstrapTest2']);

    unset($_SERVER['bootstrapTest1'], $_SERVER['bootstrapTest2']);
}
```
    
## registerAppProviders 注册应用服务提供者

**fixture 定义**

**Tests\Kernel\OptionTest**

``` php
namespace Tests\Kernel;

class OptionTest
{
    public function get(string $name)
    {
        if ('_deferred_providers' === $name) {
            return [
                [
                    'foo' => 'Tests\\Kernel\\ProviderDeferTest1',
                ],
                [
                    'Tests\\Kernel\\ProviderDeferTest1' => [
                        'foo' => [
                            'Tests\\Kernel\\ProviderDeferTest1',
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

**Tests\Kernel\ProviderTest3**

``` php
namespace Tests\Kernel;

class ProviderTest3 extends Provider
{
    public function __construct(IContainer $container)
    {
    }

    public function bootstrap()
    {
        $_SERVER['testRegisterProvidersBootstrap'] = 1;
    }

    public function register(): void
    {
        $_SERVER['testRegisterProvidersRegister'] = 1;
    }
}
```

**Tests\Kernel\ProviderDeferTest1**

``` php
namespace Tests\Kernel;

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
                'Tests\\Kernel\\ProviderDeferTest1',
            ],
        ];
    }

    public static function isDeferred(): bool
    {
        return true;
    }
}
```


``` php
public function testRegisterProviders(): void
{
    $app = $this->createApp();
    $container = $app->container();

    $option = new OptionTest();
    $container->singleton('option', function () use ($option) {
        return $option;
    });

    $app->registerAppProviders();

    // for deferredAlias
    $this->assertArrayNotHasKey('providerDeferTest1', $_SERVER);
    $this->assertSame('bar', $container->make('foo'));
    $this->assertSame('bar', $container->make(ProviderDeferTest1::class));
    $this->assertSame(1, $_SERVER['providerDeferTest1']);

    // for providers
    $this->assertSame(1, $_SERVER['testRegisterProvidersRegister']);
    $this->assertArrayHasKey('testRegisterProvidersBootstrap', $_SERVER);

    unset(
        $_SERVER['providerDeferTest1'],
        $_SERVER['testRegisterProvidersRegister']
    );

    // bootstrap
    $this->assertTrue($container->isBootstrap());
    $this->assertSame(1, $_SERVER['testRegisterProvidersBootstrap']);
    unset($_SERVER['testRegisterProvidersBootstrap']);
    $this->assertTrue($container->isBootstrap());

    // again but already bootstrap
    $app->registerAppProviders();
    $this->assertArrayNotHasKey('testRegisterProvidersBootstrap', $_SERVER);
    $this->assertArrayNotHasKey('testRegisterProvidersRegister', $_SERVER);
}
```
    
## setPublicPath 设置资源路径

``` php
public function testSetPublicPath(): void
{
    $app = $this->createApp();
    $this->assertSame(__DIR__.'/app/public', $app->publicPath());
    $app->setPublicPath(__DIR__.'/hello');
    $this->assertSame(__DIR__.'/hello', $app->publicPath());
}
```
    
## setThemesPath 设置主题路径

``` php
public function testSetThemesPath(): void
{
    $app = $this->createApp();
    $this->assertSame(__DIR__.'/app/themes', $app->themesPath());
    $app->setThemesPath(__DIR__.'/hello');
    $this->assertSame(__DIR__.'/hello', $app->themesPath());
}
```
    
## env 获取应用的环境变量

测试数据

``` php
public function envProvider(): array
{
    return [
        ['bar', 'true', true],
        ['bar', '(true)', true],
        ['bar', 'false', false],
        ['bar', '(false)', false],
        ['bar', 'empty', ''],
        ['bar', '(empty)', ''],
        ['bar', 'null', null],
        ['bar', '(null)', null],
        ['bar', '"hello"', 'hello'],
        ['bar', "'hello'", "'hello'"],
        ['bar', true, '1'],
        ['bar', false, ''],
        ['bar', 1, '1'],
        ['bar', '', ''],
    ];
}
```


``` php
public function testEnv(string $name, $value, $envValue): void
{
    $app = $this->createApp();
    $name = 'test_env_'.$name;
    putenv($name.'='.$value);
    $this->assertSame($envValue, $app->env($name));
}
```