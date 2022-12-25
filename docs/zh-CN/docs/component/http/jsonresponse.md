# JSON Response

::: tip Testing Is Documentation
[tests/Http/JsonResponseTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Http/JsonResponseTest.php)
:::
    
QueryPHP 针对 API 开发可以直接返回一个 `\Leevel\Http\JsonResponse` 响应对象。

**Uses**

``` php
<?php

use JsonSerializable;
use Leevel\Http\JsonResponse;
use Leevel\Support\IArray;
use Leevel\Support\IJson;
```

## getEncodingOptions 获取 JSON 编码参数

``` php
public function testGetEncodingOptions(): void
{
    $response = new JsonResponse();
    $this->assertSame(JSON_UNESCAPED_UNICODE, $response->getEncodingOptions());
}
```
    
## setData 设置 JSON 数据支持 JSON 编码参数

``` php
public function testSetDataWithEncodingOptions(): void
{
    $response = new JsonResponse();

    $response->setData(['成都', 'QueryPHP']);
    $this->assertSame('["成都","QueryPHP"]', $response->getContent());

    $response->setEncodingOptions(0);
    $response->setData(['成都', 'QueryPHP']);
    $this->assertSame('["\u6210\u90fd","QueryPHP"]', $response->getContent());

    $response->setEncodingOptions(JSON_FORCE_OBJECT);
    $response->setData(['成都', 'QueryPHP']);
    $this->assertSame('{"0":"\u6210\u90fd","1":"QueryPHP"}', $response->getContent());
}
```
    
## 支持 JSON 的对象

测试实现了 `\Leevel\Support\IArray` 的对象

``` php
namespace Tests\Http;

class JsonResponseMyArray implements IArray
{
    public function toArray(): array
    {
        return ['hello' => 'IArray'];
    }
}
```

测试实现了 `\Leevel\Support\IJson` 的对象

``` php
namespace Tests\Http;

class JsonResponseMyJson implements IJson
{
    public function toJson(?int $option = null): string
    {
        if (null === $option) {
            $option = JSON_UNESCAPED_UNICODE;
        }

        return json_encode(['hello' => 'IJson'], $option);
    }
}
```

测试实现了 `\JsonSerializable` 的对象

``` php
namespace Tests\Http;

class JsonResponseMyJsonSerializable implements JsonSerializable
{
    public function jsonSerialize(): mixed
    {
        return ['hello' => 'JsonSerializable'];
    }
}
```


``` php
public function testSetEncodingOptions(): void
{
    $response = new JsonResponse();
    $response->setData(['foo' => 'bar']);
    $this->assertSame('{"foo":"bar"}', $response->getContent());

    $response->setData(new JsonResponseMyArray());
    $this->assertSame('{"hello":"IArray"}', $response->getContent());

    $response->setData(new JsonResponseMyJson());
    $this->assertSame('{"hello":"IJson"}', $response->getContent());

    $response->setData(new JsonResponseMyJsonSerializable());
    $this->assertSame('{"hello":"JsonSerializable"}', $response->getContent());
}
```