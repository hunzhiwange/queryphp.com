# File Bag

::: tip Testing Is Documentation
[tests/Http/FileBagTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Http/FileBagTest.php)
:::
    
QueryPHP 提供了一个文件包装 `\Leevel\Http\FileBag` 对象。

**Uses**

``` php
<?php

use Leevel\Http\FileBag;
use Leevel\Http\UploadedFile;
```

## 数组创建文件包装

``` php
public function testShouldConvertsUploadedFiles(): void
{
    $tmpFile = $this->createTempFile();
    $file = new UploadedFile($tmpFile, basename($tmpFile), 'text/plain');
    $bag = new FileBag([
        'file' => [
            'name'     => basename($tmpFile),
            'type'     => 'text/plain',
            'tmp_name' => $tmpFile,
            'error'    => 0,
            'size'     => null,
        ], ]);

    $this->assertEquals($file, $bag->get('file'));
}
```
    
## 文件包装自动过滤 UPLOAD_ERR_NO_FILE

``` php
public function testShouldSetEmptyUploadedFilesToNull(): void
{
    $bag = new FileBag([
        'file' => [
            'name'     => '',
            'type'     => '',
            'tmp_name' => '',
            'error'    => UPLOAD_ERR_NO_FILE,
            'size'     => 0,
        ], ]);

    $this->assertNull($bag->get('file'));
}
```
    
## \Leevel\Http\UploadedFile 创建文件包装

``` php
public function testConvertUploadFileItem(): void
{
    $tmpFile = $this->createTempFile();
    $file = new UploadedFile($tmpFile, basename($tmpFile), 'text/plain');
    $bag = new FileBag(['image' => $file]);

    $files = $bag->all();
    $this->assertSame($file, $files['image']);
}
```
    
## replace 文件包装支持替换

``` php
public function testReplace(): void
{
    $tmpFile = $this->createTempFile();
    $file = new UploadedFile($tmpFile, basename($tmpFile), 'text/plain');
    $bag = new FileBag();
    $bag->replace([
        'file' => [
            'name'     => basename($tmpFile),
            'type'     => 'text/plain',
            'tmp_name' => $tmpFile,
            'error'    => 0,
            'size'     => null,
        ], ]);

    $this->assertEquals($file, $bag->get('file'));
}
```