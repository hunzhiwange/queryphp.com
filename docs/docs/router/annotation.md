# 注解路由

::: tip Testing Is Documentation
[tests/Router/RouterAnnotationTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Router/RouterAnnotationTest.php)
:::
    
QueryPHP 除了传统的自动匹配 MVC 路由之外，也支持自定义的注解路由。


**Uses**

``` php
<?php

use Leevel\Di\Container;
use Leevel\Di\IContainer;
use Leevel\Http\Request;
use Leevel\Kernel\App;
use Leevel\Router\Router;
use Leevel\Router\RouterProvider;
use Leevel\Router\ScanRouter;
use Leevel\Router\Url;
use Symfony\Component\HttpFoundation\Response;
use Tests\Router\Middlewares\Demo1;
use Tests\Router\Middlewares\Demo2;
use Tests\Router\Middlewares\Demo3;
use Tests\Router\Middlewares\DemoForAll;
use Tests\Router\Middlewares\DemoForBasePath;
```

## 注解路由扫描

QueryPHP 系统会根据路由服务提供者信息，扫描系统的注解生成框架的注解路由，并且支持缓存到文件。

**fixture 定义**

**路由服务提供者 Tests\Router\RouterProviderAnnotation**

``` php
namespace Tests\Router;

class RouterProviderAnnotation extends RouterProvider
{
    protected ?string $controllerDir = 'Router\\Controllers';

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
        'demo1'              => Demo1::class,
        'demo2'              => Demo2::class,
        'demo3'              => Demo3::class,
        'demo_for_base_path' => DemoForBasePath::class,
        'demo_for_all'       => DemoForAll::class,
    ];

    protected array $basePaths = [
        '*' => [
            'middlewares' => 'demo_for_all',
        ],
        '/basePath/normalize' => [
            'middlewares' => 'demo_for_base_path',
        ],
    ];

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
        'newPrefix/v1'    => [],
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

**路由注解缓存结果 tests/Router/Apps/AppForAnnotation/data.json**

``` json
{
    "base_paths": {
        "*": {
            "middlewares": {
                "handle": [
                    "Tests\\Router\\Middlewares\\DemoForAll@handle"
                ],
                "terminate": [
                    "Tests\\Router\\Middlewares\\DemoForAll@terminate"
                ]
            }
        },
        "\/^\\\/basePath\\\/normalize\\\/$\/": {
            "middlewares": {
                "handle": [
                    "Tests\\Router\\Middlewares\\DemoForBasePath@handle"
                ]
            }
        },
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
        "\/api\/v4",
        "\/newPrefix\/v1"
    ],
    "routers": {
        "get": {
            "static": {
                "\/basePath\/normalize\/": {
                    "bind": "\\Tests\\Router\\Controllers\\Annotation\\BasePath@normalize"
                },
                "\/bindNotFound\/test\/": {
                    "bind": "\\Tests\\Router\\Controllers\\Annotation\\BindNotFound@notFound"
                },
                "\/bindNotFound\/test2\/": {
                    "bind": "\\Tests\\Router\\Controllers\\Annotation\\BindNotFound"
                },
                "\/bindNotFound\/test3\/": {
                    "bind": "\\Tests\\Router\\Controllers\\Annotation\\BindMethodNotFound"
                },
                "\/bindNotSet\/test\/": {
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\BindNotSet@routePlaceholderFoo"
                },
                "\/bindNotSet\/test2\/": {
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\BindNotSet@routePlaceholderBar"
                },
                "\/domain\/test\/": {
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Domain@fooNotMatchedDomain",
                    "domain": "queryphp.com"
                },
                "\/domain\/test2\/": {
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Domain@barMatchedDomain",
                    "domain": "queryphp.com"
                },
                "\/domain\/test3\/": {
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Domain@barMatchedDomainWithVar",
                    "domain": "{subdomain:[A-Za-z]+}-vip.{domain}.queryphp.com",
                    "domain_regex": "\/^([A-Za-z]+)\\-vip\\.(\\S+)\\.queryphp\\.com$\/",
                    "domain_var": [
                        "subdomain",
                        "domain"
                    ]
                },
                "\/domain\/test4\/": {
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Domain@barMatchedDomainWithoutExtend",
                    "domain": "api.queryphp.com"
                },
                "\/extendVar\/test\/": {
                    "attributes": {
                        "args1": "hello",
                        "args2": "world"
                    },
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\ExtendVar@withExtendVar"
                },
                "\/middleware\/test\/": {
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Middleware@foo",
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
                "\/middleware\/test2\/": {
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Middleware@bar",
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
                },
                "\/middleware\/test3\/": {
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Middleware@hello",
                    "middlewares": {
                        "handle": [
                            "Tests\\Router\\Middlewares\\Demo2@handle",
                            "Tests\\Router\\Middlewares\\Demo3@handle:10,world",
                            "Tests\\Router\\Middlewares\\DemoForBasePath@handle"
                        ],
                        "terminate": [
                            "Tests\\Router\\Middlewares\\Demo1@terminate",
                            "Tests\\Router\\Middlewares\\Demo2@terminate"
                        ]
                    }
                },
                "\/middleware\/test4\/": {
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Middleware@world",
                    "middlewares": {
                        "handle": [],
                        "terminate": [
                            "Tests\\Router\\Middlewares\\Demo1@terminate"
                        ]
                    }
                },
                "\/port\/test\/": {
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Port@fooNotMatchedPort",
                    "port": 9527
                },
                "\/port\/test2\/": {
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Port@barMatchedPort",
                    "port": 9527
                },
                "\/scheme\/test\/": {
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Scheme@fooNotMatchedScheme",
                    "scheme": "https"
                },
                "\/scheme\/test2\/": {
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Scheme@barMatchedScheme",
                    "scheme": "http"
                }
            },
            "a": {
                "\/api\/v1": {
                    "\/api\/v1\/petLeevel\/{petId:[A-Za-z]+}\/": {
                        "bind": "\\Tests\\Router\\Controllers\\Annotation\\PetLeevel",
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
                },
                "_": {
                    "\/api\/notInGroup\/petLeevel\/{petId:[A-Za-z]+}\/": {
                        "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Pet@petLeevelNotInGroup",
                        "var": [
                            "petId"
                        ]
                    },
                    "regex": [
                        "~^(?|\/api\/notInGroup\/petLeevel\/([A-Za-z]+)\/)$~x"
                    ],
                    "map": [
                        {
                            "2": "\/api\/notInGroup\/petLeevel\/{petId:[A-Za-z]+}\/"
                        }
                    ]
                }
            },
            "n": {
                "\/newPrefix\/v1": {
                    "\/newPrefix\/v1\/petLeevel\/{petId:[A-Za-z]+}\/": {
                        "bind": "\\Tests\\Router\\Controllers\\Annotation\\NewPrefix",
                        "var": [
                            "petId"
                        ]
                    },
                    "regex": [
                        "~^(?|\/newPrefix\/v1\/petLeevel\/([A-Za-z]+)\/)$~x"
                    ],
                    "map": [
                        {
                            "2": "\/newPrefix\/v1\/petLeevel\/{petId:[A-Za-z]+}\/"
                        }
                    ]
                }
            }
        }
    }
}
```


``` php
public function testBaseRouterData(): void
{
    $container = $this->createContainer();

    $container->singleton('router', $router = $this->createRouter($container));

    $provider = new RouterProviderAnnotation($container);

    $this->assertNull($provider->register());
    $this->assertNull($provider->bootstrap());

    $data = file_get_contents(__DIR__.'/Apps/AppForAnnotation/data.json');

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
}
```
    
## 基本使用

**fixture 定义**

**路由定义**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Pet::petLeevel
private function petLeevel(): void;
```

**控制器**

``` php
namespace Tests\Router\Controllers\Annotation;

use Leevel\Di\IContainer;

class PetLeevel
{
    public function handle(IContainer $container): string
    {
        return 'hello plus for petLeevel, attributes petId is '.
            $container
                ->make('request')
                ->attributes
                ->get('petId');
    }
}
```


``` php
public function testMatchedPetLeevel(): void
{
    $pathInfo = '/api/v1/petLeevel/hello';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Controllers';

    $container = $this->createContainer();

    $request = $this->createRequest($pathInfo, $attributes, $method);
    $container->singleton('router', $router = $this->createRouter($container));
    $container->instance('request', $request);
    $container->instance(IContainer::class, $container);

    $provider = new RouterProviderAnnotation($container);

    $router->setControllerDir($controllerDir);

    $provider->register();
    $provider->bootstrap();

    if (isset($GLOBALS['demo_middlewares'])) {
        unset($GLOBALS['demo_middlewares']);
    }

    $response = $router->dispatch($request);

    $this->assertInstanceof(Response::class, $response);

    $this->assertSame('hello plus for petLeevel, attributes petId is hello', $response->getContent());

    $data = <<<'eot'
        [
            "DemoForAll::handle",
            "Demo2::handle"
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $GLOBALS['demo_middlewares']
        )
    );

    $router->throughMiddleware($request, [
        $response,
    ]);

    $data = <<<'eot'
        [
            "DemoForAll::handle",
            "Demo2::handle",
            "DemoForAll::terminate",
            "Demo1::terminate",
            "Demo2::terminate"
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $GLOBALS['demo_middlewares'],
            1
        )
    );

    unset($GLOBALS['demo_middlewares']);
}
```
    
## 基础路径匹配

**fixture 定义**

**路由定义**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\BasePath::foo
private function foo(): void;
```

**控制器**

``` php
namespace Tests\Router\Controllers\Annotation;

class BasePath
{
    public function normalize(): string
    {
        return 'hello plus for basePath normalize';
    }
}
```


``` php
public function testMatchedBasePathNormalize(): void
{
    $pathInfo = '/basePath/normalize';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Controllers';

    $container = $this->createContainer();

    $request = $this->createRequest($pathInfo, $attributes, $method);
    $container->singleton('router', $router = $this->createRouter($container));
    $container->instance('request', $request);
    $container->instance(IContainer::class, $container);

    $provider = new RouterProviderAnnotation($container);

    $provider->register();
    $provider->bootstrap();

    if (isset($GLOBALS['demo_middlewares'])) {
        unset($GLOBALS['demo_middlewares']);
    }

    $response = $router->dispatch($request);

    $this->assertInstanceof(Response::class, $response);

    $this->assertSame('hello plus for basePath normalize', $response->getContent());

    $data = <<<'eot'
        [
            "DemoForAll::handle",
            "DemoForBasePath::handle"
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $GLOBALS['demo_middlewares']
        )
    );

    $router->throughMiddleware($request, [
        $response,
    ]);

    $data = <<<'eot'
        [
            "DemoForAll::handle",
            "DemoForBasePath::handle",
            "DemoForAll::terminate"
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $GLOBALS['demo_middlewares'],
            1
        )
    );

    unset($GLOBALS['demo_middlewares']);
}
```
    
## Scheme 协议匹配

**fixture 定义**

**路由定义**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Scheme::barMatchedScheme
public function barMatchedScheme(): string;
```

