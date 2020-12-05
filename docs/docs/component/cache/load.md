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
    public function handle(array $params = []): mixed
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

缓存块需要实现 `\Leevel\Cache\IBlock` 接口，即可统一进行管理。

**接口 \Leevel\Cache\IBlock**

``` php
namespace Leevel\Cache;

interface IBlock
{
    /**
     * 响应.
     */
    public function handle(array $params = []): mixed;

    /**
     * 缓存驱动.
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
\Leevel\Cache\Proxy\Load::data(array $names, ?int $expire = null, bool $force = false): array;
\Leevel\Cache\Proxy\Load::refresh(array $names): void;
```


**Uses**

``` php
<?php

use Leevel\Cache\Load;
use Leevel\Di\Container;
use Leevel\Filesystem\Helper;
use Tests\Cache\Pieces\Test1;
use Tests\Cache\Pieces\Test2;
use Tests\Cache\Pieces\Test4;
use Tests\Cache\Pieces\Test5;
use Tests\Cache\Pieces\Test6;
```

## data 载入缓存块数据

通过 `data` 即可载入缓存块数据，缓存直接传递缓存块的类名字即可。

``` php
# Leevel\Cache\ILoad::data
/**
 * 载入缓存数据.
 *
 * - 系统自动存储缓存到内存，可重复执行不会重复载入数据.
 */
public function data(array $names, ?int $expire = null, bool $force = false): mixed;
```

配置 `$expire` 和缓存功能中的 `set` 的用法一致。


``` php
public function testBaseUse(): void
{
    $container = new Container();
    $load = $this->createLoad($container);

    $result = $load->data([Test1::class]);
    $this->assertSame(['foo' => 'bar'], $result);

    $this->assertSame(
        [Test1::class => ['foo' => 'bar']],
        $this->getTestProperty($load, 'cacheLoaded'),
    );

    $result = $load->data([Test1::class]);
    $this->assertSame(['foo' => 'bar'], $result);

    $load->refresh([Test1::class]);

    $this->assertSame(
        [],
        $this->getTestProperty($load, 'cacheLoaded'),
    );
}
```
    
## refresh 刷新缓存块数据

通过 `refresh` 即可刷新缓存块数据，缓存直接传递缓存块的类名字即可。

``` php
# Leevel\Cache\ILoad::refresh
/**
 * 刷新缓存数据.
 */
public function refresh(array $names): void;
```

刷新缓存块本质是删除缓存块数据，下次请求自动生成。


``` php
public function testRefresh(): void
{
    $container = new Container();
    $load = $this->createLoad($container);

    $result = $load->data([Test1::class]);
    $this->assertSame(['foo' => 'bar'], $result);

    $this->assertSame(
        [Test1::class => ['foo' => 'bar']],
        $this->getTestProperty($load, 'cacheLoaded'),
    );

    $result = $load->data([Test1::class]);
    $this->assertSame(['foo' => 'bar'], $result);

    $file = __DIR__.'/Pieces/cacheLoad/test1.php';
    $this->assertTrue(is_file($file));

    $this->assertSame(
        [Test1::class => ['foo' => 'bar']],
        $this->getTestProperty($load, 'cacheLoaded'),
    );

    $load->refresh([Test1::class]);
    $this->assertFalse(is_file($file));

    $this->assertSame(
        [],
        $this->getTestProperty($load, 'cacheLoaded'),
    );
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

    $result = $load->data([Test1::class], null, true);
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
    public function handle(array $params = []): mixed
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
    
## clearCacheLoaded 清理已载入的缓存数据

如果缓存原始数据可以动态变化，比如在一个常驻脚本中，后台修改了系统配置，然后使用 `refresh` 更新了缓存。
此时你需要在每次循环调用业务代码前清理掉已载入的缓存数据，而不是通过 `refresh` 清理原始缓存数据，那么这个方法将会变得非常有用。

**例子 \Tests\Cache\Pieces\Test5**

``` php
namespace Tests\Cache\Pieces;

use Leevel\Cache\File;
use Leevel\Cache\IBlock;
use Leevel\Cache\ICache;

class Test5 implements IBlock
{
    public function handle(array $params = []): mixed
    {
        return ['data' => $GLOBALS['cache_data'] ?? 'test5'];
    }

    public function cache(): ICache
    {
        return new File([
            'path' => __DIR__.'/cacheLoad',
        ]);
    }

    public static function key(array $params = []): string
    {
        return 'test5';
    }
}
```

例子中的缓存原始数据变化，我们通过 `$GLOBALS['cache_data]` 来模拟实现。


``` php
public function testClearCacheLoaded(): void
{
    $container = new Container();
    $load = $this->createLoad($container);

    if (isset($GLOBALS['cache_data'])) {
        unset($GLOBALS['cache_data']);
    }

    $GLOBALS['cache_data'] = 'data1';
    $result = $load->data([Test5::class]);
    $this->assertSame(['data' => 'data1'], $result);

    $GLOBALS['cache_data'] = 'data2';
    $result = $load->data([Test5::class]);
    $this->assertSame(['data' => 'data1'], $result);

    // 清理原始缓存，模拟修改系统配置
    $newLoad = $this->createLoad($container);
    $newLoad->refresh([Test5::class]);

    $result = $load->data([Test5::class]);
    $this->assertSame(['data' => 'data1'], $result);

    $load->clearCacheLoaded([Test5::class]);
    $result = $load->data([Test5::class]);
    $this->assertSame(['data' => 'data2'], $result);

    // 清理原始缓存，模拟修改系统配置
    $newLoad = $this->createLoad($container);
    $newLoad->refresh([Test5::class]);
    $GLOBALS['cache_data'] = 'data3';
    $load->clearCacheLoaded();
    $result = $load->data([Test5::class]);
    $this->assertSame(['data' => 'data3'], $result);

    if (isset($GLOBALS['cache_data'])) {
        unset($GLOBALS['cache_data']);
    }
}
```