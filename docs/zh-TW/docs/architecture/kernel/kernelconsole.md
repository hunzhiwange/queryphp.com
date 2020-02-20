# 命令行内核

::: tip Testing Is Documentation
[tests/Kernel/KernelConsoleTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Kernel/KernelConsoleTest.php)
:::
    
QueryPHP 命令行流程为入口接受输入，经过内核 kernel 传入输入，经过命令行应用程序调用命令执行业务，最后返回输出结果。

入口文件 `leevel`

``` php
#!/usr/bin/env php
<?php

declare(strict_types=1);

/*
 * This file is part of the forcodepoem package.
 *
 * The PHP Application Created By Code Poem. <Query Yet Simple>
 * (c) 2018-2099 http://forcodepoem.com All rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Common\App\ExceptionRuntime;
use Common\App\Kernel;
use Common\App\KernelConsole;
use Leevel\Di\Container;
use Leevel\Di\IContainer;
use Leevel\Kernel\App;
use Leevel\Kernel\IApp;
use Leevel\Kernel\IExceptionRuntime;
use Leevel\Kernel\IKernel;
use Leevel\Kernel\IKernelConsole;

/**
 * ---------------------------------------------------------------
 * Composer
 * ---------------------------------------------------------------.
 *
 * 用于管理 PHP 依赖包
 */
require __DIR__.'/vendor/autoload.php';

/**
 * ---------------------------------------------------------------
 * 创建应用
 * ---------------------------------------------------------------.
 *
 * 注册应用基础服务
 */
$container = Container::singletons();
$container->singleton(IContainer::class, $container);

$container->singleton('app', new App($container, realpath(__DIR__)));
$container->alias('app', [IApp::class, App::class]);

$container->singleton(IKernel::class, Kernel::class);
$container->singleton(IKernelConsole::class, KernelConsole::class);
$container->singleton(IExceptionRuntime::class, ExceptionRuntime::class);

/**
 * ---------------------------------------------------------------
 * 执行应用
 * ---------------------------------------------------------------.
 *
 * 根据内核调度请求返回响应
 */
$kernel = $container->make(IKernelConsole::class);
$status = $kernel->handle();
$kernel->terminate($status);

exit($status);

```

内核通过 \Leevel\Kernel\KernelConsole 的 handle 方法来实现请求。

**handle 原型**

``` php
/**
 * 响应命令行请求.
 */
public function handle(?InputInterface $input = null, ?OutputInterface $output = null): int;
```


**Uses**

``` php
<?php

use Leevel\Console\Application;
use Leevel\Di\Container;
use Leevel\Di\IContainer;
use Leevel\Kernel\App as Apps;
use Leevel\Kernel\IApp;
use Leevel\Kernel\IKernelConsole;
use Leevel\Kernel\KernelConsole;
use Leevel\Option\IOption;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
```

## 基本使用

**fixture 定义**

**Tests\Kernel\AppKernelConsole**

``` php
namespace Tests\Kernel;

class AppKernelConsole extends Apps
{
    public function namespacePath(string $specificClass, bool $throwException = true): string
    {
        return __DIR__.'/Commands/Console';
    }

    protected function registerBaseProvider(): void
    {
    }
}
```

**Tests\Kernel\Application1**

``` php
namespace Tests\Kernel;

class Application1 extends Application
{
    public function run(?InputInterface $input = null, ?OutputInterface $output = null)
    {
        return 0;
    }
}
```

**Tests\Kernel\KernelConsole1**

``` php
namespace Tests\Kernel;

class KernelConsole1 extends KernelConsole
{
    public function bootstrap(): void
    {
    }

    protected function getConsoleApplication(): Application
    {
        if ($this->consoleApplication) {
            return $this->consoleApplication;
        }

        return $this->consoleApplication = new Application1($this->app->container(), $this->app->version());
    }
}
```


``` php
public function testBaseUse(): void
{
    $app = new AppKernelConsole($container = new Container(), '');
    $container->instance('app', $app);

    $this->createOption($container);

    $kernel = new KernelConsole1($app);
    $this->assertInstanceof(IKernelConsole::class, $kernel);
    $this->assertInstanceof(IApp::class, $kernel->getApp());

    $this->assertSame(0, $kernel->handle());
}
```