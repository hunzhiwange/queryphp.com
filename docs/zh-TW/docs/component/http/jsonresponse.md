# JSON Response

::: tip Testing Is Documentation
[tests/Http/JsonResponseTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Http/JsonResponseTest.php)
:::
    
QueryPHP 针对 API 开发可以直接返回一个 `\Leevel\Http\JsonResponse` 响应对象。

**Uses**

 * use InvalidArgumentException;
 * use JsonSerializable;
 * use Leevel\Http\JsonResponse;
 * use Leevel\Support\IArray;
 * use Leevel\Support\IJson;

## JSON 响应基本使用

``` php
public function testConstructorEmptyCreatesJsonObject(): void
{
    $response = new JsonResponse();
    $this->assertSame('{}', $response->getContent());
}
```
    
## JSON 响应支持索引数组

``` php
public function testConstructorWithArrayCreatesJsonArray(): void
{
    $response = new JsonResponse([0, 1, 2, 3]);
    $this->assertSame('[0,1,2,3]', $response->getContent());
}
```
    
## JSON 响应支持关联数组

``` php
public function testConstructorWithAssocArrayCreatesJsonObject(): void
{
    $response = new JsonResponse(['foo' => 'bar']);
    $this->assertSame('{"foo":"bar"}', $response->getContent());
}
```
    
## JSON 响应支持基本类型

``` php
public function testConstructorWithSimpleTypes(): void
{
    $response = new JsonResponse('foo');
    $this->assertSame('"foo"', $response->getContent());

    $response = new JsonResponse(0);
    $this->assertSame('0', $response->getContent());

    $response = new JsonResponse(0.1);
    $this->assertSame('0.1', $response->getContent());

    $response = new JsonResponse(true);
    $this->assertSame('true', $response->getContent());
}
```
    
## JSON 响应头默认为 application/json

``` php
public function testConstructorAddsContentTypeHeader(): void
{
    $response = new JsonResponse();
    $this->assertSame('application/json', $response->headers->get('Content-Type'));
}
```
    
## setJson 设置原生 JSON 数据

``` php
public function testSetJson(): void
{
    $response = new JsonResponse('1', 200, [], true);
    $this->assertSame('1', $response->getContent());

    $response = new JsonResponse('[1]', 200, [], true);
    $this->assertSame('[1]', $response->getContent());

    $response = new JsonResponse(null, 200, []);
    $response->setJson('true');
    $this->assertSame('true', $response->getContent());
}
```
    
## create 创建一个 JSON 响应

``` php
public function testCreate(): void
{
    $response = JsonResponse::create(['foo' => 'bar'], 204);
    $this->assertInstanceOf(JsonResponse::class, $response);
    $this->assertSame('{"foo":"bar"}', $response->getContent());
    $this->assertSame(204, $response->getStatusCode());
}
```
    
## setCallback 设置 JSONP 回调

``` php
public function testSetCallback(): void
{
    $response = JsonResponse::create(['foo' => 'bar'])->setCallback('callback');
    $this->assertSame(';callback({"foo":"bar"});', $response->getContent());
    $this->assertSame('text/javascript', $response->headers->get('Content-Type'));
}
```
    
## getEncodingOptions 获取 JSON 编码参数

``` php
public function testGetEncodingOptions(): void
{
    $response = new JsonResponse();
    $this->assertSame(JSON_UNESCAPED_UNICODE, $response->getEncodingOptions());
}
```
    
## setEncodingOptions 设置 JSON 编码参数

``` php
public function testSetEncodingOptions(): void
{
    $response = new JsonResponse();
    $response->setData([[1, 2, 3]]);
    $this->assertSame('[[1,2,3]]', $response->getContent());

    $response->setEncodingOptions(JSON_FORCE_OBJECT);
    $this->assertSame('{"0":{"0":1,"1":2,"2":3}}', $response->getContent());
}
```
    
## fromJsonString 从 JSON 字符串创建响应对象

``` php
public function testItAcceptsJsonAsString(): void
{
    $response = JsonResponse::fromJsonString('{"foo":"bar"}');
    $this->assertSame('{"foo":"bar"}', $response->getContent());
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
    public function jsonSerialize()
    {
        return ['hello' => 'JsonSerializable'];
    }
}
```


``` php
public function testSetContentJsonObject(): void
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
    
## setData 设置 JSON 数据支持 JSON 编码参数

``` php
public function testSetDataWithEncodingOptions(): void
{
    $response = new JsonResponse();

    $response->setData(['成都', 'QueryPHP']);
    $this->assertSame('["成都","QueryPHP"]', $response->getContent());

    $response->setData(['成都', 'QueryPHP'], 0);
    $this->assertSame('["\u6210\u90fd","QueryPHP"]', $response->getContent());

    $response->setData(['成都', 'QueryPHP'], JSON_FORCE_OBJECT);
    $this->assertSame('{"0":"\u6210\u90fd","1":"QueryPHP"}', $response->getContent());
}
```