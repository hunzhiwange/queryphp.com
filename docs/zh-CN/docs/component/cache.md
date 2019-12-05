# 缓存

::: tip Testing Is Documentation
[tests/Cache/CacheTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Cache/CacheTest.php)
:::
    
QueryPHP 为系统提供了灵活的缓存功能，提供了多种缓存驱动。

内置支持的缓存类型包括 file、redis，未来可能增加其他驱动。

## 使用方式

使用助手函数

``` php
\Leevel\Cache\Helper::cache_get(string $key, $defaults = null, array $option = []);
\Leevel\Cache\Helper::cache_get(string $key, $defaults = null, array $option = []);
\Leevel\Cache\Helper::function cache(): \Leevel\Cache\ICache;
```

使用容器 cache 服务

``` php
\App::make('cache')->set(string $name, $data, array $option = []): void;
\App::make('cache')->get(string $name, $defaults = false, array $option = []);
```

依赖注入

``` php
class Demo
{
    private $cache;

    public function __construct(\Leevel\Cache\ICache $cache)
    {
        $this->cache = $cache;
    }
}
```

使用静态代理

``` php
\Leevel\Cache\Proxy\Cache::set(string $name, $data, array $option = []): void;
\Leevel\Cache\Proxy\Cache::get(string $name, $defaults = false, array $option = []);
```

## 缓存配置

系统的缓存配置位于应用下面的 `option/cache.php` 文件。

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
     * 缓存时间预置
     * ---------------------------------------------------------------
     *
     * 为了满足不同的需求，有部分缓存键值需要的缓存时间不一致，有些缓存可能需要频繁更新
     * 于是这里我们可以通过配置缓存预设时间来控制缓存的键值的特殊时间，其中 * 表示通配符
     * 键值 = 缓存值，键值不带前缀,例如 ['option' => 60]
     */
    'time_preset' => [],

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
            'path' => Leevel::runtimePath('file'),

            // 是否 serialize 格式化
            'serialize' => true,

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

            // 是否使用 serialize 编码
            'serialize' => true,

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
    ],
];

