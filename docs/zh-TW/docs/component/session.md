# Session

::: tip Testing Is Documentation
[tests/Session/SessionTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Session/SessionTest.php)
:::
    
QueryPHP 提供了 Session (会话) 可以用于保存用户登录状态。

内置支持的 session 驱动类型包括 file、redis，未来可能增加其他驱动。

## 使用方式

使用容器 sessions 服务

``` php
\App::make('sessions')->set(string $name, $value): void;
\App::make('sessions')->get(string $name, $defaults = null);
```

依赖注入

``` php
class Demo
{
    private \Leevel\Session\Manager $session;

    public function __construct(\Leevel\Session\Manager $session)
    {
        $this->session = $session;
    }
}
```

使用静态代理

``` php
\Leevel\Session\Proxy\Session::set(string $name, $value): void;
\Leevel\Session\Proxy\Session::get(string $name, $value = null);
```

## session 配置

系统的 session 配置位于应用下面的 `option/session.php` 文件。

可以定义多个缓存连接，并且支持切换，每一个连接支持驱动设置。

``` php
<?php

declare(strict_types=1);

return [
    /*
     * ---------------------------------------------------------------
     * session 驱动
     * ---------------------------------------------------------------
     *
     * 采用什么源保存 session 数据，默认采用文件
     */
    'default' => Leevel::env('SESSION_DRIVER', 'file'),

    /*
     * ---------------------------------------------------------------
     * id
     * ---------------------------------------------------------------
     *
     * 相当于 session_id
     * null 表示自动生成随机字符串
     */
    'id' => null,

    /*
     * ---------------------------------------------------------------
     * name
     * ---------------------------------------------------------------
     *
     * 相当于 session_name
     */
    'name' => 'UID',

    /*
     * ---------------------------------------------------------------
     * COOKIE 过期时间
     * ---------------------------------------------------------------
     *
     * SESSION 依赖 COOKIE
     * COOKIE 默认过期时间
     * 小于等于 0 表示关闭浏览器即失效
     */
    'cookie_expire' => 86400,

    /*
     * ---------------------------------------------------------------
     * session 驱动连接参数
     * ---------------------------------------------------------------
     *
     * 这里为所有的 session 驱动的连接参数，每一种不同的驱动拥有不同的配置
     * 虽然有不同的驱动，但是在使用上却有着一致性
     */
    'connect' => [
        'file' => [
            // driver
            'driver' => 'file',

            // 驱动类
            'driver_class' => \Leevel\Session\File::class,

            // 文件缓存驱动
            'file_driver' => Leevel::env('SESSION_FILE_DRIVER', 'file_session'),
        ],

        'redis' => [
            // driver
            'driver' => 'redis',

            // 驱动类
            'driver_class' => \Leevel\Session\Redis::class,

            // Redis 缓存驱动
            'redis_driver' => Leevel::env('SESSION_REDIS_DRIVER', 'redis_session'),
        ],

        'test' => [
            // driver
            'driver' => 'test',

            // 驱动类
            'driver_class' => \Leevel\Session\Test::class,
        ],
    ],
];

```

session 参数根据不同的连接会有所区别，通用的 sesion 参数如下：

|配置项|配置描述|
|:-|:-|
|id|相当于 session_id|
|name|相当于 session_name|
|cookie_expire|COOKIE 过期时间|

::: warning 注意
QueryPHP 并没有使用 PHP 原生 SESSION，而是模拟原生 SESSION 自己实现的一套，使用方法与原生用法几乎一致。与原生 SESSION 不一样的是，QueryPHP 会在最后通过 session 中间件统一写入。
:::


**Uses**

``` php
<?php

use Leevel\Cache\File as CacheFile;
use Leevel\Filesystem\Helper;
use Leevel\Session\File;
use Leevel\Session\ISession;
```

## session 基本使用

session 的使用方法和原生差不多。

**设置 session**

``` php
set(string $name, $value): void;
```

**是否存在 session**

``` php
has(string $name): bool;
```

**删除 session**

``` php
delete(string $name): void;
```


