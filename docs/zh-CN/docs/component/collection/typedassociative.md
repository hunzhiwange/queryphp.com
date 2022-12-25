# 关联数组集合 collection

::: tip Testing Is Documentation
[tests/Support/TypedAssociativeArrayTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Support/TypedAssociativeArrayTest.php)
:::
    
**Uses**

``` php
<?php

use Leevel\Support\TypedAssociativeArray;
```

## 基本使用

``` php
public function testBaseUse(): void
{
    $data = [
        'h' => 'hello',
        'w' => 'world',
    ];

    $collection = new TypedAssociativeArray($data);
    $this->assertSame($collection['h'], 'hello');
    $this->assertSame($collection['w'], 'world');
    $this->assertTrue(isset($collection['h']));
    $this->assertTrue(isset($collection['w']));
}
```