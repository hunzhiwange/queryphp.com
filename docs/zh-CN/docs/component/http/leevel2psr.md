# Leevel to Psr

::: tip Testing Is Documentation
[tests/Http/Leevel2PsrTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Http/Leevel2PsrTest.php)
:::
    
QueryPHP 将 QueryPHP 请求响应对象转化为标准 Psr HTTP 请求响应对象，目前用于 `Go RoadRunner` 的数据处理。

**Uses**

``` php
<?php

use Leevel\Http\Leevel2Psr;
use Leevel\Http\Request;
use Leevel\Http\Response;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\UploadedFile;
```

## createRequest 从 Leevel 请求对象创建 Psr 请求对象

``` php
public function testCreateRequest(): void
{
    $tmpFile = $this->createTempFile();
    $tmpFile2 = $this->createTempFile();
    $files = [
        'file' => [
            'name'     => [basename($tmpFile), basename($tmpFile2)],
            'type'     => ['text/plain', 'text/plain'],
            'tmp_name' => [$tmpFile, $tmpFile2],
            'error'    => [0, 0],
            'size'     => [null, null],
        ],
    ];

    $request = new Request(['hello' => 'world'], [], ['foo' => 'bar'], [], $files, ['REQUEST_URI' => 'http://queryphp.com/hello.html']);
    $l2p = new Leevel2Psr();
    $psrRequest = $l2p->createRequest($request);

    $this->assertInstanceOf(ServerRequestInterface::class, $psrRequest);
    $this->assertSame(['hello' => 'world'], $psrRequest->getQueryParams());
    $this->assertSame(['foo' => 'bar'], $psrRequest->getAttributes());
    $this->assertSame(['REQUEST_URI' => 'http://queryphp.com/hello.html'], $psrRequest->getServerParams());

    $uploadFiles = $psrRequest->getUploadedFiles();
    $this->assertIsArray($uploadFiles);
    $this->assertCount(2, $uploadFiles);
    $this->assertInstanceOf(UploadedFile::class, $uploadFiles['file\\0']);
    $this->assertInstanceOf(UploadedFile::class, $uploadFiles['file\\1']);
    $this->assertSame(0, $uploadFiles['file\\0']->getError());
    $this->assertSame(0, $uploadFiles['file\\1']->getError());
}
```
    
## createResponse 从 Leevel 响应对象创建 Psr 响应对象

``` php
public function testCreateResponse(): void
{
    $response = new Response('hello world', 200);
    $response->setCookie('foo', 'bar');
    $l2p = new Leevel2Psr();
    $psrResponse = $l2p->createResponse($response);

    $this->assertInstanceOf(ResponseInterface::class, $psrResponse);
    $this->assertSame(200, $psrResponse->getStatusCode());
    $this->assertSame('OK', $psrResponse->getReasonPhrase());
}
```