**控制器**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Scheme::barMatchedScheme
public function barMatchedScheme(): string
{
    return 'barMatchedScheme';
}
```


``` php
public function testMatchedAndSchemeMatched(): void
{
    $pathInfo = '/scheme/test2';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Controllers';

    $container = $this->createContainer();

    $request = $this->createRequest($pathInfo, $attributes, $method);
    $container->singleton('router', $router = $this->createRouter($container));
    $container->instance('request', $request);
    $container->instance(IContainer::class, $container);

    $provider = new RouterProviderAnnotation($container);

    $router->setControllerDir($controllerDir);

    $provider->register();
    $provider->bootstrap();

    $result = $router->dispatch($request);

    $this->assertSame('barMatchedScheme', $result->getContent());
}
```
    
## Domain 域名匹配

**fixture 定义**

**路由定义**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Domain::barMatchedDomain
public function barMatchedDomain(): string;
```

**控制器**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Domain::barMatchedDomain
public function barMatchedDomain(): string
{
    return 'barMatchedDomain';
}
```


``` php
public function testMatchedAndDomainMatched(): void
{
    $pathInfo = '/domain/test2';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Controllers';

    $container = $this->createContainer();

    $request = new Request([], [], $attributes, [], [], ['HTTP_HOST' => 'queryphp.com']);
    $request->setPathInfo($pathInfo);
    $request->setMethod($method);

    $container->singleton('router', $router = $this->createRouter($container));
    $container->instance('request', $request);
    $container->instance(IContainer::class, $container);

    $provider = new RouterProviderAnnotation($container);

    $router->setControllerDir($controllerDir);

    $provider->register();
    $provider->bootstrap();

    $result = $router->dispatch($request);

    $this->assertSame('barMatchedDomain', $result->getContent());
}
```
    
## Domain 域名匹配支持变量

**fixture 定义**

**路由定义**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Domain::barMatchedDomainWithVar
public function barMatchedDomainWithVar(Request $request): string;
```

