# 字符串集合 collection

::: tip Testing Is Documentation
[tests/Support/TypedStringArrayTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Support/TypedStringArrayTest.php)
:::
    
**Uses**

``` php
<?php

use Leevel\Support\TypedStringArray;
```

## 基本使用

``` php
public function testBaseUse(): void
{
    $data = [
        'h', 'l', 'w', 'd',
    ];

    $collection = new TypedStringArray($data);
    $this->assertSame($collection[0], 'h');
    $this->assertSame($collection[1], 'l');
    $this->assertSame($collection[2], 'w');
    $this->assertSame($collection[3], 'd');
    $this->assertTrue(isset($collection[0]));
    $this->assertTrue(isset($collection[1]));
    $this->assertTrue(isset($collection[2]));
    $this->assertTrue(isset($collection[3]));
}
```