``` php
public function testBaseUse(): void
{
    $session = $this->createFileSessionHandler();

    $this->assertInstanceof(ISession::class, $session);
    $this->assertFalse($session->isStart());
    $this->assertSame('', $session->getId());
    $this->assertSame('UID', $session->getName());

    $session->start();
    $this->assertTrue($session->isStart());

    $session->set('hello', 'world');
    $this->assertSame(['hello' => 'world'], $session->all());
    $this->assertTrue($session->has('hello'));
    $this->assertSame('world', $session->get('hello'));

    $session->delete('hello');
    $this->assertSame([], $session->all());
    $this->assertFalse($session->has('hello'));
    $this->assertNull($session->get('hello'));

    $session->start();
    $this->assertTrue($session->isStart());
    $this->assertTrue($session->open('foo', 'bar'));
    $this->assertTrue($session->close());
    $this->assertTrue($session->destroy('foo'));
    $this->assertSame(0, $session->gc(500));
}
```
    
## setExpire 设置过期时间

过期时间规则如下：

  * null 表示默认 session 缓存时间
  * 小与等于 0 表示永久缓存
  * 其它表示缓存多少时间，单位秒


``` php
public function testSetExpire(): void
{
    $session = $this->createFileSessionHandler();

    $session->setExpire(50);
    $session->set('hello', 'world');
    $this->assertSame(['hello' => 'world'], $session->all());

    $session->start();
    $session->save();

    $sessionId = $session->getId();
    $dirPath = __DIR__.'/cache';
    $filePath = $dirPath.'/'.$sessionId.'.php';
    $this->assertFileExists($filePath);
    $this->assertStringContainsString('[50,', file_get_contents($filePath));
}
```
    
## put 批量插入

``` php
public function testPut(): void
{
    $session = $this->createFileSessionHandler();

    $session->put('hello', 'world');
    $this->assertSame(['hello' => 'world'], $session->all());

    $session->put(['foo' => 'bar']);
    $this->assertSame(['hello' => 'world', 'foo' => 'bar'], $session->all());

    $session->put(['foo' => 'bar']);
    $this->assertSame(['hello' => 'world', 'foo' => 'bar'], $session->all());
}
```
    
## clear 清空 session

``` php
public function testClear(): void
{
    $session = $this->createFileSessionHandler();

    $session->set('hello', ['sub' => 'me', 'foo' => 'bar', 'hello' => 'world']);
    $this->assertSame(['hello' => ['sub' => 'me', 'foo' => 'bar', 'hello' => 'world']], $session->all());

    $session->clear();
    $this->assertSame([], $session->all());
}
```
    
## flash 闪存一个数据，当前请求和下一个请求可用

``` php
public function testFlash(): void
{
    $session = $this->createFileSessionHandler();

    $session->flash('hello', 'world');

    $flash = <<<'eot'
        {
            "flash.data.hello": "world",
            "flash.new.key": [
                "hello"
            ],
            "flash.old.key": []
        }
        eot;

    $this->assertSame(
        $flash,
        $this->varJson(
            $session->all()
        )
    );

    $session->flash('foo', ['bar']);

    $flash = <<<'eot'
        {
            "flash.data.hello": "world",
            "flash.new.key": [
                "hello",
                "foo"
            ],
            "flash.old.key": [],
            "flash.data.foo": [
                "bar"
            ]
        }
        eot;

    $this->assertSame(
        $flash,
        $this->varJson(
            $session->all()
        )
    );
}
```
    
## flashs 批量闪存数据，当前请求和下一个请求可用

``` php
public function testFlashs(): void
{
    $session = $this->createFileSessionHandler();

    $session->flashs(['hello' => 'world', 'foo' => 'bar']);

    $flash = <<<'eot'
        {
            "flash.data.hello": "world",
            "flash.new.key": [
                "hello",
                "foo"
            ],
            "flash.old.key": [],
            "flash.data.foo": "bar"
        }
        eot;

    $this->assertSame(
        $flash,
        $this->varJson(
            $session->all()
        )
    );
}
```
    
## nowFlash 闪存一个 flash 用于当前请求使用,下一个请求将无法获取

``` php
public function testNowFlash(): void
{
    $session = $this->createFileSessionHandler();

    $session->nowFlash('hello', 'world');

    $flash = <<<'eot'
        {
            "flash.data.hello": "world",
            "flash.old.key": [
                "hello"
            ]
        }
        eot;

    $this->assertSame(
        $flash,
        $this->varJson(
            $session->all()
        )
    );
}
```
    
## nowFlashs 批量闪存数据,用于当前请求使用，下一个请求将无法获取

``` php
public function testNowFlashs(): void
{
    $session = $this->createFileSessionHandler();

    $session->nowFlashs(['hello' => 'world', 'foo' => 'bar']);

    $flash = <<<'eot'
        {
            "flash.data.hello": "world",
            "flash.old.key": [
                "hello",
                "foo"
            ],
            "flash.data.foo": "bar"
        }
        eot;

    $this->assertSame(
        $flash,
        $this->varJson(
            $session->all()
        )
    );
}
```
    
