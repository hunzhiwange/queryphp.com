# Router

::: tip Testing Is Documentation
[tests/Router/RouterTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Router/RouterTest.php)
:::
    
路由是整个框架一个非常重要的调度组件，完成从请求到响应的完整过程，通常我们使用代理 `\Leevel\Router\Proxy\Router` 类进行静态调用。

**路有服务提供者**

路由服务是系统核心服务，会在系统初始化时通过路由服务提供者注册。

``` php
namespace Common\Infra\Provider;

use Leevel\Di\IContainer;
use Leevel\Router\RouterProvider;

class Router extends RouterProvider
{
    /**
     * 控制器相对目录.
     *
     * @var string
     */
    protected string $controllerDir = 'App\\Controller';

    /**
     * 中间件分组.
     *
     * - 分组可以很方便地批量调用组件.
     *
     * @var array
     */
    protected array $middlewareGroups = [
        // web 请求中间件
        'web' => [
            'session',
        ],

        // api 请求中间件
        'api' => [
            // API 限流，可以通过网关来做限流更高效，如果需要去掉注释即可
            // 'throttler:60,1',
        ],

        // 公共请求中间件
        'common' => [
            'log',
        ],
    ];

    /**
     * 中间件别名.
     *
     * - HTTP 中间件提供一个方便的机制来过滤进入应用程序的 HTTP 请求
     * - 例外在应用执行结束后响应环节也会调用 HTTP 中间件.
     *
     * @var array
     */
    protected array $middlewareAlias = [
        'auth'              => 'Leevel\\Auth\\Middleware\\Auth',
        'cors'              => 'Admin\\App\\Middleware\\Cors',
        'admin_auth'        => 'Admin\\App\\Middleware\\Auth',
        'debug'             => 'Leevel\\Debug\\Middleware\\Debug',
        'log'               => 'Leevel\\Log\\Middleware\\Log',
        'session'           => 'Leevel\\Session\\Middleware\\Session',
        'throttler'         => 'Leevel\\Throttler\\Middleware\\Throttler',
    ];

    /**
     * 基础路径.
     *
     * @var array
     */
    protected array $basePaths = [
        '*' => [
            'middlewares' => 'common',
        ],
        'foo/*world' => [
        ],
        'api/test' => [
            'middlewares' => 'api',
        ],
        ':admin/*' => [
            'middlewares' => 'admin_auth,cors',
        ],
        'options/index' => [
            'middlewares' => 'cors',
        ],
        'admin/show' => [
            'middlewares' => 'auth',
        ],
    ];

    /**
     * 分组.
     *
     * @var array
     */
    protected array $groups = [
        'pet'     => [],
        'store'   => [],
        'user'    => [],
        '/api/v1' => [
            'middlewares' => 'api',
        ],
        'api/v2' => [
            'middlewares' => 'api',
        ],
        '/web/v1' => [
            'middlewares' => 'web',
        ],
        'web/v2' => [
            'middlewares' => 'web',
        ],
    ];

    /**
     * 创建一个服务容器提供者实例.
     */
    public function __construct(IContainer $container)
    {
        parent::__construct($container);

        if ($container->make('app')->isDebug()) {
            $this->middlewareGroups['common'][] = 'debug';
        }
    }

    /**
     * bootstrap.
     */
    public function bootstrap(): void
    {
        parent::bootstrap();
    }

    /**
     * 返回路由.
     */
    public function getRouters(): array
    {
        return parent::getRouters();
    }
}
```


**Uses**

``` php
<?php

use Leevel\Di\Container;
use Leevel\Http\Request;
use Leevel\Router\IRouter;
use Leevel\Router\Router;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\HttpFoundation\Response;
use Tests\Router\Middlewares\Demo1;
use Tests\Router\Middlewares\Demo2;
use Tests\Router\Middlewares\Demo3;
use Tests\Router\Middlewares\DemoForGroup;
```

## 基本使用

**fixture 定义**

**Tests\Router\Controllers\Home**

