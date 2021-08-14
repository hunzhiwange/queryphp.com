# 异常运行时

::: tip Testing Is Documentation
[tests/Kernel/ExceptionRuntimeTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Kernel/ExceptionRuntimeTest.php)
:::
    
QueryPHP 系统发生的异常统一由异常运行时进行管理，处理异常上报和返回异常响应。

**异常运行时接口**

``` php
<?php

declare(strict_types=1);

namespace Leevel\Kernel\Exceptions;

use Leevel\Http\Request;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 * 异常运行时接口.
 */
interface IRuntime
{
    /**
     * 异常上报.
     */
    public function report(Throwable $e): void;

    /**
     * 异常是否需要上报.
     */
    public function reportable(Throwable $e): bool;

    /**
     * 异常渲染.
     */
    public function render(Request $request, Throwable $e): Response;

    /**
     * 命令行异常渲染.
     */
    public function renderForConsole(OutputInterface $output, Throwable $e): void;
}

```

**默认异常运行时提供两个抽象方法**

**getHttpExceptionView 原型**

``` php
# Leevel\Kernel\Exceptions\Runtime::getHttpExceptionView
/**
 * 获取 HTTP 状态的异常模板.
 */
abstract public function getHttpExceptionView(HttpException $e): string;
```

**getDefaultHttpExceptionView 原型**

``` php
# Leevel\Kernel\Exceptions\Runtime::getDefaultHttpExceptionView
/**
 * 获取 HTTP 状态的默认异常模板.
 */
abstract public function getDefaultHttpExceptionView(): string;
```

只需要实现，即可轻松接入，例如应用中的 `\App\Exceptions\Runtime` 实现。

``` php
<?php

declare(strict_types=1);

namespace App\Exceptions;

use Leevel;
use Leevel\Http\Request;
use Leevel\Kernel\Exceptions\HttpException;
use Leevel\Kernel\Exceptions\Runtime as ExceptionRuntime;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 * 异常运行时.
 */
class Runtime extends ExceptionRuntime
{
    /**
     * {@inheritDoc}
     */
    public function report(Throwable $e): void
    {
        parent::report($e);
    }

    /**
     * {@inheritDoc}
     */
    public function render(Request $request, Throwable $e): Response
    {
        return parent::render($request, $e);
    }

    /**
     * 获取 HTTP 状态的异常模板.
     */
    public function getHttpExceptionView(HttpException $e): string
    {
        return Leevel::path(sprintf('assets/exceptions/%d.php', $e->getStatusCode()));
    }

    /**
     * 获取 HTTP 状态的默认异常模板.
     */
    public function getDefaultHttpExceptionView(): string
    {
        return Leevel::path('assets/exceptions/default.php');
    }
}

```


**Uses**

``` php
<?php

use Exception;
use Leevel\Database\Ddd\EntityNotFoundException;
use Leevel\Di\Container;
use Leevel\Di\IContainer;
use Leevel\Http\Request;
use Leevel\Kernel\App as Apps;
use Leevel\Kernel\Exceptions\HttpException;
use Leevel\Kernel\Exceptions\InternalServerErrorHttpException;
use Leevel\Kernel\Exceptions\MethodNotAllowedHttpException;
use Leevel\Kernel\Exceptions\NotFoundHttpException;
use Leevel\Kernel\Exceptions\Runtime;
use Leevel\Log\ILog;
use Leevel\Option\Option;
use Symfony\Component\Console\Output\ConsoleOutput;
use Symfony\Component\HttpFoundation\Response;
```

## 基本使用

**fixture 定义**

**Tests\Kernel\AppRuntime**

``` php
namespace Tests\Kernel;

class AppRuntime extends Apps
{
    protected function registerBaseProvider(): void
    {
    }
}
```

**Tests\Kernel\Runtime11**

``` php
namespace Tests\Kernel;

class Runtime11 extends Runtime
{
    public function getHttpExceptionView(HttpException $e): string
    {
        return '';
    }

    public function getDefaultHttpExceptionView(): string
    {
        return '';
    }
}
```

**Tests\Kernel\Exception1**

``` php
namespace Tests\Kernel;

class Exception1 extends Exception
{
}
```


