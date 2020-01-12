# 安全过滤

::: tip Testing Is Documentation
[tests/Encryption/SafeTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Encryption/SafeTest.php)
:::
    
可以对用户输入数据进行过滤。

**Uses**

``` php
<?php

use Leevel\Encryption\Safe;
```

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
    
## SQL 过滤

``` php
public function testSqlFilter(): void
{
    $strings = "'myuser' or % # 'foo' = 'foo'";
    $out = 'myuserorfoo=foo';

    $this->assertSame($out, Safe::sqlFilter($strings));
}
```
    
## 字段过滤

``` php
public function testFieldsFilter(): void
{
    $strings = "'myuser' or % # 'foo' = 'foo'";
    $out = 'myuserorfoo=foo';

    $this->assertSame($out, Safe::fieldsFilter($strings));

    $strings = ["'myuser' or % # 'foo' = 'foo'"];
    $out = 'myuserorfoo=foo';

    $this->assertSame($out, Safe::fieldsFilter($strings));
}
```
    
## 字符过滤

``` php
public function testStrFilter(): void
{
    $strings = 'This is some <b>bold</b> text.';
    $out = 'This is some &lt;b&gt;bold&lt;/b&gt; text.';

    $this->assertSame($out, Safe::strFilter($strings));
    $this->assertSame('', Safe::strFilter($strings, 5));

    $strings = ['This is some <b>bold</b> text.'];
    $out = ['This is some &lt;b&gt;bold&lt;/b&gt; text.'];

    $this->assertSame($out, Safe::strFilter($strings));
    $this->assertSame([''], Safe::strFilter($strings, 5));
}
```
    
## HTML 过滤

``` php
public function testHtmlFilter(): void
{
    $strings = "foo bar<script>.<span onclick='alert(5);'>yes</span>.";
    $out = 'foo bar&lt;script&gt;.<span >yes</span>.';

    $this->assertSame($out, Safe::htmlFilter($strings));
    $this->assertSame('', Safe::htmlFilter($strings, 5));

    $strings = ["foo bar<script>.<span onclick='alert(5);'>yes</span>."];
    $out = ['foo bar&lt;script&gt;.<span >yes</span>.'];

    $this->assertSame($out, Safe::htmlFilter($strings));
    $this->assertSame([''], Safe::htmlFilter($strings, 5));
}
```
    
## 字符 HTML 安全显示

``` php
public function testHtmlView(): void
{
    $strings = "i a \n here";
    $out = 'i a <br />
e';

    $this->assertSame($out, Safe::htmlView($strings));
}
```
    
## 整数数组过滤

``` php
public function testIntArrFilter(): void
{
    $strings = '5wb,577,sss66zz';
    $out = '5,577,0';

    $this->assertSame($out, Safe::intArrFilter($strings));
    $this->assertSame(0, Safe::intArrFilter(''));

    $strings = ['55wb', '577', 'sss66zz'];
    $out = '55,577,0';

    $this->assertSame($out, Safe::intArrFilter($strings));
}
```
    
## 字符串数组过滤

``` php
public function testStrArrFilter(): void
{
    $strings = '5wb,577,sss66zz';
    $out = "'5wb','577','sss66zz'";

    $this->assertSame($out, Safe::strArrFilter($strings));
    $this->assertSame('', Safe::strArrFilter(''));

    $strings = ['55wb', '577', 'sss66zz'];
    $out = "'55wb','577','sss66zz'";

    $this->assertSame($out, Safe::strArrFilter($strings));
}
```
    
## 访问时间限制

``` php
public function testLimitTime(): void
{
    $this->assertNull(Safe::limitTime([], 0));

    $this->assertNull(Safe::limitTime(['abc'], 0));

    $time = date('Y-m-d');

    $this->expectException(\RuntimeException::class);
    $this->expectExceptionMessage(
        'You can only before '.$time.' 08:10:00 or after '.$time.' 08:30:00 to access this.'
    );

    Safe::limitTime(['08:10', '08:30'], strtotime('08:15'));
}
```
    
## IP 访问限制

``` php
public function testLimitIp(): void
{
    $this->assertNull(Safe::limitIp('', []));

    $this->assertNull(Safe::limitIp('', [0]));

    $this->assertNull(Safe::limitIp('127.0.0.5', ['127.0.0.1']));
}
```
    
## 检测代理

``` php
public function testLimitAgent(): void
{
    $this->assertNull(Safe::limitAgent());
}
```
    
## 过滤 JavaScript

``` php
public function testCleanJs(): void
{
    $strings = "i a <script></script> <body> <span onmouse='alert(5);'></span>".
        '<span window. xxx>'.
        '<script>window</script> here';
    $out = 'i a  here';

    $this->assertSame($out, Safe::cleanJs($strings));

    $strings = 'i a <span javascript:></span> here';
    $out = 'i a <span ></span> here';

    $this->assertSame($out, Safe::cleanJs($strings));
}
```
    
## 字符串文本化

``` php
public function testText(): void
{
    $strings = "i a <script></script> \n\r<body> <span onmouse='alert(5);'> here";
    $out = 'iahere';

    $this->assertSame($out, Safe::text($strings));
}
```
    
## 字符过滤 JS 和 HTML 标签

``` php
public function testStrip(): void
{
    $strings = "i a <script></script> <body> <span onmouse='alert(5);'> here";
    $out = 'i a    here';

    $this->assertSame($out, Safe::strip($strings));
}
```
    
## 字符 HTML 安全实体

``` php
public function testCustomHtmlspecialchars(): void
{
    $strings = 'i a < here';
    $out = 'i a &lt; here';

    $this->assertSame($out, Safe::customHtmlspecialchars($strings));

    $strings = ['i a < here', 'i a > here'];
    $out = ['i a &lt; here', 'i a &gt; here'];

    $this->assertSame($out, Safe::customHtmlspecialchars($strings));
}
```
    
## 字符 HTML 实体还原

``` php
public function testUnHtmlSpecialchars(): void
{
    $strings = 'i a &lt; here';
    $out = 'i a < here';

    $this->assertSame($out, Safe::unHtmlspecialchars($strings));

    $strings = ['i a &lt; here', 'i a &gt; here'];
    $out = ['i a < here', 'i a > here'];

    $this->assertSame($out, Safe::unHtmlspecialchars($strings));
}
```
    
## 短字符串长度验证

``` php
public function testShortLimit(): void
{
    $strings = 'i a # > here';
    $out = 'i a  &gt; here';

    $this->assertSame($out, Safe::shortLimit($strings));

    $strings = 'i a # > here';
    $out = '';

    $this->assertSame($out, Safe::shortLimit($strings, 5));
}
```
    
## 长字符串长度验证

``` php
public function testLongLimit(): void
{
    $strings = 'i a # > here';
    $out = 'i a # &gt; here';

    $this->assertSame($out, Safe::longLimit($strings));

    $strings = 'i a # > here';
    $out = '';

    $this->assertSame($out, Safe::longLimit($strings, 5));
}
```
    
## 超长字符串长度验证

``` php
public function testBigLimit(): void
{
    $strings = 'i a <script  # > here';
    $out = 'i a  # > here';

    $this->assertSame($out, Safe::bigLimit($strings));

    $strings = 'i <script a # > here';
    $out = ' ';

    $this->assertSame($out, Safe::bigLimit($strings, 5));
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