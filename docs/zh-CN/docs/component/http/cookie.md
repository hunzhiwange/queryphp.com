# Cookie

::: tip Testing Is Documentation
[tests/Http/CookieTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Http/CookieTest.php)
:::
    
QueryPHP 最终的 Cookie 响应都将通过 `\Leevel\Http\Cookie` 对象进行处理。

**Uses**

``` php
<?php

use Leevel\Http\Cookie;
use stdClass;
```

## COOKIE 基本使用

``` php
public function testBaseUse(): void
{
    $cookie = new Cookie();

    $cookie->set('foo', 'bar');

    $this->assertSame([
        'foo' => [
            'foo',
            'bar',
            time() + 86400,
            '/',
            '',
            false,
            false,
        ],
    ], $cookie->all());
}
```
    
## set.get.delete 设置 COOKIE、删除 COOKIE 和获取 COOKIE

``` php
public function testSetGetDelete(): void
{
    $cookie = new Cookie();

    $cookie->set('foo', 'bar');

    $this->assertSame('bar', $cookie->get('foo'));

    $cookie->delete('foo');

    $this->assertNull($cookie->get('foo'));
}
```
    
## setOption 设置配置

``` php
public function testSetOption(): void
{
    $cookie = new Cookie();

    $cookie->setOption('domain', 'queryphp.com');
    $cookie->set('foo', 'bar');

    $this->assertSame([
        'foo' => [
            'foo',
            'bar',
            time() + 86400,
            '/',
            'queryphp.com',
            false,
            false,
        ],
    ], $cookie->all());
}
```
    
## set 设置 COOKIE 支持数组

``` php
public function testSetArray(): void
{
    $cookie = new Cookie();

    $cookie->set('foo', ['bar']);

    $this->assertSame([
        'foo' => [
            'foo',
            '["bar"]',
            time() + 86400,
            '/',
            '',
            false,
            false,
        ],
    ], $cookie->all());

    $this->assertSame(['bar'], $cookie->get('foo'));
}
```
    
## set 设置 COOKIE 支持 HTTPS

``` php
public function testSetHttps(): void
{
    $cookie = new Cookie();

    $cookie->set('foo', 'bar', ['secure' => true]);

    $this->assertSame([
        'foo' => [
            'foo',
            'bar',
            time() + 86400,
            '/',
            '',
            true,
            false,
        ],
    ], $cookie->all());
}
```
    
## get 获取 COOKIE 支持默认值

``` php
public function testGetDefaults(): void
{
    $cookie = new Cookie();

    $this->assertNull($cookie->get('notExists'));
    $this->assertSame('hello', $cookie->get('notExists', 'hello'));
}
```
    
## clear 清空 COOKIE

``` php
public function testClear(): void
{
    $cookie = new Cookie();

    $cookie->set('hello', 'world');
    $cookie->set('foo', 'bar');

    $this->assertSame([
        'hello' => [
            'hello',
            'world',
            time() + 86400,
            '/',
            '',
            false,
            false,
        ],
        'foo' => [
            'foo',
            'bar',
            time() + 86400,
            '/',
            '',
            false,
            false,
        ],
    ], $cookie->all());

    $cookie->clear();

    $this->assertSame([
        'hello' => [
            'hello',
            null,
            time() + 86400,
            '/',
            '',
            false,
            false,
        ],
        'foo' => [
            'foo',
            null,
            time() + 86400,
            '/',
            '',
            false,
            false,
        ],
    ], $cookie->all());
}
```
    
## put 批量插入

``` php
public function testPut(): void
{
    $cookie = new Cookie();

    $cookie->put('foo', 'bar');

    $this->assertSame([
        'foo' => [
            'foo',
            'bar',
            time() + 86400,
            '/',
            '',
            false,
            false,
        ],
    ], $cookie->all());

    $cookie->put(['hello' => 'world', 'test1' => 'value1']);

    $this->assertSame([
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
        'test1' => [
            'test1',
            'value1',
            time() + 86400,
            '/',
            '',
            false,
            false,
        ],
    ], $cookie->all());
}
```
    
## format 格式化 COOKIE 为字符串

``` php
public function testFormat(): void
{
    $cookie = new Cookie();
    $cookie->set('foo', 'datakey_1');
    $test = $cookie->all()['foo'];
    $str = 'foo=datakey_1; expires='.gmdate('D, d-M-Y H:i:s T', $test[2]).'; Max-Age=86400; path=/';
    $this->assertSame($str, $cookie->format($test));
}
```