## rebuildFlash 保持所有闪存数据

``` php
public function testRebuildFlash(): void
{
    $session = $this->createFileSessionHandler();

    $session->nowFlashs(['hello' => 'world', 'foo' => 'bar']);

    $flash = <<<'eot'
        {
            "flash.data.hello": "world",
            "flash.old.key": [
                "hello",
                "foo"
            ],
            "flash.data.foo": "bar"
        }
        eot;

    $this->assertSame(
        $flash,
        $this->varJson(
            $session->all()
        )
    );

    $session->rebuildFlash();

    $flash = <<<'eot'
        {
            "flash.data.hello": "world",
            "flash.old.key": [],
            "flash.data.foo": "bar",
            "flash.new.key": [
                "hello",
                "foo"
            ]
        }
        eot;

    $this->assertSame(
        $flash,
        $this->varJson(
            $session->all()
        )
    );
}
```
    
## keepFlash 保持闪存数据

``` php
public function testKeepFlash(): void
{
    $session = $this->createFileSessionHandler();

    $session->nowFlashs(['hello' => 'world', 'foo' => 'bar']);

    $flash = <<<'eot'
        {
            "flash.data.hello": "world",
            "flash.old.key": [
                "hello",
                "foo"
            ],
            "flash.data.foo": "bar"
        }
        eot;

    $this->assertSame(
        $flash,
        $this->varJson(
            $session->all()
        )
    );

    $session->keepFlash(['hello', 'foo']);

    $flash = <<<'eot'
        {
            "flash.data.hello": "world",
            "flash.old.key": [],
            "flash.data.foo": "bar",
            "flash.new.key": [
                "hello",
                "foo"
            ]
        }
        eot;

    $this->assertSame(
        $flash,
        $this->varJson(
            $session->all()
        )
    );
}
```
    
## getFlash 返回闪存数据

``` php
public function testGetFlash(): void
{
    $session = $this->createFileSessionHandler();

    $session->nowFlashs(['hello' => 'world', 'foo' => 'bar']);

    $this->assertSame('world', $session->getFlash('hello'));
    $this->assertSame('bar', $session->getFlash('foo'));

    $session->flash('test', ['foo', 'bar']);
    $this->assertSame(['foo', 'bar'], $session->getFlash('test'));
    $this->assertNull($session->getFlash('notFound'));

    $session->flash('bar', ['sub' => ['foo' => 'bar']]);
    $this->assertSame(['foo', 'bar'], $session->getFlash('test'));
    $this->assertNull($session->getFlash('test\\notFound'));
}
```
    
## clearFlash 清理所有闪存数据

``` php
public function testClearFlash(): void
{
    $session = $this->createFileSessionHandler();

    $session->flashs(['hello' => 'world', 'foo' => 'bar']);

    $flash = <<<'eot'
        {
            "flash.data.hello": "world",
            "flash.new.key": [
                "hello",
                "foo"
            ],
            "flash.old.key": [],
            "flash.data.foo": "bar"
        }
        eot;

    $this->assertSame(
        $flash,
        $this->varJson(
            $session->all()
        )
    );

    $session->clearFlash();

    $flash = <<<'eot'
        {
            "flash.new.key": [],
            "flash.old.key": [
                "hello",
                "foo"
            ]
        }
        eot;

    $this->assertSame(
        $flash,
        $this->varJson(
            $session->all()
        )
    );
}
```
    
## setPrevUrl.prevUrl 设置和返回前一个请求地址

``` php
public function testPrevUrl(): void
{
    $session = $this->createFileSessionHandler();
    $this->assertNull($session->prevUrl());
    $session->setPrevUrl('foo');
    $this->assertSame('foo', $session->prevUrl());
}
```
    
## destroySession 终止会话

``` php
public function testDestroy(): void
{
    $session = $this->createFileSessionHandler();

    $this->assertFalse($session->isStart());
    $this->assertSame('', $session->getId());
    $this->assertSame('UID', $session->getName());

    $session->start();
    $this->assertTrue($session->isStart());
    $this->assertNotNull($session->getId());
    $this->assertNotNull($session->getName());

    $session->destroySession();
    $this->assertFalse($session->isStart());
    $this->assertSame('', $session->getId());
    $this->assertSame('UID', $session->getName());
}
```