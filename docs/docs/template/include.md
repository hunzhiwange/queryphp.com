# Include 标签

可以使用 include 标签来包含外部的模板文件。

## 使用完整文件名包含

使用方法如下：

``` html
<include file="完整模板文件名" />
```


这种情况下，模板文件名必须包含后缀。


``` php
public function testBaseUse()
{
    $parser = $this->createParser();

    $source = <<<'eot'
<include file="application/app/ui/theme/default/header.html">
eot;

    $compiled = <<<'eot'
<?php $this->display('application/app/ui/theme/default/header', [], '.html', true); ?>
eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    

## 使用变量定义完整的文件


``` php
public function testVar()
{
    $parser = $this->createParser();

    $source = <<<'eot'
{~$headTpl = \Leevel::themesPath() . '/' . 'header.html'}
<include file="$headTpl">
eot;

    $compiled = <<<'eot'
<?php $headTpl = \Leevel::themesPath() . '/' . 'header.html'; ?>
<?php $this->display($headTpl, [], '', true); ?>
eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    

## 包含当前视图目录下的模板文件


``` php
public function testInViewDir()
{
    $parser = $this->createParser();

    $source = <<<'eot'
<include file="test" />
eot;

    $compiled = <<<'eot'
<?php $this->display('test', [], '', true); ?>
eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    

## 包含其他模块的操作模板

其中模块以目录分隔

``` php
public function testOtherModule()
{
    $parser = $this->createParser();

    $source = <<<'eot'
<include file="public+header" />
eot;

    $compiled = <<<'eot'
<?php $this->display('public+header', [], '', true); ?>
eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));

    $source = <<<'eot'
<include file="public/header" />
eot;

    $compiled = <<<'eot'
<?php $this->display('public/header', [], '', true); ?>
eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```
    

## 函数表达式支持

为了防止 `.` 被解析为 `->`，需要由 `()` 包裹起来，`file` 内容区的解析规则遵循 `if` 标签的 `condition` 特性。

``` php
public function testExpr()
{
    $parser = $this->createParser();

    // 防止 . 被替换加上 () 包裹起来
    $source = <<<'eot'
<include file="($path . '/' . $name)" />
<include file="Template::tpl('header')" />
<include file="tpl('header')" />
<include file="$hello.world('header')" />
eot;

    $compiled = <<<'eot'
<?php $this->display(($path . '/' . $name), [], '', true); ?>
<?php $this->display(Template::tpl('header'), [], '', true); ?>
<?php $this->display(tpl('header'), [], '', true); ?>
<?php $this->display($hello->world('header'), [], '', true); ?>
eot;

    $this->assertSame($compiled, $parser->doCompile($source, null, true));
}
```