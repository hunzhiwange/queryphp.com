# View

::: tip Testing Is Documentation
[tests/View/ManagerTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/View/ManagerTest.php)
:::
    
视图统一由视图组件完成，通常我们使用代理 `\Leevel\View\Proxy\View` 类进行静态调用。

内置支持的视图驱动类型包括 html、phpui，未来可能增加其他驱动。

## 使用方式

使用容器 view 服务

``` php
\App::make('views')->setVar(array|string $name, mixed $value = null): void;
```

依赖注入

``` php
class Demo
{
    private \Leevel\View\Manager $view;

    public function __construct(\Leevel\View\Manager $view)
    {
        $this->view = $view;
    }
}
```

使用静态代理

``` php
\Leevel\Router\Proxy\View::setVar(array|string $name, mixed $value = null): void;
```

## view 配置

系统的 view 配置位于应用下面的 `option/view.php` 文件。

可以定义多个视图连接，并且支持切换，每一个连接支持驱动设置。

``` php
<?php

declare(strict_types=1);

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

视图参数根据不同的连接会有所区别，通用的 view 参数如下：

|配置项|配置描述|
|:-|:-|
|fail|错误模板|
|success|成功模板|


**Uses**

``` php
<?php

use Leevel\Di\Container;
use Leevel\Di\IContainer;
use Leevel\Filesystem\Helper;
use Leevel\Kernel\App;
use Leevel\Option\Option;
use Leevel\View\Manager;
```

## 视图基本使用

``` php
public function testBaseUse(): void
{
    $manager = $this->createManager();
    $manager->setVar('foo', 'bar');
    $result = $manager->display('html_test');
    $this->assertSame('hello html,bar.', $result);
}
```
    
## PHP 自身作为模板

``` php
public function testPhpUi(): void
{
    $manager = $this->createManager('phpui');

    $manager->setVar('hello', 'world');
    $this->assertSame('world', $manager->getVar('hello'));
    $this->assertSame('world', $manager->connect('phpui')->getVar('hello'));
}
```
    
## getVar 获取变量值

``` php
public function testGetVar(): void
{
    $manager = $this->createManager();

    $manager->setVar('hello', 'world');
    $this->assertSame('world', $manager->getVar('hello'));
    $this->assertSame(null, $manager->getVar('hello2'));
}
```
    
## deleteVar 删除变量值

``` php
public function testDeleteVar(): void
{
    $manager = $this->createManager('phpui');

    $manager->setVar('hello', 'world');
    $this->assertSame('world', $manager->getVar('hello'));
    $this->assertSame('world', $manager->connect('phpui')->getVar('hello'));

    $manager->deleteVar(['hello']);
    $this->assertNull($manager->getVar('hello'));
    $this->assertNull($manager->connect('phpui')->getVar('hello'));
}
```
    
## clearVar 清空变量值

``` php
public function testClearVar(): void
{
    $manager = $this->createManager();

    $manager->setVar('foo', 'bar');
    $this->assertSame('bar', $manager->getVar('foo'));
    $this->assertSame('bar', $manager->connect('html')->getVar('foo'));

    $manager->clearVar();
    $this->assertNull($manager->getVar('foo'));
    $this->assertNull($manager->connect('html')->getVar('foo'));
}
```
    
## display 加载视图文件

``` php
public function testDisplay(): void
{
    $manager = $this->createManager('phpui');

    $manager->setVar('foo', 'bar');
    $this->assertSame(
        'Hi here! bar',
        $manager->display(__DIR__.'/assert/hello.php')
    );
}
```