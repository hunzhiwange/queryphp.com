# 验证助手函数

::: tip Testing Is Documentation
[tests/Validate/HelperTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/HelperTest.php)
:::
    
框架提供助手函数来提供简洁的校验服务，助手的规则与验证器共享校验规则。

**Uses**

 * use Leevel\Validate\Helper;

## 助手基础功能

``` php
public function testBaseUse(): void
{
    $this->assertTrue(Helper::validateRequired(5));
    $this->assertTrue(Helper::validateRequired(0));
    $this->assertFalse(Helper::validateRequired(''));
}
```