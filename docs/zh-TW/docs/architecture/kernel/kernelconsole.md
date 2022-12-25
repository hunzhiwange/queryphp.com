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

use App\Exceptions\Runtime;
use App\Kernel;
use App\KernelConsole;
use Leevel\Di\Container;
use Leevel\Di\IContainer;
use Leevel\Kernel\App;
use Leevel\Kernel\IApp;
use Leevel\Kernel\Exceptions\IRuntime;
use Leevel\Kernel\IKernel;
use Leevel\Kernel\IKernelConsole;

// 加载 Composer
require __DIR__.'/vendor/autoload.php';

// 创建应用
// 注册应用基础服务
$container = Container::singletons();
$container->singleton(IContainer::class, $container);
$container->singleton('app', new App($container, realpath(__DIR__)));
$container->alias('app', [IApp::class, App::class]);
$container->singleton(IKernel::class, Kernel::class);
$container->singleton(IKernelConsole::class, KernelConsole::class);
$container->singleton(IRuntime::class, Runtime::class);

// 执行应用
// 根据内核调度请求返回响应
$kernel = $container->make(IKernelConsole::class);
$status = $kernel->handle();
$kernel->terminate($status);
exit($status);

```

内核通过 \Leevel\Kernel\KernelConsole 的 handle 方法来实现请求。

**handle 原型**

``` php
# Leevel\Kernel\KernelConsole::handle
/**
 * {@inheritDoc}
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
    public function run(?InputInterface $input = null, ?OutputInterface $output = null): int
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
    protected array $bootstraps = [
        DemoBootstrapForKernelConsole::class,
    ];

    protected function getConsoleApplication(): Application
    {
        if ($this->consoleApplication) {
            return $this->consoleApplication;
        }

        return $this->consoleApplication = new Application1($this->app->container(), $this->app->version());
    }
}
```

**Tests\Kernel\Commands\Test**

``` php
namespace Tests\Kernel\Commands;

use Leevel\Console\Command;

class Test extends Command
{
    protected string $name = 'test';

    protected string $description = 'This is a test command';

    protected string $help = <<<'EOF'
        The <info>%command.name%</info> command to show how to make a command:
        
          <info>php %command.full_name%</info>
        EOF;

    public function handle(): int
    {
        $this->info('Hello my test command.');

        return 0;
    }
}
```

**Tests\Kernel\Commands\Console\Foo**

``` php
namespace Tests\Kernel\Commands\Console;

use Leevel\Console\Command;

class Foo extends Command
{
    protected string $name = 'console:foo';

    protected string $description = 'This is a foo command';

    protected string $help = <<<'EOF'
        The <info>%command.name%</info> command to show how to make a command:
        
          <info>php %command.full_name%</info>
        EOF;

    public function handle(): int
    {
        $this->info('Hello my foo command.');

        return 0;
    }
}
```

**Tests\Kernel\Commands\Console\Bar**

``` php
namespace Tests\Kernel\Commands\Console;

use Leevel\Console\Command;

class Bar extends Command
{
    protected string $name = 'console:bar';

    protected string $description = 'This is a foo command';

    protected string $help = <<<'EOF'
        The <info>%command.name%</info> command to show how to make a command:
        
          <info>php %command.full_name%</info>
        EOF;

    public function handle(): int
    {
        $this->info('Hello my foo command.');

        return 0;
    }
}
```

**Tests\Kernel\DemoBootstrapForKernelConsole**

``` php
namespace Tests\Kernel;

class DemoBootstrapForKernelConsole
{
    public function handle(IApp $app): void
    {
        $GLOBALS['DemoBootstrapForKernelConsole'] = true;
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
    $kernel->terminate(0);
    $this->assertTrue($GLOBALS['DemoBootstrapForKernelConsole']);
    unset($GLOBALS['DemoBootstrapForKernelConsole']);
}
```