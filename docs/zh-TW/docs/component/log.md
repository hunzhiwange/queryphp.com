# log

::: tip Testing Is Documentation
[tests/Log/LogTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Log/LogTest.php)
:::
    
日志记录统一由日志组件完成，通常我们使用代理 `\Leevel\Log\Proxy\Log` 类进行静态调用。

内置支持的 log 驱动类型包括 file、syslog，未来可能增加其他驱动。

::: tips
日志遵循 PSR-3 规范，用法与主流框架完全一致。
:::

## 使用方式

使用助手函数

``` php
\Leevel\Log\Helper::record(string $message, array $context = [], string $level = \Leevel\Log\ILog::INFO): void;
\Leevel\Log\Helper::log(): \Leevel\Log\Manager;
```

使用容器 logs 服务

``` php
\App::make('logs')->emergency(string $message, array $context = []): void;
\App::make('logs')->alert(string $message, array $context = []): void;
\App::make('logs')->critical(string $message, array $context = []): void;
\App::make('logs')->error(string $message, array $context = []): void;
\App::make('logs')->warning(string $message, array $context = []): void;
\App::make('logs')->notice(string $message, array $context = []): void;
\App::make('logs')->info(string $message, array $context = []): void;
\App::make('logs')->debug(string $message, array $context = []): void;
\App::make('logs')->log(string $level, string $message, array $context = []): void;
```

依赖注入

``` php
class Demo
{
    private $log;

    public function __construct(\Leevel\Log\Manager $log)
    {
        $this->log = $log;
    }
}
```

使用静态代理

``` php
\Leevel\Log\Proxy\Log::emergency(string $message, array $context = []): void;
\Leevel\Log\Proxy\Log::alert(string $message, array $context = []): void;
\Leevel\Log\Proxy\Log::critical(string $message, array $context = []): void;
\Leevel\Log\Proxy\Log::error(string $message, array $context = []): void;
\Leevel\Log\Proxy\Log::warning(string $message, array $context = []): void;
\Leevel\Log\Proxy\Log::notice(string $message, array $context = []): void;
\Leevel\Log\Proxy\Log::info(string $message, array $context = []): void;
\Leevel\Log\Proxy\Log::debug(string $message, array $context = []): void;
\Leevel\Log\Proxy\Log::log(string $level, string $message, array $context = []): void;
```

## log 配置

系统的 log 配置位于应用下面的 `option/log.php` 文件。

可以定义多个日志连接，并且支持切换，每一个连接支持驱动设置。

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
     * 默认日志驱动
     * ---------------------------------------------------------------
     *
     * 系统为所有日志提供了统一的接口，在使用上拥有一致性
     */
    'default' => Leevel::env('LOG_DRIVER', 'file'),

    /*
     * ---------------------------------------------------------------
     * 允许记录的日志级别
     * ---------------------------------------------------------------
     *
     * 默认为 debug、info、notice、warning、error、critical、alert 和 emergency
     */
    'levels' => [
        'debug',
        'info',
        'notice',
        'warning',
        'error',
        'critical',
        'alert',
        'emergency',
    ],

    /*
     * ---------------------------------------------------------------
     * 频道
     * ---------------------------------------------------------------
     *
     * 隔离不同环境的日志
     */
    'channel' => Leevel::env('ENVIRONMENT', 'development'),

    /*
     * ---------------------------------------------------------------
     * 是否启用缓冲
     * ---------------------------------------------------------------
     *
     * 启用缓冲可以降低磁盘或网络的 IO 请求以提升性能
     */
    'buffer' => true,

    /*
     * ---------------------------------------------------------------
     * 缓冲数量
     * ---------------------------------------------------------------
     *
     * 日志数量达到缓冲数量会执行一次 IO 操作
     */
    'buffer_size' => 100,

    /*
     * ---------------------------------------------------------------
     * 日志连接参数
     * ---------------------------------------------------------------
     *
     * 这里为所有的日志的连接参数，每一种不同的驱动拥有不同的配置
     * 虽然有不同的驱动，但是在日志使用上却有着一致性
     */
    'connect' => [
        'file' => [
            // driver
            'driver' => 'file',

            // 频道
            'channel' => null,

            // 日志文件名时间格式化
            'name' => 'Y-m-d H',

            // 日志文件大小限制,单位为字节 byte
            'size' => 2097152,

            // 默认的日志路径
            'path' => Leevel::runtimePath('log'),
        ],

        'syslog' => [
            // driver
            'driver' => 'syslog',

            // 频道
            'channel' => null,

            // 存储 @see \Monolog\Handler\AbstractSyslogHandler
            'facility' => LOG_USER,

            // 等级
            'level' => 'debug',
        ],
    ],
];

```

log 参数根据不同的连接会有所区别，通用的 log 参数如下：

|配置项|配置描述|
|:-|:-|
|levels|允许记录的日志级别|
|channel|频道|
|buffer|是否启用缓冲|
|缓冲数量|日志数量达到缓冲数量会执行一次 IO 操作|

::: warning 注意
QueryPHP 的日志如果启用了缓冲，会在日志数量达到缓冲数量会执行一次 IO 操作。
:::


**Uses**

 * use Leevel\Filesystem\Fso;
 * use Leevel\Log\File;
 * use Leevel\Log\ILog;