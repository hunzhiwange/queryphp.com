# Api Response

::: tip Testing Is Documentation
[tests/Http/ApiResponseTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Http/ApiResponseTest.php)
:::
    
QueryPHP 针对 API 接口可以直接返回一个 `\Leevel\Http\ApiResponse` 响应对象。

**Uses**

``` php
<?php

use Leevel\Http\ApiResponse;
```

## create 创建一个 API 响应

``` php
public function testBaseUse(): void
{
    $response = ApiResponse::create(['hello' => 'world']);

    $this->assertSame('{"hello":"world"}', $response->getContent());
    $this->assertSame(200, $response->getStatusCode());
    $this->assertSame('OK', $this->getTestProperty($response, 'statusText'));
}
```
    
## ok 请求成功 API 响应

``` php
public function testOk(): void
{
    $response = new ApiResponse();
    $response->ok(['hello' => 'world']);

    $this->assertSame('{"hello":"world"}', $response->getContent());
    $this->assertSame(200, $response->getStatusCode());
    $this->assertSame('OK', $this->getTestProperty($response, 'statusText'));
}
```
    
## created 已创建 API 响应

``` php
public function testCreated(): void
{
    $response = new ApiResponse();
    $response->created('http://queryphp.com', ['hello' => 'world']);

    $this->assertSame('{"hello":"world"}', $response->getContent());
    $this->assertSame(201, $response->getStatusCode());
    $this->assertSame('http://queryphp.com', $response->headers->get('Location'));
    $this->assertSame('Created', $this->getTestProperty($response, 'statusText'));
}
```
    
## accepted 已接受 API 响应

``` php
public function testAccepted(): void
{
    $response = new ApiResponse();
    $response->accepted('http://queryphp.com', ['hello' => 'world']);

    $this->assertSame('{"hello":"world"}', $response->getContent());
    $this->assertSame(202, $response->getStatusCode());
    $this->assertSame('http://queryphp.com', $response->headers->get('Location'));
    $this->assertSame('Accepted', $this->getTestProperty($response, 'statusText'));
}
```
    
## noContent 无内容 API 响应

``` php
public function testNoContent(): void
{
    $response = new ApiResponse();
    $response->noContent();

    $this->assertSame('{}', $response->getContent());
    $this->assertSame(204, $response->getStatusCode());
    $this->assertSame('No Content', $this->getTestProperty($response, 'statusText'));
}
```
    
## unprocessableEntity 无法处理的实体 API 响应

``` php
public function testUnprocessableEntity(): void
{
    $response = new ApiResponse();
    $response->unprocessableEntity(['foo' => 'bar', 'hello' => 'world'], 'error message', 'status text');

    $this->assertSame('{"message":"error message","errors":{"foo":"bar","hello":"world"}}', $response->getContent());
    $this->assertSame(422, $response->getStatusCode());
    $this->assertSame('status text', $this->getTestProperty($response, 'statusText'));
}
```
    
## error 错误请求 API 响应

``` php
public function testError(): void
{
    $response = new ApiResponse();
    $response->error('test message', 500, 'status text');

    $this->assertSame('{"message":"test message"}', $response->getContent());
    $this->assertSame(500, $response->getStatusCode());
    $this->assertSame('status text', $this->getTestProperty($response, 'statusText'));
}
```
    
## badRequest 错误请求 API 响应

``` php
public function testBadRequest(): void
{
    $response = new ApiResponse();
    $response->badRequest('test message', 'status text');

    $this->assertSame('{"message":"test message"}', $response->getContent());
    $this->assertSame(400, $response->getStatusCode());
    $this->assertSame('status text', $this->getTestProperty($response, 'statusText'));
}
```
    
## unauthorized 未授权 API 响应

``` php
public function testUnauthorized(): void
{
    $response = new ApiResponse();
    $response->unauthorized('test message', 'status text');

    $this->assertSame('{"message":"test message"}', $response->getContent());
    $this->assertSame(401, $response->getStatusCode());
    $this->assertSame('status text', $this->getTestProperty($response, 'statusText'));
}
```
    
## forbidden 禁止 API 响应

``` php
public function testForbidden(): void
{
    $response = new ApiResponse();
    $response->forbidden('test message', 'status text');

    $this->assertSame('{"message":"test message"}', $response->getContent());
    $this->assertSame(403, $response->getStatusCode());
    $this->assertSame('status text', $this->getTestProperty($response, 'statusText'));
}
```
    
## notFound 未找到 API 响应

``` php
public function testNotFound(): void
{
    $response = new ApiResponse();
    $response->notFound('test message', 'status text');

    $this->assertSame('{"message":"test message"}', $response->getContent());
    $this->assertSame(404, $response->getStatusCode());
    $this->assertSame('status text', $this->getTestProperty($response, 'statusText'));
}
```
    
## methodNotAllowed 方法禁用 API 响应

``` php
public function testMethodNotAllowed(): void
{
    $response = new ApiResponse();
    $response->methodNotAllowed('test message', 'status text');

    $this->assertSame('{"message":"test message"}', $response->getContent());
    $this->assertSame(405, $response->getStatusCode());
    $this->assertSame('status text', $this->getTestProperty($response, 'statusText'));
}
```
    
## tooManyRequests 太多请求 API 响应

``` php
public function testTooManyRequests(): void
{
    $response = new ApiResponse();
    $response->tooManyRequests('test message', 'status text');

    $this->assertSame('{"message":"test message"}', $response->getContent());
    $this->assertSame(429, $response->getStatusCode());
    $this->assertSame('status text', $this->getTestProperty($response, 'statusText'));
}
```
    
## internalServerError 服务器内部错误 API 响应

``` php
public function testInternalServerError(): void
{
    $response = new ApiResponse();
    $response->internalServerError('test message', 'status text');

    $this->assertSame('{"message":"test message"}', $response->getContent());
    $this->assertSame(500, $response->getStatusCode());
    $this->assertSame('status text', $this->getTestProperty($response, 'statusText'));
}
```