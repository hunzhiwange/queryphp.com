# 函数惰性加载

::: tip Testing Is Documentation
[tests/Kernel/FnTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Kernel/FnTest.php)
:::
    
使用函数惰性加载可以更好地管理辅助方法，避免载入过多无用的辅助函数，并且可以提高性能。

`func` 是一个全局函数随着 `kernel` 包自动加载，可以在业务中随时使用，组件开发中请使用原生 `class_exists` 导入函数。


## 分组函数

``` php
public function testGroup(): void
{
    $this->assertFalse(function_exists('Tests\\Kernel\\Fixtures\\Func\\testgroup_fn1'));
    $this->assertFalse(function_exists('Tests\\Kernel\\Fixtures\\Func\\testgroup_fn2'));

    $result = func(fn () => testgroup_fn1());
    $this->assertSame('hello world', $result);
    $result = func(fn () => testgroup_fn2());
    $this->assertSame('hello world2', $result);

    $this->assertTrue(function_exists('Tests\\Kernel\\Fixtures\\Func\\testgroup_fn1'));
    $this->assertTrue(function_exists('Tests\\Kernel\\Fixtures\\Func\\testgroup_fn2'));
}
```
    
## 单个函数

``` php
public function testSingleFn(): void
{
    $this->assertFalse(function_exists('Tests\\Kernel\\Fixtures\\Func\\single_fn'));

    $result = func(fn () => single_fn());
    $this->assertSame('hello single fn', $result);

    $this->assertTrue(function_exists('Tests\\Kernel\\Fixtures\\Func\\single_fn'));
}
```
    
## 目录索引函数

``` php
public function testIndex(): void
{
    $this->assertFalse(function_exists('Tests\\Kernel\\Fixtures\\Func\\foo_bar'));

    $result = func(fn () => foo_bar());
    $this->assertSame('foo bar', $result);
    $result = func(fn () => foo_bar(' haha'));
    $this->assertSame('foo bar haha', $result);
    $result = func(fn (string $extend = '') => foo_bar($extend), ' haha');
    $result = func(function (string $extend = '') {
        return foo_bar($extend);
    }, ' haha');
    $this->assertSame('foo bar haha', $result);

    $this->assertTrue(function_exists('Tests\\Kernel\\Fixtures\\Func\\foo_bar'));
}
```