**控制器**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Domain::barMatchedDomainWithVar
public function barMatchedDomainWithVar(Request $request): string
{
    return 'barMatchedDomainWithVar and attributes are '.
        json_encode($request->attributes->all());
}
```


``` php
public function testMatchedAndDomainWithVarMatched(): void
{
    $pathInfo = '/domain/test3';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Controllers';

    $container = $this->createContainer();

    $request = new Request([], [], $attributes, [], [], ['HTTP_HOST' => 'foo-vip.bar.queryphp.com']);
    $request->setPathInfo($pathInfo);
    $request->setMethod($method);

    $container->instance(Request::class, $request);

    $container->singleton('router', $router = $this->createRouter($container));
    $container->instance('request', $request);
    $container->instance(IContainer::class, $container);

    $provider = new RouterProviderAnnotation($container);

    $router->setControllerDir($controllerDir);

    $provider->register();
    $provider->bootstrap();

    $result = $router->dispatch($request);

    $this->assertSame('barMatchedDomainWithVar and attributes are {"subdomain":"foo","domain":"bar"}', $result->getContent());
}
```
    
## Port 端口匹配

**fixture 定义**

**路由定义**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Port::barMatchedPort
public function barMatchedPort(): string;
```

**控制器**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Port::barMatchedPort
public function barMatchedPort(): string
{
    return 'barMatchedPort';
}
```


``` php
public function testMatchedAndPortMatched(): void
{
    $pathInfo = '/port/test2';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Controllers';

    $container = $this->createContainer();

    $request = new Request([], [], $attributes, [], [], ['SERVER_PORT' => '9527']);
    $request->setPathInfo($pathInfo);
    $request->setMethod($method);

    $container->singleton('router', $router = $this->createRouter($container));
    $container->instance('request', $request);
    $container->instance(IContainer::class, $container);

    $provider = new RouterProviderAnnotation($container);

    $router->setControllerDir($controllerDir);

    $provider->register();
    $provider->bootstrap();

    $result = $router->dispatch($request);

    $this->assertSame('barMatchedPort', $result->getContent());
}
```
    
## Attributes 扩展变量匹配

**fixture 定义**

**路由定义**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\ExtendVar::withExtendVar
public function withExtendVar(Request $request): string;
```

