# 函数惰性加载

使用函数惰性加载可以更好地管理辅助方法，避免载入过多无用的辅助函数，并且可以提高性能。

可以引入一个辅助函数来简化


``` php
use Leevel\Support\Fn;


function fn($fn, ...$args)
{
return (new Fn())($fn, ...$args);
}
```


**引入相关类**

 * use Leevel\Support\Fn;
## 字符串调用分组函数


``` php
public function testGroup(): void
{
    $this->assertFalse(function_exists('Tests\\Support\\Fixtures\\Fn\\testgroup_fn1'));
    $this->assertFalse(function_exists('Tests\\Support\\Fixtures\\Fn\\testgroup_fn2'));

    $result = (new Fn())('Tests\\Support\\Fixtures\\Fn\\testgroup_fn1');

    $this->assertSame('hello world', $result);

    $result = (new Fn())('Tests\\Support\\Fixtures\\Fn\\testgroup_fn2');

    $this->assertSame('hello world2', $result);

    $this->assertTrue(function_exists('Tests\\Support\\Fixtures\\Fn\\testgroup_fn1'));
    $this->assertTrue(function_exists('Tests\\Support\\Fixtures\\Fn\\testgroup_fn2'));
}
```
    

## 闭包调用已载入的分组函数

函数载入一次后面就都存在了，甚至可以直接使用函数。

``` php
public function testGroupWithClosureWithFuncWasLoaded(): void
{
    $this->assertTrue(function_exists('Tests\\Support\\Fixtures\\Fn\\testgroup_fn1'));
    $this->assertTrue(function_exists('Tests\\Support\\Fixtures\\Fn\\testgroup_fn2'));

    $result = (new Fn())(function () {
        return testgroup_fn1();
    });

    $this->assertSame('hello world', $result);

    $result = (new Fn())(function () {
        return testgroup_fn2();
    });

    $this->assertSame('hello world2', $result);
}
```
    

## 闭包调用分组函数


``` php
public function testGroupWithClosure(): void
{
    $this->assertFalse(function_exists('Tests\\Support\\Fixtures\\Fn\\testgroup2_fn1'));
    $this->assertFalse(function_exists('Tests\\Support\\Fixtures\\Fn\\testgroup2_fn2'));

    $result = (new Fn())(function () {
        return testgroup2_fn1();
    });

    $this->assertSame('g2:hello world', $result);

    $result = (new Fn())(function () {
        return testgroup2_fn2();
    });

    $this->assertSame('g2:hello world2', $result);

    $this->assertTrue(function_exists('Tests\\Support\\Fixtures\\Fn\\testgroup2_fn1'));
    $this->assertTrue(function_exists('Tests\\Support\\Fixtures\\Fn\\testgroup2_fn2'));
}
```
    

## 字符串调用单个文件函数


``` php
public function testSingleFn(): void
{
    $this->assertFalse(function_exists('Tests\\Support\\Fixtures\\Fn\\single_fn'));

    $result = (new Fn())('Tests\\Support\\Fixtures\\Fn\\single_fn');

    $this->assertSame('hello single fn', $result);

    $this->assertTrue(function_exists('Tests\\Support\\Fixtures\\Fn\\single_fn'));
}
```
    

## 闭包调用单个文件函数


``` php
public function testSingleFnWithClosure(): void
{
    $this->assertTrue(function_exists('Tests\\Support\\Fixtures\\Fn\\single_fn'));

    $result = (new Fn())(function () {
        return single_fn();
    });

    $this->assertSame('hello single fn', $result);
}
```
    

## 字符串调用 index 索引函数


``` php
public function testIndex(): void
{
    $this->assertFalse(function_exists('Tests\\Support\\Fixtures\\Fn\\foo_bar'));

    $result = (new Fn())('Tests\\Support\\Fixtures\\Fn\\foo_bar');

    $this->assertSame('foo bar', $result);

    $result = (new Fn())('Tests\\Support\\Fixtures\\Fn\\foo_bar', ' haha');

    $this->assertSame('foo bar haha', $result);

    $this->assertTrue(function_exists('Tests\\Support\\Fixtures\\Fn\\foo_bar'));
}
```
    

## 闭包调用 index 索引函数


``` php
public function testIndexWithClosure(): void
{
    $this->assertTrue(function_exists('Tests\\Support\\Fixtures\\Fn\\foo_bar'));

    $result = (new Fn())(function () {
        return foo_bar();
    });

    $this->assertSame('foo bar', $result);

    $result = (new Fn())(function () {
        return foo_bar(' haha');
    });

    $this->assertSame('foo bar haha', $result);
}
```
    

## 闭包调用多个函数


``` php
public function testIndexWithClosureWithMulti(): void
{
    $this->assertTrue(function_exists('Tests\\Support\\Fixtures\\Fn\\foo_bar'));

    $result = (new Fn())(function () {
        $result1 = foo_bar();

        return $result1.' '.foo_bar();
    });

    $this->assertSame('foo bar foo bar', $result);
}
```