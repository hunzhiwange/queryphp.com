# 字符串

这里为系统提供的字符串使用的功能文档说明。

**引入相关类**

 * use Leevel\Support\Str;
## 随机小写字母和数字

利用本方法可以生成随机数小写字母。

``` php
public function testRandAlphaNumLowercase()
{
    $this->assertSame('', Str::randAlphaNumLowercase(0));

    $this->assertTrue(
        1 === preg_match('/^[a-z0-9]+$/', Str::randAlphaNumLowercase(4))
    );

    $this->assertTrue(
        1 === preg_match('/^[a-z0-9]+$/', Str::randAlphaNumLowercase(4, 'cdefghigk2450'))
    );

    $this->assertTrue(
        4 === strlen(Str::randAlphaNumLowercase(4))
    );
}
```
    
::: tip
支持位数和指定字符范围
:::
    
## 随机大写字母和数字

利用本方法可以生成随机数大写字母。

``` php
public function testRandAlphaNumUppercase()
{
    $this->assertSame('', Str::randAlphaNumUppercase(0));

    $this->assertTrue(
        1 === preg_match('/^[A-Z0-9]+$/', Str::randAlphaNumUppercase(4))
    );

    $this->assertTrue(
        1 === preg_match('/^[A-Z0-9]+$/', Str::randAlphaNumUppercase(4, 'ABCDEFG1245'))
    );

    $this->assertTrue(
        4 === strlen(Str::randAlphaNumUppercase(4))
    );
}
```
    
::: tip
支持位数和指定字符范围
:::
    
## 随机字母

利用本方法可以生成随机字母。

``` php
public function testRandAlpha()
{
    $this->assertSame('', Str::randAlpha(0));

    $this->assertTrue(
        1 === preg_match('/^[A-Za-z]+$/', Str::randAlpha(4))
    );

    $this->assertTrue(
        1 === preg_match('/^[A-Za-z]+$/', Str::randAlpha(4, 'ABCDEFGefijk'))
    );

    $this->assertTrue(
        4 === strlen(Str::randAlpha(4))
    );
}
```
    
::: tip
支持位数和指定字符范围
:::