```

缓存参数根据不同的连接会有所区别，通用的缓存参数如下：

|配置项|配置描述|
|:-|:-|
|expire|设置好缓存时间（小与等于 0 表示永不过期，单位时间为秒）|
|time_preset|缓存时间预置|
|serialize|是否使用 serialize 编码|


**Uses**

 * use Leevel\Cache\File;
 * use Leevel\Filesystem\Fso;

## 缓存基本使用

### 设置缓存

``` php
set(string $name, $data, array $option = []): void;
```

缓存配置 `$option` 根据不同缓存驱动支持不同的一些配置。

**file 驱动**

|配置项|配置描述|
|:-|:-|
|expire|设置好缓存时间（小与等于 0 表示永不过期，单位时间为秒）|
|time_preset|缓存时间预置|
|serialize|是否使用 serialize 编码|
|path|缓存路径|

**redis 驱动**

|配置项|配置描述|
|:-|:-|
|expire|设置好缓存时间（小与等于 0 表示永不过期，单位时间为秒）|
|time_preset|缓存时间预置|
|serialize|是否使用 serialize 编码|

### 获取缓存

``` php
get(string $name, $defaults = false, array $option = []);
```

缓存不存在或者过期返回 `false`，可以根据这个判断缓存是否可用。

### 删除缓存

``` php
delete(string $name): void;
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
put($keys, $value = null, array $option = []): void;
```

::: tip
缓存配置 `$option` 和 `set` 的用法一致。
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
    
## put 批量设置缓存支持配置

``` php
public function testPutWithOption(): void
{
    $cache = new File([
        'path' => __DIR__.'/cache',
    ]);

    $filePath = __DIR__.'/cache/hello.php';

    $cache->put('hello', 'world', [
        'serialize' => true,
    ]);
    $cache->put(['hello2' => 'world', 'foo' => 'bar'], [
        'serialize' => true,
    ]);

    $this->assertSame('world', $cache->get('hello'));
    $this->assertSame('world', $cache->get('hello2'));
    $this->assertSame('bar', $cache->get('foo'));
    $this->assertTrue(is_file($filePath));
    $this->assertStringContainsString('s:5:"world"', file_get_contents($filePath));

    $cache->delete('hello');
    $cache->delete('hello2');
    $cache->delete('foo');

    $this->assertFalse($cache->get('hello'));
    $this->assertFalse($cache->get('hello2'));
    $this->assertFalse($cache->get('foo'));
}
```
    
## remember 缓存存在读取否则重新设置

函数签名

``` php
remember(string $name, $data, array $option = []);
```

::: tip
缓存配置 `$option` 和 `set` 的用法一致。
:::


``` php
public function testRemember(): void
{
    $cache = new File([
        'path' => __DIR__.'/cache',
    ]);
    $filePath = __DIR__.'/cache/hello.php';

    $this->assertFalse(is_file($filePath));
    $this->assertSame('123456', $cache->remember('hello', '123456'));
    $this->assertTrue(is_file($filePath));
    $this->assertSame('123456', $cache->remember('hello', '123456'));
    $this->assertSame('123456', $cache->get('hello'));

    $cache->delete('hello');

    $this->assertFalse($cache->get('hello'));
    $this->assertFalse(is_file($filePath));
}
```
    
## remember 缓存存在读取否则重新设置支持配置

``` php
public function testRememberWithOption(): void
{
    $cache = new File([
        'path' => __DIR__.'/cache',
    ]);

    $filePath = __DIR__.'/cache/hello.php';
    if (is_file($filePath)) {
        unlink($filePath);
    }

    $this->assertFalse(is_file($filePath));
    $this->assertSame('123456', $cache->remember('hello', '123456', [
        'serialize' => true,
    ]));

    $this->assertTrue(is_file($filePath));
    $this->assertSame('123456', $cache->remember('hello', '123456', [
        'serialize' => true,
    ]));
    $this->assertSame('123456', $cache->get('hello'));

    $cache->delete('hello');

    $this->assertFalse($cache->get('hello'));
    $this->assertFalse(is_file($filePath));
}
```
    
## remember 缓存存在读取否则重新设置支持闭包用法

闭包的参数为缓存的 `key`，返回值为缓存的值。

``` php
public function testRememberWithClosure(): void
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
    
## 缓存时间预置

不同场景下面的缓存可能支持不同的时间，我们可以在配置中预设时间而不是在使用时通过第三个参数传递 `expire` 过期时间，这种做法非常灵活。

缓存时间预设支持 `*` 通配符，可以灵活控制一类缓存时间。


``` php
public function testCacheTime(): void
{
    $file = new File([
        'time_preset' => [
            'foo'         => 500,
            'bar'         => -10,
            'hello*world' => 10,
            'foo*bar'     => -10,
        ],
        'path' => __DIR__.'/cache',
    ]);

    $file->set('foo', 'bar');
    $file->set('bar', 'hello');
    $file->set('hello123456world', 'helloworld1');
    $file->set('hello789world', 'helloworld2');
    $file->set('foo123456bar', 'foobar1');
    $file->set('foo789bar', 'foobar2');
    $file->set('haha', 'what about others?');

    $this->assertSame('bar', $file->get('foo'));
    $this->assertFalse($file->get('bar'));
    $this->assertSame('helloworld1', $file->get('hello123456world'));
    $this->assertSame('helloworld2', $file->get('hello789world'));
    $this->assertFalse($file->get('foo123456bar'));
    $this->assertFalse($file->get('foo789bar'));
    $this->assertSame('what about others?', $file->get('haha'));

    $file->delete('foo');
    $file->delete('bar');
    $file->delete('hello123456world');
    $file->delete('hello789world');
    $file->delete('foo123456bar');
    $file->delete('foo789bar');
    $file->delete('haha');
}
```