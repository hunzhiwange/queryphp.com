# Log

::: tip Testing Is Documentation
[tests/Log/LogTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Log/LogTest.php)
:::
    
日志记录统一由日志组件完成，通常我们使用代理 `\Leevel\Log\Proxy\Log` 类进行静态调用。

内置支持的 log 驱动类型包括 file、syslog，未来可能增加其他驱动。

::: tip
日志遵循 PSR-3 规范，用法与主流框架完全一致。
:::

## 使用方式

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
```

依赖注入

``` php
class Demo
{
    private \Leevel\Log\Manager $log;

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
```

## log 配置

系统的 log 配置位于应用下面的 `option/log.php` 文件。

可以定义多个日志连接，并且支持切换，每一个连接支持驱动设置。

``` php
<?php

declare(strict_types=1);

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
     * 默认为 info
     */
    'level' => [
        \Leevel\Log\ILog::DEFAULT_MESSAGE_CATEGORY => Leevel::env('LOG_DEFAULT_LEVEL', \Leevel\Log\ILog::LEVEL_INFO),
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

            // 驱动类
            'driver_class' => \Leevel\Log\File::class,

            // 频道
            'channel' => null,

            // 日志文件名时间格式化
            // 使用 date 函数格式化处理
            'name' => 'Y-m-d',

            // 默认的日志路径
            'path' => Leevel::storagePath('logs'),

            // 日志行时间格式化，支持微秒
            'format' => 'Y-m-d H:i:s u',

            // 日志文件权限
            'file_permission' => null,

            // 是否使用锁
            'use_locking' => false,
        ],

        'syslog' => [
            // driver
            'driver' => 'syslog',

            // 驱动类
            'driver_class' => \Leevel\Log\Syslog::class,

            // 频道
            'channel' => null,

            // 存储 \Monolog\Handler\AbstractSyslogHandler
            'facility' => LOG_USER,

            // 日志行事件格式化，支持微秒
            'format' => 'Y-m-d H:i:s u',
        ],
    ],
];

```

log 参数根据不同的连接会有所区别，通用的 log 参数如下：

|配置项|配置描述|
|:-|:-|
|level|允许记录的日志级别|
|channel|频道|
|buffer|是否启用缓冲|
|buffer_size|日志数量达到缓冲数量会执行一次 IO 操作|

::: warning 注意
QueryPHP 的日志如果启用了缓冲，会在日志数量达到缓冲数量会执行一次 IO 操作。
:::


**Uses**

``` php
<?php

use Leevel\Filesystem\Helper;
use Leevel\Log\File;
use Leevel\Log\ILog;
use Monolog\Logger;
```

## log 基本使用

除了 PSR-3 支持的方法外，系统还提供了一些额外方法。

**支持的日志类型**

``` php
# Tests\Log\LogTest::baseUseProvider
public function baseUseProvider(): array
{
    return [
        ['emergency'],
        ['alert'],
        ['critical'],
        ['error'],
        ['warning'],
        ['notice'],
        ['info'],
        ['debug'],
    ];
}
```


``` php
public function testBaseUse(string $level): void
{
    $log = $this->createFileConnect();

    $this->assertInstanceof(ILog::class, $log);

    $this->assertNull($log->{$level}('foo', ['hello', 'world']));

    $logData = $this->getTestProperty($log, 'logs');
    $this->assertSame([$level =>
        [
            ILOG::DEFAULT_MESSAGE_CATEGORY => [[$level, 'foo', ['hello', 'world']]],
        ],
    ], $logData);
    $this->assertInstanceOf(Logger::class, $log->getMonolog());
    Helper::deleteDirectory(__DIR__.'/cacheLog');
}
```
    
## 日志支持等级过滤

``` php
public function testLogFilterLevel(): void
{
    $log = $this->createFileConnect([
        'level' => [
            ILOG::DEFAULT_MESSAGE_CATEGORY => ILog::LEVEL_INFO,
        ]
    ]);
    $log->info('foo', ['hello', 'world']);
    $log->debug('foo', ['hello', 'world']);
    $logData = $this->getTestProperty($log, 'logs');
    $this->assertSame([
            ILog::LEVEL_INFO => [
                ILOG::DEFAULT_MESSAGE_CATEGORY => [
                    [ILog::LEVEL_INFO, 'foo', ['hello', 'world']]
                ]
            ],
        ],
        $logData
    );
}
```
    
## 日志支持消息分类

系统提供的等级 `level` 无法满足更精细化的日志需求，于是对消息 `message` 定义了一套规则来满足更精细的分类。

::: tip
消息开头满足 `[大小写字母|数字|下划线|中横线|点号|斜杆|冒号]` 会被识别为消息分类。
:::


``` php
public function testLogMessageCategory(): void
{
    $log = $this->createFileConnect();
    $log->info('[SQL] foo', ['hello', 'world']);
    $log->info('[SQL:FAILED] foo', ['hello', 'world']);
    $logData = $this->getTestProperty($log, 'logs');
    $this->assertSame([
        ILog::LEVEL_INFO => [
            'SQL' => [[ILog::LEVEL_INFO, '[SQL] foo', ['hello', 'world']]],
            'SQL:FAILED' => [[ILog::LEVEL_INFO, '[SQL:FAILED] foo', ['hello', 'world']]],
        ],
    ], $logData);
    $log->flush();
}
```