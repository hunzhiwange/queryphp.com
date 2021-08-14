# 缓存

::: tip Testing Is Documentation
[tests/Cache/CacheTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Cache/CacheTest.php)
:::
    
QueryPHP 为系统提供了灵活的缓存功能，提供了多种缓存驱动。

内置支持的缓存类型包括 file、redis，未来可能增加其他驱动。

## 使用方式

使用容器 caches 服务

``` php
\App::make('caches')->set(string $name, $data, ?int $expire = null): void;
\App::make('caches')->get(string $name, $defaults = false, ?int $expire = null);
```

依赖注入

``` php
class Demo
{
    private \Leevel\Cache\Manager $cache;

    public function __construct(\Leevel\Cache\Manager $cache)
    {
        $this->cache = $cache;
    }
}
```

使用静态代理

``` php
\Leevel\Cache\Proxy\Cache::set(string $name, $data, ?int $expire = null): void;
\Leevel\Cache\Proxy\Cache::get(string $name, $defaults = false, ?int $expire = null);
```

## 缓存配置

系统的缓存配置位于应用下面的 `option/cache.php` 文件。

可以定义多个缓存连接，并且支持切换，每一个连接支持驱动设置。

``` php
<?php

declare(strict_types=1);

return [
    /*
     * ---------------------------------------------------------------
     * 默认缓存驱动
     * ---------------------------------------------------------------
     *
     * 这里可以可以设置为 file、memcache 等
     * 系统为所有缓存提供了统一的接口，在使用上拥有一致性
     */
    'default' => Leevel::env('CACHE_DRIVER', 'file'),

    /*
     * ---------------------------------------------------------------
     * 程序默认缓存时间
     * ---------------------------------------------------------------
     *
     * 设置好缓存时间，超过这个时间系统缓存会重新进行获取, 小与等于 0 表示永不过期
     * 缓存时间为当前时间加上以秒为单位的数量
     */
    'expire' => (int) Leevel::env('CACHE_EXPIRE', 86400),

    /*
     * ---------------------------------------------------------------
     * 缓存连接参数
     * ---------------------------------------------------------------
     *
     * 这里为所有的缓存的连接参数，每一种不同的驱动拥有不同的配置
     * 虽然有不同的驱动，但是在缓存使用上却有着一致性
     */
    'connect' => [
        'file' => [
            // driver
            'driver' => 'file',

            // 文件缓存路径
            'path' => Leevel::storagePath('app/cache'),

            // 默认过期时间
            'expire' => null,
        ],

        'redis' => [
            // driver
            'driver' => 'redis',

            // 默认缓存服务器
            'host' => Leevel::env('CACHE_REDIS_HOST', '127.0.0.1'),

            // 默认缓存服务器端口
            'port' => (int) Leevel::env('CACHE_REDIS_PORT', 6379),

            // 认证密码
            'password' => Leevel::env('CACHE_REDIS_PASSWORD', ''),

            // redis 数据库索引
            'select' => 0,

            // 超时设置
            'timeout' => 0,

            // 是否使用持久连接
            'persistent' => false,

            // 默认过期时间
            'expire' => null,
        ],

        'redisPool' => [
            // driver
            'driver' => 'redisPool',

            // redis 连接
            'redis_connect' => 'redis',

            // 最小空闲连接池数据量
            'max_idle_connections' => (int) Leevel::env('CACHE_REDIS_POOL_MAX_IDLE_CONNECTIONS', 30),

            // 最大空闲连接池数据量
            'min_idle_connections' => (int) Leevel::env('CACHE_REDIS_POOL_MIN_IDLE_CONNECTIONS', 10),

            // 通道写入最大超时时间设置(单位为毫秒)
            'max_push_timeout' => -1000,

            // 通道获取最大等待超时(单位为毫秒)
            'max_pop_timeout' => 0,

            // 连接的存活时间(单位为毫秒)
            'keep_alive_duration' => 60000,

            // 最大尝试次数
            'retry_times' => 3,
        ],

        'file_throttler' => [
            // driver
            'driver' => 'file',

            // 文件缓存路径
            'path' => Leevel::storagePath('throttler'),

            // 默认过期时间
            'expire' => null,
        ],

        'redis_throttler' => [
            // driver
            'driver' => 'redis',

            // 默认缓存服务器
            'host' => Leevel::env('THROTTLER_REDIS_HOST', '127.0.0.1'),

            // 默认缓存服务器端口
            'port' => (int) Leevel::env('THROTTLER_REDIS_PORT', 6379),

            // 认证密码
            'password' => Leevel::env('THROTTLER_REDIS_PASSWORD', ''),

            // redis 数据库索引
            'select' => 0,

            // 超时设置
            'timeout' => 0,

            // 是否使用持久连接
            'persistent' => false,

            // 默认过期时间
            'expire' => null,
        ],

        'file_session' => [
            // driver
            'driver' => 'file',

            // 文件缓存路径
            'path' => Leevel::storagePath('app/sessions'),

            // 默认过期时间
            'expire' => null,
        ],

        'redis_session' => [
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

            // 默认过期时间
            'expire' => null,
        ],
    ],
];

```

