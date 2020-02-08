# HTTP Response

::: tip Testing Is Documentation
[tests/Http/ResponseTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Http/ResponseTest.php)
:::
    
QueryPHP 响应对象构建在 Symfony HttpFoundation 之上，增加了少量的功能。

::: warning 注意
为了一致性或者更好与 Swoole 对接，请统一使用响应对象返回，框架会自动处理返回结果，请避免直接使用 `echo`、`die` 等中断后续处理。
:::


**Uses**

``` php
<?php

use Leevel\Http\Response;
```

## setHeader 设置响应头

``` php
public function testSetHeader(): void
{
    $response = new Response();
    $response->setHeader('foo', 'bar');
    $this->assertSame('bar', $response->headers->get('foo'));
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
    
## setCookie 设置 COOKIE

``` php
public function testSetCookie(): void
{
    $response = new Response();
    $response->setCookie('foo', 'bar');
    $this->assertCount(1, $response->headers->getCookies());
}
```
    
## withCookies 批量设置 COOKIE

``` php
public function testWithCookies(): void
{
    $response = new Response();
    $response->withCookies(['hello' => 'world']);
    $this->assertCount(1, $response->headers->getCookies());
}
```