``` php
namespace Tests\Router\Controllers;

class Home
{
    public function index(): string
    {
        return 'hello my home';
    }
}
```


``` php
public function testBaseUse(): void
{
    $pathInfo = '/:tests';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Router\\Controllers';
    $request = $this->createRequest($pathInfo, $attributes, $method);
    $router = $this->createRouter();
    $router->setControllerDir($controllerDir);
    $result = $router->dispatch($request);

    $this->assertInstanceof(Response::class, $result);
    $this->assertSame('hello my home', $result->getContent());
}
```
    
## 控制器方法单独成为类

方法类的方法固定为 `handle`，返回响应结果。

**fixture 定义**

**Tests\Router\Controllers\Hello\ActionClass**

``` php
namespace Tests\Router\Controllers\Hello;

class ActionClass
{
    public function handle(): string
    {
        return 'hello action class';
    }
}
```


``` php
public function testActionAsClass(): void
{
    $pathInfo = '/:tests/hello/actionClass';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Router\\Controllers';
    $request = $this->createRequest($pathInfo, $attributes, $method);
    $router = $this->createRouter();
    $router->setControllerDir($controllerDir);
    $result = $router->dispatch($request);

    $this->assertInstanceof(Response::class, $result);
    $this->assertSame('hello action class', $result->getContent());
}
```
    
## 控制器方法支持短横线和下换线转换为驼峰规则

**fixture 定义**

**Tests\Router\Controllers\Hello\ActionConvertFooBar**

``` php
namespace Tests\Router\Controllers\Hello;

class ActionConvertFooBar
{
    public function handle(): string
    {
        return 'hello action convert foo bar';
    }
}
```


``` php
public function testActionConvert(): void
{
    $pathInfo = '/:tests/hello/action_convert-foo_bar';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Router\\Controllers';
    $request = $this->createRequest($pathInfo, $attributes, $method);
    $router = $this->createRouter();
    $router->setControllerDir($controllerDir);
    $result = $router->dispatch($request);

    $this->assertInstanceof(Response::class, $result);
    $this->assertSame('hello action convert foo bar', $result->getContent());
}
```
    
## 控制器支持短横线和下换线转换为驼峰规则

**fixture 定义**

**Tests\Router\Controllers\ControllerConvertFooBar**

``` php
namespace Tests\Router\Controllers;

class ControllerConvertFooBar
{
    public function bar(): string
    {
        return 'hello controller convert';
    }
}
```


``` php
public function testControllerConvert(): void
{
    $pathInfo = '/:tests/controller_convert-foo_bar/bar';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Router\\Controllers';
    $request = $this->createRequest($pathInfo, $attributes, $method);
    $router = $this->createRouter();
    $router->setControllerDir($controllerDir);
    $result = $router->dispatch($request);

    $this->assertInstanceof(Response::class, $result);
    $this->assertSame('hello controller convert', $result->getContent());
}
```
    
## 控制器支持子目录

控制器子目录支持无限层级。

**fixture 定义**

**Tests\Router\Controllers\Sub\World**

``` php
namespace Tests\Router\Controllers\Sub;

class World
{
    public function foo()
    {
        return 'hello sub world foo';
    }
}
```


``` php
public function testSubControllerDir(): void
{
    $pathInfo = '/:tests/sub/world/foo';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Router\\Controllers';
    $request = $this->createRequest($pathInfo, $attributes, $method);
    $router = $this->createRouter();
    $router->setControllerDir($controllerDir);
    $result = $router->dispatch($request);

    $this->assertInstanceof(Response::class, $result);
    $this->assertSame('hello sub world foo', $result->getContent());
}
```
    
## 控制器子目录支持短横线和下换线转换为驼峰规则

**fixture 定义**

**Tests\Router\Controllers\Sub\World**

``` php
namespace Tests\Router\Controllers\Sub;

class World
{
    public function foo()
    {
        return 'hello sub world foo';
    }
}
```


