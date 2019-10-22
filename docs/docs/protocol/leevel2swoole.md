# Leevel 响应转 Swoole 响应

::: tip 单元测试即文档
[基于原始文档 tests/Protocol/Leevel2SwooleTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Protocol/Leevel2SwooleTest.php)
:::
    
Leevel 响应转 Swoole 响应后，然后传递给 Swoole 完成响应给用户。

**引入相关类**

 * use Leevel\Http\RedirectResponse;
 * use Leevel\Http\Response;
 * use Leevel\Protocol\Leevel2Swoole;
 * use Swoole\Http\Response as SwooleHttpResponse;

## 转换 Leevel 响应的 header


``` php
public function testResponseWithHeader(): void
{
    $leevel2Swoole = new Leevel2Swoole();
    $swooleResponse = $this->createMock(SwooleHttpResponse::class);
    $response = new Response('hello');
    $response->withHeaders([
        'foo'   => 'bar',
        'hello' => 'world',
    ]);

    $leevel2Swoole->createResponse($response, $swooleResponse);
    $this->assertInstanceOf(SwooleHttpResponse::class, $swooleResponse);
}
```
    

## 转换 Leevel 响应的 cookie


``` php
public function testResponseWithCookie(): void
{
    $leevel2Swoole = new Leevel2Swoole();
    $swooleResponse = $this->createMock(SwooleHttpResponse::class);
    $response = new Response('hello');
    $response->withCookies([
        'foo'   => 'bar',
        'hello' => 'world',
    ]);

    $leevel2Swoole->createResponse($response, $swooleResponse);
    $this->assertInstanceOf(SwooleHttpResponse::class, $swooleResponse);
}
```
    

## 转换 Leevel 跳转响应


``` php
public function testRedirectResponse(): void
{
    $leevel2Swoole = new Leevel2Swoole();
    $swooleResponse = $this->createMock(SwooleHttpResponse::class);
    $response = new RedirectResponse('https://queryphp.com');

    $leevel2Swoole->createResponse($response, $swooleResponse);
    $this->assertInstanceOf(SwooleHttpResponse::class, $swooleResponse);
}
```