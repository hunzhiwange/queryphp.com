# 缓存块载入

::: tip Testing Is Documentation
[tests/Cache/LoadTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Cache/LoadTest.php)
:::
    
QueryPHP 提供了缓存块自动载入功能，缓存块类似于缓存的 `remember` 功能，一个类代表一个缓存块。

### 定义缓存块

**例子 \Tests\Cache\Pieces\Test1**

``` php
namespace Tests\Cache\Pieces;

use Leevel\Cache\File;
use Leevel\Cache\IBlock;
use Leevel\Cache\ICache;

class Test1 implements IBlock
{
    public function handle(array $params = []): array
    {
        return ['foo' => 'bar'];
    }

    public function cache(): ICache
    {
        return new File([
            'path' => __DIR__.'/cacheLoad',
        ]);
    }

    public static function key(array $params = []): string
    {
        return 'test1';
    }
}
```

缓冲块需要实现 `\Leevel\Cache\IBlock` 接口，即可统一进行管理。

**接口 \Leevel\Cache\IBlock**

``` php
namespace Leevel\Cache;

interface IBlock
{
    /**
     * 响应.
     */
    public function handle(array $params = []): array;

    /**
     * 缓存驱动.
     *
     * @return \Leevel\Cache\ICache
     */
    public function cache(): ICache;

    /**
     * 缓存 key.
     */
    public static function key(array $params = []): string;
}
```

缓存块实现非常灵活，可以非常轻松地使用。

### 载入缓存片段

缓存载入服务 `cache.load` 被系统注册到服务容器中了，可以使用代理 `proxy` 来调用。

``` php
\Leevel\Cache\Proxy\Load::data(array $names, array $option = [], bool $force = false): array;
\Leevel\Cache\Proxy\Load::refresh(array $names): void;
```


**Uses**

``` php
<?php

use Leevel\Cache\Load;
use Leevel\Di\Container;
use Tests\Cache\Pieces\Test1;
use Tests\Cache\Pieces\Test2;
use Tests\Cache\Pieces\Test4;
```

## data 载入缓存块数据

通过 `data` 即可载入缓存块数据，缓存直接传递缓存块的类名字即可。

``` php
data(array $names, array $option = [], bool $force = false): array;
```

配置 `$option` 和 缓存功能中的 `set` 的用法一致。


``` php
public function testBaseUse(): void
{
    $container = new Container();
    $load = $this->createLoad($container);

    $result = $load->data([Test1::class]);
    $this->assertSame(['foo' => 'bar'], $result);

    $result = $load->data([Test1::class]);
    $this->assertSame(['foo' => 'bar'], $result);

    $load->refresh([Test1::class]);
}
```
    
## refresh 刷新缓存块数据

通过 `refresh` 即可刷新缓存块数据，缓存直接传递缓存块的类名字即可。

``` php
refresh(array $names): void;
```

刷新缓存块本质是删除缓存块数据，下次请求自动生成。


``` php
public function testRefresh(): void
{
    $container = new Container();
    $load = $this->createLoad($container);

    $result = $load->data([Test1::class]);
    $this->assertSame(['foo' => 'bar'], $result);

    $result = $load->data([Test1::class]);
    $this->assertSame(['foo' => 'bar'], $result);

    $file = __DIR__.'/Pieces/cacheLoad/test1.php';
    $this->assertTrue(is_file($file));

    $load->refresh([Test1::class]);
    $this->assertFalse(is_file($file));
}
```
    
## data 强制载入缓存块数据

`data` 方法支持强制获取缓存数据。

``` php
public function testDataForce(): void
{
    $container = new Container();
    $load = $this->createLoad($container);

    $result = $load->data([Test1::class]);
    $this->assertSame(['foo' => 'bar'], $result);

    $result = $load->data([Test1::class], [], true);
    $this->assertSame(['foo' => 'bar'], $result);
}
```
    
::: tip
`$force` 参数强制从原始数据源获取缓存，并且会刷新缓存数据。
:::
    
## data 载入缓存块数据支持参数

`data` 方法支持传递一些参数到缓存块，可以生成不同的缓存数据。

**例子 \Tests\Cache\Pieces\Test1**

``` php
namespace Tests\Cache\Pieces;

use Leevel\Cache\File;
use Leevel\Cache\IBlock;
use Leevel\Cache\ICache;

class Test4 implements IBlock
{
    public function handle(array $params = []): array
    {
        return $params;
    }

    public function cache(): ICache
    {
        return new File([
            'path' => __DIR__.'/cacheLoad',
        ]);
    }

    public static function key(array $params = []): string
    {
        return 'test4';
    }
}
```

参数通过 `:` 冒号进行分割，冒号后边是自定义参数。


``` php
public function testWithParams(): void
{
    $container = new Container();
    $load = $this->createLoad($container);

    $result = $load->data([Test4::class.':hello,world,foo,bar']);
    $this->assertSame(['hello', 'world', 'foo', 'bar'], $result);
}
```