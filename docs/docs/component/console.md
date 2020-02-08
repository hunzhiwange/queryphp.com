# 命令行脚本

::: tip Testing Is Documentation
[tests/Console/CommandTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Console/CommandTest.php)
:::
    
QueryPHP 内置控制台命名，底层采用 `Symfony/console` 开发，用法与 Symfony 一致，对基础命令进行了简单的封装。
几个简单的封装来自 `Laravel`，是对 Symfony 的基础命令做了一些常用功能的包装，可以完全满足常用开发需求。

Console 组件是 Symfony 里面的一个控制台命令组件，可以轻松地编写出运行在 CLI 上面的命名。


**Uses**

``` php
<?php

use Tests\Console\Command\CallOtherCommand;
use Tests\Console\Load1\Test1;
```

## 基本使用方法

**fixture 定义**

**Tests\Console\Load1\Test1**

``` php
namespace Tests\Console\Load1;

use Leevel\Console\Command;

class Test1 extends Command
{
    protected string $name = 'load1:test1';

    protected string $description = 'load1 test1 for command';

    public function handle()
    {
        $this->info('load1 test1');
    }
}
```

**Tests\Console\Command\CallOtherCommand**

``` php
namespace Tests\Console\Command;

use Leevel\Console\Command;

class CallOtherCommand extends Command
{
    protected string $name = 'call:other';

    protected string $description = 'call other command for test.';

    public function handle()
    {
        $this->info('call other command test.');

        $this->info('argument is '.json_encode($this->argument()));

        $this->info('option is '.json_encode($this->option()));

        $this->table([
            'Item',
            'Value',
        ], [
            ['hello', 'world'],
            ['foo', 'bar'],
        ]);

        $this->info($this->time('test time'));

        $this->question('a question');

        $this->error('a error message');

        $this->error('a error message');

        $this->call('load1:test1');
    }
}
```


``` php
public function testBaseUse(): void
{
    $result = $this->runCommand(new CallOtherCommand(), [
        'command'     => 'call:other',
    ], function ($container, $application) {
        $application->normalizeCommands([Test1::class]);
    });

    $result = $this->normalizeContent($result);

    $this->assertStringContainsString($this->normalizeContent('call other command test.'), $result);
    $this->assertStringContainsString($this->normalizeContent('load1 test1'), $result);

    // argument and option
    $this->assertStringContainsString($this->normalizeContent('argument is {"command":"call:other"}'), $result);
    $this->assertStringContainsString($this->normalizeContent('option is {"help":false,"quiet":false,"verbose":false,"version":false,"ansi":false,"no-ansi":false,"no-interaction":false}'), $result);

    // table
    $this->assertStringContainsString($this->normalizeContent('| Item  | Value |'), $result);
    $this->assertStringContainsString($this->normalizeContent('| hello | world |'), $result);
    $this->assertStringContainsString($this->normalizeContent('| foo   | bar   |'), $result);

    // time
    $this->assertStringContainsString($this->normalizeContent(']test time'), $result);

    // question
    $this->assertStringContainsString($this->normalizeContent('a question'), $result);

    // error
    $this->assertStringContainsString($this->normalizeContent('a error message'), $result);
}
```