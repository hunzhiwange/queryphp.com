# Filesystem

::: tip Testing Is Documentation
[tests/Filesystem/ManagerTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Filesystem/ManagerTest.php)
:::
    
文件管理统一由文件组件完成，通常我们使用代理 `\Leevel\Filesystem\Proxy\Filesystem` 类进行静态调用。

内置支持的 filesystem 驱动类型包括 local、zip、ftp、sftp，未来可能增加其他驱动。

::: tip
文件系统底层基于 league/flysystem 开发，相关文档可以参考 <https://flysystem.thephpleague.com/docs/>。
:::

## 使用方式

使用容器 flysystems 服务

``` php
\App::make('filesystems')->put(string $path, string $contents, array $config = []): bool;
```

依赖注入

``` php
class Demo
{
    private \Leevel\Filesystem\Manager $filesystem;

    public function __construct(\Leevel\Filesystem\Manager $filesystem)
    {
        $this->filesystem = $filesystem;
    }
}
```

使用静态代理

``` php
\Leevel\Filesystem\Proxy\Filesystem::put(string $path, string $contents, array $config = []): bool;
```

## filesystem 配置

系统的 filesystem 配置位于应用下面的 `option/filesystem.php` 文件。

可以定义多个文件系统连接，并且支持切换，每一个连接支持驱动设置。

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
     * 文件驱动
     * ---------------------------------------------------------------
     *
     * 采用什么方式发送邮件数据
     */
    'default' => Leevel::env('FILESYSTEM_DRIVER', 'local'),

    /*
     * ---------------------------------------------------------------
     * 文件驱动连接参数
     * ---------------------------------------------------------------
     *
     * 这里为所有的 filesystem 驱动的连接参数，每一种不同的驱动拥有不同的配置
     * 虽然有不同的驱动，但是在使用上却有着一致性
     */
    'connect' => [
        'local' => [
            // driver
            'driver' => 'local',

            // path
            'path' => Leevel::storagePath(),
        ],

        'zip' => [
            // driver
            'driver' => 'zip',

            // path
            'path' => Leevel::storagePath('filesystem.zip'),
        ],

        'ftp' => [
            // driver
            'driver' => 'ftp',

            // 主机
            'host' => Leevel::env('FILESYSTEM_FTP_HOST', 'ftp.example.com'),

            // 端口
            'port' => (int) Leevel::env('FILESYSTEM_FTP_PORT', 21),

            // 用户名
            'username' => Leevel::env('FILESYSTEM_FTP_USERNAME', 'your-username'),

            // 密码
            'password' => Leevel::env('FILESYSTEM_FTP_PASSWORD', 'your-password'),

            // 根目录
            'root' => '',

            // 被动、主动
            'passive' => true,

            // 加密传输
            'ssl' => false,

            // 超时设置
            'timeout' => 20,
        ],

        'sftp' => [
            // driver
            'driver' => 'sftp',

            // 主机
            'host' => Leevel::env('FILESYSTEM_SFTP_HOST', 'sftp.example.com'),

            // 端口
            'port' => (int) Leevel::env('FILESYSTEM_SFTP_PORT', 22),

            // 用户名
            'username' => Leevel::env('FILESYSTEM_SFTP_USERNAME', 'your-username'),

            // 密码
            'password' => Leevel::env('FILESYSTEM_SFTP_PASSWORD', 'your-password'),

            // 根目录
            'root' => '',

            // 私钥路径
            'privateKey' => '',

            // 超时设置
            'timeout' => 20,
        ],
    ],
];

```

filesystem 参数根据不同的连接会有所区别。


**Uses**

``` php
<?php

use League\Flysystem\Filesystem as LeagueFilesystem;
use Leevel\Di\Container;
use Leevel\Di\IContainer;
use Leevel\Filesystem\Manager;
use Leevel\Option\Option;
```

## 文件系统基本使用方法

``` php
public function testBaseUse(): void
{
    $manager = $this->createManager();
    $path = __DIR__.'/forManager';
    $this->assertInstanceof(LeagueFilesystem::class, $manager->getFilesystem());

    $manager->put('hellomanager.txt', 'manager');
    $file = $path.'/hellomanager.txt';

    $this->assertTrue(is_file($file));
    $this->assertSame('manager', file_get_contents($file));

    unlink($file);
    rmdir($path);
}
```