``` php
public function testBaseUse(): void
{
    $app = new AppRuntime($container = new Container(), $appPath = __DIR__.'/app');

    $this->assertInstanceof(IContainer::class, $container);
    $this->assertInstanceof(Container::class, $container);

    $option = new Option([
        'app' => [
            ':composer' => [
                'i18ns' => [
                    'extend',
                ],
            ],
        ],
        'i18n' => [
            'default' => 'en-US',
        ],
    ]);

    $container->singleton('option', function () use ($option) {
        return $option;
    });

    $log = $this->createMock(ILog::class);

    $this->assertNull($log->error('hello world', []));

    $container->singleton(ILog::class, function () use ($log) {
        return $log;
    });

    $runtime = new Runtime11($app);

    $e = new Exception1('hello world');

    $this->assertNull($runtime->report($e));
}
```
    
## report 自定义异常上报

异常提供 `report` 方法即实现自定义异常上报。

**fixture 定义**

**Tests\Kernel\Exception2**

``` php
namespace Tests\Kernel;

class Exception2 extends Exception
{
    public function report(): void
    {
        $_SERVER['testExceptionItSelfWithReport'] = 1;
    }
}
```


``` php
public function testExceptionItSelfWithReport(): void
{
    $app = new AppRuntime(new Container(), __DIR__.'/app');

    $runtime = new Runtime11($app);

    $e = new Exception2('hello world');

    $this->assertArrayNotHasKey('testExceptionItSelfWithReport', $_SERVER);

    $this->assertNull($runtime->report($e));

    $this->assertSame(1, $_SERVER['testExceptionItSelfWithReport']);

    unset($_SERVER['testExceptionItSelfWithReport']);
}
```
    
## reportable 异常是否需要上报

默认可上报，reportable 返回 true 可以会上报。

**fixture 定义**

**Tests\Kernel\ExceptionCanReportable**

``` php
namespace Tests\Kernel;

class ExceptionCanReportable extends Exception
{
    public function reportable(): bool
    {
        return true;
    }

    public function report(): void
    {
        $_SERVER['testExceptionReportable'] = 1;
    }
}
```


``` php
public function testExceptionReportable(): void
{
    $app = new AppRuntime(new Container(), __DIR__.'/app');
    $runtime = new Runtime11($app);
    $e = new ExceptionCanReportable('hello world');
    $this->assertArrayNotHasKey('testExceptionReportable', $_SERVER);
    $this->assertNull($runtime->report($e));
    $this->assertSame(1, $_SERVER['testExceptionReportable']);
    unset($_SERVER['testExceptionReportable']);
}
```
    
## reportable 异常是否需要上报不可上报例子

**fixture 定义**

**Tests\Kernel\ExceptionCannotReportable**

``` php
namespace Tests\Kernel;

class ExceptionCannotReportable extends Exception
{
    public function reportable(): bool
    {
        return false;
    }

    public function report(): void
    {
        $_SERVER['testExceptionReportableIsFalse'] = 1;
    }
}
```


``` php
public function testExceptionReportableIsFalse(): void
{
    $app = new AppRuntime(new Container(), __DIR__.'/app');
    $runtime = new Runtime11($app);
    $e = new ExceptionCannotReportable('hello world');
    $this->assertArrayNotHasKey('testExceptionReportableIsFalse', $_SERVER);
    $this->assertNull($runtime->report($e));
    $this->assertArrayNotHasKey('testExceptionReportableIsFalse', $_SERVER);
}
```
    
## render 开启调试模式的异常渲染

``` php
public function testRender(): void
{
    $app = new AppRuntime($container = new Container(), $appPath = __DIR__.'/app');

    $request = $this->createMock(Request::class);

    $request->method('isAcceptJson')->willReturn(false);
    $this->assertFalse($request->isAcceptJson());

    $container->singleton('request', function () use ($request) {
        return $request;
    });

    $option = new Option([
        'app' => [
            'debug'       => true,
            'environment' => 'development',
        ],
    ]);

    $container->singleton('option', function () use ($option) {
        return $option;
    });

    $runtime = new Runtime11($app);

    $e = new Exception1('hello world');

    $this->assertInstanceof(Response::class, $resultResponse = $runtime->render($request, $e));
    $this->assertStringContainsString('Tests\\Kernel\\Exception1: hello world in file', $resultResponse->getContent());
    $this->assertSame(500, $resultResponse->getStatusCode());
}
```
    
## renderForConsole 命令行渲染

