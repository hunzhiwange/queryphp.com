# Response Header Bag

::: tip Testing Is Documentation
[tests/Http/ResponseHeaderBagTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Http/ResponseHeaderBagTest.php)
:::
    
QueryPHP 提供了一个响应 header 包装 `\Leevel\Http\ResponseHeaderBag` 对象。

**Uses**

``` php
<?php

use Leevel\Http\ResponseHeaderBag;
use Leevel\Support\Arr;
```

## all 取回所有元素

``` php
public function testAll(): void
{
    $headers = [
        'fOo'              => 'BAR',
        'ETag'             => 'xyzzy',
        'Content-MD5'      => 'Q2hlY2sgSW50ZWdyaXR5IQ==',
        'P3P'              => 'CP="CAO PSA OUR"',
        'WWW-Authenticate' => 'Basic realm="WallyWorld"',
        'X-UA-Compatible'  => 'IE=edge,chrome=1',
        'X-XSS-Protection' => '1; mode=block',
    ];

    $bag = new ResponseHeaderBag($headers);

    $all = $bag->all();
    foreach (array_keys($headers) as $headerName) {
        $this->assertArrayHasKey(strtolower($headerName), $all, '->all() gets all input keys in strtolower case');
    }
}
```
    
## cookie 设置 COOKIE 别名

``` php
public function testCookie(): void
{
    $headers = [
        'foo'              => 'bar',
    ];
    $bag = new ResponseHeaderBag($headers);
    $bag->cookie('hello', 'world');
    $cookie = $bag->getCookies();
    foreach ($cookie as &$v) {
        $v = Arr::except($v, [2]);
    }

    $data = <<<'eot'
        {
            "hello": {
                "0": "hello",
                "1": "world",
                "3": "\/",
                "4": "",
                "5": false,
                "6": false
            }
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $cookie
        )
    );
}
```
    
## setCookie 设置 COOKIE

``` php
public function testSetCookie(): void
{
    $headers = [
        'foo'              => 'bar',
    ];
    $bag = new ResponseHeaderBag($headers);
    $bag->setCookie('hello', 'world');
    $cookie = $bag->getCookies();
    foreach ($cookie as &$v) {
        $v = Arr::except($v, [2]);
    }

    $data = <<<'eot'
        {
            "hello": {
                "0": "hello",
                "1": "world",
                "3": "\/",
                "4": "",
                "5": false,
                "6": false
            }
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $cookie
        )
    );
}
```
    
## withCookies 批量设置 COOKIE

``` php
public function testWithCookies(): void
{
    $headers = [
        'foo'              => 'bar',
    ];
    $bag = new ResponseHeaderBag($headers);
    $bag->withCookies(['hello' => 'world', 'foo' => 'bar']);
    $cookie = $bag->getCookies();
    foreach ($cookie as &$v) {
        $v = Arr::except($v, [2]);
    }

    $data = <<<'eot'
        {
            "hello": {
                "0": "hello",
                "1": "world",
                "3": "\/",
                "4": "",
                "5": false,
                "6": false
            },
            "foo": {
                "0": "foo",
                "1": "bar",
                "3": "\/",
                "4": "",
                "5": false,
                "6": false
            }
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $cookie
        )
    );
}
```
    
## cookie 魔术方法 __call 处理 COOKIE

``` php
public function testCallCookie(): void
{
    $headers = [
        'foo'              => 'bar',
    ];
    $bag = new ResponseHeaderBag($headers);
    $bag->withCookies(['hello' => 'world', 'foo' => 'bar']);
    $bag->delete('hello');
    $cookie = $bag->getCookies();
    foreach ($cookie as &$v) {
        $v = Arr::except($v, [2]);
    }

    $data = <<<'eot'
        {
            "hello": {
                "0": "hello",
                "1": null,
                "3": "\/",
                "4": "",
                "5": false,
                "6": false
            },
            "foo": {
                "0": "foo",
                "1": "bar",
                "3": "\/",
                "4": "",
                "5": false,
                "6": false
            }
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $cookie
        )
    );
}
```