**控制器**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\ExtendVar::withExtendVar
public function withExtendVar(Request $request): string
{
    return 'withExtendVar and attributes are '.
        json_encode($request->attributes->all());
}
```


``` php
public function testMatchedWithExtendVar(): void
{
    $pathInfo = '/extendVar/test';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Controllers';

    $container = $this->createContainer();

    $request = new Request([], [], $attributes);
    $request->setPathInfo($pathInfo);
    $request->setMethod($method);

    $container->singleton('router', $router = $this->createRouter($container));
    $container->instance(Request::class, $request);
    $container->instance(IContainer::class, $container);

    $provider = new RouterProviderAnnotation($container);

    $router->setControllerDir($controllerDir);

    $provider->register();
    $provider->bootstrap();

    $result = $router->dispatch($request);

    $this->assertSame('withExtendVar and attributes are {"args1":"hello","args2":"world"}', $result->getContent());
}
```
    
## Middlewares 中间件匹配

**fixture 定义**

**路由定义**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Middleware::foo
public function foo(): string;
```

**控制器**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Middleware::foo
public function foo(): string
{
    return 'Middleware matched';
}
```


``` php
public function testMiddleware(): void
{
    $pathInfo = '/middleware/test';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Controllers';

    $container = $this->createContainer();

    $request = new Request([], [], $attributes);
    $request->setPathInfo($pathInfo);
    $request->setMethod($method);

    $container->singleton('router', $router = $this->createRouter($container));
    $container->instance(Request::class, $request);
    $container->instance(IContainer::class, $container);

    $provider = new RouterProviderAnnotation($container);

    $router->setControllerDir($controllerDir);

    $provider->register();
    $provider->bootstrap();

    if (isset($GLOBALS['demo_middlewares'])) {
        unset($GLOBALS['demo_middlewares']);
    }

    $result = $router->dispatch($request);

    $data = <<<'eot'
        [
            "DemoForAll::handle",
            "Demo2::handle"
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $GLOBALS['demo_middlewares']
        )
    );

    $router->throughMiddleware($request, [
        $result,
    ]);

    $data = <<<'eot'
        [
            "DemoForAll::handle",
            "Demo2::handle",
            "DemoForAll::terminate",
            "Demo1::terminate",
            "Demo2::terminate"
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $GLOBALS['demo_middlewares'],
            1
        )
    );

    $this->assertSame('Middleware matched', $result->getContent());

    unset($GLOBALS['demo_middlewares']);
}
```
    
## Middlewares 中间件匹配支持数组

**fixture 定义**

**路由定义**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Middleware::bar
public function bar(): string;
```

