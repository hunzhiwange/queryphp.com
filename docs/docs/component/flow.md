# Flow Control

::: tip Testing Is Documentation
[tests/Flow/FlowControlTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Flow/FlowControlTest.php)
:::
    
QueryPHP 为流程控制类统一抽象了一个基础流程控制类 `\Leevel\Flow\FlowControl`，流程控制类可以轻松接入。

系统一些关键服务，比如说数据库查询条件、HTTP 响应等流程控制类均接入了统一的抽象层。


**Uses**

``` php
<?php

use Leevel\Flow\FlowControl;
```

## 基础使用方法

**fixture 定义**

**Tests\Flow\Test1**

``` php
namespace Tests\Flow;

class Test1
{
    use FlowControl;

    protected $value = [];

    public function __call(string $method, array $args)
    {
    }

    public function value()
    {
        return implode(' ', $this->value);
    }

    public function condition1()
    {
        if ($this->checkFlowControl()) {
            return $this;
        }

        $this->value[] = 'condition1';

        return $this;
    }

    public function condition2()
    {
        if ($this->checkFlowControl()) {
            return $this;
        }

        $this->value[] = 'condition2';

        return $this;
    }

    public function condition3()
    {
        if ($this->checkFlowControl()) {
            return $this;
        }

        $this->value[] = 'condition3';

        return $this;
    }

    public function condition4()
    {
        if ($this->checkFlowControl()) {
            return $this;
        }

        $this->value[] = 'condition4';

        return $this;
    }

    public function condition5()
    {
        if ($this->checkFlowControl()) {
            return $this;
        }

        $this->value[] = 'condition5';

        return $this;
    }
}
```


``` php
public function testBaseUse(): void
{
    $test = new Test1();

    $this->assertSame('', $test->value());

    $condition1 = 1;

    $value = $test
        ->if($condition1)
        ->condition1()
        ->else()
        ->condition2()
        ->fi()
        ->value();

    $this->assertSame('condition1', $value);
}
```
    
## else 条件语句

``` php
public function testElse(): void
{
    $test = new Test1();

    $condition1 = 0;

    $value = $test
        ->if($condition1)
        ->condition1()
        ->else()
        ->condition2()
        ->fi()
        ->value();

    $this->assertSame('condition2', $value);
}
```
    
## else 条件语句例子

**测试例子**

``` php
# Tests\Flow\FlowControlTest::getElseData
public function getElseData()
{
    return [
        [0, 'condition1 condition5'],
        [1, 'condition2 condition5'],
        [2, 'condition3 condition5'],
        [3, 'condition4'], // else 仅能根据上一次的 elif 或 if 来做判断，这里为 elif(3 === $condition)
        [4, 'condition5'],
        [5, 'condition5'],
        [6, 'condition5'],
    ];
}
```


``` php
public function testElseMulti(int $condition, string $result): void
{
    $test = new Test1();

    $value = $test
        ->if(0 === $condition)
        ->condition1()
        ->elif(1 === $condition)
        ->condition2()
        ->elif(2 === $condition)
        ->condition3()
        ->elif(3 === $condition)
        ->condition4()
        ->else() // else 仅能根据上一次的 elif 或 if 来做判断，这里为 elif(3 === $condition)
        ->condition5()
        ->fi()
        ->value();

    $this->assertSame($result, $value);
}
```
    
## elif 条件语句

``` php
public function testElseIfs(): void
{
    $test = new Test1();

    $condition1 = 1;

    $value = $test
        ->if(0 === $condition1)
        ->condition1()
        ->elif(1 === $condition1)
        ->condition2()
        ->fi()
        ->value();

    $this->assertSame('condition2', $value);
}
```