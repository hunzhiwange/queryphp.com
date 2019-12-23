# 驗證碼

::: tip Testing Is Documentation
[tests/Seccode/SeccodeTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Seccode/SeccodeTest.php)
:::
    
QueryPHP 提供的验证组件，扩展包内定义了一些常见用法方便使用，可以满足大部分常用场景。

## 配置

验证码带有默认的配置参数，支持自定义配置。

|  参数  | 默认值   | 描述  |
| ------------ | ------------ | ------------ |
| width |  160 | 验证码宽度  |
| height  |  60 | 验证码高度  |
|  adulterate | true  | 随机背景图形  |
| tilt  |  true | 随机倾斜度  |
| color  | true  | 随机颜色  |
| size  |  true | 随机大小  |
| shadow  | true  | 文字阴影  |
|  font_path |   | 英文字体路径  |
|  chinese_font_path |   |  中文字体路径 |
|  background_path |  | 背景图路径  |
| background  | true  |  启用背景图像 |


**Uses**

``` php
<?php

use Leevel\Seccode\Seccode;
```

## display 验证码基本使用

``` php
public function testBaseUse(): void
{
    $seccode = new Seccode([
        'background_path' => __DIR__.'/background',
        'font_path'       => __DIR__.'/font',
    ]);

    $file = __DIR__.'/baseuse.png';

    $seccode->display('abc', $file);

    $this->assertTrue(is_file($file));

    $info = getimagesize($file);

    $data = <<<'eot'
        {
            "0": 160,
            "1": 60,
            "2": 3,
            "3": "width=\"160\" height=\"60\"",
            "bits": 8,
            "mime": "image\/png"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $info
        )
    );

    unlink($file);
}
```
    
## 验证码支持中文

``` php
public function testChinese(): void
{
    $seccode = new Seccode([
        'background_path'         => __DIR__.'/background',
        'font_path'               => __DIR__.'/font',
        'chinese_font_path'       => __DIR__.'/chinese', // 中文字体过于庞大，本地已经测试通过，这里用的英文的假字体，会乱码
    ]);

    $file = __DIR__.'/chinese.png';

    $seccode->display('中国', $file);

    $this->assertTrue(is_file($file));

    $info = getimagesize($file);

    $data = <<<'eot'
        {
            "0": 160,
            "1": 60,
            "2": 3,
            "3": "width=\"160\" height=\"60\"",
            "bits": 8,
            "mime": "image\/png"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $info
        )
    );

    unlink($file);
}
```
    
## 验证码支持随机生成

**支持的类型**

``` php
public function getAutoCodeData(): array
{
    return [
        [Seccode::ALPHA_NUM],
        [Seccode::ALPHA_NUM_LOWERCASE],
        [Seccode::ALPHA_NUM_UPPERCASE],
        [Seccode::ALPHA],
        [Seccode::ALPHA_LOWERCASE],
        [Seccode::ALPHA_UPPERCASE],
        [Seccode::NUM],
        [Seccode::CHINESE],
    ];
}
```


``` php
public function testAutoCode(string $type): void
{
    $seccode = new Seccode([
        'background_path'         => __DIR__.'/background',
        'font_path'               => __DIR__.'/font',
        'chinese_font_path'       => __DIR__.'/chinese', // 中文字体过于庞大，本地已经测试通过，这里用的英文的假字体，会乱码
    ]);

    $file = __DIR__.'/autocode.'.$type.'.png';

    $seccode->display(4, $file, true, $type);

    $this->assertTrue(is_file($file));

    $info = getimagesize($file);

    $data = <<<'eot'
        {
            "0": 160,
            "1": 60,
            "2": 3,
            "3": "width=\"160\" height=\"60\"",
            "bits": 8,
            "mime": "image\/png"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $info
        )
    );

    unlink($file);
}
```
    
## 验证码支持最小尺寸设置

``` php
public function testMinWidthAndMinHeight(): void
{
    $seccode = new Seccode([
        'background_path' => __DIR__.'/background',
        'font_path'       => __DIR__.'/font',
    ]);

    $seccode->setOption('width', 2);
    $seccode->setOption('height', 2);

    $file = __DIR__.'/minWidthAndMinHeight.png';

    $seccode->display('A', $file);

    $this->assertTrue(is_file($file));

    $info = getimagesize($file);

    $data = <<<'eot'
        {
            "0": 16,
            "1": 16,
            "2": 3,
            "3": "width=\"16\" height=\"16\"",
            "bits": 8,
            "mime": "image\/png"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $info
        )
    );

    unlink($file);
}
```
    
## 验证码支持最大尺寸设置

``` php
public function testMaxWidthAndMaxHeight(): void
{
    $seccode = new Seccode([
        'background_path' => __DIR__.'/background',
        'font_path'       => __DIR__.'/font',
    ]);

    $seccode->setOption('width', 1200);
    $seccode->setOption('height', 1200);

    $file = __DIR__.'/maxWidthAndMaxHeight.png';

    $seccode->display('IMAX', $file);

    $this->assertTrue(is_file($file));

    $info = getimagesize($file);

    $data = <<<'eot'
        {
            "0": 999,
            "1": 999,
            "2": 3,
            "3": "width=\"999\" height=\"999\"",
            "bits": 8,
            "mime": "image\/png"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $info
        )
    );

    unlink($file);
}
```
    
## 验证码默认背景图

``` php
public function testWithBackgroundDefault(): void
{
    $seccode = new Seccode([
        'background'      => false,
        'font_path'       => __DIR__.'/font',
    ]);

    $file = __DIR__.'/backgroundDefault.png';

    $seccode->display('ABCD', $file);

    $this->assertTrue(is_file($file));

    $info = getimagesize($file);

    $data = <<<'eot'
        {
            "0": 160,
            "1": 60,
            "2": 3,
            "3": "width=\"160\" height=\"60\"",
            "bits": 8,
            "mime": "image\/png"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $info
        )
    );

    unlink($file);
}
```
    
## 验证码随机颜色

``` php
public function testWithoutRandColor(): void
{
    $seccode = new Seccode([
        'background'      => false,
        'font_path'       => __DIR__.'/font',
        'color'           => false,
    ]);

    $file = __DIR__.'/withoutRandColor.png';

    $seccode->display('ABCD', $file);

    $this->assertTrue(is_file($file));

    $info = getimagesize($file);

    $data = <<<'eot'
        {
            "0": 160,
            "1": 60,
            "2": 3,
            "3": "width=\"160\" height=\"60\"",
            "bits": 8,
            "mime": "image\/png"
        }
        eot;

    $this->assertSame(
        $data,
        $this->varJson(
            $info
        )
    );

    unlink($file);
}
```