``` php
public function testRenderForConsole(): void
{
    $app = new AppRuntimeForConsole($container = new Container(), $appPath = __DIR__.'/app');

    $this->assertInstanceof(IContainer::class, $container);
    $this->assertInstanceof(Container::class, $container);

    $option = new Option([
        'app' => [
            ':composer' => [
                'i18ns' => [
                    'extend',
                ],
            ],
        ],
        'i18n' => [
            'default' => 'en-US',
        ],
    ]);

    $container->singleton('option', function () use ($option) {
        return $option;
    });

    $log = $this->createMock(ILog::class);

    $this->assertNull($log->error('hello world', []));

    $container->singleton(ILog::class, function () use ($log) {
        return $log;
    });

    $runtime = new Runtime11($app);

    $e = new Exception1('hello world');

    $runtime->renderForConsole(new ConsoleOutput(), $e);
}
```
    
## render 自定义异常渲染

异常提供 `render` 方法即实现自定义异常渲染。

**fixture 定义**

**Tests\Kernel\Exception3**

``` php
namespace Tests\Kernel;

class Exception3 extends Exception
{
    public function render(Request $request, Exception $e): string
    {
        return 'hello world';
    }
}
```


``` php
public function testRenderWithCustomRenderMethod(): void
{
    $app = new AppRuntime($container = new Container(), $appPath = __DIR__.'/app');

    $request = $this->createMock(Request::class);

    $request->method('isAcceptJson')->willReturn(false);
    $this->assertFalse($request->isAcceptJson());

    $container->singleton('request', function () use ($request) {
        return $request;
    });

    $option = new Option([
        'app' => [
            'debug'       => true,
            'environment' => 'development',
        ],
    ]);

    $container->singleton('option', function () use ($option) {
        return $option;
    });

    $runtime = new Runtime11($app);

    $e = new Exception3('hello world');

    $this->assertInstanceof(Response::class, $resultResponse = $runtime->render($request, $e));

    $this->assertSame('hello world', $resultResponse->getContent());
    $this->assertSame(500, $resultResponse->getStatusCode());
}
```
    
## render 自定义异常渲染直接返回响应对象

异常提供 `render` 方法即实现自定义异常渲染。

**fixture 定义**

**Tests\Kernel\Exception4**

``` php
namespace Tests\Kernel;

class Exception4 extends Exception
{
    public function render(Request $request, Exception $e): Response
    {
        return new Response('foo bar', 500);
    }
}
```


``` php
public function testRenderWithCustomRenderMethod2(): void
{
    $app = new AppRuntime($container = new Container(), $appPath = __DIR__.'/app');

    $request = $this->createMock(Request::class);

    $request->method('isAcceptJson')->willReturn(false);
    $this->assertFalse($request->isAcceptJson());

    $container->singleton('request', function () use ($request) {
        return $request;
    });

    $option = new Option([
        'app' => [
            'debug'       => true,
            'environment' => 'development',
        ],
    ]);

    $container->singleton('option', function () use ($option) {
        return $option;
    });

    $runtime = new Runtime11($app);

    $e = new Exception4('hello world');

    $this->assertInstanceof(Response::class, $resultResponse = $runtime->render($request, $e));

    $this->assertSame('foo bar', $resultResponse->getContent());
    $this->assertSame(500, $resultResponse->getStatusCode());
}
```
    
## render 异常渲染直接返回 JSON 数据

``` php
public function testRenderToJson(): void
{
    $app = new AppRuntime($container = new Container(), $appPath = __DIR__.'/app');

    $request = $this->createMock(Request::class);

    $request->method('isAcceptJson')->willReturn(true);
    $this->assertTrue($request->isAcceptJson());

    $container->singleton('request', function () use ($request) {
        return $request;
    });

    $option = new Option([
        'app' => [
            'debug'       => true,
            'environment' => 'development',
        ],
    ]);

    $container->singleton('option', function () use ($option) {
        return $option;
    });

    $runtime = new Runtime11($app);

    $e = new Exception1('hello world');

    $this->assertInstanceof(Response::class, $resultResponse = $runtime->render($request, $e));

    $this->assertIsArray($content = json_decode($resultResponse->getContent(), true));
    $this->assertArrayHasKey('error', $content);
    $this->assertSame('Tests\\Kernel\\Exception1', $content['error']['type']);
    $this->assertSame('hello world', $content['error']['message']);
    $this->assertSame(500, $resultResponse->getStatusCode());
}
```
    
## render 自定义异常渲染直接返回支持转 JSON 响应的数据

异常提供 `render` 方法即实现自定义异常渲染。

**fixture 定义**

**Tests\Kernel\Exception5**

``` php
namespace Tests\Kernel;

class Exception5 extends Exception
{
    public function render(Request $request, Exception $e): array
    {
        return ['foo' => 'bar'];
    }
}
```


