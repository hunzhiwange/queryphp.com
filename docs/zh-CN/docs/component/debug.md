# Debug

::: tip Testing Is Documentation
[tests/Debug/DebugTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Debug/DebugTest.php)
:::
    
添加一个组件调试。

**Uses**

``` php
<?php

use Error;
use Exception;
use Leevel\Database\IDatabase;
use Leevel\Debug\Debug;
use Leevel\Di\Container;
use Leevel\Event\Dispatch;
use Leevel\Event\IDispatch;
use Leevel\Http\JsonResponse;
use Leevel\Http\Request;
use Leevel\Http\Response;
use Leevel\Kernel\App as Apps;
use Leevel\Log\File as LogFile;
use Leevel\Log\ILog;
use Leevel\Option\IOption;
use Leevel\Option\Option;
use Leevel\Session\File as SessionFile;
use Leevel\Session\ISession;
use Tests\Database;
use Tests\Database\DatabaseTestCase as TestCase;
```

## JSON 关联数组调试

关联数组结构会在尾部追加一个选项 `:trace` 用于调试。

**返回结构**

``` php
$response = ["foo" => "bar", ":trace" => []];
```

关联数组在尾部追加一个选项作为调试信息，这与非关联数组有所不同。


``` php
public function testJson(): void
{
    $debug = $this->createDebug();

    $this->assertFalse($debug->isBootstrap());

    $debug->bootstrap();

    $this->assertTrue($debug->isBootstrap());

    $request = new Request();
    $response = new JsonResponse(['foo' => 'bar']);

    $debug->handle($request, $response);

    $content = $response->getContent();

    $this->assertStringContainsString('{"foo":"bar",":trace":', $content);

    $this->assertStringContainsString('"php":{"version":', $content);

    $this->assertStringContainsString('Starts from this moment with QueryPHP.', $content);
}
```
    
## JSON 非关联数组调试

非关联数组结构会在尾部追加一个 `:trace` 用于调试。

**返回结构**

``` php
$response = ["foo", "bar", [":trace" => []]];
```

非关联数组在尾部追加一个调试信息，将不会破坏返回接口的 JSON 结构。


``` php
public function testJsonForNotAssociativeArray(): void
{
    $debug = $this->createDebug();

    $this->assertFalse($debug->isBootstrap());

    $debug->bootstrap();

    $this->assertTrue($debug->isBootstrap());

    $request = new Request();
    $response = new JsonResponse(['foo', 'bar']);

    $debug->handle($request, $response);

    $content = $response->getContent();

    $this->assertStringContainsString('"foo","bar",{":trace":{', $content);

    $this->assertStringContainsString('"php":{"version":', $content);

    $this->assertStringContainsString('Starts from this moment with QueryPHP.', $content);
}
```
    
## 关闭调试

``` php
public function testDisable(): void
{
    $debug = $this->createDebug();

    $this->assertFalse($debug->isBootstrap());

    $debug->bootstrap();

    $this->assertTrue($debug->isBootstrap());

    $request = new Request();
    $response = new JsonResponse(['foo' => 'bar']);

    $debug->handle($request, $response);

    $content = $response->getContent();

    $this->assertStringContainsString('{"foo":"bar",":trace":', $content);

    $this->assertStringContainsString('"php":{"version":', $content);

    $this->assertStringContainsString('Starts from this moment with QueryPHP.', $content);

    $debug->disable();

    $response2 = new JsonResponse(['foo' => 'bar']);

    $debug->handle($request, $response2);

    $content = $response2->getContent();

    $this->assertStringNotContainsString('{"foo":"bar",":trace":', $content);

    $this->assertStringNotContainsString('"php":{"version":', $content);

    $this->assertStringNotContainsString('Starts from this moment with QueryPHP.', $content);
}
```
    
## 启用调试

``` php
public function testEnable(): void
{
    $debug = $this->createDebug();

    $this->assertFalse($debug->isBootstrap());

    $debug->bootstrap();

    $this->assertTrue($debug->isBootstrap());

    $request = new Request();
    $response = new JsonResponse(['foo' => 'bar']);

    $debug->disable();

    $debug->handle($request, $response);

    $content = $response->getContent();

    $this->assertStringNotContainsString('{"foo":"bar",":trace":', $content);

    $this->assertStringNotContainsString('"php":{"version":', $content);

    $this->assertStringNotContainsString('Starts from this moment with QueryPHP.', $content);

    $this->assertTrue($debug->isBootstrap());

    $debug->enable();

    $this->assertTrue($debug->isBootstrap());

    $response2 = new JsonResponse(['foo' => 'bar']);

    $debug->handle($request, $response2);

    $content = $response2->getContent();

    $this->assertStringContainsString('{"foo":"bar",":trace":', $content);

    $this->assertStringContainsString('"php":{"version":', $content);

    $this->assertStringContainsString('Starts from this moment with QueryPHP.', $content);
}
```
    
## 启用调试但是未初始化

