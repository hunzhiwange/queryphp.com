# 初始化注册异常运行时

::: tip Testing Is Documentation
[tests/Kernel/Bootstrap/RegisterExceptionRuntimeTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Kernel/Bootstrap/RegisterExceptionRuntimeTest.php)
:::
    
QueryPHP 在内核执行过程中会执行初始化，分为 4 个步骤，载入配置、载入语言包、注册异常运行时和遍历服务提供者注册服务。

内核初始化，包括 `\Leevel\Kernel\IKernel::bootstrap` 和 `\Leevel\Kernel\IKernelConsole::bootstrap` 均会执行上述 4 个步骤。


**Uses**

``` php
<?php

use Error;
use ErrorException;
use Exception;
use Leevel\Di\Container;
use Leevel\Di\IContainer;
use Leevel\Http\Request;
use Leevel\Http\Response;
use Leevel\Kernel\App as Apps;
use Leevel\Kernel\Bootstrap\RegisterExceptionRuntime;
use Leevel\Kernel\Exceptions\IRuntime;
use Leevel\Kernel\IApp;
use Leevel\Option\IOption;
use Symfony\Component\Console\Output\ConsoleOutput;
use Throwable;
```

## set_error_handler 设置错误处理函数

``` php
public function testSetErrorHandle(): void
{
    $this->expectException(\ErrorException::class);
    $this->expectExceptionMessage(
        'foo.'
    );

    $bootstrap = new RegisterExceptionRuntime();

    $container = Container::singletons();
    $app = new App4($container, $appPath = __DIR__.'/app');

    $this->assertInstanceof(IContainer::class, $container);
    $this->assertInstanceof(Container::class, $container);
    $this->assertInstanceof(IApp::class, $app);
    $this->assertInstanceof(Apps::class, $app);

    $this->invokeTestMethod($bootstrap, 'setErrorHandle', [400, 'foo.']);
}
```
    
## set_exception_handler 设置异常处理函数

``` php
public function testSetExceptionHandler(): void
{
    $this->backupSystemEnvironment();
    $bootstrap = new RegisterExceptionRuntime1();

    $container = Container::singletons();
    $app = new App4($container, $appPath = __DIR__.'/app');

    $request = $this->createMock(Request::class);

    $request->method('isConsole')->willReturn(true);
    $this->assertTrue($request->isConsole());

    $container->singleton('request', function () use ($request) {
        return $request;
    });

    $runtime = $this->createMock(IRuntime::class);

    $this->assertNull($runtime->renderForConsole(new ConsoleOutput(), new Exception()));

    $container->singleton(IRuntime::class, function () use ($runtime) {
        return $runtime;
    });

    $option = $this->createMock(IOption::class);
    $option->method('get')->willReturn('production');
    $container->singleton('option', function () use ($option) {
        return $option;
    });

    $bootstrap->handle($app);

    $this->assertInstanceof(IContainer::class, $container);
    $this->assertInstanceof(Container::class, $container);
    $this->assertInstanceof(IApp::class, $app);
    $this->assertInstanceof(Apps::class, $app);

    $e = new Exception('foo.');

    $this->assertNull($this->invokeTestMethod($bootstrap, 'setExceptionHandler', [$e]));

    $error = new Error('hello world.');

    $this->assertNull($this->invokeTestMethod($bootstrap, 'setExceptionHandler', [$error]));
    $this->restoreSystemEnvironment();
}
```
    
## register_shutdown_function 设置请求关闭处理函数

``` php
public function testRegisterShutdownFunction(): void
{
    $bootstrap = new RegisterExceptionRuntime2();

    $container = Container::singletons();
    $app = new App4($container, $appPath = __DIR__.'/app');

    set_error_handler('var_dump', 0);
    trigger_error('hello error');
    restore_error_handler();

    $this->setTestProperty($bootstrap, 'app', $app);
    $this->assertNull($this->invokeTestMethod($bootstrap, 'registerShutdownFunction'));
    $this->assertSame($GLOBALS['testRegisterShutdownFunction'], 'hello error');
    unset($GLOBALS['testRegisterShutdownFunction']);
}
```