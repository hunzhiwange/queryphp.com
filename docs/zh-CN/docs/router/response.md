# 路由响应

::: tip Testing Is Documentation
[tests/Router/ResponseTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Router/ResponseTest.php)
:::
    
QueryPHP 路由响应封装了常用的响应，比如模板、JSON、文件下载、URL 重定向等。

使用容器 response 服务

``` php
\App::make('response')->json($data = null, int $status = 200, array $headers = [], bool $json = false): \Leevel\Http\JsonResponse;
```


**Uses**

``` php
<?php

use Leevel\Di\Container;
use Leevel\Di\IContainer;
use Leevel\Http\JsonResponse;
use Leevel\Http\RedirectResponse;
use Leevel\Http\Request;
use Leevel\Kernel\App;
use Leevel\Option\Option;
use Leevel\Router\Redirect;
use Leevel\Router\Response as RouterResponse;
use Leevel\Router\Url;
use Leevel\View\IView;
use Leevel\View\Manager;
use SplFileInfo;
use SplFileObject;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;
```

## 基本使用

``` php
public function testBaseUse(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $response = $factory->make('hello');

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);

    $this->assertSame('hello', $response->getContent());
    $this->assertSame(200, $response->getStatusCode());
    $headers = $response->headers->all();
    unset($headers['date']);
    $this->assertSame(['cache-control' => ['no-cache, private']], $headers);
}
```
    
## make 返回一个响应

``` php
public function testMake(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $response = $factory->make('foo.bar', 404, ['foo' => 'bar']);

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);

    $this->assertSame('foo.bar', $response->getContent());
    $this->assertSame(404, $response->getStatusCode());
    $this->assertSame(['foo' => ['bar']], $this->getFilterHeaders($response->headers->all()));
}
```
    
## view 返回视图响应

**fixture 定义**

**tests/Router/assert/view1.php**

``` php
hello view1 for <?php echo $foo; ?>.
```


``` php
public function testView(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $response = $factory->view('view1', ['foo' => 'bar']);

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);

    $this->assertSame('hello view1 for bar.', $response->getContent());
    $this->assertSame(200, $response->getStatusCode());
    $this->assertSame([], $this->getFilterHeaders($response->headers->all()));
}
```
    
## view 返回视图响应支持自定义后缀

**fixture 定义**

**tests/Router/assert/view1.foo**

``` php
hello view1.foo for <?php echo $foo; ?>.
```


``` php
public function testViewWithCustomExt(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $response = $factory->view('view1', ['foo' => 'bar new'], '.foo');

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);

    $this->assertSame('hello view1.foo for bar new.', $response->getContent());
    $this->assertSame(200, $response->getStatusCode());
    $headers = $response->headers->all();
    $this->assertSame([], $this->getFilterHeaders($headers));
}
```
    
## view 返回视图成功消息

默认错误模板为 `success`。

**fixture 定义**

**tests/Router/assert/success.php**

``` php
success! message is <?php echo $message; ?>,url is <?php echo $url; ?>,time is <?php echo $time; ?>.
```


``` php
public function testViewSuccess(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $response = $factory->viewSuccess('it is success.');

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);

    $this->assertSame('success! message is it is success.,url is ,time is 1.', $response->getContent());
    $this->assertSame(200, $response->getStatusCode());
    $this->assertSame([], $this->getFilterHeaders($response->headers->all()));
}
```
    
## setViewSuccessTemplate 返回视图成功消息支持设置视图正确模板

**fixture 定义**

**tests/Router/assert/success_custom.php**

``` php
success custom! message is <?php echo $message; ?>,url is <?php echo $url; ?>,time is <?php echo $time; ?>.
```


``` php
public function testViewSuccess3(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $factory->setViewSuccessTemplate('success_custom');

    $response = $factory->viewSuccess('it is success3.', 'http://queryphp.com', 3);

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);

    $this->assertSame('success custom! message is it is success3.,url is http://queryphp.com,time is 3.', $response->getContent());
    $this->assertSame(200, $response->getStatusCode());
    $this->assertSame([], $this->getFilterHeaders($response->headers->all()));
}
```
    