``` php
public function testEnableWithoutBootstrap(): void
{
    $debug = $this->createDebug();

    $request = new Request();
    $response = new JsonResponse(['foo' => 'bar']);

    $debug->disable();

    $debug->handle($request, $response);

    $content = $response->getContent();

    $this->assertStringNotContainsString('{"foo":"bar",":trace":', $content);

    $this->assertStringNotContainsString('"php":{"version":', $content);

    $this->assertStringNotContainsString('Starts from this moment with QueryPHP.', $content);

    $this->assertFalse($debug->isBootstrap());

    $debug->enable();

    $this->assertTrue($debug->isBootstrap());

    $response2 = new JsonResponse(['foo' => 'bar']);

    $debug->handle($request, $response2);

    $content = $response2->getContent();

    $this->assertStringContainsString('{"foo":"bar",":trace":', $content);

    $this->assertStringContainsString('"php":{"version":', $content);

    $this->assertStringContainsString('Starts from this moment with QueryPHP.', $content);
}
```
    
## 调试消息等级

**支持的消息类型**

``` php
public function getMessageLevelsData()
{
    return [
        ['emergency'], ['alert'], ['critical'],
        ['error'], ['warning'], ['notice'],
        ['info'], ['debug'], ['log'],
    ];
}
```

系统支持多种消息类型，可以参考这个进行调试。


``` php
public function testMessageLevelsData(string $level): void
{
    $debug = $this->createDebug();

    $this->assertFalse($debug->isBootstrap());

    $debug->bootstrap();

    $this->assertTrue($debug->isBootstrap());

    $request = new Request();
    $response = new JsonResponse(['foo' => 'bar']);

    foreach (['hello', 'world'] as $v) {
        $debug->{$level}($v);
    }

    $debug->handle($request, $response);

    $content = $response->getContent();

    $this->assertStringContainsString('{"foo":"bar",":trace":', $content);
    $this->assertStringContainsString('"php":{"version":', $content);
    $this->assertStringContainsString('Starts from this moment with QueryPHP.', $content);
    $this->assertStringContainsString('{"message":"hello","message_html":null,"is_string":true,"label":"'.$level.'",', $content);
    $this->assertStringContainsString('{"message":"world","message_html":null,"is_string":true,"label":"'.$level.'",', $content);
}
```
    
## 调试 Session

``` php
public function testWithSession(): void
{
    $debug = $this->createDebug();

    $this->assertFalse($debug->isBootstrap());

    $debug->bootstrap();

    $this->assertTrue($debug->isBootstrap());

    $request = new Request();
    $response = new JsonResponse(['foo' => 'bar']);

    $session = $debug->getContainer()->make('session');

    $session->set('test_session', 'test_value');

    $debug->handle($request, $response);

    $content = $response->getContent();

    $this->assertStringContainsString('"session":{"test_session":"test_value"},', $content);
}
```
    
## 调试 Log

``` php
public function testWithLog(): void
{
    $debug = $this->createDebugWithLog();

    $container = $debug->getContainer();

    $this->assertFalse($debug->isBootstrap());

    $debug->bootstrap();

    $this->assertTrue($debug->isBootstrap());

    $request = new Request();
    $response = new JsonResponse(['foo' => 'bar']);

    $log = $container->make('log');

    $log->info('test_log', ['exends' => 'bar']);
    $log->debug('test_log_debug');

    $debug->handle($request, $response);
    $content = $response->getContent();

    $this->assertStringContainsString('"logs":{"count":2,', $content);
    $this->assertStringContainsString('test_log info: {\"exends\":\"bar\"}', $content);
    $this->assertStringContainsString('test_log_debug debug: []', $content);
}
```
    
## 调试数据库

``` php
public function testWithDatabase(): void
{
    $debug = $this->createDebugWithDatabase();
    $container = $debug->getContainer();
    $this->assertFalse($debug->isBootstrap());
    $debug->bootstrap();
    $this->assertTrue($debug->isBootstrap());

    $request = new Request();
    $response = new JsonResponse(['foo' => 'bar']);

    $database = $container->make('database');
    $database
        ->table('guest_book')
        ->findAll();

    $debug->handle($request, $response);
    $content = $response->getContent();

    $this->assertStringContainsString('"logs":{"count":1,', $content);
    $this->assertStringContainsString('SQL: [39] SELECT `guest_book`.* FROM `guest_book` | Params:  0', $content);
}
```
    
## 调试时间

``` php
public function testTime(): void
{
    $debug = $this->createDebug();

    $this->assertFalse($debug->isBootstrap());

    $debug->bootstrap();

    $this->assertTrue($debug->isBootstrap());

    $request = new Request();
    $response = new JsonResponse(['foo' => 'bar']);

    $debug->time('time_test');

    $debug->end('time_test');

    $debug->handle($request, $response);

    $content = $response->getContent();

    $this->assertStringContainsString('"time":{"start"', $content);

    $this->assertStringContainsString('"measures":[{"label":"time_test","start":', $content);
}
```
    
## 调试带有标签的时间

``` php
public function testTimeWithLabel(): void
{
    $debug = $this->createDebug();

    $this->assertFalse($debug->isBootstrap());

    $debug->bootstrap();

    $this->assertTrue($debug->isBootstrap());

    $request = new Request();
    $response = new JsonResponse(['foo' => 'bar']);

    $debug->time('time_test', 'time_label');

    $debug->end('time_test');

    $debug->handle($request, $response);

    $content = $response->getContent();

    $this->assertStringContainsString('"time":{"start"', $content);

    $this->assertStringContainsString('"measures":[{"label":"time_label","start":', $content);
}
```