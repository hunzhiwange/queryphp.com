# 文件系统助手函数

::: tip Testing Is Documentation
[tests/Filesystem/HelperTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Filesystem/HelperTest.php)
:::
    
**Uses**

``` php
<?php

use Leevel\Filesystem\Helper;
```

## create_directory 创建目录

``` php
public function testCreateDirectory(): void
{
    $dir = __DIR__.'/createDirectory';

    $this->assertDirectoryDoesNotExist($dir);

    Helper::createDirectory($dir);

    $this->assertDirectoryExists($dir);

    Helper::createDirectory($dir);
    Helper::createDirectory($dir);

    Helper::deleteDirectory($dir);
}
```
    
## delete_directory 删除目录

``` php
public function testDeleteDirectory(): void
{
    $dir = __DIR__.'/deleteDirectory/dir';

    $this->assertDirectoryDoesNotExist($dir);

    Helper::deleteDirectory($dir);

    Helper::createDirectory($dir);

    $this->assertDirectoryExists($dir);

    Helper::deleteDirectory($dir);

    $topDir = dirname($dir);

    $this->assertDirectoryExists($topDir);

    Helper::deleteDirectory($topDir);

    $this->assertDirectoryDoesNotExist($topDir);
}
```
    
## traverse_directory 遍历目录

``` php
public function testTraverseDirectory(): void
{
    $sourcePath = __DIR__.'/traverseDirectory';
    $sourceSubPath = __DIR__.'/traverseDirectory/dir';

    $this->assertDirectoryDoesNotExist($sourceSubPath);

    Helper::createDirectory($sourceSubPath);

    file_put_contents($testFile = $sourceSubPath.'/hello.txt', 'foo');

    $this->assertTrue(is_file($testFile));

    $this->assertSame('foo', file_get_contents($testFile));

    $filesAndDirs = [];
    $filesAndDirs2 = [];

    Helper::traverseDirectory($sourcePath, true, function ($item) use (&$filesAndDirs) {
        $filesAndDirs[] = $item->getFileName();
    });

    Helper::traverseDirectory($sourcePath, true, function ($item) use (&$filesAndDirs2) {
        $filesAndDirs2[] = $item->getFileName();
    }, ['hello.txt']);

    $this->assertSame(['dir', 'hello.txt'], $filesAndDirs);
    $this->assertSame(['dir'], $filesAndDirs2);

    Helper::deleteDirectory($sourcePath);
}
```
    
## tidy_path 整理目录斜线风格

``` php
public function testTidyPath(): void
{
    $sourcePath = '/home\goods/name/';

    $this->assertSame('/home/goods/name', Helper::tidyPath($sourcePath));
    $this->assertSame('\home\goods\name', Helper::tidyPath($sourcePath, false));
}
```
    
## is_absolute_path 判断是否为绝对路径

``` php
public function testIsAbsolutePath(): void
{
    $this->assertTrue(Helper::isAbsolutePath('c://'));
    $this->assertTrue(Helper::isAbsolutePath('/path/hello'));
    $this->assertFalse(Helper::isAbsolutePath('hello'));
}
```
    
## distributed 根据 ID 获取打散目录

``` php
public function testDistributed(): void
{
    $this->assertSame(['000/00/00/', '01'], Helper::distributed(1));

    $this->assertSame(['090/00/00/', '00'], Helper::distributed(90000000));
}
```
    
## create_file 创建文件

``` php
public function testCreateFile(): void
{
    $sourcePath = __DIR__.'/createFile';
    $file = $sourcePath.'/hello.txt';

    $this->assertDirectoryDoesNotExist($sourcePath);

    Helper::createDirectory($sourcePath);

    $this->assertFalse(is_file($file));

    Helper::createFile($file);

    $this->assertTrue(is_file($file));

    Helper::deleteDirectory($sourcePath);
}
```
    
## get_extension 获取上传文件扩展名

``` php
public function testGetExtension(): void
{
    $file = __DIR__.'/HelperTest.pHp';

    $this->assertSame('pHp', Helper::getExtension($file));
    $this->assertSame('PHP', Helper::getExtension($file, 1));
    $this->assertSame('php', Helper::getExtension($file, 2));
}
```