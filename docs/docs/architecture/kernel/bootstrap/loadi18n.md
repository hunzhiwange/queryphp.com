# 初始化载入语言包

::: tip Testing Is Documentation
[tests/Kernel/Bootstrap/LoadI18nTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Kernel/Bootstrap/LoadI18nTest.php)
:::
    
QueryPHP 在内核执行过程中会执行初始化，分为 4 个步骤，载入配置、载入语言包、注册异常运行时和遍历服务提供者注册服务。

内核初始化，包括 `\Leevel\Kernel\IKernel::bootstrap` 和 `\Leevel\Kernel\IKernelConsole::bootstrap` 均会执行上述 4 个步骤。


**Uses**

``` php
<?php

use Leevel\Di\Container;
use Leevel\Di\IContainer;
use Leevel\Filesystem\Helper;
use Leevel\Kernel\App as Apps;
use Leevel\Kernel\Bootstrap\LoadI18n;
use Leevel\Kernel\IApp;
use Leevel\Option\Option;
```

## 基本使用方法

``` php
public function testBaseUse(): void
{
    $bootstrap = new LoadI18n();

    $container = Container::singletons();
    $app = new App($container, $appPath = __DIR__.'/app');

    $this->assertInstanceof(IContainer::class, $container);
    $this->assertInstanceof(Container::class, $container);
    $this->assertInstanceof(IApp::class, $app);
    $this->assertInstanceof(Apps::class, $app);

    $option = new Option([
        'app' => [
            ':composer' => [
                'i18ns' => [
                    'extend',
                ],
            ],
        ],
        'i18n' => [
            'default' => 'en-US',
        ],
    ]);

    $container->singleton('option', function () use ($option) {
        return $option;
    });

    $this->assertSame('en-US', $container['option']['i18n\\default']);
    $this->assertSame($appPath.'/bootstrap/i18n/en-US.php', $app->i18nCachedPath('en-US'));
    $this->assertFalse($app->isCachedI18n('en-US'));
    $this->assertSame($appPath.'/i18n', $app->i18nPath());

    $this->assertNull($bootstrap->handle($app));

    $i18n = $container->make('i18n');

    $this->assertSame('Bad Request', $i18n->gettext('错误请求'));
    $this->assertSame('Unprocessable Entity', $i18n->gettext('无法处理的实体'));
    $this->assertSame('Total 5', $i18n->gettext('共 %d 条', 5));
    $this->assertSame('Go to', $i18n->gettext('前往'));
}
```
    
## 语言支持缓存

语言支持缓存，通过缓存可以降低开销提高性能，适合生产环境。

**fixture 定义**

**语言缓存文件 tests/Kernel/Bootstrap/app/assert/en-US.php**

``` php
<?php

/*
 * This file is part of the ************************ package.
 * _____________                           _______________
 *  ______/     \__  _____  ____  ______  / /_  _________
 *   ____/ __   / / / / _ \/ __`\/ / __ \/ __ \/ __ \___
 *    __/ / /  / /_/ /  __/ /  \  / /_/ / / / / /_/ /__
 *      \_\ \_/\____/\___/_/   / / .___/_/ /_/ .___/
 *         \_\                /_/_/         /_/
 *
 * The PHP Framework For Code Poem As Free As Wind. <Query Yet Simple>
 * (c) 2010-2020 http://queryphp.com All rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

return [
    '上一页'                     => 'Previous',
    '下一页'                     => 'Next',
    '共 %d 条'                  => 'Total %d',
    '前往'                      => 'Go to',
    '页'                       => 'Page',
    '太多请求'                    => 'Too Many Requests',
    '对于需要登录的网页，服务器可能返回此响应'    => 'For web pages that need to be logged in, the server may return this response',
    '方法禁用'                    => 'Method Not Allowed',
    '无法处理的实体'                 => 'Unprocessable Entity',
    '服务器不理解请求的语法'             => 'The server does not understand the syntax of the request',
    '服务器内部错误'                 => 'Internal Server Error',
    '服务器拒绝请求'                 => 'Server refusal the request',
    '服务器遇到错误，无法完成请求'          => 'Could not complete request',
    '未授权'                     => 'Unauthorized',
    '用户发出的请求针对的是不存在的页面'       => 'The user’s request is for a page that does not exist',
    '用户在给定的时间内发送了太多的请求'       => 'The user sends too many requests within a given time',
    '禁止'                      => 'Forbidden',
    '禁用请求中指定的方法'              => 'Disable the method specified in the request',
    '请求格式正确，但是由于含有语义错误，无法响应'  => 'The request format is correct, but because of semantic errors, it cannot respond',
    '重试'                      => 'Retry',
    '错误请求'                    => 'Bad Request',
    '页面未找到'                   => 'Page Not Found',
    '首页'                      => 'Home',
];

```


``` php
public function testLoadCached(): void
{
    $bootstrap = new LoadI18n();

    $container = Container::singletons();
    $app = new App($container, $appPath = __DIR__.'/app');

    $this->assertInstanceof(IContainer::class, $container);
    $this->assertInstanceof(Container::class, $container);
    $this->assertInstanceof(IApp::class, $app);
    $this->assertInstanceof(Apps::class, $app);

    $option = new Option([
        'app' => [
            ':composer' => [
                'i18ns' => [
                    'extend',
                ],
            ],
        ],
        'i18n' => [
            'default' => 'en-US',
        ],
    ]);

    $container->singleton('option', function () use ($option) {
        return $option;
    });

    $this->assertSame('en-US', $container['option']['i18n\\default']);
    $this->assertSame($appPath.'/bootstrap/i18n/en-US.php', $app->i18nCachedPath('en-US'));
    $this->assertFalse($app->isCachedI18n('en-US'));
    $this->assertSame($appPath.'/i18n', $app->i18nPath());

    mkdir($appPath.'/bootstrap/i18n', 0777, true);
    file_put_contents($appPath.'/bootstrap/i18n/en-US.php', file_get_contents($appPath.'/assert/en-US.php'));

    $this->assertTrue($app->isCachedI18n('en-US'));

    $this->assertNull($bootstrap->handle($app));

    $i18n = $container->make('i18n');

    $this->assertSame('Bad Request', $i18n->gettext('错误请求'));
    $this->assertSame('Unprocessable Entity', $i18n->gettext('无法处理的实体'));
    $this->assertSame('Total 5', $i18n->gettext('共 %d 条', 5));
    $this->assertSame('Go to', $i18n->gettext('前往'));

    Helper::deleteDirectory($appPath.'/bootstrap');
}
```