# Redirect Response

::: tip Testing Is Documentation
[tests/Http/RedirectResponseTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Http/RedirectResponseTest.php)
:::
    
QueryPHP 针对页面重定向可以直接返回一个 `\Leevel\Http\RedirectResponse` 响应对象。

**Uses**

``` php
<?php

use Leevel\Http\IRequest;
use Leevel\Http\RedirectResponse;
use Leevel\Session\ISession;
```

## getTargetUrl 获取目标 URL 地址

``` php
public function testGetTargetUrl(): void
{
    $response = new RedirectResponse('foo.bar');
    $this->assertSame('foo.bar', $response->getTargetUrl());
}
```
    
## setTargetUrl 设置目标 URL 地址

``` php
public function testSetTargetUrl(): void
{
    $response = new RedirectResponse('foo.bar');
    $response->setTargetUrl('baz.beep');
    $this->assertSame('baz.beep', $response->getTargetUrl());
}
```
    
## create 创建 URL 跳转响应

``` php
public function testCreate(): void
{
    $response = RedirectResponse::create('foo', 301);
    $this->assertInstanceOf(RedirectResponse::class, $response);
    $this->assertSame(301, $response->getStatusCode());
}
```
    
## with 闪存一个数据片段到 SESSION

``` php
public function testWith(): void
{
    $response = new RedirectResponse('foo.bar');
    $response->setSession($this->mokeSessionForWith());
    $this->assertInstanceOf(ISession::class, $response->getSession());

    $response->with('foo', 'bar');
    $this->assertSame($response->getSession()->getFlash('foo'), 'bar');
}
```
    
## withInput 闪存输入信息

``` php
public function testWithInput(): void
{
    $response = new RedirectResponse('foo.bar');
    $response->setSession($this->mokeSessionForWith());
    $this->assertInstanceOf(ISession::class, $response->getSession());

    $data = ['myinput' => 'world'];
    $response->setSession($this->mokeSessionArrayForWith());
    $response->withInput($data);
    $this->assertSame($response->getSession()->getFlash('inputs'), $data);
}
```
    
## withErrors 闪存错误信息

``` php
public function testWithError(): void
{
    $errorsDefault = [
        'name' => 'less than 6',
        'age'  => 'must be 18',
    ];

    $errorsCustom = [
        'foo' => 'bar is error',
    ];
    $data = ['default' => $errorsDefault, 'custom' => $errorsCustom];
    $response = new RedirectResponse('foo.bar');
    $response->setSession($this->mokeSessionForWithError($data));
    $this->assertInstanceOf(ISession::class, $response->getSession());
    $response->withErrors($errorsDefault);
    $response->withErrors($errorsCustom, 'custom');

    $this->assertSame($response->getSession()->getFlash('errors'), $data);
}
```
    
## setRequest 设置 HTTP 请求

``` php
public function testSetRequest(): void
{
    $response = new RedirectResponse('foo.bar');
    $response->setSession($this->mokeSessionForWith());
    $this->assertInstanceOf(ISession::class, $response->getSession());
    $this->assertNull($response->getRequest());

    $response->setRequest($this->mockRequest([], []));
    $this->assertInstanceOf(IRequest::class, $response->getRequest());
}
```
    
## onlyInput 闪存给定的 keys 输入信息

``` php
public function testOnlyInput(): void
{
    $response = new RedirectResponse('foo.bar');
    $response->setSession($this->mokeSessionForWith());
    $this->assertInstanceOf(ISession::class, $response->getSession());
    $this->assertNull($response->getRequest());

    $response->setRequest($this->mockRequest(['foo' => 'bar'], []));
    $this->assertInstanceOf(IRequest::class, $request = $response->getRequest());
    $response->onlyInput('foo');
    $this->assertSame(['foo' => 'bar'], $request->only(['foo']));
    $this->assertSame($response->getSession()->getFlash('foo'), 'bar');
}
```
    
## exceptInput 闪存排除给定的 keys 输入信息

``` php
public function testExceptInput(): void
{
    $response = new RedirectResponse('foo.bar');
    $response->setSession($this->mokeSessionForWith());
    $this->assertInstanceOf(ISession::class, $response->getSession());
    $this->assertNull($response->getRequest());

    $response->setRequest($this->mockRequest(['foo' => 'bar'], []));
    $this->assertInstanceOf(IRequest::class, $request = $response->getRequest());
    $response->exceptInput('hello');
    $this->assertSame(['foo' => 'bar'], $request->only(['foo']));
    $this->assertSame($response->getSession()->getFlash('foo'), 'bar');
}
```