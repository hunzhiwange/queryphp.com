# HTTP Request

::: tip Testing Is Documentation
[tests/Http/RequestTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Http/RequestTest.php)
:::
    
QueryPHP 请求对象构建在 Symfony HttpFoundation 之上，增加了少量的功能。

## 使用方式

使用容器 request 服务

``` php
\App::make('request')->get($key, $default = null);
\App::make('request')->all(): array;
```

依赖注入

``` php
class Demo
{
    private \Leevel\Http\Request $request;

    public function __construct(\Leevel\Http\Request $request)
    {
        $this->request = $request;
    }
}
```

使用静态代理

``` php
\Leevel\Router\Proxy\Request::get(string $key, $default = null);
\Leevel\Router\Proxy\Request::all(): array;
```

::: warning 注意
为了一致性或者更好与 Swoole 对接，请统一使用请求对象处理输入，避免直接使用 `$_GET`、`$_POST`,`$_COOKIE`,`$_FILES`,`$_SERVER` 等全局变量。
:::


**Uses**

``` php
<?php

use Leevel\Http\Request;
use Symfony\Component\HttpFoundation\Request as SymfonyRequest;
```

## createFromSymfonyRequest 从 Symfony 请求创建 Leevel 请求

``` php
public function testCreateFromSymfonyRequest(): void
{
    $symfonyRequest = new SymfonyRequest(['foo' => 'bar', 'hello' => 'world'], [], [], [], [], [], 'content');
    $request = Request::createFromSymfonyRequest($symfonyRequest);

    $this->assertInstanceof(Request::class, $request);
    $this->assertSame(['foo' => 'bar', 'hello' => 'world'], $request->query->all());
    $this->assertSame('content', $request->getContent());
}
```
    
## all 获取所有请求参数

包含 request、query 和 attributes
优先级从高到底依次为 attributes、query 和 request，优先级高的会覆盖优先级低的参数


``` php
public function testAll(): void
{
    $request = new Request(['query' => '1'], ['request' => '2'], ['attributes' => '3']);
    $this->assertSame(['request' => '2', 'query' => '1', 'attributes' => '3'], $request->all());

    $request = new Request(['foo' => '1'], ['foo' => '2'], ['foo' => '3']);
    $this->assertSame(['foo' => '2'], $request->all());
}
```
    
## exists 请求是否包含非空

``` php
public function testExists(): void
{
    $request = new Request(['foo' => 'bar', 'hello' => 'world']);
    $this->assertTrue($request->exists(['foo']));
    $this->assertTrue($request->exists(['foo', 'hello']));
    $this->assertFalse($request->exists(['notFound']));
}
```
    
## only 取得给定的 keys 数据

``` php
public function testOnly(): void
{
    $request = new Request(['foo' => 'bar', 'hello' => 'world']);
    $this->assertSame(['foo' => 'bar'], $request->only(['foo']));
    $this->assertSame(['foo' => 'bar', 'hello' => 'world'], $request->only(['foo', 'hello']));
    $this->assertSame(['foo' => 'bar', 'not' => null], $request->only(['foo', 'not']));
}
```
    
## except 取得排除给定的 keys 数据

``` php
public function testExcept(): void
{
    $request = new Request(['foo' => 'bar', 'hello' => 'world']);
    $this->assertSame(['hello' => 'world'], $request->except(['foo']));
    $this->assertSame([], $request->except(['foo', 'hello']));
    $this->assertSame(['hello' => 'world'], $request->except(['foo', 'not']));
}
```
    
## isConsole 是否为 PHP 运行模式命令行, 兼容 Swoole HTTP Service

Swoole HTTP 服务器也以命令行运行，也就是 Swoole 情况下会返回 false。

``` php
public function testIsConsole(): void
{
    $request = new Request();
    $this->assertTrue($request->isConsole());
}
```
    
## isConsole 是否为 PHP 运行模式命令行，Swoole 场景测试

``` php
public function testIsConsoleForSwoole(): void
{
    $request = new Request([], [], [], [], [], ['SERVER_SOFTWARE' => 'swoole-http-server']);
    $this->assertFalse($request->isConsole());
}
```
    
## isCgi 是否为 PHP 运行模式 cgi

``` php
public function testIsCgi(): void
{
    $request = new Request();
    $this->assertFalse($request->isCgi());
}
```
    
## isPjax 是否为 Pjax 请求行为

``` php
public function testIsPjax(): void
{
    $request = new Request();

    $this->assertFalse($request->isPjax());
    $request->request->set(Request::VAR_PJAX, true);
    $this->assertTrue($request->isPjax());
}
```
    
## isAcceptAny 是否为接受任何请求，支持伪装

``` php
public function testIsAcceptJson(): void
{
    $request = new Request();

    $this->assertFalse($request->isRealAcceptJson());
    $this->assertFalse($request->isAcceptJson());

    $request->headers->set('accept', 'application/json, text/plain, */*');
    $this->assertTrue($request->isRealAcceptJson());
    $this->assertTrue($request->isAcceptJson());
    $request->headers->remove('accept');

    $this->assertFalse($request->isRealAcceptJson());
    $this->assertFalse($request->isAcceptJson());

    // (isAjax && !isPjax) && isAcceptAny
    $request->request->set(Request::VAR_AJAX, 1);
    $this->assertFalse($request->isRealAcceptJson());
    $this->assertTrue($request->isAcceptJson());
    $request->request->remove(Request::VAR_AJAX);

    // 伪装
    $request->query->set(Request::VAR_ACCEPT_JSON, '1');
    $this->assertTrue($request->isAcceptJson());
    $this->assertFalse($request->isRealAcceptJson());
}
```
    
## isAcceptAny 是否为接受任何请求

``` php
public function testIsAcceptAny(): void
{
    $request = new Request();

    $this->assertTrue($request->isAcceptAny());

    $request->headers->set('accept', 'application/json');
    $this->assertFalse($request->isAcceptAny());

    $request->headers->set('accept', '*/*');
    $this->assertTrue($request->isAcceptAny());
}
```
    
## getEnter 获取入口文件

``` php
public function testGetEnter(): void
{
    $request = new Request();
    $this->assertSame('', $request->getEnter());
}
```
    
## setPathInfo 设置 pathInfo

``` php
public function testSetPathInfo(): void
{
    $request = new Request();
    $this->assertSame('/', $request->getPathInfo());
    $request->setPathInfo('/foo/bar');
    $this->assertSame('/foo/bar', $request->getPathInfo());
}
```
    
## toArray 对象转数组

Request 请求对象实现了 `\Leevel\Support\IArray` 接口。

``` php
public function testToArray(): void
{
    $request = new Request(['foo' => 'bar', 'hello' => 'world']);
    $this->assertSame(['foo' => 'bar', 'hello' => 'world'], $request->toArray());
}
```