``` php
public function testConvertAll(): void
{
    $this->expectException(\Leevel\Router\RouterNotFoundException::class);
    $this->expectExceptionMessage(
        'The router Tests\\Router\\Controllers\\HeLloWor\\Bar\\Foo\\XYYAc\\ControllerXxYy::actionXxxYzs() was not found.'
    );

    $pathInfo = '/:tests/he_llo-wor/Bar/foo/xYY-ac/controller_xx-yy/action-xxx_Yzs';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Router\\Controllers';
    $request = $this->createRequest($pathInfo, $attributes, $method);
    $router = $this->createRouter();
    $router->setControllerDir($controllerDir);
    $router->dispatch($request);
}
```
    
## 可以转换为 JSON 的控制器响应

**fixture 定义**

**Tests\Router\Controllers\ShouldJson**

``` php
namespace Tests\Router\Controllers;

class ShouldJson
{
    public function index(): array
    {
        return ['foo' => 'bar'];
    }
}
```


``` php
public function testShouldJson(): void
{
    $pathInfo = '/:tests/should_json';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Router\\Controllers';
    $request = $this->createRequest($pathInfo, $attributes, $method);
    $router = $this->createRouter();
    $router->setControllerDir($controllerDir);
    $result = $router->dispatch($request);

    $this->assertInstanceof(Response::class, $result);
    $this->assertSame('{"foo":"bar"}', $result->getContent());
}
```
    
## RESTFUL 控制器响应

**fixture 定义**

**测试类型例子**

``` php
public function getRestfulData();
```

**Tests\Router\Controllers\Restful\Show**

``` php
namespace Tests\Router\Controllers\Restful;

use Leevel\Router\IRouter;

class Show
{
    public function handle()
    {
        return 'hello for restful '.IRouter::RESTFUL_SHOW;
    }
}
```

**Tests\Router\Controllers\Restful\Store**

``` php
namespace Tests\Router\Controllers\Restful;

use Leevel\Router\IRouter;

class Store
{
    public function handle()
    {
        return 'hello for restful '.IRouter::RESTFUL_STORE;
    }
}
```

**Tests\Router\Controllers\Restful\Update**

``` php
namespace Tests\Router\Controllers\Restful;

use Leevel\Router\IRouter;

class Update
{
    public function handle()
    {
        return 'hello for restful '.IRouter::RESTFUL_UPDATE;
    }
}
```

**Tests\Router\Controllers\Restful\Destroy**

``` php
namespace Tests\Router\Controllers\Restful;

use Leevel\Router\IRouter;

class Destroy
{
    public function handle()
    {
        return 'hello for restful '.IRouter::RESTFUL_DESTROY;
    }
}
```


``` php
public function testRestful(string $method, string $action): void
{
    $pathInfo = '/:tests/restful/5';
    $attributes = [];
    $method = $method;
    $controllerDir = 'Router\\Controllers';
    $request = $this->createRequest($pathInfo, $attributes, $method);
    $router = $this->createRouter();
    $router->setControllerDir($controllerDir);
    $result = $router->dispatch($request);

    $this->assertInstanceof(Response::class, $result);
    $this->assertSame('hello for restful '.$action, $result->getContent());
}
```
    
## setPreRequestMatched 设置路由请求预解析结果

**fixture 定义**

**Tests\Router\Controllers\PreRequestMatched\Prefix\Bar\Foo**

``` php
namespace Tests\Router\Controllers\PreRequestMatched\Prefix\Bar;

class Foo
{
    public function handle(): string
    {
        return 'hello preRequestMatched';
    }
}
```


``` php
public function testSetPreRequestMatched(): void
{
    $pathInfo = '';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Router\\Controllers';
    $request = $this->createRequest($pathInfo, $attributes, $method);
    $router = $this->createRouter();
    $router->setPreRequestMatched($request, [
        IRouter::APP             => 'Tests',
        IRouter::CONTROLLER      => 'Bar',
        IRouter::ACTION          => 'foo',
        IRouter::PREFIX          => 'PreRequestMatched\\Prefix',
        IRouter::ATTRIBUTES      => null,
        IRouter::MIDDLEWARES     => null,
        IRouter::VARS            => null,
    ]);
    $router->setControllerDir($controllerDir);
    $result = $router->dispatch($request);

    $this->assertInstanceof(Response::class, $result);
    $this->assertSame('hello preRequestMatched', $result->getContent());
}
```
    
