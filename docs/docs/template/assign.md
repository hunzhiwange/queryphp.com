# 变量赋值

可以在模板中进行一些变量的赋值，以便于进行后续计算处理。

## node 版本

assign 标签也是用于页面快捷赋值，这个还是用起来比较方便。

``` php
public function testBaseUse()
{
    $parser = $this->createParser();

    $source = <<<'eot'
<assign name="helloWorld" value="say hello to the world" />
<assign name="test.hello" value="hello" />
eot;

    $compiled = <<<'eot'
<?php $helloWorld = 'say hello to the world'; ?>
<?php $test->hello = 'hello'; ?>
eot;
    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    

## node 版本.初始化为 Null 值


``` php
public function testNode()
{
    $parser = $this->createParser();

    $source = <<<'eot'
<assign name="test.hello" />
eot;

    $compiled = <<<'eot'
<?php $test->hello = null; ?>
eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    

## node 版本.初始化为指定变量


``` php
public function testNode2()
{
    $parser = $this->createParser();

    $source = <<<'eot'
<assign name="test.hello" value="$hello" />
eot;

    $compiled = <<<'eot'
<?php $test->hello = $hello; ?>
eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    

## node 版本.初始化为函数格式化变量


``` php
public function testNode3()
{
    $parser = $this->createParser();

    $source = <<<'eot'
<assign name="test.hello" value="$hello|md5" />
eot;

    $compiled = <<<'eot'
<?php $test->hello = md5($hello); ?>
eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    

## node 版本.初始化为函数格式化占位变量


``` php
public function testNode4()
{
    $parser = $this->createParser();

    $source = <<<'eot'
<assign name="test.hello" value="$hello|test=0,1|foo=**" />
eot;

    $compiled = <<<'eot'
<?php $test->hello = foo(test($hello, 0,1)); ?>
eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    

## JS 风格版本


``` php
public function testLet()
{
    $parser = $this->createParser();

    $source = <<<'eot'
{% let foo = 'foo' %}
{% let hello = hello . 'foo' %}
eot;

    $compiled = <<<'eot'
<?php $foo = 'foo'; ?>
<?php $hello = $hello . 'foo'; ?>
eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    

## JS 风格版本.初始化值


``` php
public function testLet2()
{
    $parser = $this->createParser();

    $source = <<<'eot'
{% let foo 'foo' %}
eot;

    $compiled = <<<'eot'
<?php $foo = 'foo'; ?>
eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    

## JS 风格版本.初始化为 Null 值


``` php
public function testLet3()
{
    $parser = $this->createParser();

    $source = <<<'eot'
{% let foo %}
eot;

    $compiled = <<<'eot'
<?php $foo = null; ?>
eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    

## JS 风格版本.初始化为 Null 值带上等于符


``` php
public function testLet4()
{
    $parser = $this->createParser();

    $source = <<<'eot'
{% let foo = %}
eot;

    $compiled = <<<'eot'
<?php $foo = null; ?>
eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```