# View

::: tip Testing Is Documentation
[tests/Router/ViewTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Router/ViewTest.php)
:::
    
视图统一由视图组件完成，通常我们使用代理 `\Leevel\Router\Proxy\View` 类进行静态调用。

内置支持的视图驱动类型包括 html、phpui，未来可能增加其他驱动。

## 使用方式

使用容器 view 服务

``` php
\App::make('view')->setVar($name, $value = null): void;
```

依赖注入

``` php
class Demo
{
    private \Leevel\Router\IView $view;

    public function __construct(\Leevel\Router\IView $view)
    {
        $this->view = $view;
    }
}
```

使用静态代理

``` php
\Leevel\Router\Proxy\View::setVar($name, $value = null): void;
```

## view 配置

系统的 view 配置位于应用下面的 `option/view.php` 文件。

可以定义多个视图连接，并且支持切换，每一个连接支持驱动设置。

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
     * 默认视图驱动
     * ---------------------------------------------------------------
     *
     * 系统为所有视图提供了统一的接口，在使用上拥有一致性
     */
    'default' => Leevel::env('VIEW_DRIVER', 'html'),

    /*
     * ---------------------------------------------------------------
     * 错误模板
     * ---------------------------------------------------------------
     *
     * 默认错误跳转对应的模板文件
     */
    'fail' => 'public/fail',

    /*
     * ---------------------------------------------------------------
     * 成功模板
     * ---------------------------------------------------------------
     *
     * 默认成功跳转对应的模板文件
     */
    'success' => 'public/success',

    /*
     * ---------------------------------------------------------------
     * 视图连接参数
     * ---------------------------------------------------------------
     *
     * 这里为所有的视图的连接参数，每一种不同的驱动拥有不同的配置
     * 虽然有不同的驱动，但是在视图使用上却有着一致性
     */
    'connect' => [
        'html' => [
            // driver
            'driver' => 'html',

            // 后缀
            'suffix' => '.html',
        ],

        'phpui' => [
            // driver
            'driver' => 'phpui',

            // 后缀
            'suffix' => '.php',
        ],
    ],
];

```

mail 参数根据不同的连接会有所区别，通用的 view 参数如下：

|配置项|配置描述|
|:-|:-|
|fail|错误模板|
|success|成功模板|


**Uses**

``` php
<?php

use Leevel\Router\IView;
use Leevel\Router\View;
use Leevel\View\Html;
use Leevel\View\Phpui;
```

## 视图基本使用

``` php
public function testBaseUse(): void
{
    $view = new View(
        $html = new Html()
    );
    $this->assertInstanceof(IView::class, $view);

    $view->setVar('hello', 'world');
    $this->assertSame('world', $view->getVar('hello'));
    $this->assertSame('world', $html->getVar('hello'));
}
```
    
## deleteVar 删除变量值

``` php
public function testDeleteVar(): void
{
    $view = new View(
        $html = new Html()
    );

    $view->setVar('hello', 'world');
    $this->assertSame('world', $view->getVar('hello'));
    $this->assertSame('world', $html->getVar('hello'));

    $view->deleteVar(['hello']);
    $this->assertNull($view->getVar('hello'));
    $this->assertNull($html->getVar('hello'));
}
```
    
## clearVar 清空变量值

``` php
public function testClearVar(): void
{
    $view = new View(
        $html = new Html()
    );

    $view->setVar('foo', 'bar');
    $this->assertSame('bar', $view->getVar('foo'));
    $this->assertSame('bar', $html->getVar('foo'));

    $view->clearVar();
    $this->assertNull($view->getVar('foo'));
    $this->assertNull($html->getVar('foo'));
}
```
    
## display 加载视图文件

``` php
public function testDisplay(): void
{
    $view = new View(
        new Phpui([
            'theme_path' => __DIR__,
        ])
    );

    $view->setVar('foo', 'bar');

    $this->assertSame(
        'Hi here! bar',
        $view->display(__DIR__.'/assert/hello.php')
    );
}
```
    
## switchView 切换视图

``` php
public function testSwitchView(): void
{
    $view = new View(
        $phpui = new Phpui()
    );

    $view->setVar('foo', 'bar');
    $this->assertSame('bar', $view->getVar('foo'));
    $this->assertSame('bar', $phpui->getVar('foo'));

    $view->switchView($html = new Html());
    $this->assertSame('bar', $view->getVar('foo'));
    $this->assertSame('bar', $html->getVar('foo'));
}
```