# Uploaded File

::: tip Testing Is Documentation
[tests/Http/UploadedFileTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Http/UploadedFileTest.php)
:::
    
QueryPHP 的附件上传项统一包装为 `\Leevel\Http\UploadedFile` 对象进行处理。

**Uses**

``` php
<?php

use Leevel\Http\UploadedFile;
```

## 基本使用方法

``` php
public function testBaseUse(): void
{
    $filePath = __DIR__.'/assert/source.txt';

    $file = new UploadedFile(
        $filePath,
        'foo.txt',
        null,
        UPLOAD_ERR_OK
    );

    $this->assertSame('application/octet-stream', $file->getMimeType());
    $this->assertSame('foo.txt', $file->getOriginalName());
    $this->assertSame('txt', $file->getOriginalExtension());
    $this->assertSame(UPLOAD_ERR_OK, $file->getError());
    $this->assertFalse($file->isValid());

    if (\extension_loaded('fileinfo')) {
        $this->assertSame('application/octet-stream', $file->getMimeType());
    }
}
```
    
## getMimeType 返回文件类型

``` php
public function testGetMimeType(): void
{
    $file = new UploadedFile(
        __DIR__.'/assert/source.txt',
        'foo.txt',
        'image/jpeg',
        null
    );

    $this->assertEquals('image/jpeg', $file->getMimeType());
}
```
    
## getOriginalName 返回文件原始名字

``` php
public function testGetOriginalName(): void
{
    $file = new UploadedFile(
        __DIR__.'/assert/source.txt',
        'foo.txt',
        null,
        null
    );

    $this->assertEquals('foo.txt', $file->getOriginalName());
}
```
    
## getOriginalExtension 返回文件原始名字扩展

``` php
public function testGetOriginalExtension(): void
{
    $file = new UploadedFile(
        __DIR__.'/assert/source.txt',
        'foo.txt',
        null,
        null
    );

    $this->assertEquals('txt', $file->getOriginalExtension());
}
```
    
## getMimeType 返回文件类型

``` php
public function testMoveLocalFileIsNotAllowed(): void
{
    $this->expectException(\Leevel\Http\FileException::class);
    $this->expectExceptionMessage(
        'The file foo.txt was not uploaded due to an unknown error.'
    );

    $file = new UploadedFile(
        __DIR__.'/assert/source.txt',
        'foo.txt',
        null,
        UPLOAD_ERR_OK
    );

    $movedFile = $file->move(__DIR__.'/assert/target');
}
```
    
## getError 返回上传错误

``` php
public function testErrorIsOkByDefault(): void
{
    $file = new UploadedFile(
        __DIR__.'/assert/source.txt',
        'foo.txt',
        null,
        null
    );

    $this->assertEquals(UPLOAD_ERR_OK, $file->getError());
}
```
    
## getError 返回上传错误，错误类型例子

**错误类型**

``` php
public function failedUploadedFile()
{
    foreach ([
        UPLOAD_ERR_INI_SIZE,
        UPLOAD_ERR_FORM_SIZE,
        UPLOAD_ERR_PARTIAL,
        UPLOAD_ERR_NO_FILE,
        UPLOAD_ERR_CANT_WRITE,
        UPLOAD_ERR_NO_TMP_DIR,
        UPLOAD_ERR_EXTENSION,
        -1,
    ] as $error) {
        yield [new UploadedFile(
            __DIR__.'/assert/source.txt',
            'foo.txt',
            null,
            $error
        )];
    }
}
```


``` php
public function testMoveFailed(UploadedFile $file): void
{
    switch ($file->getError()) {
        case UPLOAD_ERR_INI_SIZE:
            $exceptionMessage = sprintf('The file foo.txt exceeds your upload_max_filesize ini directive (limit is %d KiB).', UploadedFile::getMaxFilesize());

            break;
        case UPLOAD_ERR_FORM_SIZE:
            $exceptionMessage = 'The file foo.txt exceeds the upload limit defined in your form.';

            break;
        case UPLOAD_ERR_PARTIAL:
            $exceptionMessage = 'The file foo.txt was only partially uploaded.';

            break;
        case UPLOAD_ERR_NO_FILE:
            $exceptionMessage = 'No file was uploaded.';

            break;
        case UPLOAD_ERR_CANT_WRITE:
            $exceptionMessage = 'The file foo.txt could not be written on disk.';

            break;
        case UPLOAD_ERR_NO_TMP_DIR:
            $exceptionMessage = 'File could not be uploaded: missing temporary directory.';

            break;
        case UPLOAD_ERR_EXTENSION:
            $exceptionMessage = 'File upload was stopped by a PHP extension.';

            break;
        default:
            $exceptionMessage = 'The file foo.txt was not uploaded due to an unknown error.';
    }

    $this->expectException(\Leevel\Http\FileException::class);

    if (UPLOAD_ERR_INI_SIZE !== $file->getError()) {
        $this->expectExceptionMessage($exceptionMessage);
    }

    $file->move(__DIR__.'/assert/target');
}
```
    
## move 移动文件

``` php
public function testMoveLocalFileIsAllowedInTestMode(): void
{
    $sourcePath = __DIR__.'/assert/source.txt';
    $filePath = __DIR__.'/assert/test_uploadedtest.txt';
    $targetPath = __DIR__.'/assert/target/test_uploadedtest_target.txt';

    if (is_file($filePath)) {
        unlink($filePath);
    }

    if (is_file($targetPath)) {
        unlink($targetPath);
    }

    copy($sourcePath, $filePath);

    $file = new UploadedFile(
        $filePath,
        'test_uploadedtest_target.txt',
        null,
        UPLOAD_ERR_OK,
        true
    );

    $movedFile = $file->move(dirname($targetPath), 'test_uploadedtest_target.txt');

    $this->assertFileExists($targetPath);
    $this->assertFileNotExists($filePath);
    $this->assertEquals(realpath($targetPath), $movedFile->getRealPath());

    unlink($targetPath);
}
```
    
## getSize 返回文件大小

``` php
public function testGetSize(): void
{
    $filePath = __DIR__.'/assert/source.txt';

    $file = new UploadedFile(
        $filePath,
        'foo.txt',
        null
    );

    $this->assertEquals(filesize($filePath), $file->getSize());
}
```
    
## isValid 文件是否上传成功，成功例子

``` php
public function testIsValid(): void
{
    $file = new UploadedFile(
        __DIR__.'/assert/source.txt',
        'foo.txt',
        null,
        UPLOAD_ERR_OK,
        true
    );

    $this->assertTrue($file->isValid());
}
```
    
::: tip
命令行不能上传文件，第 **5** 个参数用于 mock 上传成功。
:::
    
## isValid 文件是否上传成功，失败例子

``` php
public function testIsInvalidOnUploadError(int $error): void
{
    $file = new UploadedFile(
        __DIR__.'/assert/source.txt',
        'foo.txt',
        null,
        $error
    );

    $this->assertFalse($file->isValid());
}
```
    
::: tip
**错误类型**

``` php
public function uploadedFileErrorProvider(): array
{
    return [
        [UPLOAD_ERR_INI_SIZE],
        [UPLOAD_ERR_FORM_SIZE],
        [UPLOAD_ERR_PARTIAL],
        [UPLOAD_ERR_NO_TMP_DIR],
        [UPLOAD_ERR_EXTENSION],
    ];
}
```

:::