**控制器**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Middleware::bar
public function bar(): string
{
    return 'Middleware matched 2';
}
```


``` php
public function testMiddleware2(): void
{
    $pathInfo = '/middleware/test2';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Controllers';

    $container = $this->createContainer();

    $request = new Request([], [], $attributes);
    $request->setPathInfo($pathInfo);
    $request->setMethod($method);

    $container->singleton('router', $router = $this->createRouter($container));
    $container->instance(Request::class, $request);
    $container->instance(IContainer::class, $container);

    $provider = new RouterProviderAnnotation($container);

    $router->setControllerDir($controllerDir);

    $provider->register();
    $provider->bootstrap();

    if (isset($GLOBALS['demo_middlewares'])) {
        unset($GLOBALS['demo_middlewares']);
    }

    $result = $router->dispatch($request);

    $data = <<<'eot'
        [
            "DemoForAll::handle",
            "Demo2::handle",
            "Demo3::handle(arg1:10,arg2:world)"
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $GLOBALS['demo_middlewares']
        )
    );

    $router->throughMiddleware($request, [
        $result,
    ]);

    $data = <<<'eot'
        [
            "DemoForAll::handle",
            "Demo2::handle",
            "Demo3::handle(arg1:10,arg2:world)",
            "DemoForAll::terminate",
            "Demo1::terminate",
            "Demo2::terminate"
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $GLOBALS['demo_middlewares'],
            1
        )
    );

    $this->assertSame('Middleware matched 2', $result->getContent());

    unset($GLOBALS['demo_middlewares']);
}
```
    
## Middlewares 中间件匹配支持类名

**fixture 定义**

**路由定义**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Middleware::world
public function world(): string;
```

**控制器**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Middleware::world
public function world(): string
{
    return 'Middleware matched 4';
}
```


``` php
public function testMiddleware4(): void
{
    $pathInfo = '/middleware/test4';
    $attributes = [];
    $method = 'GET';
    $controllerDir = 'Controllers';

    $container = $this->createContainer();

    $request = new Request([], [], $attributes);
    $request->setPathInfo($pathInfo);
    $request->setMethod($method);

    $container->singleton('router', $router = $this->createRouter($container));
    $container->instance(Request::class, $request);
    $container->instance(IContainer::class, $container);

    $provider = new RouterProviderAnnotation($container);

    $router->setControllerDir($controllerDir);

    $provider->register();
    $provider->bootstrap();

    if (isset($GLOBALS['demo_middlewares'])) {
        unset($GLOBALS['demo_middlewares']);
    }

    $result = $router->dispatch($request);

    $data = <<<'eot'
        [
            "DemoForAll::handle"
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $GLOBALS['demo_middlewares']
        )
    );

    $router->throughMiddleware($request, [
        $result,
    ]);

    $data = <<<'eot'
        [
            "DemoForAll::handle",
            "DemoForAll::terminate",
            "Demo1::terminate"
        ]
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $GLOBALS['demo_middlewares'],
            1
        )
    );

    $this->assertSame('Middleware matched 4', $result->getContent());

    unset($GLOBALS['demo_middlewares']);
}
```