# 身份验证哈希

::: tip Testing Is Documentation
[tests/Auth/HashTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Auth/HashTest.php)
:::
    
密码哈希主要用于登陆验证密码，功能非常简单，仅提供密码加密方法 `password` 和校验方法 `verify`。

**password 原型**

``` php
# Leevel\Auth\Hash::password
/**
 * {@inheritDoc}
 */
public function password(string $password, array $option = []): string;
```

**verify 原型**

``` php
# Leevel\Auth\Hash::verify
/**
 * {@inheritDoc}
 */
public function verify(string $password, string $hash): bool;
```


**Uses**

``` php
<?php

use Leevel\Auth\Hash;
```

## 密码哈希基本使用

``` php
public function testBaseUse(): void
{
    $hash = new Hash();
    $hashPassword = $hash->password('123456');
    $this->assertTrue($hash->verify('123456', $hashPassword));
}
```
    
## 密码哈希带配置例子

底层使用的是 `password_hash` 函数，详细见下面的链接。

<https://www.php.net/manual/zh/function.password-hash.php>


``` php
public function testWithCost(): void
{
    $hash = new Hash();
    $hashPassword = $hash->password('123456', ['cost' => 12]);
    $this->assertTrue($hash->verify('123456', $hashPassword));
}
```