# 函数惰性加载

::: tip 单元测试即文档
[基于原始文档 tests/Support/FnTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Support/FnTest.php)
:::
    
使用函数惰性加载可以更好地管理辅助方法，避免载入过多无用的辅助函数，并且可以提高性能。

`f` 是一个超级的全局函数随着 `Support` 包自动加载，可以在业务中随时使用，组件开发中只是标注依赖 `leevel/support` 包也可以使用。


## 字符串调用分组函数


``` php
public function testGroup(): void
{
    $this->assertFalse(function_exists('Tests\\Support\\Fixtures\Func\testgroup_fn1'));
    $this->assertFalse(function_exists('Tests\\Support\\Fixtures\Func\testgroup_fn2'));

    $result = f('Tests\\Support\\Fixtures\Func\testgroup_fn1');

    $this->assertSame('hello world', $result);

    $result = f('Tests\\Support\\Fixtures\Func\testgroup_fn2');

    $this->assertSame('hello world2', $result);

    $this->assertTrue(function_exists('Tests\\Support\\Fixtures\Func\testgroup_fn1'));
    $this->assertTrue(function_exists('Tests\\Support\\Fixtures\Func\testgroup_fn2'));
}
```
    

## 字符串调用单个文件函数


``` php
public function testSingleFn(): void
{
    $this->assertFalse(function_exists('Tests\\Support\\Fixtures\Func\single_fn'));

    $result = f('Tests\\Support\\Fixtures\Func\single_fn');

    $this->assertSame('hello single fn', $result);

    $this->assertTrue(function_exists('Tests\\Support\\Fixtures\Func\single_fn'));
}
```
    

## 字符串调用 index 索引函数


``` php
public function testIndex(): void
{
    $this->assertFalse(function_exists('Tests\\Support\\Fixtures\Func\foo_bar'));

    $result = f('Tests\\Support\\Fixtures\Func\foo_bar');

    $this->assertSame('foo bar', $result);

    $result = f('Tests\\Support\\Fixtures\Func\foo_bar', ' haha');

    $this->assertSame('foo bar haha', $result);

    $this->assertTrue(function_exists('Tests\\Support\\Fixtures\Func\foo_bar'));
}
```