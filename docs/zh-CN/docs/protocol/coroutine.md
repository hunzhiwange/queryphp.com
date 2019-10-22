# 协程基础组件

::: tip 单元测试即文档
[基于原始文档 tests/Protocol/CoroutineTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Protocol/CoroutineTest.php)
:::
    
协程基础组件主要用于返回当前协程状态以及标识一个服务是否处于协程中，以便于将数据注册到当前协程下面，用于协程上下文。

**引入相关类**

 * use Leevel\Di\ICoroutine;
 * use Leevel\Protocol\Coroutine;
 * use Throwable;

## 普通服务是否处于协程上下文


``` php
public function testCoroutineContext(): void
{
    $coroutine = new Coroutine();
    $this->assertInstanceOf(ICoroutine::class, $coroutine);
    $this->assertFalse($coroutine->context('notFound'));
    $coroutine->addContext('notFound');
    $this->assertTrue($coroutine->context('notFound'));
}
```
    

## 类是否处于协程上下文

类可以通过添加静态方法 `coroutineContext` 来自动完成协程上下文标识。

``` php
public function testCoroutineContextForClass(): void
{
    $coroutine = new Coroutine();
    $this->assertFalse($coroutine->context(Demo1::class));
    $coroutine->addContext(Demo1::class);
    $this->assertTrue($coroutine->context(Demo1::class));
    $this->assertTrue($coroutine->context(Demo2::class));
}
```
    

## 当前协程 ID 和父 ID


``` php
public function testCoroutineCidAndPcid(): void
{
    $coroutine = new Coroutine();
    $this->assertSame(-1, $coroutine->cid());
    $this->assertFalse($coroutine->pcid());

    try {
        go(function () use ($coroutine) {
            $this->assertSame(1, $coroutine->cid());
            $this->assertSame(-1, $coroutine->pcid());

            go(function () use ($coroutine) {
                $this->assertSame(2, $coroutine->cid());
                $this->assertSame(1, $coroutine->pcid());
            });
        });
    } catch (Throwable $th) {
    }
}
```