缓存参数根据不同的连接会有所区别，通用的缓存参数如下：

|配置项|配置描述|
|:-|:-|
|expire|设置好缓存时间（小与等于 0 表示永不过期，单位时间为秒）|


**Uses**

``` php
<?php

use Leevel\Cache\File;
use Leevel\Filesystem\Helper;
```

## 缓存基本使用

### 设置缓存

``` php
# Leevel\Cache\ICache::set
/**
 * 设置缓存.
 */
public function set(string $name, mixed $data, ?int $expire = null): void;
```

缓存配置 `$option` 根据不同缓存驱动支持不同的一些配置。

**file 驱动**

|配置项|配置描述|
|:-|:-|
|expire|设置好缓存时间（小与等于 0 表示永不过期，单位时间为秒）|
|path|缓存路径|

**redis 驱动**

|配置项|配置描述|
|:-|:-|
|expire|设置好缓存时间（小与等于 0 表示永不过期，单位时间为秒）|

### 获取缓存

``` php
# Leevel\Cache\ICache::get
/**
 * 获取缓存.
 */
public function get(string $name, mixed $defaults = false);
```

缓存不存在或者过期返回 `false`，可以根据这个判断缓存是否可用。

### 删除缓存

``` php
# Leevel\Cache\ICache::delete
/**
 * 清除缓存.
 */
public function delete(string $name): void;
```

直接指定缓存 `key` 即可，无返回。


``` php
public function testBaseUse(): void
{
    $filePath = __DIR__.'/cache/hello.php';
    $cache = new File([
        'path' => __DIR__.'/cache',
    ]);

    $cache->set('hello', 'world');
    $this->assertTrue(is_file($filePath));
    $this->assertSame('world', $cache->get('hello'));

    $cache->delete('hello');
    $this->assertFalse(is_file($filePath));
    $this->assertFalse($cache->get('hello'));
}
```
    
## put 批量设置缓存

函数签名

``` php
# Leevel\Cache\ICache::put
/**
 * 批量设置缓存.
 */
public function put(array|string $keys, mixed $value = null, ?int $expire = null): void;
```

::: tip
缓存配置 `$expire` 和 `set` 的用法一致。
:::


``` php
public function testPut(): void
{
    $cache = new File([
        'path' => __DIR__.'/cache',
    ]);

    $cache->put('hello', 'world');
    $cache->put(['hello2' => 'world', 'foo' => 'bar']);

    $this->assertSame('world', $cache->get('hello'));
    $this->assertSame('world', $cache->get('hello2'));
    $this->assertSame('bar', $cache->get('foo'));

    $cache->delete('hello');
    $cache->delete('hello2');
    $cache->delete('foo');

    $this->assertFalse($cache->get('hello'));
    $this->assertFalse($cache->get('hello2'));
    $this->assertFalse($cache->get('foo'));
}
```
    
## set 值 false 不允许作为缓存值

因为 `false` 会作为判断缓存是否存在的一个依据，所以 `false` 不能够作为缓存，否则会引起缓存穿透。


``` php
public function testSetNotAllowedFalse(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Data `false` not allowed to avoid cache penetration.'
    );

    $cache = new File([
        'path' => __DIR__.'/cache',
    ]);

    $cache->set('hello', false);
}
```
    
## put 批量设置缓存支持过期时间

``` php
public function testPutWithExpire(): void
{
    $cache = new File([
        'path' => __DIR__.'/cache',
    ]);

    $filePath = __DIR__.'/cache/hello.php';

    $cache->put('hello', 'world', 33);
    $cache->put(['hello2' => 'world', 'foo' => 'bar'], 22);

    $this->assertSame('world', $cache->get('hello'));
    $this->assertSame('world', $cache->get('hello2'));
    $this->assertSame('bar', $cache->get('foo'));
    $this->assertTrue(is_file($filePath));
    $this->assertStringContainsString('[33,', file_get_contents($filePath));

    $cache->delete('hello');
    $cache->delete('hello2');
    $cache->delete('foo');

    $this->assertFalse($cache->get('hello'));
    $this->assertFalse($cache->get('hello2'));
    $this->assertFalse($cache->get('foo'));
}
```
    
## remember 缓存存在读取否则重新设置

缓存值为闭包返回，闭包的参数为缓存的 `key`。

函数签名