## 穿越中间件

**fixture 定义**

**Tests\Router\Controllers\Hello\ThroughMiddleware**

``` php
namespace Tests\Router\Controllers\Hello;

class ThroughMiddleware
{
    public function handle(): string
    {
        return 'hello throughMiddleware';
    }
}
```

**Tests\Router\Middlewares\Demo1**

``` php
namespace Tests\Router\Middlewares;

use Closure;
use Leevel\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Demo1
{
    public function __construct()
    {
    }

    public function terminate(Closure $next, Request $request, Response $response)
    {
        $GLOBALS['demo_middlewares'][] = 'Demo1::terminate';
        $next($request, $response);
    }
}
```

**Tests\Router\Middlewares\Demo2**

``` php
namespace Tests\Router\Middlewares;

use Closure;
use Leevel\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Demo2
{
    public function __construct()
    {
    }

    public function handle(Closure $next, Request $request)
    {
        $GLOBALS['demo_middlewares'][] = 'Demo2::handle';
        $next($request);
    }

    public function terminate(Closure $next, Request $request, Response $response)
    {
        $GLOBALS['demo_middlewares'][] = 'Demo2::terminate';
        $next($request, $response);
    }
}
```

**Tests\Router\Middlewares\Demo3**

``` php
namespace Tests\Router\Middlewares;

use Closure;
use Leevel\Http\Request;

class Demo3
{
    public function __construct()
    {
    }

    public function handle(Closure $next, Request $request, int $arg1 = 1, string $arg2 = 'hello')
    {
        $GLOBALS['demo_middlewares'][] = sprintf('Demo3::handle(arg1:%s,arg2:%s)', $arg1, $arg2);
        $next($request);
    }
}
```

**Tests\Router\Middlewares\DemoForGroup**

``` php
namespace Tests\Router\Middlewares;

use Closure;
use Leevel\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DemoForGroup
{
    public function __construct()
    {
    }

    public function handle(Closure $next, Request $request)
    {
        $GLOBALS['demo_middlewares'][] = 'DemoForGroup::handle';
        $next($request);
    }

    public function terminate(Closure $next, Request $request, Response $response)
    {
        $GLOBALS['demo_middlewares'][] = 'DemoForGroup::terminate';
        $next($request, $response);
    }
}
```


``` php
public function testThroughMiddleware(): void
{
    $pathInfo = '/:tests/hello/throughMiddleware';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Router\\Controllers';
    $request = $this->createRequest($pathInfo, $attributes, $method);
    $router = $this->createRouter();
    $router->setMiddlewareGroups([
        'group1' => [
            'demo1',
            'demo2',
        ],
        'group2' => [
            'demo1',
            'demo3:10,world',
        ],
        'group3' => [
            'demo1',
            'demo2',
            'demo3:10,world',
        ],
    ]);

    $router->setMiddlewareAlias([
        'demo1'        => Demo1::class,
        'demo2'        => Demo2::class,
        'demo3'        => Demo3::class,
        'demoForGroup' => DemoForGroup::class,
    ]);

    $router->setBasePaths([
        '*' => [
            'middlewares' => [
                'handle' => [
                    Demo2::class.'@handle',
                ],
                'terminate' => [
                    Demo1::class.'@terminate',
                    Demo2::class.'@terminate',
                ],
            ],
        ],
        '/^\\/:tests\/hello\/throughMiddleware\\/$/' => [
            'middlewares' => [
                'handle' => [
                    Demo3::class.':10,hello@handle',
                ],
            ],
        ],
        '/^\\/:tests(\\S*)\\/$/' => [
            'middlewares' => [
                'handle' => [
                    DemoForGroup::class.'@handle',
                ],
                'terminate' => [
                    DemoForGroup::class.'@terminate',
                ],
            ],
        ],
    ]);

    $router->setControllerDir($controllerDir);

    if (isset($GLOBALS['demo_middlewares'])) {
        unset($GLOBALS['demo_middlewares']);
    }

    $result = $router->dispatch($request);
    $router->throughMiddleware($request, [
        $result,
    ]);

    $this->assertInstanceof(Response::class, $result);
    $this->assertSame('hello throughMiddleware', $result->getContent());

    $data = <<<'eot'
        [
            "Demo2::handle",
            "Demo3::handle(arg1:10,arg2:hello@handle)",
            "DemoForGroup::handle",
            "Demo1::terminate",
            "Demo2::terminate",
            "DemoForGroup::terminate"
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $GLOBALS['demo_middlewares']
        )
    );

    unset($GLOBALS['demo_middlewares']);
}
```
    
