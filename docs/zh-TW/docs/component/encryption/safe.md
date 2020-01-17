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

## custom_addslashes 添加模式转义和移除魔术方法转义

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
    
## deep_replace 深度过滤

``` php
public function testDeepReplace(): void
{
    $strings = 'You should eat fruits, vegetables, and fiber every day.';
    $out = 'You should eat fruits, vegetables, and fiber every .';

    $this->assertSame($out, Safe::deepReplace(['shoule', 'day'], $strings));
}
```
    
## filter_script 过滤 script

``` php
public function testFilterScript(): void
{
    $strings = '<script>hello world.';
    $out = '&lt;script>hello world.';

    $this->assertSame($out, Safe::filterScript($strings));
}
```
    
## clean_hex 过滤十六进制字符串

``` php
public function testCleanHex(): void
{
    $strings = '0x63hello 0x6f world.';
    $out = '0hello 0 world.';

    $this->assertSame($out, Safe::cleanHex($strings));
}
```
    
## str_filter 字符过滤

``` php
public function testStrFilter(): void
{
    $strings = 'This is some <b>bold</b> text.';
    $out = 'This is some &lt;b&gt;bold&lt;/b&gt; text.';
    $this->assertSame($out, Safe::strFilter($strings));

    $strings = ['This is some <b>bold</b> text.'];
    $out = ['This is some &lt;b&gt;bold&lt;/b&gt; text.'];
    $this->assertSame($out, Safe::strFilter($strings));
}
```
    
## html_filter HTML 过滤

``` php
public function testHtmlFilter(): void
{
    $strings = "foo bar<script>.<span onclick='alert(5);'>yes</span>.";
    $out = 'foo bar&lt;script&gt;.<span >yes</span>.';
    $this->assertSame($out, Safe::htmlFilter($strings));

    $strings = ["foo bar<script>.<span onclick='alert(5);'>yes</span>."];
    $out = ['foo bar&lt;script&gt;.<span >yes</span>.'];
    $this->assertSame($out, Safe::htmlFilter($strings));
}
```
    
## html_view 字符 HTML 安全显示

``` php
public function testHtmlView(): void
{
    $strings = "i a \n here";
    $out = 'i a <br />
e';

    $this->assertSame($out, Safe::htmlView($strings));
}
```
    
## clean_js 过滤 JavaScript

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
    
## text 字符串文本化

``` php
public function testText(): void
{
    $strings = "i a <script></script> \n\r<body> <span onmouse='alert(5);'> here";
    $out = 'iahere';

    $this->assertSame($out, Safe::text($strings));
}
```
    
## strip 字符过滤 JS 和 HTML 标签

``` php
public function testStrip(): void
{
    $strings = "i a <script></script> <body> <span onmouse='alert(5);'> here";
    $out = 'i a    here';

    $this->assertSame($out, Safe::strip($strings));
}
```
    
## custom_htmlspecialchars 字符 HTML 安全实体

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
    
## un_htmlspecialchars 字符 HTML 实体还原

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