``` php
# Leevel\Cache\ICache::remember
/**
 * 缓存存在读取否则重新设置.
 */
public function remember(string $name, Closure $dataGenerator, ?int $expire = null): mixed;
```

::: tip
缓存配置 `$expire` 和 `set` 的用法一致。
:::


``` php
public function testRemember(): void
{
    $cache = new File([
        'path' => __DIR__.'/cache',
    ]);
    $filePath = __DIR__.'/cache/hello.php';

    $this->assertFalse(is_file($filePath));
    $this->assertSame(['hello' => 'world'], $cache->remember('hello', function (string $key) {
        return [$key => 'world'];
    }));
    $this->assertTrue(is_file($filePath));
    $this->assertSame(['hello' => 'world'], $cache->get('hello'));

    $cache->delete('hello');

    $this->assertFalse($cache->get('hello'));
    $this->assertFalse(is_file($filePath));
}
```
    
## remember 缓存存在读取否则重新设置支持过期时间

``` php
public function testRememberWithExpire(): void
{
    $cache = new File([
        'path' => __DIR__.'/cache',
    ]);

    $filePath = __DIR__.'/cache/hello.php';
    if (is_file($filePath)) {
        unlink($filePath);
    }

    $this->assertFalse(is_file($filePath));
    $this->assertSame('123456', $cache->remember('hello', function (string $key) {
        return '123456';
    }, 33));

    $this->assertTrue(is_file($filePath));
    $this->assertSame('123456', $cache->remember('hello', function (string $key) {
        return '123456';
    }, 4));
    $this->assertSame('123456', $cache->get('hello'));

    $cache->delete('hello');

    $this->assertFalse($cache->get('hello'));
    $this->assertFalse(is_file($filePath));
}
```
    
## has 缓存是否存在

``` php
public function testHas(): void
{
    $cache = new File([
        'path' => __DIR__.'/cache',
    ]);
    $filePath = __DIR__.'/cache/has.php';

    $this->assertFalse($cache->has('has'));
    $cache->set('has', 'world');
    $this->assertTrue(is_file($filePath));
    $this->assertTrue($cache->has('has'));
}
```
    
## increase 自增

``` php
public function testIncrease(): void
{
    $cache = new File([
        'path' => __DIR__.'/cache',
    ]);
    $filePath = __DIR__.'/cache/increase.php';

    $this->assertSame(1, $cache->increase('increase'));
    $this->assertTrue(is_file($filePath));
    $this->assertSame(101, $cache->increase('increase', 100));
}
```
    
## decrease 自减

``` php
public function testDecrease(): void
{
    $cache = new File([
        'path' => __DIR__.'/cache',
    ]);
    $filePath = __DIR__.'/cache/decrease.php';

    $this->assertSame(-1, $cache->decrease('decrease'));
    $this->assertTrue(is_file($filePath));
    $this->assertSame(-101, $cache->decrease('decrease', 100));
}
```
    
## ttl 获取缓存剩余时间

剩余时间存在 3 种情况。

 * 不存在的 key:-2
 * key 存在，但没有设置剩余生存时间:-1
 * 有剩余生存时间的 key:剩余时间


``` php
public function testTtl(): void
{
    $cache = new File([
        'path' => __DIR__.'/cache',
    ]);
    $filePath = __DIR__.'/cache/ttl.php';

    $this->assertFalse($cache->has('ttl'));
    $this->assertSame(-2, $cache->ttl('ttl'));
    $cache->set('ttl', 'world');
    $this->assertTrue(is_file($filePath));
    $this->assertSame(86400, $cache->ttl('ttl'));
    $cache->set('ttl', 'world', 1);
    $this->assertSame(1, $cache->ttl('ttl'));
    $cache->set('ttl', 'world', 0);
    $this->assertSame(-1, $cache->ttl('ttl'));
}
```
    
## 键值命名规范

缓存键值默认支持正则 `/^[A-Za-z0-9\-\_:.]+$/`，可以通过 `setKeyRegex` 修改。


``` php
public function testInvalidCacheKey(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('Cache key must be `/^[A-Za-z0-9\-\_:.]+$/`.');

    $cache = new File([
        'path' => __DIR__.'/cache',
    ]);
    $cache->set('hello+world', 1);
}
```
    
## setKeyRegex 设置缓存键值正则

缓存键值默认支持正则 `/^[A-Za-z0-9\-\_:.]+$/`，可以通过 `setKeyRegex` 修改。


``` php
public function testSetKeyRegex(): void
{
    $cache = new File([
        'path' => __DIR__.'/cache',
    ]);
    $cache->setKeyRegex('/^[a-z+]+$/');
    $cache->set('hello+world', 1);
    $this->assertSame(1, $cache->get('hello+world'));
}
```