## view 返回视图失败消息

默认错误模板为 `fail`。

**fixture 定义**

**tests/Router/assert/fail.php**

``` php
fail! message is <?php echo $message; ?>,url is <?php echo $url; ?>,time is <?php echo $time; ?>.
```


``` php
public function testViewFail(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $response = $factory->viewFail('it is fail.');

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);

    $this->assertSame('fail! message is it is fail.,url is ,time is 3.', $response->getContent());
    $this->assertSame(404, $response->getStatusCode());
    $this->assertSame([], $this->getFilterHeaders($response->headers->all()));
}
```
    
## setViewFailTemplate 返回视图失败消息支持设置视图错误模板

**fixture 定义**

**tests/Router/assert/fail_custom.php**

``` php
fail custom! message is <?php echo $message; ?>,url is <?php echo $url; ?>,time is <?php echo $time; ?>.
```


``` php
public function testViewFail3(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $factory->setViewFailTemplate('fail_custom');

    $response = $factory->viewFail('it is fail3.', 'http://queryphp.com', 3);

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);

    $this->assertSame('fail custom! message is it is fail3.,url is http://queryphp.com,time is 3.', $response->getContent());
    $this->assertSame(404, $response->getStatusCode());
    $this->assertSame([], $this->getFilterHeaders($response->headers->all()));
}
```
    
## json 返回 JSON 响应

``` php
public function testJson(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $response = $factory->json();

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(JsonResponse::class, $response);

    $this->assertSame('{}', $response->getContent());
    $this->assertSame(200, $response->getStatusCode());
    $this->assertSame(['content-type' => ['application/json']], $this->getFilterHeaders($response->headers->all()));
}
```
    
## json 返回 JSON 响应支持数组

``` php
public function testJson3(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $response = $factory->json(['foo' => 'bar', 'hello' => 'world'], 404, ['foo' => 'bar']);

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(JsonResponse::class, $response);

    $this->assertSame('{"foo":"bar","hello":"world"}', $response->getContent());
    $this->assertSame(404, $response->getStatusCode());
    $this->assertSame(['foo' => ['bar'], 'content-type' => ['application/json']], $this->getFilterHeaders($response->headers->all()));
}
```
    
## json 返回 JSON 响应支持原生 JSON 字符串

``` php
public function testJson4(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $response = $factory->json('{"foo":"bar","hello":"world"}', 404, ['foo' => 'bar'], true);

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(JsonResponse::class, $response);

    $this->assertSame('{"foo":"bar","hello":"world"}', $response->getContent());
    $this->assertSame(404, $response->getStatusCode());
    $this->assertSame(['foo' => ['bar'], 'content-type' => ['application/json']], $this->getFilterHeaders($response->headers->all()));
}
```
    
## jsonp 返回 JSONP 响应

``` php
public function testJsonp(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $response = $factory->jsonp('foo');

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(JsonResponse::class, $response);

    $this->assertSame('/**/foo({});', $response->getContent());
    $this->assertSame(200, $response->getStatusCode());
    $this->assertSame(['content-type' => ['text/javascript']], $this->getFilterHeaders($response->headers->all()));
}
```
    
## download 返回下载响应

``` php
public function testDownload(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $response = $factory->download(__DIR__.'/assert/download.txt');

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(BinaryFileResponse::class, $response);
    $this->assertFalse($response->getContent());
    $this->assertSame(200, $response->getStatusCode());
    $this->assertSame('attachment; filename=download.txt', $response->headers->all()['content-disposition'][0]);
}
```
    
## download 返回下载响应支持 \SplFileInfo

``` php
public function testDownload2(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $response = $factory->download(new SplFileInfo(__DIR__.'/assert/download.txt'));

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(BinaryFileResponse::class, $response);
    $this->assertFalse($response->getContent());
    $this->assertSame(200, $response->getStatusCode());
    $this->assertSame('attachment; filename=download.txt', $response->headers->all()['content-disposition'][0]);
}
```
    
