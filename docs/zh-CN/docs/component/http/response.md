# HTTP Response

::: tip Testing Is Documentation
[tests/Http/ResponseTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Http/ResponseTest.php)
:::
    
QueryPHP 响应对象基于 Symfony 二次开发，功能非常强大，做了一些精简和优化。

::: warning 注意
为了一致性或者更好与 Swoole 对接，请统一使用响应对象返回，框架会自动处理返回结果，请避免直接使用 `echo`、`die` 等中断后续处理。
:::


**Uses**

``` php
<?php

use DateTime;
use DateTimeZone;
use InvalidArgumentException;
use JsonSerializable;
use Leevel\Http\Response;
use Leevel\Support\IArray;
use Leevel\Support\IJson;
use ReflectionProperty;
```

## create 创建一个响应对象

``` php
public function testCreate(): void
{
    $response = Response::create('foo', 301, ['Foo' => 'bar']);
    $this->assertInstanceOf('Leevel\\Http\\IResponse', $response);
    $this->assertInstanceOf('Leevel\\Http\\Response', $response);
    $this->assertSame(301, $response->getStatusCode());
    $this->assertSame('bar', $response->headers->get('foo'));
}
```
    
## sendHeaders 发送响应头

``` php
public function testSendHeaders(): void
{
    $response = new Response();
    $headers = $response->sendHeaders();
    $this->assertObjectHasAttribute('headers', $headers);
    $this->assertObjectHasAttribute('content', $headers);
    $this->assertObjectHasAttribute('protocolVersion', $headers);
    $this->assertObjectHasAttribute('statusCode', $headers);
    $this->assertObjectHasAttribute('statusText', $headers);
    $this->assertObjectHasAttribute('charset', $headers);
}
```
    
## send 发送 HTTP 响应

``` php
public function testSend(): void
{
    $response = new Response();
    $responseSend = $response->send();
    $this->assertObjectHasAttribute('headers', $responseSend);
    $this->assertObjectHasAttribute('content', $responseSend);
    $this->assertObjectHasAttribute('protocolVersion', $responseSend);
    $this->assertObjectHasAttribute('statusCode', $responseSend);
    $this->assertObjectHasAttribute('statusText', $responseSend);
    $this->assertObjectHasAttribute('charset', $responseSend);
}
```
    
## setCharset.getCharset 设置和获取编码

``` php
public function testGetCharset(): void
{
    $response = new Response();
    $charsetOrigin = 'UTF-8';
    $response->setCharset($charsetOrigin);
    $charset = $response->getCharset();
    $this->assertSame($charsetOrigin, $charset);
}
```
    
## setNotModified 设置响应未修改

``` php
public function testSetNotModified(): void
{
    $response = new Response();
    $modified = $response->setNotModified();
    $this->assertObjectHasAttribute('headers', $modified);
    $this->assertObjectHasAttribute('content', $modified);
    $this->assertObjectHasAttribute('protocolVersion', $modified);
    $this->assertObjectHasAttribute('statusCode', $modified);
    $this->assertObjectHasAttribute('statusText', $modified);
    $this->assertObjectHasAttribute('charset', $modified);
    $this->assertSame(304, $modified->getStatusCode());
}
```
    
## isSuccessful 是否为正确响应

``` php
public function testIsSuccessful(): void
{
    $response = new Response();
    $this->assertTrue($response->isSuccessful());
}
```
    
## getProtocolVersion 获取 HTTP 协议版本

``` php
public function testGetSetProtocolVersion(): void
{
    $response = new Response();
    $this->assertSame('1.0', $response->getProtocolVersion());
    $response->setProtocolVersion('1.1');
    $this->assertSame('1.1', $response->getProtocolVersion());
}
```
    
## 获取响应头 Content-Type

``` php
public function testContentTypeCharset(): void
{
    $response = new Response();
    $response->headers->set('Content-Type', 'text/css');
    $this->assertSame('text/css', $response->headers->get('Content-Type'));
    $response->headers->remove('Content-Type');
    $this->assertNull($response->headers->get('Content-Type'));

    $response->setContentType('text/css');
    $this->assertSame('text/css', $response->headers->get('Content-Type'));
    $response->headers->remove('Content-Type');
    $this->assertNull($response->headers->get('Content-Type'));

    $response->setContentType('text/css', 'UTF-8');
    $this->assertSame('text/css; charset=UTF-8', $response->headers->get('Content-Type'));
    $response->headers->remove('Content-Type');
    $this->assertNull($response->headers->get('Content-Type'));

    $response->setCharset('GBK');
    $response->setContentType('text/css');
    $this->assertSame('text/css; charset=GBK', $response->headers->get('Content-Type'));
    $response->headers->remove('Content-Type');
    $this->assertNull($response->headers->get('Content-Type'));
}
```
    