``` php
public function testRenderWithCustomRenderMethodToJson(): void
{
    $app = new AppRuntime($container = new Container(), $appPath = __DIR__.'/app');

    $request = $this->createMock(Request::class);

    $request->method('isAcceptJson')->willReturn(true);
    $this->assertTrue($request->isAcceptJson());

    $container->singleton('request', function () use ($request) {
        return $request;
    });

    $option = new Option([
        'app' => [
            'debug'       => true,
            'environment' => 'development',
        ],
    ]);

    $container->singleton('option', function () use ($option) {
        return $option;
    });

    $runtime = new Runtime11($app);

    $e = new Exception5('hello world');

    $this->assertInstanceof(Response::class, $resultResponse = $runtime->render($request, $e));

    $this->assertSame('{"foo":"bar"}', $resultResponse->getContent());
    $this->assertSame(500, $resultResponse->getStatusCode());
}
```
    
## render HTTP 500 异常响应渲染

异常提供 `render` 方法即实现自定义异常渲染。

**fixture 定义**

**Tests\Kernel\Runtime22**

``` php
namespace Tests\Kernel;

class Runtime22 extends Runtime
{
    public function getHttpExceptionView(HttpException $e): string
    {
        return __DIR__.'/assert/'.$e->getStatusCode().'.php';
    }

    public function getDefaultHttpExceptionView(): string
    {
        return '';
    }
}
```

**Tests\Kernel\Exception6**

``` php
namespace Tests\Kernel;

class Exception6 extends InternalServerErrorHttpException
{
}
```

**异常模板 tests/Kernel/assert/layout.php **

``` php
<div id="status-code"><?php echo $status_code ?? 500; ?></div>
        
<div id="content">
    <p id="title"><?php echo $title; ?></p>
    <p id="sub-title"><?php echo $code; ?> <?php echo $message; ?></p>
</div>
```

**异常模板 tests/Kernel/assert/500.php **

``` php
<?php

declare(strict_types=1);

/**
 * 500 模板
 */
$title = '服务器内部错误';
$message = '服务器遇到错误，无法完成请求';

require __DIR__.'/layout.php';

```


``` php
public function testRendorWithHttpExceptionView(): void
{
    $app = new AppRuntime($container = new Container(), $appPath = __DIR__.'/app');

    $option = new Option([
        'app' => [
            'debug'       => false,
            'environment' => 'development',
        ],
    ]);

    $container->singleton('option', function () use ($option) {
        return $option;
    });

    $runtime = new Runtime22($app);

    $e = new Exception6('hello world');

    $this->assertInstanceof(Response::class, $resultResponse = $this->invokeTestMethod($runtime, 'rendorWithHttpExceptionView', [$e]));

    $content = $resultResponse->getContent();

    $this->assertStringContainsString('<div id="status-code">500</div>', $content);
    $this->assertStringContainsString('<p id="title">服务器内部错误</p>', $content);
    $this->assertStringContainsString('<p id="sub-title">0 服务器遇到错误，无法完成请求</p>', $content);
    $this->assertSame(500, $resultResponse->getStatusCode());
}
```
    
## render HTTP 异常响应渲染使用默认异常模板的例子

异常提供 `render` 方法即实现自定义异常渲染。

**fixture 定义**

**Tests\Kernel\Exception7**

``` php
namespace Tests\Kernel;

class Exception7 extends NotFoundHttpException
{
}
```

**异常模板 tests/Kernel/assert/404.php **

``` php
<?php

declare(strict_types=1);

/**
 * 404 模板
 */
$title = '页面未找到';
$message = '用户发出的请求针对的是不存在的页面';

require __DIR__.'/layout.php';

```


``` php
public function testRendorWithHttpExceptionViewFor404(): void
{
    $app = new AppRuntime($container = new Container(), $appPath = __DIR__.'/app');

    $option = new Option([
        'app' => [
            'debug'       => false,
            'environment' => 'development',
        ],
    ]);

    $container->singleton('option', function () use ($option) {
        return $option;
    });

    $runtime = new Runtime22($app);

    $e = new Exception7('hello world');

    $this->assertInstanceof(Response::class, $resultResponse = $this->invokeTestMethod($runtime, 'rendorWithHttpExceptionView', [$e]));

    $content = $resultResponse->getContent();

    $this->assertStringContainsString('<div id="status-code">404</div>', $content);
    $this->assertStringContainsString('<p id="title">页面未找到</p>', $content);
    $this->assertStringContainsString('<p id="sub-title">0 用户发出的请求针对的是不存在的页面</p>', $content);
    $this->assertSame(404, $resultResponse->getStatusCode());
}
```
    
