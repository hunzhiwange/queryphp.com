# File Response

::: tip Testing Is Documentation
[tests/Http/FileResponseTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Http/FileResponseTest.php)
:::
    
QueryPHP 针对文件可以直接返回一个 `\Leevel\Http\FileResponse` 响应对象。

**Uses**

``` php
<?php

use Leevel\Http\File;
use Leevel\Http\FileResponse;
use Leevel\Http\ResponseHeaderBag;
use SplFileInfo;
use SplFileObject;
```

## create 创建一个文件响应

``` php
public function testConstruction(): void
{
    $filePath = __DIR__.'/assert/fileresponse_test.txt';
    file_put_contents($filePath, 'foo');

    $response = new FileResponse($filePath, 404, ['X-Header' => 'Foo'], null, true, true);
    $this->assertSame(404, $response->getStatusCode());
    $this->assertSame('Foo', $response->headers->get('X-Header'));
    $this->assertTrue($response->headers->has('ETag'));
    $this->assertTrue($response->headers->has('Last-Modified'));
    $this->assertFalse($response->headers->has('Content-Disposition'));

    $response = FileResponse::create($filePath, 404, [], ResponseHeaderBag::DISPOSITION_INLINE);
    $this->assertSame(404, $response->getStatusCode());
    $this->assertFalse($response->headers->has('ETag'));
    $this->assertSame('inline; filename="fileresponse_test.txt"', $response->headers->get('Content-Disposition'));

    unlink($filePath);
}
```