## 设置响应缓存

``` php
public function testSetCache(): void
{
    $response = new Response();

    $response->setCache(5);
    $this->assertTrue($response->headers->has('expires'));
    $this->assertSame($response->headers->get('cache-control'), 'max-age=300');

    $response->setExpires(null);
    $this->assertNull($response->headers->get('Expires'), '->setExpires() remove the header when passed null');

    $response->setEtag('hello-world-etag');
    $this->assertSame($response->headers->get('Etag'), 'hello-world-etag');

    $date = new DateTime();
    $date->modify('+'. 5 .'minutes');

    $response->setLastModified($date);
    $this->assertTrue($response->headers->has('Last-Modified'));

    $response->setLastModified(null);
    $this->assertNull($response->headers->get('Last-Modified'), '->setLastModified() remove the header when passed null');
}
```
    
## sendContent 发送响应内容

``` php
public function testSendContent(): void
{
    $response = new Response('test response rendering', 200);
    ob_start();
    $response->sendContent();
    $string = ob_get_clean();
    $this->assertStringContainsString('test response rendering', $string);
}
```
    
## setData 设置 JSON 数据

``` php
public function testSetJsonData(): void
{
    $response = new Response();
    $response->setData(['foo' => 'bar']);
    $this->assertSame('{"foo":"bar"}', $response->getContent());

    $response->setData(new MyArray());
    $this->assertSame('{"hello":"IArray"}', $response->getContent());

    $response->setData(new MyJson());
    $this->assertSame('{"hello":"IJson"}', $response->getContent());

    $response->setData(new MyJsonSerializable());
    $this->assertSame('{"hello":"JsonSerializable"}', $response->getContent());
}
```
    
## isInvalid 响应是否为无效的

``` php
public function testIsInvalid(): void
{
    $response = new Response();

    try {
        $response->setStatusCode(99);
        $this->fail();
    } catch (InvalidArgumentException $e) {
        $this->assertTrue($response->isInvalid());
    }

    try {
        $response->setStatusCode(650);
        $this->fail();
    } catch (InvalidArgumentException $e) {
        $this->assertTrue($response->isInvalid());
    }

    $response = new Response('', 200);
    $this->assertFalse($response->isInvalid());
}
```
    
## setStatusCode 设置响应状态码

**测试的响应状态**

``` php
public function getStatusCodeFixtures()
{
    return [
        ['200', null, 'OK'],
        ['200', '', ''],
        ['200', 'foo', 'foo'],
        ['199', null, 'unknown status'],
        ['199', '0', '0'],
        ['199', 'foo', 'foo'],
    ];
}
```


``` php
public function testSetStatusCode($code, $text, $expectedText): void
{
    $response = new Response();
    $response->setStatusCode((int) $code, $text);
    $statusText = new ReflectionProperty($response, 'statusText');
    $statusText->setAccessible(true);
    $this->assertSame($expectedText, $statusText->getValue($response));
}
```
    
## isInformational 是否为信息性响应

``` php
public function testIsInformational(): void
{
    $response = new Response('', 100);
    $this->assertTrue($response->isInformational());
    $response = new Response('', 200);
    $this->assertFalse($response->isInformational());
}
```
    
## isRedirection.isRedirect 是否为重定向响应（包括表单重定向）

``` php
public function testIsRedirectRedirection(): void
{
    foreach ([301, 302, 303, 307] as $code) {
        $response = new Response('', $code);
        $this->assertTrue($response->isRedirection());
        $this->assertTrue($response->isRedirect());
    }

    $response = new Response('', 304);
    $this->assertTrue($response->isRedirection());
    $this->assertFalse($response->isRedirect());

    $response = new Response('', 200);
    $this->assertFalse($response->isRedirection());
    $this->assertFalse($response->isRedirect());

    $response = new Response('', 404);
    $this->assertFalse($response->isRedirection());
    $this->assertFalse($response->isRedirect());

    $response = new Response('', 301, ['Location' => '/good-uri']);
    $this->assertFalse($response->isRedirect('/bad-uri'));
    $this->assertTrue($response->isRedirect('/good-uri'));
}
```
    
## isNotFound 是否为 404 NOT FOUND

``` php
public function testIsNotFound(): void
{
    $response = new Response('', 404);
    $this->assertTrue($response->isNotFound());
    $response = new Response('', 200);
    $this->assertFalse($response->isNotFound());
}
```
    
## isEmpty 是否为空响应

``` php
public function testIsEmpty(): void
{
    foreach ([204, 304] as $code) {
        $response = new Response('', $code);
        $this->assertTrue($response->isEmpty());
    }
    $response = new Response('', 200);
    $this->assertFalse($response->isEmpty());
}
```
    
## isForbidden 是否为受限响应

