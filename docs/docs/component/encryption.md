# 加密解密

::: tip Testing Is Documentation
[tests/Encryption/EncryptionTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Encryption/EncryptionTest.php)
:::
    
字符串加密解密支持。

**Uses**

``` php
<?php

use Leevel\Encryption\Encryption;
use Leevel\Encryption\IEncryption;
```

## 加密解密基本功能

``` php
public function testBaseUse(): void
{
    $encryption = new Encryption('encode-key');

    $this->assertInstanceof(IEncryption::class, $encryption);

    $sourceMessage = '123456';

    $encodeMessage = $encryption->encrypt($sourceMessage);

    $this->assertFalse($sourceMessage === $encodeMessage);

    $this->assertSame(
        $encryption->decrypt($encodeMessage),
        $sourceMessage
    );

    $this->assertSame(
        $encryption->decrypt($encodeMessage.'foo'),
        ''
    );

    $this->assertSame(
        'encode-key',
        $this->getTestProperty($encryption, 'key')
    );
}
```
    
## 加密解密 AES-128-CBC

``` php
public function testUse128(): void
{
    $encryption = new Encryption('encode-key', 'AES-128-CBC');

    $this->assertInstanceof(IEncryption::class, $encryption);

    $sourceMessage = '123456';

    $encodeMessage = $encryption->encrypt($sourceMessage);

    $this->assertFalse($sourceMessage === $encodeMessage);

    $this->assertSame(
        $encryption->decrypt($encodeMessage),
        $sourceMessage
    );

    $this->assertSame(
        $encryption->decrypt($encodeMessage.'foo'),
        ''
    );

    $this->assertSame(
        'encode-key',
        $this->getTestProperty($encryption, 'key')
    );
}
```
    
## 加密解密支持过期时间

``` php
public function testDecryptButExpired(): void
{
    $encryption = new Encryption('encode-key');

    $this->assertInstanceof(IEncryption::class, $encryption);

    $data = $encryption->encrypt('123456', 1);

    $this->assertSame('123456', $encryption->decrypt($data));

    sleep(2);

    $this->assertSame('', $encryption->decrypt($data));
}
```
    
## 加密解密支持 RSA 校验

``` php
public function testWithPublicAndPrimaryKey(): void
{
    $encryption = new Encryption(
        'encode-key',
        'AES-256-CBC',
        file_get_contents(__DIR__.'/assert/rsa_private_key.pem'),
        file_get_contents(__DIR__.'/assert/rsa_public_key.pem')
    );

    $this->assertInstanceof(IEncryption::class, $encryption);

    $sourceMessage = '123456';

    $encodeMessage = $encryption->encrypt($sourceMessage);

    $this->assertFalse($sourceMessage === $encodeMessage);

    $this->assertSame(
        $encryption->decrypt($encodeMessage),
        $sourceMessage
    );
}
```