# File

::: tip Testing Is Documentation
[tests/Http/FileTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Http/FileTest.php)
:::
    
QueryPHP 提供了一个文件管理 `\Leevel\Http\File` 对象。

**Uses**

``` php
<?php

use Leevel\Filesystem\Fso;
use Leevel\Http\File;
```

## 文件基本使用方法

``` php
public function testBaseUse(): void
{
    $sourcePath = __DIR__.'/assert/source.txt';
    $filePath = __DIR__.'/assert/test.txt';
    $targetPath = __DIR__.'/assert/target/test.txt';

    if (is_file($filePath)) {
        unlink($filePath);
    }

    if (is_file($targetPath)) {
        unlink($targetPath);
    }

    copy($sourcePath, $filePath);

    $this->assertSame('foo', file_get_contents($filePath));

    $file = new File($filePath);

    $file->move(dirname($targetPath));

    $this->assertFileExists($targetPath);
    $this->assertFileNotExists($filePath);

    unlink($targetPath);
}
```
    
## move 移动文件

``` php
public function testMoveWithNewName(): void
{
    $sourcePath = __DIR__.'/assert/source.txt';
    $filePath = __DIR__.'/assert/test_newname.txt';
    $targetPath = __DIR__.'/assert/target/test_newname_target.txt';

    if (is_file($filePath)) {
        unlink($filePath);
    }

    if (is_file($targetPath)) {
        unlink($targetPath);
    }

    copy($sourcePath, $filePath);

    $this->assertSame('foo', file_get_contents($filePath));

    $file = new File($filePath);

    $file->move(dirname($targetPath), 'test_newname_target.txt');

    $this->assertFileExists($targetPath);
    $this->assertFileNotExists($filePath);

    unlink($targetPath);
}
```
    
## move 移动文件到子目录

``` php
public function testMoveWithSub(): void
{
    $sourcePath = __DIR__.'/assert/source.txt';
    $filePath = __DIR__.'/assert/test_sub.txt';
    $targetPath = __DIR__.'/assert/target/sub/test_sub.txt';

    if (is_file($filePath)) {
        unlink($filePath);
    }

    if (is_file($targetPath)) {
        unlink($targetPath);
    }

    copy($sourcePath, $filePath);

    $this->assertSame('foo', file_get_contents($filePath));

    $file = new File($filePath);

    $file->move(dirname($targetPath), 'test_sub.txt');

    $this->assertFileExists($targetPath);
    $this->assertFileNotExists($filePath);

    unlink($targetPath);
    rmdir(dirname($targetPath));
}
```