## 控制器支持冒号分隔为子目录

子目录支持无限层级。

**fixture 定义**

**Tests\Router\Controllers\Colon\Hello**

``` php
namespace Tests\Router\Controllers\Colon;

class Hello
{
    public function index(): string
    {
        return 'hello colon with controller';
    }
}
```


``` php
public function testColonInController(): void
{
    $pathInfo = '/:tests/colon:hello';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Router\\Controllers';
    $request = $this->createRequest($pathInfo, $attributes, $method);
    $router = $this->createRouter();
    $router->setControllerDir($controllerDir);
    $result = $router->dispatch($request);

    $this->assertInstanceof(Response::class, $result);
    $this->assertSame('hello colon with controller', $result->getContent());
}
```
    
## 控制器支持冒号分隔为子目录多层级例子

子目录支持无限层级。

**fixture 定义**

**Tests\Router\Controllers\ColonActionSingle\Hello\World\Foo\Index**

``` php
namespace Tests\Router\Controllers\ColonActionSingle\Hello\World\Foo;

class Index
{
    public function handle(): string
    {
        return 'hello colon with more than one in controller and action is single';
    }
}
```


``` php
public function testColonInControllerWithMoreThanOne(): void
{
    $pathInfo = '/:tests/colon:hello:world:foo';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Router\\Controllers';
    $request = $this->createRequest($pathInfo, $attributes, $method);
    $router = $this->createRouter();
    $router->setControllerDir($controllerDir);
    $result = $router->dispatch($request);

    $this->assertInstanceof(Response::class, $result);
    $this->assertSame('hello colon with more than one in controller', $result->getContent());
}
```
    
## 方法支持冒号分隔转为驼峰规则

冒号分隔方法，方法未独立成类，则将冒号转为驼峰规则。

下面例子中的方法为 `fooBar`。

**fixture 定义**

**Tests\Router\Controllers\Colon\Action**

``` php
namespace Tests\Router\Controllers\Colon;

class Action
{
    public function fooBar(): string
    {
        return 'hello colon with action and action is not single class';
    }

    public function moreFooBar(): string
    {
        return 'hello colon with action and action is not single class with more than one';
    }

    public function beforeButFirst(): string
    {
        return 'hello colon with action and action is not single class before but first';
    }
}
```


``` php
public function testColonInActionAndActionIsNotSingleClass(): void
{
    $pathInfo = '/:tests/colon:action/foo:bar';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Router\\Controllers';
    $request = $this->createRequest($pathInfo, $attributes, $method);
    $router = $this->createRouter();
    $router->setControllerDir($controllerDir);
    $result = $router->dispatch($request);

    $this->assertInstanceof(Response::class, $result);
    $this->assertSame('hello colon with action and action is not single class', $result->getContent());
}
```
    
## 方法独立为类支持冒号分隔转为子目录

冒号分隔方法，方法独立成类，则将冒号转为子目录。

子目录支持无限层级。

**fixture 定义**

**Tests\Router\Controllers\ColonActionSingle\Action\Foo\Bar**

``` php
namespace Tests\Router\Controllers\ColonActionSingle\Action\Foo;

class Bar
{
    public function handle(): string
    {
        return 'hello colon with action and action is not single class and action is single';
    }
}
```


