# 文件系统对象管理

::: tip Testing Is Documentation
[tests/Filesystem/FsoTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Filesystem/FsoTest.php)
:::
    
**Uses**

``` php
<?php

use Leevel\Filesystem\Fso;
```

## create_directory 创建目录

``` php
public function testCreateDirectory(): void
{
    $dir = __DIR__.'/createDirectory';

    $this->assertDirectoryNotExists($dir);

    $this->assertTrue(Fso::createDirectory($dir));

    $this->assertDirectoryExists($dir);

    $this->assertTrue(Fso::createDirectory($dir));

    rmdir($dir);
}
```
    
## delete_directory 删除目录

``` php
public function testDeleteDirectory(): void
{
    $dir = __DIR__.'/deleteDirectory/dir';

    $this->assertDirectoryNotExists($dir);

    Fso::deleteDirectory($dir);

    $this->assertTrue(Fso::createDirectory($dir));

    $this->assertDirectoryExists($dir);

    Fso::deleteDirectory($dir);

    $topDir = dirname($dir);

    $this->assertDirectoryExists($topDir);

    Fso::deleteDirectory($topDir);

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

    $this->assertTrue(Fso::createDirectory($sourceSubPath));

    file_put_contents($testFile = $sourceSubPath.'/hello.txt', 'foo');

    $this->assertTrue(is_file($testFile));

    $this->assertSame('foo', file_get_contents($testFile));

    Fso::copyDirectory($sourcePath, $targetPath);

    $this->assertDirectoryExists($targetPath);
    $this->assertDirectoryExists($targetPath.'/dir');
    $this->assertTrue(is_file($targetPath.'/dir/hello.txt'));

    Fso::deleteDirectory($sourcePath, true);
    Fso::deleteDirectory($targetPath, true);
}
```
    
## list_directory 浏览目录

``` php
public function testListDirectory(): void
{
    $sourcePath = __DIR__.'/listDirectory';
    $sourceSubPath = __DIR__.'/listDirectory/dir';

    $this->assertDirectoryNotExists($sourceSubPath);

    $this->assertTrue(Fso::createDirectory($sourceSubPath));

    file_put_contents($testFile = $sourceSubPath.'/hello.txt', 'foo');

    $this->assertTrue(is_file($testFile));

    $this->assertSame('foo', file_get_contents($testFile));

    $filesAndDirs = [];
    $filesAndDirs2 = [];

    Fso::listDirectory($sourcePath, true, function ($item) use (&$filesAndDirs) {
        $filesAndDirs[] = $item->getFileName();
    });

    Fso::listDirectory($sourcePath, true, function ($item) use (&$filesAndDirs2) {
        $filesAndDirs2[] = $item->getFileName();
    }, ['hello.txt']);

    $this->assertSame(['dir', 'hello.txt'], $filesAndDirs);
    $this->assertSame(['dir'], $filesAndDirs2);

    Fso::deleteDirectory($sourcePath, true);
}
```
    
## tidy_path 整理目录斜线风格

``` php
public function testTidyPath(): void
{
    $sourcePath = '/home\goods/name/';

    $this->assertSame('/home/goods/name', Fso::tidyPath($sourcePath));
    $this->assertSame('\home\goods\name', Fso::tidyPath($sourcePath, false));
}
```
    
## is_absolute 判断是否为绝对路径

``` php
public function testIsAbsolute(): void
{
    $this->assertTrue(Fso::isAbsolute('c://'));

    $this->assertTrue(Fso::isAbsolute('/path/hello'));

    $this->assertFalse(Fso::isAbsolute('hello'));
}
```
    
## distributed 根据 ID 获取打散目录

``` php
public function testDistributed(): void
{
    $this->assertSame(['000/00/00/', '01'], Fso::distributed(1));

    $this->assertSame(['090/00/00/', '00'], Fso::distributed(90000000));
}
```
    
## create_file 创建文件

``` php
public function testCreateFile(): void
{
    $sourcePath = __DIR__.'/createFile';
    $file = $sourcePath.'/hello.txt';

    $this->assertDirectoryNotExists($sourcePath);

    $this->assertTrue(Fso::createDirectory($sourcePath));

    $this->assertFalse(is_file($file));

    Fso::createFile($file);

    $this->assertTrue(is_file($file));

    Fso::deleteDirectory($sourcePath, true);
}
```
    
## get_extension 获取上传文件扩展名

``` php
public function testGetExtension(): void
{
    $file = __DIR__.'/FsoTest.pHp';

    $this->assertSame('pHp', Fso::getExtension($file));
    $this->assertSame('PHP', Fso::getExtension($file, 1));
    $this->assertSame('php', Fso::getExtension($file, 2));
}
```
    
## get_name 获取文件名字

``` php
public function testGetName(): void
{
    $file = __DIR__.'/FsoTest.pHp';

    $this->assertSame('FsoTest', Fso::getName($file));
}
```