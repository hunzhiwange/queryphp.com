# Server Bag

::: tip Testing Is Documentation
[tests/Http/ServerBagTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Http/ServerBagTest.php)
:::
    
QueryPHP 提供了一个 server 包装 `\Leevel\Http\ServerBag` 对象。

**Uses**

``` php
<?php

use Leevel\Http\ServerBag;
```

## getHeaders 取回 HTTP HEADERS

``` php
public function testShouldExtractHeadersFromServerArray(): void
{
    $server = [
        'SOME_SERVER_VARIABLE'  => 'value',
        'SOME_SERVER_VARIABLE2' => 'value',
        'ROOT'                  => 'value',
        'HTTP_CONTENT_TYPE'     => 'text/html',
        'HTTP_CONTENT_LENGTH'   => '0',
        'HTTP_ETAG'             => 'asdf',
    ];

    $bag = new ServerBag($server);

    $this->assertSame([
        'CONTENT_TYPE'   => 'text/html',
        'CONTENT_LENGTH' => '0',
        'ETAG'           => 'asdf',
    ], $bag->getHeaders());
}
```