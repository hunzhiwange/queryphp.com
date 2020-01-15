# Auth

::: tip Testing Is Documentation
[tests/Auth/ManagerTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Auth/ManagerTest.php)
:::
    
QueryPHP 提供了一组简单的认证组件用于登陆验证，通常我们使用代理 `\Leevel\Auth\Proxy\Auth` 类进行静态调用。

内置支持的认证驱动类型包括 session、token，分别用于 web 和 api 的认证服务。

## 使用方式

使用容器 auths 服务

``` php
\App::make('auths')->login(array $data, int $loginTime = 0): void;
```

依赖注入

``` php
class Demo
{
    private \Leevel\Auth\Manager $auth;

    public function __construct(\Leevel\Auth\Manager $auth)
    {
        $this->auth = $auth;
    }
}
```

使用静态代理

``` php
\Leevel\Auth\Proxy\Auth::login(array $data, int $loginTime = 0): void;
```

## auth 配置

系统的 auth 配置位于应用下面的 `option/auth.php` 文件。

可以定义多个认证连接，并且支持切换，每一个连接支持驱动设置。

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

return [
    /*
     * ---------------------------------------------------------------
     * 默认认证类型
     * ---------------------------------------------------------------
     *
     * 这里可以是 web 或者 api
     */
    'default' => 'api',

    /*
     * ---------------------------------------------------------------
     * 默认 WEB 驱动
     * ---------------------------------------------------------------
     *
     * WEB 认证驱动连接
     */
    'web_default' => 'session',

    /*
     * ---------------------------------------------------------------
     * 默认 API 驱动
     * ---------------------------------------------------------------
     *
     * API 认证驱动连接
     */
    'api_default' => 'token',

    /*
     * ---------------------------------------------------------------
     * auth 连接参数
     * ---------------------------------------------------------------
     *
     * 这里为所有的 auth 的连接参数，每一种不同的驱动拥有不同的配置
     * 虽然有不同的驱动，但是在验证使用上却有着一致性
     */
    'connect' => [
        'session' => [
            // driver
            'driver' => 'session',

            // token
            'token' => 'token',
        ],

        'token' => [
            // driver
            'driver' => 'token',

            // token
            'token' => null,

            // input token
            'input_token' => 'token',
        ],
    ],
];

```

auth 参数根据不同的连接会有所区别，通用的 auth 参数如下：

|配置项|配置描述|
|:-|:-|
|web_default|WEB 认证驱动连接|
|api_default|API 认证驱动连接|


**Uses**

``` php
<?php

use Leevel\Auth\Manager;
use Leevel\Cache\File as CacheFile;
use Leevel\Di\Container;
use Leevel\Di\IContainer;
use Leevel\Http\IRequest;
use Leevel\Option\Option;
use Leevel\Session\File as SessionFile;
```

## 认证基本使用

``` php
public function testBaseUse(): void
{
    $manager = $this->createManager();

    $this->assertFalse($manager->isLogin());
    $this->assertSame([], $manager->getLogin());

    $this->assertNull($manager->login(['foo' => 'bar', 'hello' => 'world'], 10));

    $this->assertTrue($manager->isLogin());
    $this->assertSame(['foo' => 'bar', 'hello' => 'world'], $manager->getLogin());

    $this->assertNull($manager->logout());

    $this->assertFalse($manager->isLogin());
    $this->assertSame([], $manager->getLogin());
}
```
    
## setTokenName 设置认证名字

``` php
public function testWithToken(): void
{
    $manager = $this->createManagerWithToken();

    $manager->setTokenName('token');

    $this->assertFalse($manager->isLogin());
    $this->assertSame([], $manager->getLogin());

    $this->assertNull($manager->login(['foo' => 'bar', 'hello' => 'world'], 10));

    $this->assertTrue($manager->isLogin());
    $this->assertSame(['foo' => 'bar', 'hello' => 'world'], $manager->getLogin());

    $this->assertNull($manager->logout());

    $this->assertFalse($manager->isLogin());
    $this->assertSame([], $manager->getLogin());
}
```
    
## setDefaultDriver 设置默认驱动

``` php
public function testSetDefaultDriver(): void
{
    $manager = $this->createManagerWithTokenAndSession();

    $manager->setDefaultDriver('token');

    $manager->setTokenName('token');

    $this->assertFalse($manager->isLogin());
    $this->assertSame([], $manager->getLogin());

    $this->assertNull($manager->login(['foo' => 'bar', 'hello' => 'world'], 10));

    $this->assertTrue($manager->isLogin());
    $this->assertSame(['foo' => 'bar', 'hello' => 'world'], $manager->getLogin());

    $this->assertNull($manager->logout());

    $this->assertFalse($manager->isLogin());
    $this->assertSame([], $manager->getLogin());
}
```