``` php
public function testIsForbidden(): void
{
    $response = new Response('', 403);
    $this->assertTrue($response->isForbidden());
    $response = new Response('', 200);
    $this->assertFalse($response->isForbidden());
}
```
    
## isOk 是否为正常响应

``` php
public function testIsOk(): void
{
    $response = new Response('', 200);
    $this->assertTrue($response->isOk());
    $response = new Response('', 404);
    $this->assertFalse($response->isOk());
}
```
    
## isClientError.isServerError 否为客户端或者服务端错误响应

``` php
public function testIsServerOrClientError(): void
{
    $response = new Response('', 404);
    $this->assertTrue($response->isClientError());
    $this->assertFalse($response->isServerError());
    $response = new Response('', 500);
    $this->assertFalse($response->isClientError());
    $this->assertTrue($response->isServerError());
}
```
    
## setContent 支持设置实现了 \Leevel\Support\IArray JSON 类数据

实现了 `\Leevel\Support\IArray` 的对象也会被转化为 JSON。

测试对象

``` php
namespace Tests\Http;

class MyArray implements IArray
{
    public function toArray(): array
    {
        return ['hello' => 'IArray'];
    }
}
```


``` php
public function testSetContentAsJon(): void
{
    $response = new Response();

    $response->setContent(new MyArray());

    $this->assertSame('{"hello":"IArray"}', $response->getContent());
    $this->assertTrue($response->isOk());
    $this->assertSame(['hello' => 'IArray'], $response->getData());
}
```
    
## setContent 支持设置实现了 \Leevel\Support\IJson JSON 类数据

实现了 `\Leevel\Support\IJson` 的对象也会被转化为 JSON。

测试对象

``` php
namespace Tests\Http;

class MyJson implements IJson
{
    public function toJson(?int $option = null): string
    {
        if (null === $option) {
            $option = JSON_UNESCAPED_UNICODE;
        }

        return json_encode(['hello' => 'IJson'], $option);
    }
}
```


``` php
public function testSetContentAsJonWithIJson(): void
{
    $response = new Response();

    $response->setContent(new MyJson());

    $this->assertSame('{"hello":"IJson"}', $response->getContent());
    $this->assertTrue($response->isOk());
    $this->assertSame(['hello' => 'IJson'], $response->getData());
}
```
    
## appendContent 附加内容

``` php
public function testAppendContent(): void
{
    $response = new Response();

    $response->setContent('hello');

    $this->assertSame('hello', $response->getContent());
    $this->assertTrue($response->isOk());

    $response->appendContent('world');

    $this->assertSame('helloworld', $response->getContent());
    $this->assertTrue($response->isOk());
    $this->assertSame('helloworld', $response->getData());
}
```
    
## withHeaders 批量设置响应头

``` php
public function testWithHeaders(): void
{
    $response = new Response();

    $response->withHeaders(['foo' => 'bar']);

    $this->assertSame('bar', $response->headers->get('foo'));
}
```
    
## cookie.withCookies 设置 COOKIE

``` php
public function testCookie(): void
{
    $response = new Response();

    $allCookies = [
        'foo' => [
            'foo',
            'bar',
            time() + 86400,
            '/',
            '',
            false,
            false,
        ],
        'hello' => [
            'hello',
            'world',
            time() + 86400,
            '/',
            '',
            false,
            false,
        ],
    ];

    $response->cookie('foo', 'bar');
    $response->withCookies(['hello' => 'world']);

    $this->assertSame($allCookies, $response->getCookies());
}
```
    
## getOriginal 获取原始内容

``` php
public function testGetOriginal(): void
{
    $response = new Response();
    $response->setContent('hello');

    $this->assertSame('hello', $response->content());
    $this->assertTrue($response->isOk());
    $this->assertSame('hello', $response->getOriginal());

    $response->setContent($myArr = new MyArray());

    $this->assertSame('{"hello":"IArray"}', $response->getContent());
    $this->assertTrue($response->isOk());
    $this->assertSame(['hello' => 'IArray'], $response->getData());
    $this->assertEquals($myArr, $response->getOriginal());
}
```
    
## status 获取状态码

``` php
public function testStatus(): void
{
    $response = new Response();
    $response->setContent('hello');

    $this->assertSame(200, $response->status());
}
```
    
## setContentLength 设置响应内容长度

``` php
public function testSetContentLength(): void
{
    $response = new Response();
    $response->setContentLength(100);

    $this->assertSame('100', $response->headers->get('Content-Length'));
}
```
    
## isJson 响应是否为 JSON

``` php
public function testIsJson(): void
{
    $response = new Response();
    $response->setContent('foo');

    $this->assertFalse($response->isJson());

    $response->setContent(new MyArray());

    $this->assertTrue($response->isJson());
}
```