# URL 生成

::: tip Testing Is Documentation
[tests/Router/UrlTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Router/UrlTest.php)
:::
    
QueryPHP 支持路由 URL 地址的统一生成，提供一套简洁的生成方法，无需记忆即可学会使用。

使用容器 url 服务

``` php
\App::make('url')->make(string $url, array $params = [], string $subdomain = 'www', $suffix = null): string;
```


**Uses**

``` php
<?php

use Leevel\Http\IRequest;
use Leevel\Router\Url;
```

## 基本 URL 生成

``` php
public function testMakeUrl(): void
{
    $request = $this->makeRequest();
    $url = new Url($request);
    $this->assertInstanceof(IRequest::class, $url->getRequest());

    // 开始不带斜线，自动添加
    $this->assertSame($url->make('test/hello'), '/test/hello');
    $this->assertSame($url->make('/hello-world'), '/hello-world');
}
```
    
## 生成带参数的 URL

``` php
public function testMakeUrlWithParams(): void
{
    $request = $this->makeRequest();
    $url = new Url($request);

    $this->assertSame($url->make('test/hello?arg1=1&arg2=3'), '/test/hello?arg1=1&arg2=3');
    $this->assertSame($url->make('test/sub1/sub2/hello?arg1=1&arg2=3'), '/test/sub1/sub2/hello?arg1=1&arg2=3');
    $this->assertSame($url->make('test/sub1/sub2/hello', ['arg1' => 1, 'arg2' => 3]), '/test/sub1/sub2/hello?arg1=1&arg2=3');
}
```
    
## 生成带后缀的 URL

``` php
public function testMakeUrlWithSuffix(): void
{
    $request = $this->makeRequest();
    $url = new Url($request);

    $this->assertSame($url->make('hello/world', [], '', true), '/hello/world.html');
    $this->assertSame($url->make('hello/world', [], '', '.jsp'), '/hello/world.jsp');
}
```
    
## 生成 URL 支持变量替换

``` php
public function testMakeUrlSupportVar(): void
{
    $request = $this->makeRequest();
    $url = new Url($request);

    $this->assertSame($url->make('test/{id}?arg1=5', ['id' => 5]), '/test/5?arg1=5');
    $this->assertSame($url->make('/new-{id}-{name}', ['id' => 5, 'name' => 'tom', 'arg1' => '5']), '/new-5-tom?arg1=5');
    $this->assertSame($url->make('/new-{id}-{name}?hello=world', ['id' => 5, 'name' => 'tom', 'arg1' => '5']), '/new-5-tom?hello=world&arg1=5');
    $this->assertSame($url->make('/new-{id}-{name}?hello={foo}', ['id' => 5, 'name' => 'tom', 'foo' => 'bar', 'arg1' => '5']), '/new-5-tom?hello=bar&arg1=5');
}
```
    
## 生成指定应用的 URL

``` php
public function testMakeUrlForApp(): void
{
    $request = $this->makeRequest();
    $url = new Url($request);

    $this->assertSame($url->make(':myapp/hello/world', ['id' => 5, 'name' => 'yes']), '/:myapp/hello/world?id=5&name=yes');
    $this->assertSame($url->make(':myapp/test'), '/:myapp/test');
}
```
    
## 生成首页地址

``` php
public function testMakeUrlForHome(): void
{
    $request = $this->makeRequest();
    $url = new Url($request);

    $this->assertSame($url->make('/'), '/');
    $this->assertSame($url->make(''), '/');
}
```
    
## 生成带域名的 URL

``` php
public function testWithDomainTop(): void
{
    $request = $this->makeRequest();
    $url = new Url($request, [
        'domain' => 'queryphp.com',
    ]);

    $this->assertSame($url->make('hello/world'), 'http://www.queryphp.com/hello/world');
    $this->assertSame($url->make('hello/world', [], 'vip'), 'http://vip.queryphp.com/hello/world');
    $this->assertSame($url->make('hello/world', [], 'defu.vip'), 'http://defu.vip.queryphp.com/hello/world');
    $this->assertSame($url->make('hello/world', [], '*'), 'http://queryphp.com/hello/world');
}
```
    
## 生成带 HTTPS 的 URL

``` php
public function testSecureWithDomainTop(): void
{
    $request = $this->makeRequest(true);
    $url = new Url($request, [
        'domain' => 'queryphp.cn',
    ]);

    $this->assertInstanceof(IRequest::class, $url->getRequest());
    $this->assertSame($url->make('hello/world'), 'https://www.queryphp.cn/hello/world');
}
```