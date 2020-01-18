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

    $this->assertDirectoryNotExists($dir);

    $this->assertTrue(Helper::createDirectory($dir));

    $this->assertDirectoryExists($dir);

    $this->assertTrue(Helper::createDirectory($dir));

    rmdir($dir);
}
```
    
## delete_directory 删除目录

``` php
public function testDeleteDirectory(): void
{
    $dir = __DIR__.'/deleteDirectory/dir';

    $this->assertDirectoryNotExists($dir);

    Helper::deleteDirectory($dir);

    $this->assertTrue(Helper::createDirectory($dir));

    $this->assertDirectoryExists($dir);

    Helper::deleteDirectory($dir);

    $topDir = dirname($dir);

    $this->assertDirectoryExists($topDir);

    Helper::deleteDirectory($topDir);

    $this->assertDirectoryNotExists($topDir);
}
```
    
## copy_directory 复制目录

``` php
public function testCopyDirectory(): void
{
    $sourcePath = __DIR__.'/copyDirectory';
    $sourceSubPath = __DIR__.'/copyDirectory/dir';
    $targetPath = __DIR__.'/targetCopyDirectory';

    $this->assertDirectoryNotExists($sourceSubPath);
    $this->assertDirectoryNotExists($targetPath);

    $this->assertTrue(Helper::createDirectory($sourceSubPath));

    file_put_contents($testFile = $sourceSubPath.'/hello.txt', 'foo');

    $this->assertTrue(is_file($testFile));

    $this->assertSame('foo', file_get_contents($testFile));

    Helper::copyDirectory($sourcePath, $targetPath);

    $this->assertDirectoryExists($targetPath);
    $this->assertDirectoryExists($targetPath.'/dir');
    $this->assertTrue(is_file($targetPath.'/dir/hello.txt'));

    Helper::deleteDirectory($sourcePath, true);
    Helper::deleteDirectory($targetPath, true);
}
```
    
## list_directory 浏览目录

``` php
public function testListDirectory(): void
{
    $sourcePath = __DIR__.'/listDirectory';
    $sourceSubPath = __DIR__.'/listDirectory/dir';

    $this->assertDirectoryNotExists($sourceSubPath);

    $this->assertTrue(Helper::createDirectory($sourceSubPath));

    file_put_contents($testFile = $sourceSubPath.'/hello.txt', 'foo');

    $this->assertTrue(is_file($testFile));

    $this->assertSame('foo', file_get_contents($testFile));

    $filesAndDirs = [];
    $filesAndDirs2 = [];

    Helper::listDirectory($sourcePath, true, function ($item) use (&$filesAndDirs) {
        $filesAndDirs[] = $item->getFileName();
    });

    Helper::listDirectory($sourcePath, true, function ($item) use (&$filesAndDirs2) {
        $filesAndDirs2[] = $item->getFileName();
    }, ['hello.txt']);

    $this->assertSame(['dir', 'hello.txt'], $filesAndDirs);
    $this->assertSame(['dir'], $filesAndDirs2);

    Helper::deleteDirectory($sourcePath, true);
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
    
## is_absolute 判断是否为绝对路径

``` php
public function testIsAbsolute(): void
{
    $this->assertTrue(Helper::isAbsolute('c://'));

    $this->assertTrue(Helper::isAbsolute('/path/hello'));

    $this->assertFalse(Helper::isAbsolute('hello'));
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

    $this->assertDirectoryNotExists($sourcePath);

    $this->assertTrue(Helper::createDirectory($sourcePath));

    $this->assertFalse(is_file($file));

    Helper::createFile($file);

    $this->assertTrue(is_file($file));

    Helper::deleteDirectory($sourcePath, true);
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
    
## get_name 获取文件名字

``` php
public function testGetName(): void
{
    $file = __DIR__.'/HelperTest.pHp';

    $this->assertSame('HelperTest', Helper::getName($file));
}
```