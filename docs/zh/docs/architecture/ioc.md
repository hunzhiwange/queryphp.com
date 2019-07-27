# IOC 容器

::: tip 单元测试即文档
[基于原始文档 tests/Di/ContainerTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Di/ContainerTest.php)
:::
    
IOC 容器是整个框架最核心的部分，负责服务的管理和解耦组件。

目前系统所有的关键服务都接入了 IOC 容器，包括控制器、Console 命令行。

**引入相关类**

 * use Leevel\Di\Container;
 * use Leevel\Di\ICoroutine;
 * use stdClass;
## 闭包绑定

闭包属于惰性，真正使用的时候才会执行。

我们可以通过 `bind` 来绑定一个闭包，通过 `make` 来运行服务，第二次运行如果是单例则直接使用生成后的结果，否则会每次执行闭包的代码。


通常来说，系统大部分服务都是单例来提升性能和共享。

``` php
public function testBindClosure(): void
{
    $container = new Container();

    $container->bind('foo', function () {
        return 'bar';
    });

    $this->assertSame('bar', $container->make('foo'));
}
```
    

## 闭包绑定单例


``` php
public function testSingletonClosure(): void
{
    $container = new Container();

    $singleton = new stdClass();

    $container->singleton('singleton', function () use ($singleton) {
        return $singleton;
    });

    $this->assertSame($singleton, $container->make('singleton'));
    $this->assertSame($singleton, $container->make('singleton'));
}
```
    

## 类直接生成本身

一个独立的类可以直接生成，而不需要提前注册到容器中。

``` php
public function testClass(): void
{
    $container = new Container();

    $this->assertInstanceOf(Test1::class, $container->make(Test1::class));
}
```
    

## 类单例

类也可以注册为单例。

``` php
public function testSingletonClass(): void
{
    $container = new Container();

    $container->singleton(Test1::class);

    $this->assertSame($container->make(Test1::class), $container->make(Test1::class));
}
```
    

## 接口绑定

可以为接口绑定实现。

``` php
public function testInterface(): void
{
    $container = new Container();

    $container->bind(ITest2::class, Test2::class);

    $this->assertInstanceOf(ITest2::class, $container->make(ITest2::class));
    $this->assertInstanceOf(ITest2::class, $container->make(Test2::class));
}
```
    

## 接口绑定接口作为构造器参数

接口可以作为控制器参数来做依赖注入。

**ITest2 定义**


``` php
namespace Tests\Di\Fixtures;

interface ITest2
{
}
```


**Test2 定义**


``` php
namespace Tests\Di\Fixtures;

class Test2 implements ITest2
{
}
```


**Test3 定义**


``` php
namespace Tests\Di\Fixtures;

class Test3 implements ITest3
{
    public $arg1;

    public function __construct(ITest2 $arg1)
    {
        $this->arg1 = $arg1;
    }
}
```


通过 `Test3` 的构造函数注入 `ITest2` 的实现 `Test2`，通过 IOC 容器可以实现代码解耦。


``` php
public function testInterface2(): void
{
    $container = new Container();

    $container->bind(ITest2::class, Test2::class);

    $this->assertInstanceOf(ITest2::class, $test2 = $container->make(Test3::class)->arg1);
    $this->assertInstanceOf(Test2::class, $test2);
}
```