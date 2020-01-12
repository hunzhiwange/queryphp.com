# 管道模式

::: tip Testing Is Documentation
[tests/Pipeline/PipelineTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Pipeline/PipelineTest.php)
:::
    
QueryPHP 提供了一个管道模式组件 `\Leevel\Pipeline\Pipeline` 对象。

QueryPHP 管道模式提供的几个 API 命名参考了 Laravel，底层核心采用迭代器实现。

管道就像流水线，将复杂的问题分解为一个个小的单元，依次传递并处理，前一个单元的处理结果作为第二个单元的输入。


**Uses**

``` php
<?php

use Closure;
use Leevel\Di\Container;
use Leevel\Pipeline\Pipeline;
```

## 管道模式基本使用方法

fixture 定义

**Tests\Pipeline\First**

``` php
namespace Tests\Pipeline;

class First
{
    public function handle(Closure $next, $send)
    {
        $_SERVER['test.first'] = 'i am in first handle and get the send:'.$send;
        $next($send);
    }
}
```

**Tests\Pipeline\Second**

``` php
namespace Tests\Pipeline;

class Second
{
    public function handle(Closure $next, $send)
    {
        $_SERVER['test.second'] = 'i am in second handle and get the send:'.$send;
        $next($send);
    }
}
```


``` php
public function testPipelineBasic(): void
{
    $result = (new Pipeline(new Container()))
        ->send(['hello world'])
        ->through([First::class, Second::class])
        ->then();

    $this->assertSame('i am in first handle and get the send:hello world', $_SERVER['test.first']);
    $this->assertSame('i am in second handle and get the send:hello world', $_SERVER['test.second']);

    unset($_SERVER['test.first'], $_SERVER['test.second']);
}
```
    
## then 执行管道工序并返回响应结果

``` php
public function testPipelineWithThen(): void
{
    $thenCallback = function (Closure $next, $send) {
        $_SERVER['test.then'] = 'i am end and get the send:'.$send;
    };

    $result = (new Pipeline(new Container()))
        ->send(['foo bar'])
        ->through([First::class, Second::class])
        ->then($thenCallback);

    $this->assertSame('i am in first handle and get the send:foo bar', $_SERVER['test.first']);
    $this->assertSame('i am in second handle and get the send:foo bar', $_SERVER['test.second']);
    $this->assertSame('i am end and get the send:foo bar', $_SERVER['test.then']);

    unset($_SERVER['test.first'], $_SERVER['test.second'], $_SERVER['test.then']);
}
```
    
## 管道工序支持返回值

``` php
public function testPipelineWithReturn(): void
{
    $pipe1 = function (Closure $next, $send) {
        $result = $next($send);
        $this->assertSame($result, 'return 2');
        $_SERVER['test.1'] = '1 and get the send:'.$send;

        return 'return 1';
    };

    $pipe2 = function (Closure $next, $send) {
        $result = $next($send);
        $this->assertNull($result);
        $_SERVER['test.2'] = '2 and get the send:'.$send;

        return 'return 2';
    };

    $result = (new Pipeline(new Container()))
        ->send(['return test'])
        ->through([$pipe1, $pipe2])
        ->then();

    $this->assertSame('1 and get the send:return test', $_SERVER['test.1']);
    $this->assertSame('2 and get the send:return test', $_SERVER['test.2']);
    $this->assertSame('return 1', $result);

    unset($_SERVER['test.1'], $_SERVER['test.2']);
}
```
    
## then 管道工序支持依赖注入

fixture 定义

**Tests\Pipeline\DiConstruct**

``` php
namespace Tests\Pipeline;

class DiConstruct
{
    protected $testClass;

    public function __construct(TestClass $testClass)
    {
        $this->testClass = $testClass;
    }

    public function handle(Closure $next, $send)
    {
        $_SERVER['test.DiConstruct'] = 'get class:'.get_class($this->testClass);
        $next($send);
    }
}
```

**Tests\Pipeline\TestClass**

``` php
namespace Tests\Pipeline;

class TestClass
{
}
```


``` php
public function testPipelineWithDiConstruct(): void
{
    $result = (new Pipeline(new Container()))
        ->send(['hello world'])
        ->through([DiConstruct::class])
        ->then();

    $this->assertSame('get class:'.TestClass::class, $_SERVER['test.DiConstruct']);

    unset($_SERVER['test.DiConstruct']);
}
```
    
## 管道工序无参数

``` php
public function testPipelineWithSendNoneParams(): void
{
    $pipe = function (Closure $next) {
        $this->assertCount(1, func_get_args());
    };

    $result = (new Pipeline(new Container()))
        ->through([$pipe])
        ->then();
}
```
    
## send 管道工序通过 send 传递参数

``` php
public function testPipelineWithSendMoreParams(): void
{
    $pipe = function (Closure $next, $send1, $send2, $send3, $send4) {
        $this->assertSame($send1, 'hello world');
        $this->assertSame($send2, 'foo');
        $this->assertSame($send3, 'bar');
        $this->assertSame($send4, 'wow');
    };

    $result = (new Pipeline(new Container()))
        ->send(['hello world'])
        ->send(['foo', 'bar', 'wow'])
        ->through([$pipe])
        ->then();
}
```
    
## through 设置管道中的执行工序支持多次添加

``` php
public function testPipelineWithThroughMore(): void
{
    $_SERVER['test.Through.count'] = 0;

    $pipe = function (Closure $next) {
        $_SERVER['test.Through.count']++;

        $next();
    };

    $result = (new Pipeline(new Container()))
        ->through([$pipe])
        ->through([$pipe, $pipe, $pipe])
        ->through([$pipe, $pipe])
        ->then();

    $this->assertSame(6, $_SERVER['test.Through.count']);

    unset($_SERVER['test.Through.count']);
}
```
    
## 管道工序支持参数传入

fixture 定义

**Tests\Pipeline\WithArgs**

``` php
namespace Tests\Pipeline;

class WithArgs
{
    public function handle(Closure $next, $one, $two)
    {
        $_SERVER['test.WithArgs'] = [$one, $two];
        $next();
    }
}
```


``` php
public function testPipelineWithPipeArgs(): void
{
    $params = ['one', 'two'];

    $result = (new Pipeline(new Container()))
        ->through([WithArgs::class.':'.implode(',', $params)])
        ->then();

    $this->assertSame($params, $_SERVER['test.WithArgs']);

    unset($_SERVER['test.WithArgs']);
}
```
    
## 管道工序支持自定义入口方法

fixture 定义

**Tests\Pipeline\WithAtMethod**

``` php
namespace Tests\Pipeline;

class WithAtMethod
{
    public function run(Closure $next, $send)
    {
        $_SERVER['test.at.method'] = 'i am in at.method handle and get the send:'.$send;
        $next($send);
    }
}
```


``` php
public function testStageWithAtMethod(): void
{
    (new Pipeline(new Container()))
        ->send(['hello world'])
        ->through([WithAtMethod::class.'@run'])
        ->then();

    $this->assertSame('i am in at.method handle and get the send:hello world', $_SERVER['test.at.method']);

    unset($_SERVER['test.at.method']);
}
```