## download 返回下载响应支持 \SplFileObject

``` php
public function testDownload3(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $response = $factory->download(new SplFileObject(__DIR__.'/assert/download.txt'));

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(BinaryFileResponse::class, $response);
    $this->assertFalse($response->getContent());
    $this->assertSame(200, $response->getStatusCode());
    $this->assertSame('attachment; filename=download.txt', $response->headers->all()['content-disposition'][0]);
}
```
    
## download 返回下载响应支持自定义文件名

``` php
public function testDownload4(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $response = $factory->download(__DIR__.'/assert/download.txt', 'foo.txt', 200, ['foo' => 'bar']);

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(BinaryFileResponse::class, $response);
    $this->assertFalse($response->getContent());
    $this->assertSame(200, $response->getStatusCode());
    $this->assertSame('attachment; filename=foo.txt', $response->headers->all()['content-disposition'][0]);
    $this->assertSame('bar', $response->headers->all()['foo'][0]);
}
```
    
## file 返回文件响应

``` php
public function testFile(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $response = $factory->file(__DIR__.'/assert/download.txt');

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(BinaryFileResponse::class, $response);
    $this->assertFalse($response->getContent());
    $this->assertSame(200, $response->getStatusCode());
    $this->assertSame('inline; filename=download.txt', $response->headers->all()['content-disposition'][0]);
}
```
    
## file 返回文件响应支持 \SplFileInfo

``` php
public function testFile2(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $response = $factory->file(new SplFileInfo(__DIR__.'/assert/download.txt'));

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(BinaryFileResponse::class, $response);
    $this->assertFalse($response->getContent());
    $this->assertSame(200, $response->getStatusCode());
    $this->assertSame('inline; filename=download.txt', $response->headers->all()['content-disposition'][0]);
}
```
    
## file 返回文件响应支持 \SplFileObject

``` php
public function testFile3(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $response = $factory->file(new SplFileObject(__DIR__.'/assert/download.txt'));

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(BinaryFileResponse::class, $response);
    $this->assertFalse($response->getContent());
    $this->assertSame(200, $response->getStatusCode());
    $this->assertSame('inline; filename=download.txt', $response->headers->all()['content-disposition'][0]);
}
```
    
## redirect 返回一个 URL 生成跳转响应

``` php
public function testRedirect(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $response = $factory->redirect('hello/world');

    $content = <<<'eot'
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="refresh" content="0;url='http://www.queryphp.com/hello/world'" />

                <title>Redirecting to http://www.queryphp.com/hello/world</title>
            </head>
            <body>
                Redirecting to <a href="http://www.queryphp.com/hello/world">http://www.queryphp.com/hello/world</a>.
            </body>
        </html>
        eot;

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(RedirectResponse::class, $response);
    $this->assertSame($content, $response->getContent());
    $this->assertSame(302, $response->getStatusCode());
    $this->assertSame(['location' => ['http://www.queryphp.com/hello/world']], $this->getFilterHeaders($response->headers->all()));
}
```
    
## redirectRaw 返回一个跳转响应

``` php
public function testRedirectRaw(): void
{
    $view = $this->makeView();
    $redirect = $this->makeRedirect();

    $factory = new RouterResponse($view, $redirect);

    $response = $factory->redirectRaw('http://queryphp.com/raw');

    $content = <<<'eot'
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="refresh" content="0;url='http://queryphp.com/raw'" />

                <title>Redirecting to http://queryphp.com/raw</title>
            </head>
            <body>
                Redirecting to <a href="http://queryphp.com/raw">http://queryphp.com/raw</a>.
            </body>
        </html>
        eot;

    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(Response::class, $response);
    $this->assertInstanceof(RedirectResponse::class, $response);
    $this->assertSame($content, $response->getContent());
    $this->assertSame(302, $response->getStatusCode());
    $this->assertSame(['location' => ['http://queryphp.com/raw']], $this->getFilterHeaders($response->headers->all()));
}
```