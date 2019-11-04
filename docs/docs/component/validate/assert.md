# 断言

::: tip Testing Is Documentation
[tests/Validate/AssertTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/AssertTest.php)
:::
    
这里为系统提供的基础的断言功能。

**Uses**

 * use Leevel\Validate\Assert;

## 基本断言测试

断言和验证器共享规则，所以可以直接参考验证器有哪些规则，排查掉依赖验证器自身的校验规则。

**支持格式**

``` php
Assert::foo($value, string $message);
Assert::foo($value, array $param, string $message);
```


``` php
public function testBaseUse(): void
{
    Assert::notEmpty(1);
    Assert::notEmpty(55);
    Assert::notEmpty(66);
    Assert::lessThan(4, [5]);

    $this->assertSame(1, 1);
}
```
    
## 断言失败默认错误消息

``` php
public function testAssertFailedWithDefaultMessage(): void
{
    $this->expectException(\Leevel\Validate\AssertException::class);
    $this->expectExceptionMessage(
        'No exception messsage specified.'
    );

    Assert::notEmpty(0);
}
```
    
## 断言失败自定义消息

``` php
public function testAssertFailedWithCustomMessage(): void
{
    $this->expectException(\Leevel\Validate\AssertException::class);
    $this->expectExceptionMessage(
        'No exception messsage specified.'
    );

    Assert::notEmpty(0);
}
```
    
## 可选断言支持

如果值为 `null` 直接返回正确结果。

``` php
public function testAssertOptional(): void
{
    Assert::optionalNotEmpty(null);

    $this->assertSame(1, 1);
}
```
    
## 可选断言失败

``` php
public function testAssertOptionalFailed(): void
{
    $this->expectException(\Leevel\Validate\AssertException::class);
    $this->expectExceptionMessage(
        'No exception messsage specified.'
    );

    Assert::optionalNotEmpty(0);
}
```
    
## 断言支持多个校验

必须每一个都满足规则才算校验成功。

``` php
public function testAssertMulti(): void
{
    Assert::multiNotEmpty([3, ['hello'], 'bar', 'yes']);

    $this->assertSame(1, 1);
}
```
    
## 断言支持多个校验

必须每一个都满足规则才算校验成功。

``` php
public function testAssertMultiFailed(): void
{
    $this->expectException(\Leevel\Validate\AssertException::class);
    $this->expectExceptionMessage(
        'No exception messsage specified.'
    );

    Assert::multiNotEmpty([3, ['hello'], '', 'yes']);
}
```
    
## 断言支持多个校验也支持可选

必须每一个都满足规则才算校验成功, 可选会跳过验证，可选必须在最前面，即不支持 `multiOptional` 这种写法。

``` php
public function testAssertMultiWithOptional(): void
{
    Assert::optionalMultiNotEmpty([null, ['hello'], 'bar', 'yes', null]);

    $this->assertSame(1, 1);
}
```
    
## 断言支持链式表达式

我们可以使用链式表达式来校验规则。

**make 原型**

``` php
Assert::make($value, ?string $message)
```

第一个参数为待校验的值，第二个为默认校验失败消息，每一条验证规则也支持自己的失败消息。


``` php
public function testAssertChain(): void
{
    Assert::make(5, 'Assert success.')
        ->notEmpty()
        ->lessThan([7]);

    $this->assertSame(1, 1);
}
```
    
## 断言支持延迟释放

可以将所有错误几种抛出。

**lazy 原型**

``` php
Assert::lazy($value, ?string $message, bool $all = true)
```

第一个参数为待校验的值，第二个为默认校验失败消息，第三个为是否全部验证，每一条验证规则也支持自己的失败消息。


``` php
public function testAssertLazyChain(): void
{
    $result = Assert::lazy(5, 'Assert success.')
        ->notEmpty()
        ->lessThan([7], '5 not less than 3')
        ->lessThan([8], '5 not less than 4')
        ->lessThan([9], '5 not less than 2')
        ->flush();

    $this->assert($result);
}
```
    
## 断言失败延迟释放

``` php
public function testAssertLazyChainFailed(): void
{
    $this->expectException(\Leevel\Validate\AssertException::class);
    $this->expectExceptionMessage(
        '["5 not less than 3","5 not less than 4","5 not less than 2"]'
    );

    Assert::lazy(5, 'Assert success.')
        ->notEmpty()
        ->lessThan([3], '5 not less than 3')
        ->lessThan([4], '5 not less than 4')
        ->lessThan([2], '5 not less than 2')
        ->flush();
}
```
    
## 断言失败延迟释放自定义格式化

``` php
public function testAssertLazyChainFailedWithCustomFormat(): void
{
    $this->expectException(\Leevel\Validate\AssertException::class);
    $this->expectExceptionMessage(
        '5 not less than 3'.PHP_EOL.
        '5 not less than 4'.PHP_EOL.
        '5 not less than 2'
    );

    Assert::lazy(5, 'Assert success.')
        ->notEmpty()
        ->lessThan([3], '5 not less than 3')
        ->lessThan([4], '5 not less than 4')
        ->lessThan([2], '5 not less than 2')
        ->flush(function (array $error): string {
            return implode(PHP_EOL, $error);
        });
}
```