# 路由服务提供者

::: tip Testing Is Documentation
[tests/Router/RouterProviderTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Router/RouterProviderTest.php)
:::
    
路由主要由路由服务来接入框架，可以做一些设置。

``` php
namespace App\Infra\Provider;

use App\Middleware\Auth;
use Leevel\Router\RouterProvider;
use Leevel\Session\Middleware\Session;
use Leevel\Throttler\Middleware\Throttler;

class Router extends RouterProvider
{
    /**
     * 控制器相对目录.
     */
    protected ?string $controllerDir = 'Controller';

    /**
     * 中间件分组.
     *
     * - 分组可以很方便地批量调用组件.
     */
    protected array $middlewareGroups = [
        // web 请求中间件
        'web' => [
            'session',
        ],

        // api 请求中间件
        'api' => [],
    ];

    /**
     * 中间件别名.
     *
     * - HTTP 中间件提供一个方便的机制来过滤进入应用程序的 HTTP 请求.
     * - 例外在应用执行结束后响应环节也会调用 HTTP 中间件.
     */
    protected array $middlewareAlias = [
        'auth'       => Auth::class,
        'session'    => Session::class,
    ];

    /**
     * 基础路径.
     */
    protected array $basePaths = [
        'api/test' => [
            'middlewares' => 'api',
        ],
        'api/v*' => [
            'middlewares' => 'auth',
        ],
    ];

    /**
     * 分组.
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
     * {@inheritDoc}
     */
    public function bootstrap(): void
    {
        parent::bootstrap();
    }

    /**
     * {@inheritDoc}
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
use Leevel\Kernel\App;
use Leevel\Router\Router;
use Leevel\Router\RouterProvider;
use Leevel\Router\ScanRouter;
use Leevel\Router\Url;
use Tests\Router\Middlewares\Demo1;
use Tests\Router\Middlewares\Demo2;
use Tests\Router\Middlewares\Demo3;
```

## 基本使用

QueryPHP 路由最终结果主要由 `base_paths`、`groups` 和 `routers` 构成。

**fixture 定义**

**路由服务提供者 Tests\Router\RouterProvider1**

``` php
namespace Tests\Router;

class RouterProvider1 extends RouterProvider
{
    protected ?string $controllerDir = 'Tests\\Router\\Apps';

    protected array $middlewareGroups = [
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
    ];

    protected array $middlewareAlias = [
        'demo1' => Demo1::class,
        'demo2' => Demo2::class,
        'demo3' => Demo3::class,
    ];

    protected array $basePaths = [];

    protected array $groups = [
        'pet'     => [],
        'store'   => [],
        'user'    => [],
        '/api/v1' => [
            'middlewares' => 'group1',
        ],
        '/api/v2' => [
            'middlewares' => 'group2',
        ],
        '/api/v3' => [
            'middlewares' => 'demo1,demo3:30,world',
        ],
        '/api/v3' => [
            'middlewares' => ['demo1', 'group3'],
        ],
        '/api/v4' => [
            'middlewares' => 'notFound',
        ],
    ];

    public function bootstrap(): void
    {
        parent::bootstrap();
    }

    public function getRouters(): array
    {
        return parent::getRouters();
    }

    protected function makeScanRouter(): ScanRouter
    {
        $scanRouter = parent::makeScanRouter();
        $scanRouter->setControllerDir('');

        return $scanRouter;
    }
}
```

**路由注解缓存结果 tests/Router/Apps/AppScanRouter/data.json**

``` json
{
    "base_paths": {
        "\/^\\\/api\\\/v1(\\S*)\\\/$\/": {
            "middlewares": {
                "handle": [
                    "Tests\\Router\\Middlewares\\Demo2@handle"
                ],
                "terminate": [
                    "Tests\\Router\\Middlewares\\Demo1@terminate",
                    "Tests\\Router\\Middlewares\\Demo2@terminate"
                ]
            }
        },
        "\/^\\\/api\\\/v2(\\S*)\\\/$\/": {
            "middlewares": {
                "handle": [
                    "Tests\\Router\\Middlewares\\Demo3@handle:10,world"
                ],
                "terminate": [
                    "Tests\\Router\\Middlewares\\Demo1@terminate"
                ]
            }
        },
        "\/^\\\/api\\\/v3(\\S*)\\\/$\/": {
            "middlewares": {
                "handle": [
                    "Tests\\Router\\Middlewares\\Demo2@handle",
                    "Tests\\Router\\Middlewares\\Demo3@handle:10,world"
                ],
                "terminate": [
                    "Tests\\Router\\Middlewares\\Demo1@terminate",
                    "Tests\\Router\\Middlewares\\Demo2@terminate"
                ]
            }
        }
    },
    "groups": [
        "\/pet",
        "\/store",
        "\/user",
        "\/api\/v1",
        "\/api\/v2",
        "\/api\/v3",
        "\/api\/v4"
    ],
    "routers": {
        "get": {
            "a": {
                "\/api\/v1": {
                    "\/api\/v1\/petLeevel\/{petId:[A-Za-z]+}\/": {
                        "bind": "\\Tests\\Router\\Apps\\AppScanRouter\\Controllers\\Pet@petLeevel",
                        "var": [
                            "petId"
                        ]
                    },
                    "regex": [
                        "~^(?|\/api\/v1\/petLeevel\/([A-Za-z]+)\/)$~x"
                    ],
                    "map": [
                        {
                            "2": "\/api\/v1\/petLeevel\/{petId:[A-Za-z]+}\/"
                        }
                    ]
                }
            },
            "static": {
                "\/web\/petLeevelWithPort\/": {
                    "bind": "\\Tests\\Router\\Apps\\AppScanRouter\\Controllers\\Pet@petLeevelWithPort",
                    "port": 9527
                }
            }
        }
    }
}
```


``` php
public function testBaseUse(): void
{
    $container = Container::singletons();
    $app = new App($container, '');
    $app->setAppPath(__DIR__.'/Apps/AppScanRouter');
    $app->setPath(__DIR__.'/Apps/AppScanRouter');
    $app->setRouterCachedPath(__DIR__.'/router_cached.php');

    $container->instance('app', $app);
    $container->instance('router', $router = $this->createRouter($container));

    $provider = new RouterProvider1($container);

    $this->assertNull($provider->register());
    $this->assertNull($provider->bootstrap());

    $data = file_get_contents(__DIR__.'/Apps/AppScanRouter/data.json');

    $this->assertSame(
        $data,
        $this->varJson(
            [
                'base_paths'  => $router->getBasePaths(),
                'groups'      => $router->getGroups(),
                'routers'     => $router->getRouters(),
            ]
        )
    );

    Container::singletons()->clear();
}
```