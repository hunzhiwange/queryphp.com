# Swoole 请求转 Leevel 请求

::: tip Testing Is Documentation
[tests/Protocol/Swoole2LeevelTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Protocol/Swoole2LeevelTest.php)
:::
    
Swoole 请求转换 Leevel 的请求后，然后传递给 Kernel 完成请求到响应的过程。

**Uses**

``` php
<?php

use Leevel\Http\Request;
use Leevel\Protocol\Swoole2Leevel;
use Swoole\Http\Request as SwooleHttpRequest;
```

## 转换 Swoole 请求的 header

``` php
public function testSwooleRequestWithHeader(): void
{
    $swoole2Leevel = new Swoole2Leevel();
    $wooleRequest = new SwooleHttpRequest();
    $wooleRequest->header = [
        'HOST'    => '127.0.0.1',
        'REFERER' => 'https://www.queryphp.com',
        'foo'     => 'bar',
    ];
    $request = $swoole2Leevel->createRequest($wooleRequest);
    $this->assertInstanceOf(Request::class, $request);

    $data = <<<'eot'
        {
            "HTTP_HOST": "127.0.0.1",
            "HTTP_REFERER": "https:\/\/www.queryphp.com",
            "HTTP_FOO": "bar"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $request->server->all()
        )
    );

    $data = <<<'eot'
        {
            "host": "127.0.0.1",
            "referer": "https:\/\/www.queryphp.com",
            "foo": "bar"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $request->headers->all(),
            1
        )
    );
}
```
    
## 转换 Swoole 请求的 server

``` php
public function testSwooleRequestWithServer(): void
{
    $swoole2Leevel = new Swoole2Leevel();
    $wooleRequest = new SwooleHttpRequest();
    $wooleRequest->header = [
        'HOST'    => '127.0.0.1',
        'REFERER' => 'https://www.queryphp.com',
        'foo'     => 'bar',
    ];
    $wooleRequest->server = [
        'SERVER_ADDR'     => '127.0.0.1',
        'SERVER_NAME'     => 'localhost',
        'SERVER_SOFTWARE' => 'Apache/2.2.22 (Win64) PHP/7.4.0',
        'SERVER_PROTOCOL' => 'HTTP/1.1',
        'REQUEST_METHOD'  => 'GET',
    ];
    $request = $swoole2Leevel->createRequest($wooleRequest);
    $this->assertInstanceOf(Request::class, $request);

    $data = <<<'eot'
        {
            "HTTP_HOST": "127.0.0.1",
            "HTTP_REFERER": "https:\/\/www.queryphp.com",
            "HTTP_FOO": "bar",
            "SERVER_ADDR": "127.0.0.1",
            "SERVER_NAME": "localhost",
            "SERVER_SOFTWARE": "Apache\/2.2.22 (Win64) PHP\/7.4.0",
            "SERVER_PROTOCOL": "HTTP\/1.1",
            "REQUEST_METHOD": "GET"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $request->server->all()
        )
    );

    $data = <<<'eot'
        {
            "host": "127.0.0.1",
            "referer": "https:\/\/www.queryphp.com",
            "foo": "bar"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $request->headers->all(),
            1
        )
    );
}
```
    
## 转换 Swoole 请求的其它属性

``` php
public function testSwooleRequestWithOther(): void
{
    $swoole2Leevel = new Swoole2Leevel();
    $wooleRequest = new SwooleHttpRequest();
    $wooleRequest->get = [
        'foo' => 'bar',
    ];
    $wooleRequest->post = [
        'hello' => 'world',
    ];
    $request = $swoole2Leevel->createRequest($wooleRequest);
    $this->assertInstanceOf(Request::class, $request);

    $data = <<<'eot'
        {
            "foo": "bar"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $request->query->all()
        )
    );

    $data = <<<'eot'
        {
            "hello": "world"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $request->request->all(),
            1
        )
    );
}
```