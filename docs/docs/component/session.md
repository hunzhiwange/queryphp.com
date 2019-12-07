# session

::: tip Testing Is Documentation
[tests/Session/SessionTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Session/SessionTest.php)
:::
    
QueryPHP 提供了 Session (会话) 可以用于保存用户登录状态。

内置支持的 session 驱动类型包括 file、redis，未来可能增加其他驱动。

## 使用方式

使用助手函数

``` php
\Leevel\Session\Helper::session_get(string $name, $defaults = null);
\Leevel\Session\Helper::session_set(string $name, $value): void;
\Leevel\Session\Helper::session(): \Leevel\Session\Manager;
\Leevel\Session\Helper::flash_get(string $key, $defaults = null);
\Leevel\Session\Helper::flash_set(string $key, $value): void;
```

使用容器 sessions 服务

``` php
\App::make('sessions')->set(string $name, $value): void;
\App::make('sessions')->get(string $name, $defaults = null);
```

依赖注入

``` php
class Demo
{
    private $session;

    public function __construct(\Leevel\Session\Manager $session)
    {
        $this->session = $session;
    }
}
```

使用静态代理

``` php
\Leevel\Session\Proxy\Session::set(string $name, $value): void;
\Leevel\Session\Proxy\Session::get(string $name, $value = null);
```

## session 配置

系统的 session 配置位于应用下面的 `option/session.php` 文件。

可以定义多个缓存连接，并且支持切换，每一个连接支持驱动设置。

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
     * session 驱动
     * ---------------------------------------------------------------
     *
     * 采用什么源保存 session 数据，默认采用文件
     */
    'default' => Leevel::env('SESSION_DRIVER', 'file'),

    /*
     * ---------------------------------------------------------------
     * id
     * ---------------------------------------------------------------
     *
     * 相当于 session_id
     */
    'id' => null,

    /*
     * ---------------------------------------------------------------
     * name
     * ---------------------------------------------------------------
     *
     * 相当于 session_name
     */
    'name' => 'UID',

    /*
     * ---------------------------------------------------------------
     * expire
     * ---------------------------------------------------------------
     *
     * 默认过期时间
     */
    'expire' => 86400,

    /*
     * ---------------------------------------------------------------
     * session 驱动连接参数
     * ---------------------------------------------------------------
     *
     * 这里为所有的 session 驱动的连接参数，每一种不同的驱动拥有不同的配置
     * 虽然有不同的驱动，但是在使用上却有着一致性
     */
    'connect' => [
        'file' => [
            // driver
            'driver' => 'file',

            // 文件缓存路径
            'path' => Leevel::runtimePath('session'),

            // 是否 serialize 格式化
            'serialize' => true,

            // 默认过期时间
            'expire' => null,
        ],

        'redis' => [
            // driver
            'driver' => 'redis',

            // 默认缓存服务器
            'host' => Leevel::env('SESSION_REDIS_HOST', '127.0.0.1'),

            // 默认缓存服务器端口
            'port' => (int) Leevel::env('SESSION_REDIS_PORT', 6379),

            // 认证密码
            'password' => Leevel::env('SESSION_REDIS_PASSWORD', ''),

            // redis 数据库索引
            'select' => 0,

            // 超时设置
            'timeout' => 0,

            // 是否使用持久连接
            'persistent' => false,

            // 是否使用 serialize 编码
            'serialize' => true,

            // 默认过期时间
            'expire' => null,
        ],

        'test' => [
            // driver
            'driver' => 'test',
        ],
    ],
];

```

session 参数根据不同的连接会有所区别，通用的 sesion 参数如下：

|配置项|配置描述|
|:-|:-|
|id|相当于 session_id|
|name|相当于 session_name|
|expire|设置好缓存时间（小与等于 0 表示永不过期，单位时间为秒）|
|serialize|是否使用 serialize 编码|


**Uses**

 * use Leevel\Session\File;
 * use Leevel\Session\ISession;