## render HTTP 异常响应渲染

异常提供 `render` 方法即实现自定义异常渲染。

**fixture 定义**

**Tests\Kernel\Runtime3**

``` php
namespace Tests\Kernel;

class Runtime3 extends Runtime
{
    public function getHttpExceptionView(HttpException $e): string
    {
        return __DIR__.'/assert/notFound.php';
    }

    public function getDefaultHttpExceptionView(): string
    {
        return __DIR__.'/assert/default.php';
    }
}
```

**Tests\Kernel\Exception8**

``` php
namespace Tests\Kernel;

class Exception8 extends MethodNotAllowedHttpException
{
}
```

**异常模板 tests/Kernel/assert/default.php **

``` php
<?php

declare(strict_types=1);

/**
 * 默认模板
 */
$title = $type ?? 'Whoops!';

if (!isset($message)) {
    $message = 'Unknown error.';
}

if (isset($file, $line)) {
    $title .= sprintf('<div class="file">#FILE %s #LINE %s</div>', $file, $line);
}

require __DIR__.'/layout.php';

```


``` php
public function testRendorWithHttpExceptionViewButNotFoundViewAndWithDefaultView(): void
{
    $app = new AppRuntime($container = new Container(), $appPath = __DIR__.'/app');

    $option = new Option([
        'app' => [
            'debug'       => false,
            'environment' => 'development',
        ],
    ]);

    $container->singleton('option', function () use ($option) {
        return $option;
    });

    $runtime = new Runtime3($app);

    $e = new Exception8('hello world');

    $this->assertInstanceof(Response::class, $resultResponse = $this->invokeTestMethod($runtime, 'rendorWithHttpExceptionView', [$e]));

    $content = $resultResponse->getContent();

    $this->assertStringContainsString('<div id="status-code">405</div>', $content);
    $this->assertStringContainsString('Tests\\Kernel\\Exception8<div class="file">#FILE', $content);
    $this->assertStringContainsString('<p id="sub-title">0 hello world</p>', $content);
    $this->assertSame(405, $resultResponse->getStatusCode());
}
```
    
## render 调试关闭异常渲染

``` php
public function testRenderWithDebugIsOff(): void
{
    $app = new AppRuntime($container = new Container(), $appPath = __DIR__.'/app');

    $request = $this->createMock(Request::class);

    $request->method('isAcceptJson')->willReturn(false);
    $this->assertFalse($request->isAcceptJson());

    $container->singleton('request', function () use ($request) {
        return $request;
    });

    $option = new Option([
        'app' => [
            'debug'       => false,
            'environment' => 'development',
        ],
    ]);

    $container->singleton('option', function () use ($option) {
        return $option;
    });

    $runtime = new Runtime22($app);

    $e = new Exception1('hello world');

    $this->assertInstanceof(Response::class, $resultResponse = $runtime->render($request, $e));

    $content = $resultResponse->getContent();

    $this->assertStringContainsString('<div id="status-code">500</div>', $content);
    $this->assertStringContainsString('<p id="title">服务器内部错误</p>', $content);
    $this->assertStringContainsString('<p id="sub-title">0 服务器遇到错误，无法完成请求</p>', $content);
    $this->assertSame(500, $resultResponse->getStatusCode());
}
```
    
## render 调试开启异常渲染

``` php
public function testRenderWithDebugIsOn(): void
{
    $app = new AppRuntime($container = new Container(), $appPath = __DIR__.'/app');

    $request = $this->createMock(Request::class);

    $request->method('isAcceptJson')->willReturn(false);
    $this->assertFalse($request->isAcceptJson());

    $container->singleton('request', function () use ($request) {
        return $request;
    });

    $option = new Option([
        'app' => [
            'debug'       => true,
            'environment' => 'development',
        ],
    ]);

    $container->singleton('option', function () use ($option) {
        return $option;
    });

    $runtime = new Runtime22($app);

    $e = new Exception1('hello world');

    $this->assertInstanceof(Response::class, $resultResponse = $runtime->render($request, $e));

    $content = $resultResponse->getContent();

    $this->assertStringContainsString('Tests\\Kernel\\Exception1: hello world', $content);
    $this->assertSame(500, $resultResponse->getStatusCode());
}
```