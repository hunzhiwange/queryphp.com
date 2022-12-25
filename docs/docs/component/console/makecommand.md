# 通用代码生成器基类

::: tip Testing Is Documentation
[tests/Console/MakeTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Console/MakeTest.php)
:::
    
在项目实际开发中经常需要生成一个基础模板，QueryPHP 对这一场景进行了封装，提供了一个基础的代码生成器基类，
可以十分便捷地生成你需要的模板代码。


**Uses**

``` php
<?php

use Leevel\Console\Make;
use Leevel\Filesystem\Helper;
use Tests\Console\Command\MakeFile;
use Tests\Console\Command\MakeFileWithGlobalReplace;
```

## 基本使用方法

**fixture 定义**

**Tests\Console\Command\MakeFile**

``` php
namespace Tests\Console\Command;

use Leevel\Console\Make;
use Symfony\Component\Console\Input\InputArgument;

class MakeFile extends Make
{
    protected string $name = 'make:test';

    protected string $description = 'Create a test file.';

    public function handle(): int
    {
        $this->setTemplatePath(__DIR__.'/'.($this->getArgument('template') ?: 'template'));

        $this->setCustomReplaceKeyValue('key1', 'hello key1');

        $this->setCustomReplaceKeyValue('key2', 'hello key2');

        $this->setCustomReplaceKeyValue(['key3' => 'hello key3', 'key4' => 'hello key4']);
        $this->setSaveFilePath(__DIR__.'/'.$this->getArgument('cache').'/'.$this->getArgument('name'));

        $this->setMakeType('test');

        $this->create();

        return 0;
    }

    protected function getArguments(): array
    {
        return [
            [
                'name',
                InputArgument::OPTIONAL,
                'This is a name.',
            ],
            [
                'template',
                InputArgument::OPTIONAL,
                'This is a template.',
            ],
            [
                'cache',
                InputArgument::OPTIONAL,
                'This is a cache path.',
                'cache',
            ],
        ];
    }
}
```

**tests/Console/Command/template**

``` html
hello make file

{{key1}}

{{key2}}

{{key3}}

{{key4}}

```


``` php
public function testBaseUse(): void
{
    $result = $this->runCommand(new MakeFile(), [
        'command'     => 'make:test',
        'name'        => 'test',
    ]);

    $result = $this->normalizeContent($result);

    $this->assertStringContainsString($this->normalizeContent('test <test> created successfully.'), $result);

    $file = __DIR__.'/Command/cache/test';

    $this->assertStringContainsString('hello make file', $content = file_get_contents($file));

    $this->assertStringContainsString('hello key1', $content);
    $this->assertStringContainsString('hello key2', $content);
    $this->assertStringContainsString('hello key3', $content);
    $this->assertStringContainsString('hello key4', $content);

    unlink($file);
    rmdir(dirname($file));
}
```