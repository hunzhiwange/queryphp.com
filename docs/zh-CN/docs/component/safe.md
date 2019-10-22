# 安全过滤

::: tip 单元测试即文档
[基于原始文档 tests/Encryption/SafeTest.php 自动构建](https://github.com/hunzhiwange/framework/blob/master/tests/Encryption/SafeTest.php)
:::
    
可以对用户输入数据进行过滤。

**引入相关类**

 * use Leevel\Encryption\Safe;

## 添加模式转义和移除魔术方法转义


``` php
public function testBaseUse(): void
{
    $strings = "O'Reilly?";
    $out = "O\\'Reilly?";

    $this->assertSame($out, Safe::customAddslashes($strings));

    $this->assertSame($strings, Safe::customStripslashes($out));

    $arrays = ["O'Reilly?" => "O'Reilly?"];
    $outs = ["O\\'Reilly?" => "O\\'Reilly?"];

    $this->assertSame($outs, Safe::customAddslashes($arrays));

    $this->assertSame($arrays, Safe::customStripslashes($outs));
}
```
    

## 深度过滤


``` php
public function testDeepReplace(): void
{
    $strings = 'You should eat fruits, vegetables, and fiber every day.';
    $out = 'You should eat fruits, vegetables, and fiber every .';

    $this->assertSame($out, Safe::deepReplace(['shoule', 'day'], $strings));
}
```
    

## url 安全过滤


``` php
public function testEscUrl(): void
{
    $strings = 'You should eat fruits, vegetables, and fiber every day.';
    $out = 'You should eat fruits, vegetables, and fiber every .';

    $this->assertSame('', Safe::escUrl(''));

    $this->assertSame(
        'http://example.org/private.php?user=abc&email=abc@11.org',
        Safe::escUrl('example.org/private.php?user=abc&email=abc@11.org')
    );

    $this->assertSame(
        'http://example.org/private.php?user=abc&email=abc@11.org',
        Safe::escUrl('http;//example.org/private.php?user=abc&email=abc@11.org')
    );

    $this->assertSame(
        'http://example.org/private.php?user=abc&email=abc@11.org',
        Safe::escUrl('http://example.org/private.php?user=abc%0D%0A&email=abc@11.org')
    );
}
```
    

## 过滤 script


``` php
public function testFilterScript(): void
{
    $strings = '<script>hello world.';
    $out = '&lt;script>hello world.';

    $this->assertSame($out, Safe::filterScript($strings));
}
```
    

## 过滤十六进制字符串


``` php
public function testCleanHex(): void
{
    $strings = '0x63hello 0x6f world.';
    $out = '0hello 0 world.';

    $this->assertSame($out, Safe::cleanHex($strings));
}
```
    

## 签名算法支持


``` php
public function testSignature(): void
{
    $query = [
        'foo'   => 'bar',
        'hello' => 'world',
    ];

    $signature = Safe::signature($query, '123456');

    $this->assertSame('dc6cfa1e1f6eaf29c73622f4d4c54be57d545c1d7c377dade88faccb5a79d2d8', $signature);
}
```
    

## 签名算法支持忽略字段


``` php
public function testSignatureWithIgnore(): void
{
    $query = [
        'foo'       => 'bar',
        'hello'     => 'world',
        'signature' => 'dc6cfa1e1f6eaf29c73622f4d4c54be57d545c1d7c377dade88faccb5a79d2d8',
        'timestamp' => 1541312367,
    ];

    $signature = Safe::signature($query, '123456', ['signature', 'timestamp']);

    $this->assertSame('dc6cfa1e1f6eaf29c73622f4d4c54be57d545c1d7c377dade88faccb5a79d2d8', $signature);
}
```
    

## 签名算法支持子数组


``` php
public function testSignatureWithSubArray(): void
{
    $query = [
        'foo'   => 'bar',
        'hello' => 'world',
        'sub'   => [
            'hello' => 'world',
        ],
    ];

    $signature = Safe::signature($query, '123456');

    $this->assertSame('2bd98c89629fae202c680b33430eb9c909b25f4e8a8dca91752fabd1e14735d1', $signature);
}
```