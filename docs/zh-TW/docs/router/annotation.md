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
    protected string $controllerDir = 'Router\\Controllers';

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
                    "bind": null
                },
                "\/bindNotSet\/test2\/": {
                    "bind": null
                },
                "\/domain\/test\/": {
                    "domain": "queryphp.com",
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Domain@fooNotMatchedDomain"
                },
                "\/domain\/test2\/": {
                    "domain": "queryphp.com",
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Domain@barMatchedDomain"
                },
                "\/domain\/test3\/": {
                    "domain": "{subdomain:[A-Za-z]+}-vip.{domain}.queryphp.com",
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Domain@barMatchedDomainWithVar",
                    "domain_regex": "\/^([A-Za-z]+)\\-vip\\.(\\S+)\\.queryphp\\.com$\/",
                    "domain_var": [
                        "subdomain",
                        "domain"
                    ]
                },
                "\/domain\/test4\/": {
                    "domain": "api.queryphp.com",
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Domain@barMatchedDomainWithoutExtend"
                },
                "\/extendVar\/test\/": {
                    "attributes": {
                        "args1": "hello",
                        "args2": "world"
                    },
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\ExtendVar@withExtendVar"
                },
                "\/middleware\/test\/": {
                    "middlewares": {
                        "handle": [
                            "Tests\\Router\\Middlewares\\Demo2@handle"
                        ],
                        "terminate": [
                            "Tests\\Router\\Middlewares\\Demo1@terminate",
                            "Tests\\Router\\Middlewares\\Demo2@terminate"
                        ]
                    },
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Middleware@foo"
                },
                "\/middleware\/test2\/": {
                    "middlewares": {
                        "handle": [
                            "Tests\\Router\\Middlewares\\Demo2@handle",
                            "Tests\\Router\\Middlewares\\Demo3@handle:10,world"
                        ],
                        "terminate": [
                            "Tests\\Router\\Middlewares\\Demo1@terminate",
                            "Tests\\Router\\Middlewares\\Demo2@terminate"
                        ]
                    },
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Middleware@bar"
                },
                "\/middleware\/test3\/": {
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
                    },
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Middleware@hello"
                },
                "\/middleware\/test4\/": {
                    "middlewares": {
                        "handle": [],
                        "terminate": [
                            "Tests\\Router\\Middlewares\\Demo1@terminate"
                        ]
                    },
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Middleware@world"
                },
                "\/port\/test\/": {
                    "port": 9527,
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Port@fooNotMatchedPort"
                },
                "\/port\/test2\/": {
                    "port": 9527,
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Port@barMatchedPort"
                },
                "\/scheme\/test\/": {
                    "scheme": "https",
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Scheme@fooNotMatchedScheme"
                },
                "\/scheme\/test2\/": {
                    "scheme": "http",
                    "bind": "\\Tests\\Router\\Apps\\AppForAnnotation\\Controllers\\Scheme@barMatchedScheme"
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
/**
 * @OA\Get(
 *     path="/api/v1/petLeevel/{petId:[A-Za-z]+}/",
 *     tags={"pet"},
 *     summary="Just test the router",
 *     operationId="petLeevel",
 *     @OA\Parameter(
 *         name="petId",
 *         in="path",
 *         description="ID of pet to return",
 *         required=true,
 *         @OA\Schema(
 *             type="integer",
 *             format="int64"
 *         )
 *     ),
 *     @OA\Response(
 *         response=405,
 *         description="Invalid input"
 *     ),
 *     security={
 *         {"petstore_auth": {"write:pets", "read:pets"}}
 *     },
 *     requestBody={"$ref": "#/components/requestBodies/Pet"},
 *     leevelBind="\Tests\Router\Controllers\Annotation\PetLeevel"
 * )
 */
public function petLeevel();
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
/**
 * @OA\Get(
 *     path="/basePath/normalize/",
 *     tags={"pet"},
 *     summary="Just test the router",
 *     operationId="petLeevel",
 *     @OA\Parameter(
 *         name="petId",
 *         in="path",
 *         description="ID of pet to return",
 *         required=true,
 *         @OA\Schema(
 *             type="integer",
 *             format="int64"
 *         )
 *     ),
 *     @OA\Response(
 *         response=405,
 *         description="Invalid input"
 *     ),
 *     security={
 *         {"petstore_auth": {"write:pets", "read:pets"}}
 *     },
 *     requestBody={"$ref": "#/components/requestBodies/Pet"},
 *     leevelBind="Tests\Router\Controllers\Annotation\BasePath@normalize"
 * )
 */
public function foo();
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
    
## leevelScheme 协议匹配

**fixture 定义**

**路由定义**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Scheme::barMatchedScheme
/**
 * @OA\Get(
 *     path="/scheme/test2",
 *     tags={"pet"},
 *     summary="Just test the router",
 *     operationId="petLeevel",
 *     @OA\Parameter(
 *         name="petId",
 *         in="path",
 *         description="ID of pet to return",
 *         required=true,
 *         @OA\Schema(
 *             type="integer",
 *             format="int64"
 *         )
 *     ),
 *     @OA\Response(
 *         response=405,
 *         description="Invalid input"
 *     ),
 *     security={
 *         {"petstore_auth": {"write:pets", "read:pets"}}
 *     },
 *     requestBody={"$ref": "#/components/requestBodies/Pet"},
 *     leevelScheme="http"
 * )
 */
public function barMatchedScheme();
```

**控制器**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Scheme::barMatchedScheme
public function barMatchedScheme()
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
    
## leevelDomain 域名匹配

**fixture 定义**

**路由定义**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Domain::barMatchedDomain
/**
 * @OA\Get(
 *     path="/domain/test2",
 *     tags={"pet"},
 *     summary="Just test the router",
 *     operationId="petLeevel",
 *     @OA\Parameter(
 *         name="petId",
 *         in="path",
 *         description="ID of pet to return",
 *         required=true,
 *         @OA\Schema(
 *             type="integer",
 *             format="int64"
 *         )
 *     ),
 *     @OA\Response(
 *         response=405,
 *         description="Invalid input"
 *     ),
 *     security={
 *         {"petstore_auth": {"write:pets", "read:pets"}}
 *     },
 *     requestBody={"$ref": "#/components/requestBodies/Pet"},
 *     leevelDomain="queryphp.com"
 * )
 */
public function barMatchedDomain();
```

**控制器**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Domain::barMatchedDomain
public function barMatchedDomain()
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
    
## leevelDomain 域名匹配支持变量

**fixture 定义**

**路由定义**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Domain::barMatchedDomainWithVar
/**
 * @OA\Get(
 *     path="/domain/test3",
 *     tags={"pet"},
 *     summary="Just test the router",
 *     operationId="petLeevel",
 *     @OA\Parameter(
 *         name="petId",
 *         in="path",
 *         description="ID of pet to return",
 *         required=true,
 *         @OA\Schema(
 *             type="integer",
 *             format="int64"
 *         )
 *     ),
 *     @OA\Response(
 *         response=405,
 *         description="Invalid input"
 *     ),
 *     security={
 *         {"petstore_auth": {"write:pets", "read:pets"}}
 *     },
 *     requestBody={"$ref": "#/components/requestBodies/Pet"},
 *     leevelDomain="{subdomain:[A-Za-z]+}-vip.{domain}.queryphp.com"
 * )
 */
public function barMatchedDomainWithVar(Request $request);
```

**控制器**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Domain::barMatchedDomainWithVar
public function barMatchedDomainWithVar(Request $request)
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
    
## leevelPort 端口匹配

**fixture 定义**

**路由定义**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Port::barMatchedPort
/**
 * @OA\Get(
 *     path="/port/test2",
 *     tags={"pet"},
 *     summary="Just test the router",
 *     operationId="petLeevel",
 *     @OA\Parameter(
 *         name="petId",
 *         in="path",
 *         description="ID of pet to return",
 *         required=true,
 *         @OA\Schema(
 *             type="integer",
 *             format="int64"
 *         )
 *     ),
 *     @OA\Response(
 *         response=405,
 *         description="Invalid input"
 *     ),
 *     security={
 *         {"petstore_auth": {"write:pets", "read:pets"}}
 *     },
 *     requestBody={"$ref": "#/components/requestBodies/Pet"},
 *     leevelPort=9527
 * )
 */
public function barMatchedPort();
```

**控制器**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Port::barMatchedPort
public function barMatchedPort()
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
    
## leevelAttributes 扩展变量匹配

**fixture 定义**

**路由定义**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\ExtendVar::withExtendVar
/**
 * @OA\Get(
 *     path="/extendVar/test",
 *     tags={"pet"},
 *     summary="Just test the router",
 *     operationId="petLeevel",
 *     @OA\Parameter(
 *         name="petId",
 *         in="path",
 *         description="ID of pet to return",
 *         required=true,
 *         @OA\Schema(
 *             type="integer",
 *             format="int64"
 *         )
 *     ),
 *     @OA\Response(
 *         response=405,
 *         description="Invalid input"
 *     ),
 *     security={
 *         {"petstore_auth": {"write:pets", "read:pets"}}
 *     },
 *     requestBody={"$ref": "#/components/requestBodies/Pet"},
 *     leevelAttributes={"args1": "hello", "args2": "world"}
 * )
 */
public function withExtendVar(Request $request);
```

**控制器**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\ExtendVar::withExtendVar
public function withExtendVar(Request $request)
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
    
## leevelMiddlewares 中间件匹配

**fixture 定义**

**路由定义**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Middleware::foo
/**
 * @OA\Get(
 *     path="/middleware/test",
 *     tags={"pet"},
 *     summary="Just test the router",
 *     operationId="petLeevel",
 *     @OA\Parameter(
 *         name="petId",
 *         in="path",
 *         description="ID of pet to return",
 *         required=true,
 *         @OA\Schema(
 *             type="integer",
 *             format="int64"
 *         )
 *     ),
 *     @OA\Response(
 *         response=405,
 *         description="Invalid input"
 *     ),
 *     security={
 *         {"petstore_auth": {"write:pets", "read:pets"}}
 *     },
 *     requestBody={"$ref": "#/components/requestBodies/Pet"},
 *     leevelMiddlewares="group1"
 * )
 */
public function foo();
```

**控制器**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Middleware::foo
public function foo()
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
    
## leevelMiddlewares 中间件匹配支持数组

**fixture 定义**

**路由定义**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Middleware::bar
/**
 * @OA\Get(
 *     path="/middleware/test2",
 *     tags={"pet"},
 *     summary="Just test the router",
 *     operationId="petLeevel",
 *     @OA\Parameter(
 *         name="petId",
 *         in="path",
 *         description="ID of pet to return",
 *         required=true,
 *         @OA\Schema(
 *             type="integer",
 *             format="int64"
 *         )
 *     ),
 *     @OA\Response(
 *         response=405,
 *         description="Invalid input"
 *     ),
 *     security={
 *         {"petstore_auth": {"write:pets", "read:pets"}}
 *     },
 *     requestBody={"$ref": "#/components/requestBodies/Pet"},
 *     leevelMiddlewares={"group1", "group2"}
 * )
 */
public function bar();
```

**控制器**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Middleware::bar
public function bar()
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
    
## leevelMiddlewares 中间件匹配支持类名

**fixture 定义**

**路由定义**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Middleware::world
/**
 * @OA\Get(
 *     path="/middleware/test4",
 *     tags={"pet"},
 *     summary="Just test the router",
 *     operationId="petLeevel",
 *     @OA\Parameter(
 *         name="petId",
 *         in="path",
 *         description="ID of pet to return",
 *         required=true,
 *         @OA\Schema(
 *             type="integer",
 *             format="int64"
 *         )
 *     ),
 *     @OA\Response(
 *         response=405,
 *         description="Invalid input"
 *     ),
 *     security={
 *         {"petstore_auth": {"write:pets", "read:pets"}}
 *     },
 *     requestBody={"$ref": "#/components/requestBodies/Pet"},
 *     leevelMiddlewares={"Tests\Router\Middlewares\Demo1"}
 * )
 */
public function world();
```

**控制器**

``` php
# Tests\Router\Apps\AppForAnnotation\Controllers\Middleware::world
public function world()
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