``` php
public function testColonInActionAndActionIsSingleClass(): void
{
    $pathInfo = '/:tests/colonActionSingle:action/foo:bar';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Router\\Controllers';
    $request = $this->createRequest($pathInfo, $attributes, $method);
    $router = $this->createRouter();
    $router->setControllerDir($controllerDir);
    $result = $router->dispatch($request);

    $this->assertInstanceof(Response::class, $result);
    $this->assertSame('hello colon with action and action is not single class and action is single', $result->getContent());
}
```
    
## RESTFUL 控制器支持冒号分隔为子目录

子目录支持无限层级。

**fixture 定义**

**Tests\Router\Controllers\ColonRestful\Hello\Show**

``` php
namespace Tests\Router\Controllers\ColonRestful\Hello;

class Show
{
    public function handle(): string
    {
        return 'hello colon restful with controller';
    }
}
```


``` php
public function testColonRestfulInControllerWithActionIsNotSingleClass(): void
{
    $pathInfo = '/:tests/colonRestful:hello/5';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Router\\Controllers';
    $request = $this->createRequest($pathInfo, $attributes, $method);
    $router = $this->createRouter();
    $router->setControllerDir($controllerDir);
    $result = $router->dispatch($request);

    $this->assertInstanceof(Response::class, $result);
    $this->assertSame('hello colon restful with controller', $result->getContent());
}
```
    
## RESTFUL 方法支持冒号分隔转为驼峰规则

冒号分隔方法，方法未独立成类，则将冒号转为驼峰规则。

下面例子中的方法为 `fooBar`。

**fixture 定义**

**Tests\Router\Controllers\ColonRestful\Hello**

``` php
namespace Tests\Router\Controllers\ColonRestful;

class Hello
{
    public function fooBar(): string
    {
        return 'hello colon restful with controller and action fooBar';
    }
}
```


``` php
public function testColonRestfulInActionWithActionIsNotSingleClass(): void
{
    $pathInfo = '/:tests/colonRestful:hello/5/foo:bar';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Router\\Controllers';
    $request = $this->createRequest($pathInfo, $attributes, $method);
    $router = $this->createRouter();
    $router->setControllerDir($controllerDir);
    $result = $router->dispatch($request);

    $this->assertInstanceof(Response::class, $result);
    $this->assertSame('hello colon restful with controller and action fooBar', $result->getContent());
}
```
    
## RESTFUL 方法支持冒号分隔为子目录

子目录支持无限层级。

**fixture 定义**

**Tests\Router\Controllers\ColonRestfulActionSingle\Hello\Foo\Bar**

``` php
namespace Tests\Router\Controllers\ColonRestfulActionSingle\Hello\Foo;

class Bar
{
    public function handle(): string
    {
        return 'hello colon restful with action and action is single';
    }
}
```


``` php
public function testColonRestfulInActionWithActionIsSingleClass(): void
{
    $pathInfo = '/:tests/colonRestfulActionSingle:hello/5/foo:bar';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Router\\Controllers';
    $request = $this->createRequest($pathInfo, $attributes, $method);
    $router = $this->createRouter();
    $router->setControllerDir($controllerDir);
    $result = $router->dispatch($request);

    $this->assertInstanceof(Response::class, $result);
    $this->assertSame('hello colon restful with action and action is single', $result->getContent());
}
```
    
## 应用支持冒号分隔为子目录

子目录支持无限层级。

**fixture 定义**

**Tests\Router\SubAppController\Router\Controllers\Hello**

``` php
namespace Tests\Router\SubAppController\Router\Controllers;

class Hello
{
    public function index(): string
    {
        return 'hello sub app';
    }
}
```


``` php
public function testColonInApp(): void
{
    $pathInfo = '/:tests:router:subAppController/hello';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Router\\Controllers';
    $request = $this->createRequest($pathInfo, $attributes, $method);
    $router = $this->createRouter();
    $router->setControllerDir($controllerDir);
    $result = $router->dispatch($request);

    $this->assertInstanceof(Response::class, $result);
    $this->assertSame('hello sub app', $result->getContent());
}
```