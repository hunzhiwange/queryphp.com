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
    
## push 数组插入数据

``` php
public function testPush(): void
{
    $cookie = new Cookie();

    $this->assertSame([], $cookie->all());

    $cookie->push('foo', 'bar');

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

    $cookie->push('foo', 'bar2');
    $cookie->push('foo', 'bar3');

    $this->assertSame([
        'foo' => [
            'foo',
            '["bar","bar2","bar3"]',
            time() + 86400,
            '/',
            '',
            false,
            false,
        ],
    ], $cookie->all());

    $this->assertSame(['bar', 'bar2', 'bar3'], $cookie->get('foo'));
}
```
    
## merge 合并元素

``` php
public function testMerge(): void
{
    $cookie = new Cookie();

    $this->assertSame([], $cookie->all());

    $cookie->merge('foo', ['bar']);

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

    $cookie->merge('foo', ['bar2', 'bar3']);

    $this->assertSame([
        'foo' => [
            'foo',
            '["bar","bar2","bar3"]',
            time() + 86400,
            '/',
            '',
            false,
            false,
        ],
    ], $cookie->all());

    $this->assertSame(['bar', 'bar2', 'bar3'], $cookie->get('foo'));

    $cookie->merge('foo', ['bar2', 'bar3', 'bar4']);

    $this->assertSame([
        'foo' => [
            'foo',
            '["bar","bar2","bar3","bar2","bar3","bar4"]',
            time() + 86400,
            '/',
            '',
            false,
            false,
        ],
    ], $cookie->all());

    $this->assertSame(['bar', 'bar2', 'bar3', 'bar2', 'bar3', 'bar4'], $cookie->get('foo'));
}
```
    
## pop 弹出元素

``` php
public function testPop(): void
{
    $cookie = new Cookie();

    $this->assertSame([], $cookie->all());

    $cookie->set('foo', ['bar', 'bar2', 'bar3', 'bar4', 'bar5', 'bar6']);

    $this->assertSame([
        'foo' => [
            'foo',
            '["bar","bar2","bar3","bar4","bar5","bar6"]',
            time() + 86400,
            '/',
            '',
            false,
            false,
        ],
    ], $cookie->all());

    $this->assertSame(['bar', 'bar2', 'bar3', 'bar4', 'bar5', 'bar6'], $cookie->get('foo'));

    $cookie->pop('foo', ['bar2', 'bar3']);

    $this->assertSame([
        'foo' => [
            'foo',
            '{"0":"bar","3":"bar4","4":"bar5","5":"bar6"}',
            time() + 86400,
            '/',
            '',
            false,
            false,
        ],
    ], $cookie->all());

    $this->assertSame([0 => 'bar', 3 => 'bar4', 4 => 'bar5', 5 => 'bar6'], $cookie->get('foo'));
}
```
    
## arr 数组插入键值对数据

``` php
public function testArr(): void
{
    $cookie = new Cookie();

    $this->assertSame([], $cookie->all());

    $cookie->arr('foo', 'datakey_1', 'datavalue_1');

    $this->assertSame([
        'foo' => [
            'foo',
            '{"datakey_1":"datavalue_1"}',
            time() + 86400,
            '/',
            '',
            false,
            false,
        ],
    ], $cookie->all());

    $this->assertSame(['datakey_1' => 'datavalue_1'], $cookie->get('foo'));

    $cookie->arr('foo', ['datakey_2' => 'datavalue_2', 'datakey_3' => 'datavalue_3']);

    $this->assertSame([
        'foo' => [
            'foo',
            '{"datakey_1":"datavalue_1","datakey_2":"datavalue_2","datakey_3":"datavalue_3"}',
            time() + 86400,
            '/',
            '',
            false,
            false,
        ],
    ], $cookie->all());

    $this->assertSame([
        'datakey_1' => 'datavalue_1',
        'datakey_2' => 'datavalue_2',
        'datakey_3' => 'datavalue_3',
    ], $cookie->get('foo'));
}
```
    
## arrDelete 数组键值删除数据

``` php
public function testArrDelete(): void
{
    $cookie = new Cookie();

    $this->assertSame([], $cookie->all());

    $cookie->arr('foo', ['datakey_1' => 'datavalue_1', 'datakey_2' => 'datavalue_2', 'datakey_3' => 'datavalue_3']);

    $this->assertSame([
        'foo' => [
            'foo',
            '{"datakey_1":"datavalue_1","datakey_2":"datavalue_2","datakey_3":"datavalue_3"}',
            time() + 86400,
            '/',
            '',
            false,
            false,
        ],
    ], $cookie->all());

    $this->assertSame([
        'datakey_1' => 'datavalue_1',
        'datakey_2' => 'datavalue_2',
        'datakey_3' => 'datavalue_3',
    ], $cookie->get('foo'));

    $cookie->arrDelete('foo', 'datakey_1');

    $this->assertSame([
        'foo' => [
            'foo',
            '{"datakey_2":"datavalue_2","datakey_3":"datavalue_3"}',
            time() + 86400,
            '/',
            '',
            false,
            false,
        ],
    ], $cookie->all());

    $this->assertSame([
        'datakey_2' => 'datavalue_2',
        'datakey_3' => 'datavalue_3',
    ], $cookie->get('foo'));

    $cookie->arrDelete('foo', ['datakey_1', 'datakey_2']);

    $this->assertSame([
        'foo' => [
            'foo',
            '{"datakey_3":"datavalue_3"}',
            time() + 86400,
            '/',
            '',
            false,
            false,
        ],
    ], $cookie->all());

    $this->assertSame([
        'datakey_3' => 'datavalue_3',
    ], $cookie->get('foo'));
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