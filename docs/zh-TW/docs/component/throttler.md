# 节流器

::: tip Testing Is Documentation
[tests/Throttler/ThrottlerTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Throttler/ThrottlerTest.php)
:::
    
节流器主要通过路由服务提供者来调用节流器中间件 `throttler:60,1` 实现限速。

路由服务提供者 **Common\Infra\Provider\Router**

``` php
<?php

declare(strict_types=1);

/*
 * This file is part of the your app package.
 *
 * The PHP Application For Code Poem For You.
 * (c) 2018-2099 http://yourdomian.com All rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Common\Infra\Provider;

use Leevel\Di\IContainer;
use Leevel\Router\RouterProvider;

/**
 * 路由服务提供者.
 */
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
     * 创建一个服务容器提供者实例.
     */
    public function __construct(IContainer $container)
    {
        parent::__construct($container);

        if ($container->make('app')->debug()) {
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

use Leevel\Cache\File;
use Leevel\Cache\ICache;
use Leevel\Http\Request;
use Leevel\Throttler\Throttler;
```

## 基本使用

节流器主要通过 `attempt` 和 `tooManyAttempt` 来执行限制请求。

**attempt 原型**

``` php
/**
 * 验证并执行请求.
 */
public function attempt(): bool;
```

**tooManyAttempt 原型**

``` php
/**
 * 判断资源是否被耗尽.
 */
public function tooManyAttempt(): bool;
```


``` php
public function testBaseUse(): void
{
    $throttler = $this->createRateLimiter();

    $rateLimiter = $throttler->create('baseuse');

    $this->assertFalse($rateLimiter->attempt());
    $this->assertFalse($rateLimiter->tooManyAttempt());
    $this->assertInstanceof(ICache::class, $rateLimiter->getCache());

    // with_cache
    $this->assertCount(1, $this->getTestProperty($throttler, 'rateLimiter'));
    $rateLimiter2 = $throttler->create('baseuse');
    $this->assertFalse($rateLimiter2->attempt());
    $this->assertFalse($rateLimiter2->tooManyAttempt());
    $this->assertCount(1, $this->getTestProperty($throttler, 'rateLimiter'));

    $path = __DIR__.'/cache2';

    unlink($path.'/baseuse.php');
}
```
    
## 限流例子

``` php
public function testAttempt(): void
{
    $throttler = $this->createRateLimiter();

    $rateLimiter = $throttler->create('attempt', 2, 1);

    for ($i = 0; $i < 10; $i++) {
        $rateLimiter->hit();
    }

    $this->assertTrue($rateLimiter->attempt());
    $this->assertTrue($rateLimiter->tooManyAttempt());

    $path = __DIR__.'/cache2';

    unlink($path.'/attempt.php');
}
```